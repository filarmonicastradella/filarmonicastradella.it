import { error } from "@sveltejs/kit";
import { news } from "$lib/news";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => news.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
    const post = news.find(({ slug }) => slug === params.slug);
    if (!post) error(404, "Notizia non trovata");
    return { post };
};
