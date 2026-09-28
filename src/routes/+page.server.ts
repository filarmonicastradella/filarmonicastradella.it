import { getUpcomingEvents } from "$lib/server/calendar";
import { fetchGallery } from "$lib/server/gallery";
import type { PageServerLoad } from "./$types";

const LANDING_EVENTS = 10;

export const load: PageServerLoad = async () => {
    // Se il calendario non risponde la build fallisce e resta online l'ultima versione buona.
    // La galleria invece è accessoria: se manca, la pagina mostra un avviso.
    const [events, gallery] = await Promise.all([
        getUpcomingEvents(),
        fetchGallery().catch((error) => {
            console.warn("Galleria Instagram non disponibile:", error);
            return null;
        })
    ]);

    return { events: events.slice(0, LANDING_EVENTS), gallery };
};
