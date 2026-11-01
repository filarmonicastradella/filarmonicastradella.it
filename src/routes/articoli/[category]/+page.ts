import { error } from "@sveltejs/kit";
import { activeCategories, articles } from "$lib/articles";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => activeCategories.map(({ slug }) => ({ category: slug }));

export const load: PageLoad = ({ params }) => {
    const category = activeCategories.find(({ slug }) => slug === params.category);
    if (!category) error(404, "Categoria non trovata");
    return { category, articles: articles.filter((article) => article.category === category.slug) };
};
