<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();

    // Una griglia fissa con le ultime foto, senza scorrimento: le altre sono su Instagram.
    const SHOWN = 6;
    const shown = $derived(slides?.slice(0, SHOWN) ?? []);
</script>

<section>
    <h2>Momenti in musica</h2>
    {#if slides === null}
        <p>La galleria non è al momento disponibile. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else if shown.length > 0}
        <ul>
            {#each shown as slide (slide.id)}
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
                                sizes="(min-width: 64rem) 21rem, (min-width: 40rem) 33vw, 50vw"
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
     * Griglia fissa di foto: due colonne su telefono, tre da 40rem. Formato 4:5 come i post social
     * (docs/DESIGN.md), angoli quasi vivi, nessuna cornice.
     */
    ul {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-4);
        padding: 0;
        list-style: none;
    }

    @media (min-width: 40rem) {
        ul {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    li {
        margin: 0;
        border-radius: var(--radius);
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
