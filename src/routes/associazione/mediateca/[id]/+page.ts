import { error } from "@sveltejs/kit";
import { galleryPosts } from "$lib/gallery";
import type { EntryGenerator, PageLoad } from "./$types";

// Una pagina per ogni foto e video di Foto e video, generata alla build: l'indirizzo che si condivide
export const entries: EntryGenerator = () => galleryPosts.flatMap(({ slides }) => slides.map(({ id }) => ({ id })));

export const load: PageLoad = ({ params }) => {
    const post = galleryPosts.find(({ slides }) => slides.some(({ id }) => id === params.id));
    if (!post) error(404, "Foto non trovata");
    const index = post.slides.findIndex(({ id }) => id === params.id);
    return { post, index };
};
