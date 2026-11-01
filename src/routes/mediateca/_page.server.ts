import { gallery } from "$lib/gallery";
import type { PageServerLoad } from "./$types";

// `null` quando il feed di Instagram non è mai stato scaricato (scripts/instagram.mjs)
export const load: PageServerLoad = () => ({ slides: gallery });
