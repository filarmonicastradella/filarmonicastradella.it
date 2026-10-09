import { GOOGLE_CALENDAR_API_KEY } from "$env/static/private";
import type { EventItem } from "$lib/events";

const CALENDAR_ID = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
const TIME_ZONE = "Europe/Rome";
const API_URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`;
const CACHE_MS = 60_000;

const formatDay = (date: Date) =>
    date.toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short", timeZone: TIME_ZONE });

const formatTime = (date: Date) =>
    date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });

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
const stripTags = (html?: string) => {
    if (!html) return "";
    const withTags = html.replace(/&lt;(\/?[a-z][^&]*?)&gt;/gi, "<$1>");
    const text = withTags.replace(/<br\s*\/?>|<\/p>|<\/li>|<\/div>/gi, "\n").replace(/<[^>]*>?/g, "");
    // Alcune descrizioni contengono la sequenza "\n" scritta come testo: la trattiamo come un a capo.
    return decodeEntities(text).replace(/\\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
};

function formatEventTime(evt: any): string {
    const startDate = new Date(evt.start.dateTime || evt.start.date);
    const endValue = evt.end?.dateTime || evt.end?.date;
    const isAllDay = !evt.start.dateTime;
    const startDay = formatDay(startDate);

    if (!endValue) {
        return isAllDay ? startDay : `${startDay} ${formatTime(startDate)}`;
    }

    const endDate = new Date(endValue);

    if (isAllDay) {
        const lastDay = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
        const lastDayLabel = formatDay(lastDay);
        return startDay === lastDayLabel ? startDay : `${startDay} - ${lastDayLabel}`;
    }

    if (startDay === formatDay(endDate)) {
        return `${startDay} ${formatTime(startDate)} - ${formatTime(endDate)}`;
    }

    return `${startDay} ${formatTime(startDate)} - ${formatDay(endDate)} ${formatTime(endDate)}`;
}

function toEventItem(evt: any): EventItem {
    return {
        id: evt.id,
        summary: evt.summary ?? "",
        description: stripTags(evt.description),
        location: evt.location ?? "",
        start: evt.start.dateTime || evt.start.date,
        end: evt.end?.dateTime || evt.end?.date || "",
        when: formatEventTime(evt),
        htmlLink: evt.htmlLink ?? ""
    };
}

async function fetchUpcomingEvents(): Promise<EventItem[]> {
    const params = new URLSearchParams({
        key: GOOGLE_CALENDAR_API_KEY,
        timeMin: new Date().toISOString(),
        maxResults: "250",
        orderBy: "startTime",
        singleEvents: "true"
    });
    const res = await fetch(`${API_URL}?${params}`);
    if (!res.ok) throw new Error(`Google Calendar API: ${res.status}`);
    const data = await res.json();

    return (data.items ?? []).map(toEventItem);
}

// Le pagine della stessa build condividono una sola richiesta al calendario.
let cache: { at: number; events: Promise<EventItem[]> } | undefined;

export function getUpcomingEvents(): Promise<EventItem[]> {
    if (!cache || Date.now() - cache.at > CACHE_MS) {
        const events = fetchUpcomingEvents();
        events.catch(() => (cache = undefined));
        cache = { at: Date.now(), events };
    }
    return cache.events;
}
