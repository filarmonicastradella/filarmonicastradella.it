import { getUpcomingEvents } from "$lib/server/calendar";
import { ensembles } from "$lib/ensembles";
import { news } from "$lib/news";
import type { RequestHandler } from "./$types";

export const prerender = true;

const SITE = "https://filarmonicastradella.it";

// Pagine che non vanno nella mappa: conferme di invio e pagine con parametri (aggiunte sotto).
const EXCLUDED = /\/thanks$|\[/;

const pages = Object.keys(import.meta.glob("/src/routes/**/+page.svelte"))
    .map((file) => file.replace("/src/routes", "").replace(/\/?\+page\.svelte$/, "") || "/")
    .filter((path) => !EXCLUDED.test(path));

export const GET: RequestHandler = async () => {
    const events = await getUpcomingEvents();

    const paths = [
        ...pages,
        ...ensembles.map(({ slug }) => `/about/ensembles/${slug}`),
        ...news.map(({ slug }) => `/news/${slug}`),
        ...events.map(({ id }) => `/events/${id}`)
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paths)].sort().map((path) => `    <url><loc>${SITE}${path === "/" ? "/" : path}</loc></url>`).join("\n")}
</urlset>
`;

    return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
