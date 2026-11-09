import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { getEvents } from "$lib/server/calendar";
import { ensembles } from "$lib/ensembles";
import { activeCategories, articles } from "$lib/articles";
import { organization } from "$lib/organization";
import type { RequestHandler } from "./$types";

export const prerender = true;

// Pagine che non vanno nella mappa: conferme di invio e pagine con parametri (aggiunte sotto)
const EXCLUDED = /\/grazie(\/|$)|\[/;

// Le pagine con il loro file: i gruppi tra parentesi, come (elenco), non fanno parte dell'indirizzo
const pageFiles = new Map(
    Object.keys(import.meta.glob("/src/routes/**/+page.svelte"))
        .map((file) => [file.replace("/src/routes", "").replace(/\/\([^/]+\)/g, "").replace(/\/?\+page\.svelte$/, "") || "/", file.slice(1)] as const)
        .filter(([path]) => !EXCLUDED.test(path))
);

/*
 * L'ultima modifica di ogni file, dalla storia di git (un solo comando per tutti): serve la storia intera, per questo la
 * GitHub Action fa il checkout con fetch-depth: 0. Senza git (o fuori dal repository) le pagine restano senza data.
 */
function gitDates() {
    const dates = new Map<string, string>();
    try {
        let date = "";
        for (const line of execSync("git log --format=@%cI --name-only", { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).split("\n")) {
            if (line.startsWith("@")) date = line.slice(1);
            else if (line && !dates.has(line)) dates.set(line, date);
        }
    } catch {
        console.warn("Sitemap: git non disponibile, pagine senza data di modifica");
    }
    return dates;
}

// La più recente di più date (ISO, anche con orari e fusi diversi); undefined se non ce n'è nessuna
const latest = (...dates: (string | undefined)[]) =>
    dates.filter((date): date is string => !!date).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

/*
 * La data di ultima modifica (lastmod) di ogni indirizzo, perché Google rilegga prima le pagine nuove o cambiate (dal 9/11/2026):
 * gli eventi dalla modifica su Google Calendar; le pagine, le formazioni e gli articoli dall'ultimo commit del loro file
 * (gli articoli almeno dalla data di pubblicazione); gli elenchi dalla più recente tra il loro file e quello che elencano.
 */
export const GET: RequestHandler = async () => {
    const events = await getEvents(); // anche i passati: le loro pagine restano online
    const git = gitDates();
    const lastmod = new Map<string, string | undefined>();

    for (const [path, file] of pageFiles) lastmod.set(path, git.get(file));

    const eventDates = events.map(({ updated }) => updated);
    for (const { id, updated } of events) lastmod.set(`/calendario/${id}`, updated);

    const ownArticles = articles.filter(({ publisher }) => !publisher);
    for (const { href, date, category, slug } of ownArticles) {
        const file = [`src/lib/content/articles/${date}-${slug}.md`, `src/routes/articoli/${category}/${slug}/+page.svelte`].find(existsSync);
        lastmod.set(href!, latest(date, file && git.get(file)));
    }
    // Gli elenchi degli articoli anche con quelli dei giornali, che vi compaiono con la loro data
    const articleDate = (list: typeof articles) => latest(...list.map(({ href, date }) => (href && lastmod.get(href)) || date));
    lastmod.set("/articoli", latest(lastmod.get("/articoli"), articleDate(articles)));
    for (const { slug } of activeCategories) {
        lastmod.set(`/articoli/${slug}`, latest(git.get("src/routes/articoli/(elenco)/[category]/+page.svelte"), articleDate(articles.filter(({ category }) => category === slug))));
    }

    for (const { slug } of ensembles) {
        const playing = events.filter(({ ensembles }) => ensembles.some((ensemble) => ensemble.slug === slug)).map(({ updated }) => updated);
        lastmod.set(`/formazioni/${slug}`, latest(git.get(`src/lib/content/ensembles/${slug}.md`), git.get("src/routes/formazioni/[slug]/+page.svelte"), ...playing));
    }

    for (const path of ["/", "/calendario", "/calendario/archivio"]) lastmod.set(path, latest(lastmod.get(path), ...eventDates));
    lastmod.set("/", latest(lastmod.get("/"), articleDate(articles)));

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...lastmod.keys()]
    .sort()
    .map((path) => {
        const date = lastmod.get(path);
        return `    <url><loc>${organization.url}${path}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`;
    })
    .join("\n")}
</urlset>
`;

    return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
