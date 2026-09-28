import { fetchGallery } from "$lib/server/gallery";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => ({
    // `null` quando il feed non era raggiungibile durante la build.
    slides: await fetchGallery().catch((error) => {
        console.warn("Galleria Instagram non disponibile:", error);
        return null;
    })
});
