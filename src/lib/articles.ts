import type { Component } from "svelte";

// Categorie degli articoli, nell'ordine dell'indice: lo slug è il segmento dell'indirizzo (/articles/history)
export const categories = [
    { slug: "history", name: "Storia", description: "Ricerche e documenti sulla storia della musica a Fivizzano e della Filarmonica, dall'Accademia dei Dissonanti a oggi." },
    { slug: "teaching", name: "Didattica", description: "Guide per chi studia uno strumento o comincia a suonare." },
    { slug: "theory", name: "Teoria musicale", description: "Le basi della musica, spiegate semplici." },
    { slug: "life", name: "Vita della Filarmonica", description: "Prove, concerti, trasferte e persone." },
    { slug: "news", name: "Notizie", description: "Avvisi dell'associazione, iscrizioni e appuntamenti." }
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

interface ArticleMetadata {
    title: string;
    date: string;
    excerpt: string;
    category: CategorySlug;
    // Chi l'ha scritto, nome e cognome; più autori separati da virgola
    author?: string;
    // Bozze: restano nel repository ma non vengono pubblicate
    draft?: boolean;
}

export interface Article extends ArticleMetadata {
    slug: string;
    href: string;
    // Solo per gli articoli in Markdown; quelli con una pagina propria (immagini, impaginazione) non ce l'hanno
    component?: Component;
}

// Articoli in Markdown: il nome del file è data e slug (2026-07-28-concerto-estate.md)
const modules = import.meta.glob<{ default: Component; metadata: ArticleMetadata }>("/src/lib/content/articles/*.md", {
    eager: true
});

const markdownArticles = Object.entries(modules).map(([path, module]) => ({
    slug: path.split("/").pop()!.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    ...module.metadata,
    component: module.default
}));

// Articoli con una pagina propria in src/routes/articles/<categoria>/<slug>: qui solo i dati per indici e intestazioni
const pageArticles: (ArticleMetadata & { slug: string })[] = [
    {
        slug: "sonnet",
        category: "history",
        author: "Leonardo Orietti Del Duca",
        title: "Sonetto per Santa Cecilia, 1789",
        date: "2026-10-10",
        excerpt: "Un foglio a stampa degli Accademici Dissonanti di Fivizzano, per la festa della patrona dei musicisti."
    },
    {
        slug: "stradella",
        category: "history",
        author: "Leonardo Orietti Del Duca",
        title: "Alessandro Stradella",
        date: "2026-10-19",
        excerpt: "Il compositore del Seicento che dà il nome alla Filarmonica, e la sua famiglia di Fivizzano."
    }
];

// Dal più recente
export const articles: Article[] = [...markdownArticles, ...pageArticles]
    .filter(({ draft }) => !draft)
    .map((article) => ({ ...article, href: `/articles/${article.category}/${article.slug}` }))
    .sort((a, b) => b.date.localeCompare(a.date));

// Solo le categorie con almeno un articolo: le altre non hanno pagina né link
export const activeCategories = categories.filter(({ slug }) => articles.some(({ category }) => category === slug));

export const categoryName = (slug: CategorySlug) => categories.find((category) => category.slug === slug)!.name;

export const findArticle = (category: string, slug: string) =>
    articles.find((article) => article.category === category && article.slug === slug);

export const formatArticleDate = (date: string) =>
    new Date(date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });
