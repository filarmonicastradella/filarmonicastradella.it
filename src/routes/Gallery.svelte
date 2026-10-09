<script lang="ts">
    import { dragScroll } from "$lib/attachments";
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();
</script>

<section>
    <h2>Momenti in musica</h2>
    {#if slides === null}
        <p>La galleria non è al momento disponibile. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else if slides.length > 0}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul tabindex="0" aria-label="Galleria di foto e video" {@attach dragScroll}>
            {#each slides as slide (slide.id)}
                <!-- Il colore dominante della foto fa da fondo finché l'immagine non arriva -->
                <li style:background-color={slide.color}>
                    {#if slide.mediaType === "VIDEO"}
                        <!-- Mai in riproduzione automatica (docs/DESIGN.md, Movimento) -->
                        <!-- svelte-ignore a11y_media_has_caption -->
                        <video
                            src={slide.mediaUrl}
                            poster={slide.thumbnailUrl}
                            width={slide.width}
                            height={slide.height}
                            aria-label={slide.alt}
                            controls
                            preload="none"
                            playsinline
                        >
                            <a href={slide.mediaUrl}>Scarica il video</a>
                        </video>
                    {:else}
                        <a href={slide.permalink} target="_blank" rel="noopener noreferrer">
                            <img
                                src={slide.imageUrl}
                                srcset={slide.srcset}
                                sizes="(min-width: 30rem) 18rem, 60vw"
                                width={slide.width}
                                height={slide.height}
                                alt={slide.alt}
                                loading="lazy"
                            />
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}

    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
</section>

<style>
    /*
     * Striscia orizzontale di foto e video: si scorre con la rotella, il dito, la tastiera (la lista
     * riceve il focus) o trascinando con il mouse (dragScroll). Formato 4:5 come i post social
     * (docs/DESIGN.md), angoli quasi vivi, nessuna cornice.
     */
    ul {
        display: flex;
        align-items: start;
        gap: var(--space-4);
        padding: 0 0 var(--space-4);
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: thin;
        scrollbar-color: var(--border) transparent;
        list-style: none;
        cursor: grab;
    }

    ul:active {
        cursor: grabbing;
    }

    /* Lo scorrimento si ferma con una foto al centro */
    li {
        flex: none;
        inline-size: clamp(13rem, 60vw, 18rem);
        margin: 0;
        border-radius: var(--radius);
        scroll-snap-align: center;
    }

    a:has(img) {
        display: block;
    }

    img,
    video {
        inline-size: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
    }
</style>
