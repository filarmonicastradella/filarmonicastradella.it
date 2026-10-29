export interface GallerySlide {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    thumbnailUrl?: string;
    imageUrl?: string;
    srcset?: string; // le misure scaricate, perché il browser scelga la più adatta
    width?: number;
    height?: number;
    color?: string; // colore dominante, come fondo mentre la foto si carica
    permalink: string;
    alt: string;
}

// Le foto di Instagram, scaricate prima della build da scripts/instagram.mjs; `null` se non è mai riuscito a
// leggere il feed (la galleria allora rimanda solo al profilo)
const data = import.meta.glob<{ slides: GallerySlide[] | null }>("/src/lib/content/instagram.json", { eager: true, import: "default" });

export const gallery: GallerySlide[] | null = Object.values(data)[0]?.slides ?? null;
