import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { articles } from "$lib/articles";

/*
 * L'ultima modifica di ogni file, dalla storia di git (un solo comando per tutti, letto una volta per build): serve la storia
 * intera, per questo la GitHub Action fa il checkout con fetch-depth: 0. Senza git (o fuori dal repository) nessuna data.
 */
let cache: Map<string, string> | undefined;

export function gitDates() {
    if (cache) return cache;
    cache = new Map();
    try {
        let date = "";
        for (const line of execSync("git log --format=@%cI --name-only", { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).split("\n")) {
            if (line.startsWith("@")) date = line.slice(1);
            else if (line && !cache.has(line)) cache.set(line, date);
        }
    } catch {
        console.warn("git non disponibile: pagine senza data di modifica");
    }
    return cache;
}

// La più recente di più date (ISO, anche con orari e fusi diversi); undefined se non ce n'è nessuna
export const latest = (...dates: (string | undefined)[]) =>
    dates.filter((date): date is string => !!date).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

/*
 * L'ultima modifica dei nostri articoli, per indirizzo: l'ultimo commit del loro file (il Markdown o la pagina Svelte), e
 * almeno la data di pubblicazione. La usano la sitemap (lastmod) e i microdati dell'articolo (dateModified).
 */
export function articleModified() {
    const git = gitDates();
    return Object.fromEntries(
        articles
            .filter(({ href, publisher }) => href && !publisher)
            .map(({ href, date, category, slug }) => {
                const file = [`src/lib/content/articles/${date}-${slug}.md`, `src/routes/articoli/${category}/${slug}/+page.svelte`].find(existsSync);
                return [href!, latest(date, file && git.get(file))!];
            })
    );
}
