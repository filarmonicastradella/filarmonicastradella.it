export interface EventItem {
    id: string;
    summary: string;
    description: string;
    location: string;
    start: string;
    end: string;
}

// Un evento è ancora da mostrare finché non è finito (le date "tutto il giorno" finiscono il giorno dopo).
export const hasNotEnded = (event: EventItem, now: Date) => new Date(event.end || event.start).getTime() > now.getTime();

// Date e orari sempre nel fuso di Fivizzano, qualunque sia quello di chi guarda.
const timeZone = "Europe/Rome";
const format = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString("it-IT", { timeZone, ...options });
const dayKey = (date: Date) => date.toLocaleDateString("en-CA", { timeZone }); // AAAA-MM-GG, per confrontare i giorni

// Le date "tutto il giorno" non hanno orario e finiscono il giorno dopo l'ultimo (fine esclusa).
const isAllDay = (event: EventItem) => !event.start.includes("T");
const lastDay = (event: EventItem) =>
    event.end ? new Date(new Date(event.end).getTime() - (isAllDay(event) ? 86_400_000 : 0)) : new Date(event.start);

/** Data dell'evento: "sab 10 ottobre"; se dura più giorni "lun 7 – mar 8 dicembre". */
export function eventDate(event: EventItem): string {
    const start = new Date(event.start);
    const last = lastDay(event);
    const lastLabel = format(last, { weekday: "short", day: "numeric", month: "long" });
    if (dayKey(last) === dayKey(start)) return lastLabel;
    const sameMonth = dayKey(last).slice(0, 7) === dayKey(start).slice(0, 7);
    return `${format(start, sameMonth ? { weekday: "short", day: "numeric" } : { weekday: "short", day: "numeric", month: "long" })} – ${lastLabel}`;
}

// L'ora come si scrive: "21", "20.30"
const hour = (date: Date) => {
    const [h, m] = date.toLocaleTimeString("it-IT", { timeZone, hour: "numeric", minute: "2-digit" }).split(/[.:]/);
    return m === "00" ? h : `${h}.${m}`;
};

/** Ora di inizio, "ore 21" o "ore 20.30"; vuota per gli eventi senza orario. */
export function eventTime(event: EventItem): string {
    return isAllDay(event) ? "" : `ore ${hour(new Date(event.start))}`;
}

/**
 * Quando, per esteso, nella pagina dell'evento: "sabato 21 novembre 2026, dalle 21 alle 23",
 * "da domenica 6 a martedì 8 dicembre 2026", "da domenica 6 dicembre, ore 10, a martedì 8 dicembre 2026, ore 18".
 */
export function eventWhen(event: EventItem): string {
    const start = new Date(event.start);
    const last = lastDay(event);
    const day = (date: Date, options: Intl.DateTimeFormatOptions = {}) =>
        format(date, { weekday: "long", day: "numeric", month: "long", year: "numeric", ...options });
    const sameDay = dayKey(start) === dayKey(last);
    const sameMonth = dayKey(start).slice(0, 7) === dayKey(last).slice(0, 7);

    if (isAllDay(event)) {
        return sameDay ? day(start) : `da ${day(start, { month: sameMonth ? undefined : "long", year: undefined })} a ${day(last)}`;
    }
    if (!event.end) return `${day(start)}, ore ${hour(start)}`;
    if (sameDay) return `${day(start)}, dalle ${hour(start)} alle ${hour(last)}`;
    return `da ${day(start, { year: undefined })}, ore ${hour(start)}, a ${day(last)}, ore ${hour(last)}`;
}

/** Il nome del luogo: il calendario dà spesso l'indirizzo completo, qui basta la parte prima della prima virgola. */
export const eventPlace = (event: EventItem) => event.location.split(",")[0].trim();
