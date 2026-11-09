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
    timestamp?: string; // data e didascalia del post da cui viene la foto
    caption?: string;
    alt: string;
}

export interface GalleryPost {
    permalink: string;
    anchor: string; // l'ancora del post in Foto e video, per arrivarci dalla galleria in home
    date: string; // AAAA-MM-GG, per <time datetime> e per le sezioni dei mesi
    paragraphs: string[]; // la didascalia, senza hashtag
    slides: GallerySlide[];
}

// Le foto di Instagram, scaricate prima della build da scripts/instagram.mjs; `null` se non è mai riuscito a
// leggere il feed (la galleria allora rimanda solo al profilo)
const data = import.meta.glob<{ slides: GallerySlide[] | null }>("/src/lib/content/instagram.json", { eager: true, import: "default" });

export const gallery: GallerySlide[] | null = Object.values(data)[0]?.slides ?? null;

// L'ancora di un post in Foto e video: il codice del post nell'indirizzo di Instagram (https://www.instagram.com/p/<codice>/)
export const postAnchor = (permalink: string) => `post-${permalink.split("/").filter(Boolean).pop()}`;

// Le foto raggruppate per post, dal più recente come su Instagram: ogni post ha la sua data e la sua didascalia, divisa in paragrafi
export const galleryPosts: GalleryPost[] = Object.values(Object.groupBy(gallery ?? [], ({ permalink }) => permalink))
    .filter((slides) => slides![0].timestamp)
    .map((slides) => {
        const [{ permalink, timestamp, caption = "" }] = slides!;
        return {
            permalink,
            anchor: postAnchor(permalink),
            date: timestamp!.slice(0, 10),
            paragraphs: caption
                .replace(/#\S+/g, "")
                .split(/\n\s*\n/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean),
            slides: slides!
        };
    });
