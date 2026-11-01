import { getUpcomingEvents } from "$lib/server/calendar";
import { ensembles } from "$lib/ensembles";
import { activeCategories, articles } from "$lib/articles";
import { organization } from "$lib/organization";
import type { RequestHandler } from "./$types";

export const prerender = true;


// Pagine che non vanno nella mappa: conferme di invio, pagine con parametri (aggiunte sotto) e vecchi indirizzi
// che rimandano agli articoli.
const EXCLUDED = /\/thanks$|\[|^\/about\/(sonnet|stradella|history|ensembles\/infieri)$|^\/(support\/join|booking|legal\/consents)$/;

const pages = Object.keys(import.meta.glob("/src/routes/**/+page.svelte"))
    .map((file) => file.replace("/src/routes", "").replace(/\/?\+page\.svelte$/, "") || "/")
    .filter((path) => !EXCLUDED.test(path));

export const GET: RequestHandler = async () => {
    const events = await getUpcomingEvents();

    const paths = [
        ...pages,
        ...ensembles.map(({ slug }) => `/about/ensembles/${slug}`),
        ...activeCategories.map(({ slug }) => `/articles/${slug}`),
        ...articles.map(({ href }) => href),
        ...events.map(({ id }) => `/events/${id}`)
    ];

    // Data di pubblicazione degli articoli, l'unica data affidabile: le altre pagine restano senza
    const lastmod = new Map(articles.map(({ href, date }) => [href, date]));

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paths)].sort().map((path) => `    <url><loc>${organization.url}${path === "/" ? "/" : path}</loc>${lastmod.has(path) ? `<lastmod>${lastmod.get(path)}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;

    return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
