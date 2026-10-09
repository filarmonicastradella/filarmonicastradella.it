import { error } from "@sveltejs/kit";
import { fetchEvent } from "$lib/calendar";
import type { PageLoad } from "./$types";

// Le pagine degli eventi non esistono alla build: si costruiscono nel browser chiedendo l'evento a Google
// Calendar. Aperte da un link esterno le serve GitHub Pages con la pagina di riserva (404.html), da cui
// l'app parte e mostra l'evento.
export const prerender = false;
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
    const event = await fetchEvent(params.id).catch(() => error(503, "Non riusciamo a caricare il calendario in questo momento."));
    if (!event) error(404, "Evento non trovato: forse è già passato o è stato tolto dal calendario.");

    return { event };
};
