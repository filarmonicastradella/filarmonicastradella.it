import type { Component } from "svelte";
import type { Picture } from "vite-imagetools";

interface EnsembleMetadata {
    title: string;
    summary: string;
    order: number;
    /** Le occasioni adatte alla formazione, mostrate nella sua pagina tra le domande frequenti */
    occasions: string[];
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

export const ensembles: Ensemble[] = Object.entries(modules)
    .map(([path, module]) => {
        const slug = path.split("/").pop()!.replace(/\.md$/, "");
        return { slug, ...module.metadata, component: module.default, coverImage: coverImage(slug) };
    })
    .sort((a, b) => a.order - b.order);
