import type { BeholdFeedResponse, BeholdChildMedia, BeholdPost } from "$lib/types/behold";
import type { GallerySlide } from "$lib/gallery";

const INSTAGRAM_FEED_URL = "https://feeds.behold.so/1nxUxyt6x5qBVeEHpHNS";
const ALT_MAX_LENGTH = 140;

function toSlide(media: BeholdChildMedia, post: BeholdPost): GallerySlide {
    const caption = (post.prunedCaption ?? "").trim();
    const alt = caption.length > ALT_MAX_LENGTH ? `${caption.slice(0, ALT_MAX_LENGTH).trimEnd()}…` : caption;
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
