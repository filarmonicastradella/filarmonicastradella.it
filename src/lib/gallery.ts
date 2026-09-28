export interface GallerySlide {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    thumbnailUrl?: string;
    imageUrl: string;
    permalink: string;
    alt: string;
}
