import { error } from "@sveltejs/kit";
import { organization } from "$lib/organization";
import { getUpcomingEvents } from "$lib/server/calendar";
import type { EntryGenerator, RequestHandler } from "./$types";

// "Aggiungi al tuo calendario": un file iCalendar per evento, generato alla build, che si apre con qualunque
// calendario (iPhone, Android, Outlook), non solo con Google.
export const prerender = true;

export const entries: EntryGenerator = async () => (await getUpcomingEvents()).map(({ id }) => ({ id }));

// Testo: barre, punti e virgola, virgole e a capo vanno protetti (RFC 5545, 3.3.11)
const text = (value: string) => value.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");

// Date: "tutto il giorno" come AAAAMMGG, con orario in UTC come AAAAMMGGTHHMMSSZ
const date = (value: string) =>
    value.includes("T") ? `:${new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}` : `;VALUE=DATE:${value.replace(/-/g, "")}`;

// Righe al massimo di 75 byte, le successive rientrate di uno spazio (RFC 5545, 3.1)
const fold = (line: string) => {
    const parts: string[] = [];
    let current = "";
    for (const char of line) {
        if (new TextEncoder().encode(current + char).length > (parts.length ? 74 : 75)) {
            parts.push(current);
            current = "";
        }
        current += char;
    }
    return [...parts, current].join("\r\n ");
};

export const GET: RequestHandler = async ({ params }) => {
    const event = (await getUpcomingEvents()).find(({ id }) => id === params.id);
    if (!event) error(404, "Evento non trovato");

    const url = `${organization.url}/events/${event.id}`;
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Filarmonica Alessandro Stradella//Calendario//IT",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${event.id}@filarmonicastradella.it`,
        `DTSTAMP${date(new Date().toISOString())}`,
        `DTSTART${date(event.start)}`,
        ...(event.end ? [`DTEND${date(event.end)}`] : []),
        `SUMMARY:${text(event.summary)}`,
        ...(event.location ? [`LOCATION:${text(event.location)}`] : []),
        `DESCRIPTION:${text([event.description, url].filter(Boolean).join("\n\n"))}`,
        `URL:${url}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ];

    return new Response(lines.map(fold).join("\r\n") + "\r\n", {
        headers: { "Content-Type": "text/calendar; charset=utf-8" }
    });
};
