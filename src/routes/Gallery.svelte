<script lang="ts">
    import { dragScroll, scaleByDistance } from "$lib/attachments";
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();
</script>

<section>
    <h2>Momenti in musica</h2>
    {#if slides === null}
        <p>La galleria non è al momento disponibile. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul tabindex="0" aria-label="Galleria di foto e video" {@attach dragScroll} {@attach scaleByDistance}>
            {#each slides as slide (slide.id)}
                <li>
                    {#if slide.mediaType === "VIDEO"}
                        <figure>
                            <!-- svelte-ignore a11y_media_has_caption -->
                            <video src={slide.mediaUrl} poster={slide.thumbnailUrl} controls preload="none" playsinline>
                                <a href={slide.mediaUrl}>Scarica il video</a>
                            </video>
                            <figcaption>
                                <a href={slide.permalink} target="_blank" rel="noopener noreferrer">{slide.alt} (Instagram)</a>
                            </figcaption>
                        </figure>
                    {:else}
                        <a href={slide.permalink} target="_blank" rel="noopener noreferrer">
                            <img src={slide.imageUrl} alt={slide.alt} loading="lazy" />
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

    /* Centrate, come il rimpicciolimento di scaleByDistance, che parte dal centro della striscia */
    li {
        flex: none;
        inline-size: clamp(13rem, 60vw, 18rem);
        margin: 0;
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
        border-radius: var(--radius);
        background-color: var(--bg-raised);
    }

    /* La didascalia dei video è il testo del post: al massimo due righe */
    figcaption {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
    }
</style>
