import { error } from "@sveltejs/kit";
import { getEvents } from "$lib/server/calendar";
import { hasNotEnded } from "$lib/events";
import type { EntryGenerator, PageServerLoad } from "./$types";

// Una pagina per ogni evento pubblico, anche passato (dal 9/11/2026): la pagina di un concerto resta online dopo la data.
export const entries: EntryGenerator = async () => (await getEvents()).map(({ id }) => ({ id }));

export const load: PageServerLoad = async ({ params }) => {
    const event = (await getEvents()).find(({ id }) => id === params.id);
    if (!event) error(404, "Evento non trovato");

    // Già concluso al momento della build: la pagina lo dice da sé, anche senza JS
    return { event, past: !hasNotEnded(event, new Date()) };
};
