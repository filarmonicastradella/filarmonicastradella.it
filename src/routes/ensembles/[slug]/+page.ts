import { error } from "@sveltejs/kit";
import { ensembles } from "$lib/ensembles";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => ensembles.map(({ slug }) => ({ slug }));

// Gli eventi della formazione arrivano da +page.server.ts; qui si aggiunge la formazione, che contiene il componente
// della presentazione e non può passare dal server.
export const load: PageLoad = ({ params, data }) => {
    const ensemble = ensembles.find(({ slug }) => slug === params.slug);
    if (!ensemble) error(404, "Ensemble non trovato");
    return { ...data, ensemble };
};
