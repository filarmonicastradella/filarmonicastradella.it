import type { BeholdFeedResponse, BeholdChildMedia, BeholdPost } from "$lib/types/behold";
import type { GallerySlide } from "$lib/gallery";

const INSTAGRAM_FEED_URL = "https://feeds.behold.so/1nxUxyt6x5qBVeEHpHNS";
const ALT_MAX_LENGTH = 140;

function toSlide(media: BeholdChildMedia, post: BeholdPost): GallerySlide {
    // Il testo alternativo è la prima frase della didascalia del post (di solito dice che cosa mostra la foto),
    // tagliata a una parola intera se è troppo lunga.
    const caption = (post.prunedCaption ?? "").trim();
    const firstSentence = caption.split(/(?<=[.!?])\s/)[0];
    const alt = firstSentence.length > ALT_MAX_LENGTH ? `${firstSentence.slice(0, ALT_MAX_LENGTH).replace(/\s+\S*$/, "")}…` : firstSentence;
    const sizes = media.sizes ? [media.sizes.small, media.sizes.medium, media.sizes.large] : [];
    const dominant = media.colorPalette?.dominant;

    return {
        id: media.id,
        mediaType: media.mediaType,
        mediaUrl: media.mediaUrl,
        thumbnailUrl: media.thumbnailUrl,
        imageUrl: media.sizes?.large?.mediaUrl ?? media.sizes?.medium?.mediaUrl ?? media.mediaUrl,
        srcset: sizes.length ? sizes.map((size) => `${size.mediaUrl} ${size.width}w`).join(", ") : undefined,
        width: media.sizes?.large?.width,
        height: media.sizes?.large?.height,
        color: dominant ? `rgb(${dominant.replaceAll(",", " ")})` : undefined,
        permalink: post.permalink,
        alt: alt || "Foto dal profilo Instagram della Filarmonica"
    };
}

export async function fetchGallery(): Promise<GallerySlide[]> {
    const res = await fetch(INSTAGRAM_FEED_URL);
    if (!res.ok) throw new Error(`Behold feed: ${res.status}`);
    const data = (await res.json()) as BeholdFeedResponse;

    // Il feed manda solo i post con #filarmonicastradella (filtro impostato su Behold).
    // Tutte le foto degli album, una voce ciascuna.
    return (data.posts ?? []).flatMap((post) =>
        post.children && post.children.length > 0 ? post.children.map((child) => toSlide(child, post)) : [toSlide(post, post)]
    );
}
