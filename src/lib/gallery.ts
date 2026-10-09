export interface GallerySlide {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    thumbnailUrl?: string;
    imageUrl: string;
    srcset?: string; // le misure di Behold, perché il browser scelga la più adatta
    width?: number;
    height?: number;
    color?: string; // colore dominante, come fondo mentre la foto si carica
    permalink: string;
    alt: string;
}
