import { error } from "@sveltejs/kit";
import { getUpcomingEvents } from "$lib/server/calendar";
import { icsResponse } from "$lib/server/ics";
import type { EntryGenerator, RequestHandler } from "./$types";

// "Aggiungi al tuo calendario": un file iCalendar per evento, generato alla build (src/lib/server/ics.ts)
export const prerender = true;

export const entries: EntryGenerator = async () => (await getUpcomingEvents()).map(({ id }) => ({ id }));

export const GET: RequestHandler = async ({ params }) => {
    const event = (await getUpcomingEvents()).find(({ id }) => id === params.id);
    if (!event) error(404, "Evento non trovato");
    return icsResponse([event]);
};
