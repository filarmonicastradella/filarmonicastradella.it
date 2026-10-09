<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();

    // Le ultime tre foto, in riga come i prossimi eventi: le altre sono su Instagram.
    const SHOWN = 3;
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
                                sizes="(min-width: 64rem) 20rem, (min-width: 40rem) 50vw, calc(100vw - 2rem)"
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
     * Tre foto in riga, con la stessa griglia dei prossimi eventi: una sotto l'altra su telefono, tre in
     * riga quando c'è spazio. Formato 4:5 come i post social (docs/DESIGN.md), angoli quasi vivi.
     */
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
        gap: var(--gap-grid);
        padding: 0;
        list-style: none;
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
