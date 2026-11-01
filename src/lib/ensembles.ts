import type { Component } from "svelte";
import type { Picture } from "vite-imagetools";

interface EnsembleMetadata {
    title: string;
    summary: string;
    order: number;
    /** L'organico: gli strumenti divisi per sezione (legni, ottoni, archi...) */
    lineup: { name: string; instruments: string[] }[];
    /** La foto di copertina (il file è in src/lib/assets/imgs/ensembles/, con lo slug come nome) */
    cover?: {
        alt: string;
        /** Chi l'ha scattata: chi ha i diritti, non mostrato in pagina */
        credit: string;
        /** Il punto da tenere quando la fascia taglia la foto (object-position), di base il centro */
        position?: string;
    };
}

export interface Ensemble extends EnsembleMetadata {
    slug: string;
    /** L'hashtag che lega un evento del calendario alla formazione: il nome tutto attaccato, «#streetellaband» */
    hashtag: string;
    component: Component;
    /** La foto di copertina in più misure e la sua anteprima sfocata, se c'è il file */
    coverImage?: { picture: Picture; placeholder: string };
}

const modules = import.meta.glob<{ default: Component; metadata: EnsembleMetadata }>("/src/lib/content/ensembles/*.md", {
    eager: true
});

const coverPictures = import.meta.glob<Picture>("/src/lib/assets/imgs/ensembles/*.jpg", {
    eager: true,
    import: "default",
    query: "?enhanced&w=400;640;800;1280;1600"
});
const coverPlaceholders = import.meta.glob<string>("/src/lib/assets/imgs/ensembles/*.jpg", {
    eager: true,
    import: "default",
    query: "?w=24&blur=2&format=webp&inline"
});

function coverImage(slug: string) {
    const path = `/src/lib/assets/imgs/ensembles/${slug}.jpg`;
    return coverPictures[path] ? { picture: coverPictures[path], placeholder: coverPlaceholders[path] } : undefined;
}

/** «Orchestra Infieri» → «#orchestrainfieri»: minuscole, senza spazi, accenti e segni */
export const ensembleHashtag = (name: string) =>
    "#" +
    name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-z0-9]/g, "");

export const ensembles: Ensemble[] = Object.entries(modules)
    .map(([path, module]) => {
        const slug = path.split("/").pop()!.replace(/\.md$/, "");
        return { slug, hashtag: ensembleHashtag(module.metadata.title), ...module.metadata, component: module.default, coverImage: coverImage(slug) };
    })
    .sort((a, b) => a.order - b.order);
