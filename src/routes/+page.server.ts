import { getUpcomingEvents } from "$lib/server/calendar";
import { gallery } from "$lib/gallery";
import type { PageServerLoad } from "./$types";

const LANDING_EVENTS = 10;

export const load: PageServerLoad = async () => {
    // Se il calendario non risponde la build fallisce e resta online l'ultima versione buona.
    // La galleria è già scaricata (scripts/instagram.mjs): se manca, la pagina rimanda al profilo Instagram.
    const events = await getUpcomingEvents();

    return { events: events.slice(0, LANDING_EVENTS), gallery };
};
