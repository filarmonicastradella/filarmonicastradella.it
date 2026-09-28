import type { BeholdFeedResponse, BeholdChildMedia, BeholdPost } from "$lib/types/behold";

const INSTAGRAM_FEED_URL = "https://feeds.behold.so/1nxUxyt6x5qBVeEHpHNS";
const ALT_MAX_LENGTH = 140;

export interface GallerySlide {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    thumbnailUrl?: string;
    imageUrl: string;
    permalink: string;
    alt: string;
}

function toSlide(media: BeholdChildMedia, post: BeholdPost): GallerySlide {
    const caption = (post.prunedCaption ?? "").trim();
    const alt = caption.length > ALT_MAX_LENGTH ? `${caption.slice(0, ALT_MAX_LENGTH).trimEnd()}…` : caption;

    return {
        id: media.id,
        mediaType: media.mediaType,
        mediaUrl: media.mediaUrl,
        thumbnailUrl: media.thumbnailUrl,
        imageUrl: media.sizes?.large?.mediaUrl ?? media.sizes?.medium?.mediaUrl ?? media.mediaUrl,
        permalink: post.permalink,
        alt: alt || "Foto dal profilo Instagram della Filarmonica"
    };
}

export async function fetchGallery(fetchFn: typeof fetch = fetch): Promise<GallerySlide[]> {
    const res = await fetchFn(INSTAGRAM_FEED_URL);
    if (!res.ok) throw new Error(`Behold feed: ${res.status}`);
    const data = (await res.json()) as BeholdFeedResponse;

    return (data.posts ?? []).flatMap((post) =>
        post.children && post.children.length > 0
            ? post.children.map((child) => toSlide(child, post))
            : [toSlide(post, post)]
    );
}
