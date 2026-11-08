<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // La griglia delle foto e dei video di Instagram, per la galleria in home e per Foto e video
    let { slides }: { slides: GallerySlide[] } = $props();

    // Ogni foto occupa un quarto del contenitore da 64rem in su (circa 16rem) e metà dello schermo sotto, ed è
    // ritagliata in 4:5: una foto orizzontale riempie l'altezza, quindi serve un file più largo della
    // casella, di quanto è più larga del 4:5. Senza questo il browser sceglie un file troppo piccolo e la foto si sgrana.
    const sizes = (slide: GallerySlide) => {
        const crop = slide.width && slide.height ? Math.max(1, (slide.width / slide.height) * (5 / 4)) : 1;
        return `(min-width: 64rem) ${Math.ceil(16 * crop)}rem, ${Math.ceil(50 * crop)}vw`;
    };
</script>

<ul>
    {#each slides as slide (slide.id)}
        <!-- Il colore dominante della foto fa da fondo finché l'immagine non arriva -->
        <!-- Nella figura, la griglia ha il titolo sopra e tutta la larghezza, come le schede (layout.css) -->
        <li style:background-color={slide.color}>
            <figure>
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
                            sizes={sizes(slide)}
                            width={slide.width}
                            height={slide.height}
                            alt={slide.alt}
                            loading="lazy"
                        />
                    </a>
                {/if}
            </figure>
        </li>
    {/each}
</ul>

<style>
    /*
     * Sotto il titolo, a tutta larghezza: due foto per riga su telefono, quattro per riga da 64rem in su,
     * come la griglia di un profilo Instagram. Formato 4:5 come i post social (docs/DESIGN.md), angoli quasi vivi.
     */
    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-2);
        padding: 0;
        list-style: none;
    }

    @media (min-width: 64rem) {
        ul {
            grid-template-columns: repeat(4, 1fr);
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
