import type { Handle } from "@sveltejs/kit";
import { categories } from "$lib/articles";
import { organization, titleSuffix } from "$lib/organization";

// Anteprime dei link (Open Graph): titolo e descrizione sono quelli che ogni pagina ha già (<title> e meta description),
// copiati alla build nei tag og:, così non vanno scritti due volte in ogni pagina.
const escapeAttribute = (text: string) => text.trim().replace(/"/g, "&quot;");

const plainText = (html: string) =>
    html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();

// Nomi delle pagine per il percorso di navigazione: il <title> scritto in ogni pagina, senza il nome della Filarmonica.
// Le pagine con il titolo calcolato (categorie degli articoli) prendono il nome dai dati.
const pageSources = import.meta.glob<string>("/src/routes/**/+page.svelte", { query: "?raw", import: "default", eager: true });
const pageNames = new Map<string, string>(
    Object.entries(pageSources).flatMap(([file, source]) => {
        const title = source.match(/<title>([^<{]*?)<\/title>/)?.[1];
        if (!title || file.includes("[")) return [];
        const path = file.replace("/src/routes", "").replace("/+page.svelte", "") || "/";
        return [[path, title.split(" — ")[0].trim()]];
    })
);
for (const { slug, name } of categories) pageNames.set(`/articles/${slug}`, name);

// Tipo della pagina per i motori di ricerca, dove dice qualcosa in più di una pagina qualunque
const pageTypes: Record<string, string> = { "/about": "AboutPage", "/contacts": "ContactPage" };

// Percorso di navigazione (BreadcrumbList): la home, le pagine di livello superiore che esistono, la pagina stessa
function breadcrumb(path: string, title: string) {
    const segments = path.split("/").filter(Boolean);
    const ancestors = segments
        .slice(0, -1)
        .map((_, index) => "/" + segments.slice(0, index + 1).join("/"))
        .filter((ancestor) => pageNames.has(ancestor));
    const items = [
        { name: "Home", path: "/" },
        ...ancestors.map((ancestor) => ({ name: pageNames.get(ancestor)!, path: ancestor })),
        { name: title, path }
    ];
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map(({ name, path: itemPath }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
            item: organization.url + (itemPath === "/" ? "" : itemPath)
        }))
    };
}

// Le domande frequenti della pagina (la sezione "Domande frequenti", con le risposte in <details>)
function faqQuestions(html: string) {
    const start = html.indexOf(">Domande frequenti</h2>");
    if (start === -1) return [];
    const end = html.indexOf("</section>", start);
    if (end === -1) return [];
    const section = html.slice(start, end);
    return [...section.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(([, question, answer]) => ({
        "@type": "Question",
        name: plainText(question),
        acceptedAnswer: { "@type": "Answer", text: plainText(answer) }
    }));
}

export const handle: Handle = ({ event, resolve }) =>
    resolve(event, {
        transformPageChunk: ({ html }) => {
            if (!html.includes("</head>")) return html;
            const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
            const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
            const tags = [
                title && `<meta property="og:title" content="${escapeAttribute(title)}">`,
                description && `<meta property="og:description" content="${description}">`
            ].filter(Boolean);

            // Anteprima con la foto di copertina della pagina, dove c'è (la foto nell'intestazione), invece dell'immagine comune
            const main = html.indexOf("<main");
            const header = main === -1 ? "" : html.slice(main, html.indexOf("</header>", main));
            const cover = header.match(/<img [^>]*>/)?.[0];
            if (cover) {
                const attribute = (name: string) => cover.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
                const src = attribute("src");
                if (src) {
                    html = html
                        .replace(/(<meta property="og:image" content=")[^"]*/, `$1${organization.url}${src}`)
                        .replace(/(<meta property="og:image:width" content=")[^"]*/, `$1${attribute("width") ?? ""}`)
                        .replace(/(<meta property="og:image:height" content=")[^"]*/, `$1${attribute("height") ?? ""}`)
                        .replace(/(<meta property="og:image:alt" content=")[^"]*/, `$1${attribute("alt") ?? ""}`);
                }
            }

            // Dati strutturati comuni: tipo di pagina, percorso di navigazione e domande frequenti (JSON-LD). La home ha i suoi.
            const path = event.url.pathname.replace(/\/$/, "") || "/";
            if (title && path !== "/") {
                const questions = faqQuestions(html);
                const types = [pageTypes[path] ?? "WebPage", ...(questions.length ? ["FAQPage"] : [])];
                const name = plainText(title.split(titleSuffix)[0]);
                const data = {
                    "@context": "https://schema.org",
                    "@type": types.length === 1 ? types[0] : types,
                    name,
                    url: organization.url + path,
                    breadcrumb: breadcrumb(path, name),
                    ...(questions.length && { mainEntity: questions })
                };
                tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
            }
            return html.replace("</head>", `${tags.join("\n\t\t")}\n\t</head>`);
        }
    });
