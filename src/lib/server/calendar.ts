import { GOOGLE_CALENDAR_API_KEY } from "$env/static/private";
import sanitizeHtml from "sanitize-html";
import { ensembles } from "$lib/ensembles";
import { hasNotEnded, type EventItem } from "$lib/events";

const CALENDAR_ID = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
const API_URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`;
const CACHE_MS = 60_000;

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

const decodeEntities = (text: string) =>
    text.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (match, entity: string) => {
        if (entity[0] === "#") {
            const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
            return Number.isNaN(code) ? match : String.fromCodePoint(code);
        }
        return ENTITIES[entity.toLowerCase()] ?? match;
    });

// La descrizione del calendario può contenere HTML, anche con i simboli codificati (&lt;b&gt;).
const withTags = (html: string) => html.replace(/&lt;(\/?[a-z][^&]*?)&gt;/gi, "<$1>");

// Le virgolette dritte del calendario ("Tobagi") diventano caporali, come nel resto del sito (docs/DESIGN.md, Tono di voce)
const guillemets = (text: string) => text.replace(/(?:"|&quot;)([^"<>\n]+?)(?:"|&quot;)/g, "«$1»");

// Un indirizzo non va a capo: le righe del luogo (anche "\n" scritto per esteso) diventano parti separate da virgole,
// senza spazi doppi né parti vuote ("Sala Tobagi\nAulla" → "Sala Tobagi, Aulla")
const oneLine = (text: string) =>
    text
        .split(/\r?\n|\\n/)
        .map((part) => part.replace(/\s+/g, " ").trim().replace(/,$/, ""))
        .filter(Boolean)
        .join(", ");

// Solo testo: per le schede, la descrizione per i motori di ricerca e il file .ics
const stripTags = (html?: string) => {
    if (!html) return "";
    const text = withTags(html)
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
        .replace(/<br\s*\/?>|<\/p>|<\/li>|<\/div>|<(?:ul|ol)[^>]*>/gi, "\n")
        // Solo i tag veri: un "<" nel testo ("3 < 5") resta
        .replace(/<\/?[a-z!][^>]*>/gi, "");
    // Alcune descrizioni contengono la sequenza "\n" scritta come testo: la trattiamo come un a capo.
    return guillemets(decodeEntities(text).replace(/\\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim());
};

/*
 * HTML per la pagina dell'evento: solo paragrafi, a capo, grassetto, corsivo, elenchi e link verso il web, le email
 * e i telefoni; tutto il resto (stili, script, attributi) se ne va. Google scrive le descrizioni con <br> invece
 * dei paragrafi, e i testi inseriti da telefono sono testo semplice: le righe vuote diventano paragrafi, gli
 * elenchi restano blocchi a sé. I link fuori dal sito si aprono in una nuova scheda, con la freccia (content.css).
 */
const BREAK = "\u0000";

const toHtml = (raw?: string) => {
    if (!raw) return "";
    let html = withTags(raw).replace(/\\n/g, "\n");
    if (!/<[a-z][^>]*>/i.test(html)) html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
    const blocks = html
        .replace(/<(ul|ol)[\s\S]*?<\/\1>/gi, (list) => `${BREAK}${list}${BREAK}`)
        .replace(/(?:<br\s*\/?>\s*){2,}|<\/?(?:p|div)[^>]*>/gi, BREAK)
        .split(BREAK)
        .map((block) => block.replace(/^(?:\s|<br\s*\/?>)+|(?:\s|<br\s*\/?>)+$/gi, ""))
        .filter(Boolean)
        .map((block) => (/^<(?:ul|ol)/i.test(block) ? block : `<p>${block}</p>`));

    return sanitizeHtml(blocks.join("\n"), {
        allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
        allowedAttributes: { a: ["href", "target", "rel"] },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        textFilter: guillemets,
        transformTags: {
            b: "strong",
            i: "em",
            a: (tagName, attribs) => {
                const href = attribs.href ?? "";
                const external = /^https?:/i.test(href) && !/^https?:\/\/(www\.)?filarmonicastradella\.it/i.test(href);
                const linkAttribs: sanitizeHtml.Attributes = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
                return { tagName, attribs: linkAttribs };
            }
        }
    });
};

/*
 * Chi suona: nella descrizione si scrive l'hashtag della formazione («#streetellaband», anche più di uno), che il
 * sito toglie dal testo e trasforma nel link alla formazione. Vale solo come parola a sé: dopo uno spazio, un tag
 * o un'entità, mai dentro un indirizzo («pagina#sezione»). Un hashtag sconosciuto (scritto male, o di una
 * formazione che non c'è più) sparisce lo stesso dal testo, con un avviso nella build.
 */
const HASHTAG = /(?<=^|[\s>;])#[\p{L}\p{N}_]+/gu;
const ensembleByHashtag = new Map(ensembles.map(({ hashtag, slug, title }) => [hashtag, { slug, title }]));

function eventEnsembles(evt: any) {
    const hashtags = new Set<string>((evt.description ?? "").match(HASHTAG)?.map((tag: string) => tag.toLowerCase()));
    return [...hashtags].flatMap((tag) => {
        const ensemble = ensembleByHashtag.get(tag);
        if (!ensemble) console.warn(`Calendario: hashtag sconosciuto ${tag} in «${evt.summary}»`);
        return ensemble ? [ensemble] : [];
    });
}

function toEventItem(evt: any): EventItem {
    const description = evt.description?.replace(HASHTAG, "");
    return {
        id: evt.id,
        summary: guillemets(evt.summary ?? ""),
        description: stripTags(description),
        descriptionHtml: toHtml(description),
        location: guillemets(oneLine(evt.location ?? "")),
        start: evt.start.dateTime || evt.start.date,
        end: evt.end?.dateTime || evt.end?.date || "",
        ensembles: eventEnsembles(evt)
    };
}

/*
 * Tutti gli eventi pubblici, passati e in programma (dal 9/11/2026, prima solo quelli in programma): le pagine degli eventi restano
 * online anche dopo la data, così i link che le citano non si rompono, e quelli passati vanno in Eventi passati. Il limite in avanti
 * (18 mesi) serve agli eventi ricorrenti senza fine, che altrimenti si ripeterebbero all'infinito; le pagine dell'API si seguono tutte.
 */
async function fetchEvents(): Promise<EventItem[]> {
    const items: any[] = [];
    let pageToken: string | undefined;
    do {
        const params = new URLSearchParams({
            key: GOOGLE_CALENDAR_API_KEY,
            timeMax: new Date(Date.now() + 548 * 86_400_000).toISOString(),
            maxResults: "2500",
            orderBy: "startTime",
            singleEvents: "true",
            ...(pageToken && { pageToken })
        });
        const res = await fetch(`${API_URL}?${params}`);
        if (!res.ok) throw new Error(`Google Calendar API: ${res.status}`);
        const data = await res.json();
        items.push(...(data.items ?? []));
        pageToken = data.nextPageToken;
    } while (pageToken);

    return items.filter((evt) => !isInternal(evt)).map(toEventItem);
}

/*
 * Il calendario contiene anche le prove e gli eventi creati dagli strumenti dei sondaggi, che non sono per il pubblico
 * (dal 7/11/2026): restano fuori dal sito gli eventi il cui titolo comincia con «Prove» e quelli che nella descrizione
 * dicono di essere stati creati automaticamente.
 */
const isInternal = (evt: any) => /^\s*prove\b/i.test(evt.summary ?? "") || /creato automaticamente/i.test(evt.description ?? "");

// Le pagine della stessa build condividono una sola richiesta al calendario.
let cache: { at: number; events: Promise<EventItem[]> } | undefined;

// Tutti gli eventi pubblici, dal più vecchio: per le pagine dei singoli eventi e la mappa del sito
export function getEvents(): Promise<EventItem[]> {
    if (!cache || Date.now() - cache.at > CACHE_MS) {
        const events = fetchEvents();
        events.catch(() => (cache = undefined));
        cache = { at: Date.now(), events };
    }
    return cache.events;
}

// Gli eventi in programma al momento della build, dal più vicino
export const getUpcomingEvents = async () => (await getEvents()).filter((event) => hasNotEnded(event, new Date()));

// Gli eventi già conclusi, dal più recente
export const getPastEvents = async () =>
    (await getEvents()).filter((event) => !hasNotEnded(event, new Date())).reverse();
