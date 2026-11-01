import { gallery } from "$lib/gallery";
import type { ServerLoad } from "@sveltejs/kit";

// `null` quando il feed di Instagram non è mai stato scaricato (scripts/instagram.mjs).
// Pagina disattivata: SvelteKit non genera i tipi di ./$types, quando si riattiva tornare a PageServerLoad da lì.
export const load: ServerLoad = () => ({ slides: gallery });
