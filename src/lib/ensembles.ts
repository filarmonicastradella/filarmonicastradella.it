import type { Component } from "svelte";
import type { Picture } from "vite-imagetools";

interface EnsembleMetadata {
    title: string;
    summary: string;
    order: number;
    /** L'anno in cui la formazione è nata (foundingDate di MusicGroup) */
    founded?: number;
    /** La sede dove prova, tra le sedi operative di locations.ts (di base quella di Fivizzano) */
    seat?: string;
    /** I generi, per i motori di ricerca (genre di MusicGroup) */
    genre?: string[];
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
    /** La foto di copertina in più misure e la sua anteprima sfocata, se c'è il file; `crops`: ritagliata in 16:9, 4:3 e 1:1 per i microdati degli eventi */
    coverImage?: { picture: Picture; placeholder: string; crops: string[] };
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

/*
 * La copertina nelle tre proporzioni che Google consiglia per l'immagine di un evento (16:9, 4:3, 1:1; dal 13/11/2026), alte 600px: la
 * copertina più piccola (Orchestra Infieri) è alta 602px, e così nessuna si ingrandisce. Il ritaglio tiene la parte più interessante
 * della foto (`attention` di sharp). Anche l'anteprima del sito, per gli eventi senza formazione.
 */
const crops = [
    import.meta.glob<string>(["/src/lib/assets/imgs/ensembles/*.jpg", "/static/anteprima.jpg"], { eager: true, import: "default", query: "?h=600&aspect=16:9&fit=cover&position=attention&format=jpg" }),
    import.meta.glob<string>(["/src/lib/assets/imgs/ensembles/*.jpg", "/static/anteprima.jpg"], { eager: true, import: "default", query: "?h=600&aspect=4:3&fit=cover&position=attention&format=jpg" }),
    import.meta.glob<string>(["/src/lib/assets/imgs/ensembles/*.jpg", "/static/anteprima.jpg"], { eager: true, import: "default", query: "?h=600&aspect=1:1&fit=cover&position=attention&format=jpg" })
];
export const imageCrops = (path: string) => crops.map((sizes) => sizes[path]);

function coverImage(slug: string) {
    const path = `/src/lib/assets/imgs/ensembles/${slug}.jpg`;
    return coverPictures[path] ? { picture: coverPictures[path], placeholder: coverPlaceholders[path], crops: imageCrops(path) } : undefined;
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
