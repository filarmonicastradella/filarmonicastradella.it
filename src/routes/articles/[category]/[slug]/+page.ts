import { error } from "@sveltejs/kit";
import { articles, findArticle } from "$lib/articles";
import type { EntryGenerator, PageLoad } from "./$types";

// Solo gli articoli in Markdown: quelli con una pagina propria hanno la loro route, che vince su questa
export const entries: EntryGenerator = () =>
    articles.filter(({ component }) => component).map(({ category, slug }) => ({ category, slug }));

export const load: PageLoad = ({ params }) => {
    const article = findArticle(params.category, params.slug);
    if (!article?.component) error(404, "Articolo non trovato");
    return { article };
};
