import { error } from "@sveltejs/kit";
import { ensembles } from "$lib/ensembles";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => ensembles.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
    const ensemble = ensembles.find(({ slug }) => slug === params.slug);
    if (!ensemble) error(404, "Formazione non trovata");
    return { ensemble };
};
