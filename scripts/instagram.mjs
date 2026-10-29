// Galleria di Instagram: il feed di Behold si legge qui, prima della build (e del server di sviluppo), al massimo una
// volta al giorno; foto e video si scaricano in static/instagram/ e il sito li pubblica da sé. Le pagine leggono solo
// src/lib/content/instagram.json, già pronto, senza nessuna richiesta a Behold né ai suoi server di immagini.
//
// Behold conta ogni lettura del feed nelle visualizzazioni del mese e oltre il limite del piano lo mette in pausa
// (errore 402, "pausedByOverage"): per questo una lettura al giorno, e se il feed non risponde restano le foto
// dell'ultima volta. Nella GitHub Action la cache conserva i due percorsi tra una build e l'altra.
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const FEED_URL = "https://feeds.behold.so/1nxUxyt6x5qBVeEHpHNS";
const MEDIA_DIR = "static/instagram";
const DATA_FILE = "src/lib/content/instagram.json";
const MAX_AGE = 24 * 60 * 60 * 1000;
const ALT_MAX_LENGTH = 140;
const SIZES = ["small", "medium", "large"];

const readData = async () => {
    try {
        return JSON.parse(await readFile(DATA_FILE, "utf8"));
    } catch {
        return undefined;
    }
};

// Il testo alternativo è la prima frase della didascalia del post (di solito dice che cosa mostra la foto),
// tagliata a una parola intera se è troppo lunga.
const altText = (post) => {
    const firstSentence = (post.prunedCaption ?? "").trim().split(/(?<=[.!?])\s/)[0];
    const alt = firstSentence.length > ALT_MAX_LENGTH ? `${firstSentence.slice(0, ALT_MAX_LENGTH).replace(/\s+\S*$/, "")}…` : firstSentence;
    return alt || "Foto dal profilo Instagram della Filarmonica";
};

// Scarica un file una volta sola: il nome dipende dall'id del contenuto, che su Instagram non cambia
async function download(url, name) {
    const extension = extname(new URL(url).pathname) || ".jpg";
    const file = `${name}${extension}`;
    if (!existsSync(`${MEDIA_DIR}/${file}`)) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url}: ${res.status}`);
        await writeFile(`${MEDIA_DIR}/${file}`, Buffer.from(await res.arrayBuffer()));
    }
    return file;
}

async function toSlide(media, post) {
    const files = [];
    for (const size of SIZES) {
        const variant = media.sizes?.[size];
        if (variant) files.push({ file: await download(variant.mediaUrl, `${media.id}-${size}`), width: variant.width, height: variant.height });
    }
    const large = files.at(-1);
    const video = media.mediaType === "VIDEO" ? await download(media.mediaUrl, media.id) : undefined;
    // L'immagine: la misura più grande; senza misure, la foto stessa o, per un video, la sua miniatura
    const image =
        large?.file ??
        (media.mediaType === "IMAGE" ? await download(media.mediaUrl, media.id) : media.thumbnailUrl && (await download(media.thumbnailUrl, `${media.id}-thumbnail`)));
    const dominant = media.colorPalette?.dominant;

    return {
        id: media.id,
        mediaType: media.mediaType,
        mediaUrl: `/instagram/${video ?? image}`,
        thumbnailUrl: image ? `/instagram/${image}` : undefined,
        imageUrl: image ? `/instagram/${image}` : undefined,
        srcset: files.length ? files.map(({ file, width }) => `/instagram/${file} ${width}w`).join(", ") : undefined,
        width: large?.width,
        height: large?.height,
        color: dominant ? `rgb(${dominant.replaceAll(",", " ")})` : undefined,
        permalink: post.permalink,
        alt: altText(post)
    };
}

const previous = await readData();
if (previous && Date.now() - new Date(previous.fetchedAt).getTime() < MAX_AGE) {
    console.log("Instagram: feed già letto oggi, nessuna richiesta a Behold");
    process.exit(0);
}

try {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`Behold: ${res.status} ${await res.text()}`);
    const feed = await res.json();
    await mkdir(MEDIA_DIR, { recursive: true });

    // Il feed manda solo i post con #filarmonicastradella (filtro impostato su Behold); una voce per ogni foto degli album
    const slides = [];
    for (const post of feed.posts ?? []) {
        for (const media of post.children?.length ? post.children : [post]) slides.push(await toSlide(media, post));
    }

    // Via i file dei post tolti dal feed
    const used = new Set(
        slides.flatMap(({ mediaUrl, imageUrl, srcset }) => [mediaUrl, imageUrl, ...(srcset ?? "").split(", ").map((entry) => entry.split(" ")[0])])
    );
    for (const file of await readdir(MEDIA_DIR)) {
        if (!used.has(`/instagram/${file}`)) await rm(`${MEDIA_DIR}/${file}`);
    }

    await writeFile(DATA_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), slides }, null, 2));
    console.log(`Instagram: ${slides.length} foto e video aggiornati`);
} catch (error) {
    // La galleria è accessoria: la build continua, con le foto dell'ultima volta o con il solo rimando a Instagram
    console.warn(`Instagram non aggiornato (${previous?.slides ? "restano le foto dell'ultima volta" : "nessuna copia, solo il rimando a Instagram"}):`, error.message);
    // Si annota il tentativo, così si riprova solo il giorno dopo, tenendo le foto che c'erano
    await mkdir("src/lib/content", { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify({ ...previous, fetchedAt: new Date().toISOString(), slides: previous?.slides ?? null }, null, 2));
}
