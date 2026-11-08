<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();

    // Le ultime tre foto, in riga come i prossimi eventi: le altre sono su Instagram.
    const SHOWN = 3;
    const shown = $derived(slides?.slice(0, SHOWN) ?? []);

    // Ogni foto occupa un terzo della colonna del contenuto (circa 12rem da 64rem in su, un terzo dello schermo
    // sotto) ed è ritagliata in 4:5: una foto orizzontale riempie l'altezza, quindi serve un file più largo della
    // casella, di quanto è più larga del 4:5. Senza questo il browser sceglie un file troppo piccolo e la foto si sgrana.
    const sizes = (slide: GallerySlide) => {
        const crop = slide.width && slide.height ? Math.max(1, (slide.width / slide.height) * (5 / 4)) : 1;
        return `(min-width: 64rem) ${Math.ceil(12 * crop)}rem, ${Math.ceil(34 * crop)}vw`;
    };
</script>

<!-- Senza foto (feed non raggiungibile o vuoto) la sezione non c'è: il link a Instagram resta nel piè di pagina -->
{#if shown.length > 0}
    <section>
        <h2>Momenti in musica</h2>
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
                                sizes={sizes(slide)}
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

        <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
    </section>
{/if}

<style>
    /*
     * Tre foto in riga a ogni larghezza, come la griglia di un profilo Instagram: nella colonna del contenuto
     * una foto per riga sarebbe enorme. Formato 4:5 come i post social (docs/DESIGN.md), angoli quasi vivi.
     */
    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-2);
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
