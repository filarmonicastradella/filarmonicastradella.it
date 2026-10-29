// Galleria di Instagram: i post si leggono qui, prima della build (e del server di sviluppo), con l'API ufficiale di
// Instagram (Instagram API with Instagram Login), senza servizi in mezzo. Foto e video si scaricano in static/instagram/
// e il sito li pubblica da sé; le pagine leggono solo src/lib/content/instagram.json, già pronto, senza nessuna
// richiesta a Instagram. Fino al 30/10/2026 il feed passava da Behold, finito in pausa per il limite di visualizzazioni.
//
// Il token (INSTAGRAM_TOKEN, in .env e nei segreti del repository) dura 60 giorni: lo script lo rinnova quando è vecchio
// di una settimana e scrive quello nuovo nel file indicato da INSTAGRAM_TOKEN_FILE, che la GitHub Action salva nel
// segreto. Se Instagram non risponde, o il token manca, restano le foto dell'ultima volta: la galleria è accessoria.
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import sharp from "sharp";

const API = "https://graph.instagram.com";
const HASHTAG = "#filarmonicastradella"; // solo i post con questo hashtag finiscono sul sito
const MEDIA_DIR = "static/instagram";
const DATA_FILE = "src/lib/content/instagram.json";
const MAX_AGE = 60 * 60 * 1000; // una lettura all'ora al massimo: basta per la build ogni 3 ore
const REFRESH_AFTER = 7 * 24 * 60 * 60 * 1000;
const WIDTHS = [320, 640, 1080];
const ALT_MAX_LENGTH = 140;

const readData = async () => {
    try {
        return JSON.parse(await readFile(DATA_FILE, "utf8"));
    } catch {
        return undefined;
    }
};

const get = async (url) => {
    const res = await fetch(url);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Instagram: ${res.status} ${body.error?.message ?? ""}`);
    return body;
};

// Il testo alternativo è la prima frase della didascalia (di solito dice che cosa mostra la foto), senza hashtag,
// tagliata a una parola intera se è troppo lunga.
const altText = (caption = "") => {
    const firstSentence = caption.replace(/#\S+/g, "").trim().split(/(?<=[.!?])\s/)[0].trim();
    const alt = firstSentence.length > ALT_MAX_LENGTH ? `${firstSentence.slice(0, ALT_MAX_LENGTH).replace(/\s+\S*$/, "")}…` : firstSentence;
    return alt || "Foto dal profilo Instagram della Filarmonica";
};

// Scarica un file una volta sola: il nome dipende dall'id del contenuto, che su Instagram non cambia
async function download(url, file) {
    if (!existsSync(`${MEDIA_DIR}/${file}`)) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url}: ${res.status}`);
        await writeFile(`${MEDIA_DIR}/${file}`, Buffer.from(await res.arrayBuffer()));
    }
    return file;
}

// Le misure per il srcset, in WebP, e il colore dominante come fondo mentre la foto si carica
async function sizes(original, id) {
    const image = sharp(`${MEDIA_DIR}/${original}`);
    const { width, height } = await image.metadata();
    const files = [];
    for (const w of WIDTHS.filter((w) => w < width).concat(width)) {
        const file = `${id}-${w}.webp`;
        if (!existsSync(`${MEDIA_DIR}/${file}`)) await sharp(`${MEDIA_DIR}/${original}`).resize(w).webp({ quality: 75 }).toFile(`${MEDIA_DIR}/${file}`);
        files.push({ file, width: w });
    }
    const { dominant } = await image.stats();
    return { files, width, height, color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})` };
}

async function toSlide(media, post) {
    const video = media.media_type === "VIDEO";
    const imageSource = video ? media.thumbnail_url : media.media_url;
    if (!imageSource) return undefined;
    const original = await download(imageSource, `${media.id}.jpg`);
    const { files, width, height, color } = await sizes(original, media.id);
    const large = files.at(-1).file;
    const videoFile = video && media.media_url ? await download(media.media_url, `${media.id}.mp4`) : undefined;

    return {
        id: media.id,
        mediaType: video ? "VIDEO" : "IMAGE",
        mediaUrl: `/instagram/${videoFile ?? large}`,
        thumbnailUrl: `/instagram/${large}`,
        imageUrl: `/instagram/${large}`,
        srcset: files.map(({ file, width }) => `/instagram/${file} ${width}w`).join(", "),
        width,
        height,
        color,
        permalink: post.permalink,
        alt: altText(post.caption)
    };
}

// Rinnovo del token: Instagram lo accetta solo se ha almeno un giorno; quello vecchio vale fino alla sua scadenza
async function refreshToken(token, previous) {
    const last = previous?.tokenRefreshedAt ? new Date(previous.tokenRefreshedAt).getTime() : 0;
    if (Date.now() - last < REFRESH_AFTER) return previous?.tokenRefreshedAt;
    const { access_token } = await get(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`);
    if (process.env.INSTAGRAM_TOKEN_FILE) await writeFile(process.env.INSTAGRAM_TOKEN_FILE, access_token);
    console.log("Instagram: token rinnovato");
    return new Date().toISOString();
}

const previous = await readData();
const token = process.env.INSTAGRAM_TOKEN;
if (!token) {
    console.warn("Instagram: manca INSTAGRAM_TOKEN, restano le foto dell'ultima volta");
    process.exit(0);
}
if (previous?.fetchedAt && Date.now() - new Date(previous.fetchedAt).getTime() < MAX_AGE) {
    console.log("Instagram: post già letti nell'ultima ora");
    process.exit(0);
}

let tokenRefreshedAt = previous?.tokenRefreshedAt;
try {
    tokenRefreshedAt = await refreshToken(token, previous);
} catch (error) {
    console.warn("Instagram: token non rinnovato:", error.message);
}

try {
    // Gli ultimi post (tre pagine al massimo); per gli album, ogni foto
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{id,media_type,media_url,thumbnail_url}";
    const posts = [];
    let url = `${API}/me/media?fields=${encodeURIComponent(fields)}&limit=50&access_token=${token}`;
    for (let page = 0; url && page < 3; page++) {
        const { data, paging } = await get(url);
        posts.push(...data);
        url = paging?.next;
    }

    await mkdir(MEDIA_DIR, { recursive: true });
    const slides = [];
    for (const post of posts.filter(({ caption }) => caption?.toLowerCase().includes(HASHTAG))) {
        for (const media of post.children?.data ?? [post]) {
            const slide = await toSlide(media, post);
            if (slide) slides.push(slide);
        }
    }

    // Via i file dei post tolti da Instagram o senza più l'hashtag (si tengono gli originali, da cui nascono le misure)
    const used = new Set(slides.flatMap(({ id }) => [id]));
    for (const file of await readdir(MEDIA_DIR)) {
        if (!used.has(file.split(/[-.]/)[0])) await rm(`${MEDIA_DIR}/${file}`);
    }

    await writeFile(DATA_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), tokenRefreshedAt, slides }, null, 2));
    console.log(`Instagram: ${slides.length} foto e video da ${posts.length} post`);
} catch (error) {
    console.warn(`Instagram non aggiornato (${previous?.slides ? "restano le foto dell'ultima volta" : "nessuna copia, solo il rimando a Instagram"}):`, error.message);
    await mkdir("src/lib/content", { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify({ ...previous, fetchedAt: new Date().toISOString(), tokenRefreshedAt, slides: previous?.slides ?? null }, null, 2));
}
