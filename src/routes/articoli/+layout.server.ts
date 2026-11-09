import { articleModified } from "$lib/server/git";
import type { LayoutServerLoad } from "./$types";

// La data dell'ultima modifica di ogni articolo, per i microdati (dateModified in ArticleHeader)
export const load: LayoutServerLoad = () => ({ articleModified: articleModified() });
