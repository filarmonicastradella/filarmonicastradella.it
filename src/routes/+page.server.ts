import { fetchGallery } from "$lib/server/gallery";
import type { PageServerLoad } from "./$types";

// La galleria si legge alla build ed è accessoria: se il feed non risponde, la pagina mostra un avviso.
// Gli eventi invece si caricano nel browser (UpcomingEvents.svelte).
export const load: PageServerLoad = async () => ({
    gallery: await fetchGallery().catch((error) => {
        console.warn("Galleria Instagram non disponibile:", error);
        return null;
    })
});
