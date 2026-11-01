import type { Component } from "svelte";
import { press } from "$lib/press";

// Categorie degli articoli, nell'ordine dell'indice: lo slug è il segmento dell'indirizzo (/articoli/storia)
export const categories = [
    { slug: "storia", name: "Storia", description: "Ricerche e documenti sulla storia della musica a Fivizzano e della Filarmonica, dall'Accademia dei Dissonanti a oggi." },
    { slug: "didattica", name: "Didattica", description: "Guide per chi studia uno strumento o comincia a suonare." },
    { slug: "teoria", name: "Teoria musicale", description: "Le basi della musica, spiegate semplici." },
    { slug: "obiettivi", name: "Obiettivi", description: "La nostra missione, i traguardi raggiunti e i progetti e le idee per arrivarci." },
    { slug: "notizie", name: "Notizie", description: "Avvisi dell'associazione, iscrizioni e appuntamenti." },
    // Gli articoli dei giornali (press.ts), con il link alla testata: fino al 1/11/2026 erano la Rassegna stampa in /associazione/press
    { slug: "stampa", name: "Stampa", description: "Gli articoli dei giornali sulla Filarmonica, con il link alla testata." }
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
    // Le formazioni di cui parla, con l'hashtag degli eventi senza il cancelletto (stradellafacendo): l'articolo
    // compare anche nella pagina della formazione
    ensembles?: string[];
}

export interface Article extends ArticleMetadata {
    slug?: string;
    // Il link all'articolo: una nostra pagina, o il sito del giornale; senza, un articolo di giornale solo su carta
    href?: string;
    // Solo per gli articoli dei giornali: la testata
    publisher?: string;
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

// Articoli con una pagina propria in src/routes/articoli/<categoria>/<slug>: qui solo i dati per indici e intestazioni
const pageArticles: (ArticleMetadata & { slug: string })[] = [
    {
        slug: "missione",
        category: "obiettivi",
        author: "Leonardo Orietti Del Duca",
        title: "La nostra missione",
        date: "2026-09-28",
        excerpt:
            "La Filarmonica Alessandro Stradella suona a Fivizzano dal 1777. Siamo un'associazione di musicisti volontari, ragazzi e adulti insieme, che fa musica per chi la suona e per il proprio territorio."
    },
    {
        slug: "filarmonica",
        category: "storia",
        author: "Leonardo Orietti Del Duca",
        title: "Storia della Filarmonica",
        date: "2026-09-28",
        excerpt: "Dal 1777 a oggi: quasi due secoli e mezzo di musica a Fivizzano."
    },
    {
        slug: "sonetto",
        category: "storia",
        author: "Leonardo Orietti Del Duca",
        title: "Sonetto per Santa Cecilia, 1789",
        date: "2026-10-10",
        excerpt: "Un foglio a stampa degli Accademici Dissonanti di Fivizzano, per la festa della patrona dei musicisti."
    },
    {
        slug: "stradella",
        category: "storia",
        author: "Leonardo Orietti Del Duca",
        title: "Alessandro Stradella",
        date: "2026-10-19",
        excerpt: "Il compositore del Seicento che dà il nome alla Filarmonica, e la sua famiglia di Fivizzano."
    }
];

// I nostri articoli e quelli dei giornali in un solo archivio, dal più recente. Dei giornali solo titolo, sommario e
// link: il testo intero si legge sul loro sito (diritto d'autore)
export const articles: Article[] = [
    ...[...markdownArticles, ...pageArticles]
        .filter(({ draft }) => !draft)
        .map((article) => ({ ...article, href: `/articoli/${article.category}/${article.slug}` })),
    ...press.map((item) => ({ ...item, category: "stampa" as const }))
].sort((a, b) => b.date.localeCompare(a.date));

// Una chiave per gli elenchi: il link, o per le uscite solo su carta testata e titolo
export const articleKey = (article: Article) => article.href ?? `${article.publisher} ${article.title}`;

// Solo le categorie con almeno un articolo: le altre non hanno pagina né link
export const activeCategories = categories.filter(({ slug }) => articles.some(({ category }) => category === slug));

export const categoryName = (slug: CategorySlug) => categories.find((category) => category.slug === slug)!.name;

export const findArticle = (category: string, slug: string) =>
    articles.find((article) => article.category === category && article.slug === slug);

export const formatArticleDate = (date: string) =>
    new Date(date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });
