import { error } from "@sveltejs/kit";
import { getUpcomingEvents } from "$lib/server/calendar";
import type { EntryGenerator, PageServerLoad } from "./$types";

// Una pagina per ogni evento in programma al momento della build.
export const entries: EntryGenerator = async () => (await getUpcomingEvents()).map(({ id }) => ({ id }));

export const load: PageServerLoad = async ({ params }) => {
    const event = (await getUpcomingEvents()).find(({ id }) => id === params.id);
    if (!event) error(404, "Evento non trovato");

    return { event };
};
