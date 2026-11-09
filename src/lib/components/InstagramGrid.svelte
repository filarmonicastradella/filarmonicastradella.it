<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // La griglia delle foto e dei video di Instagram, per la galleria in home e per Foto e video. Con `featured` (la home) la prima
    // foto è grande e le altre piccole intorno, in tre composizioni secondo la larghezza (nello stile, sotto).
    // `placeholders`: caselle segnaposto dopo le foto, finché non ce ne sono abbastanza per riempire la griglia.
    // `link`: dove porta ogni casella, foto o video (la home porta al post in Foto e video); senza, le foto aprono il post su Instagram
    // e i video si guardano lì, con il player del browser
    let {
        slides,
        featured = false,
        placeholders = 0,
        link
    }: { slides: GallerySlide[]; featured?: boolean; placeholders?: number; link?: (slide: GallerySlide) => string } = $props();

    // Le foto sono ritagliate in 4:5 (la grande alla misura del suo riquadro): una foto orizzontale riempie l'altezza, quindi serve un
    // file più largo della casella, di quanto è più larga. Senza questo il browser sceglie un file troppo piccolo e la foto si sgrana.
    // Senza featured: un quarto del contenitore da 64rem (circa 16rem), metà dello schermo sotto. Nella home (featured): da 64rem la
    // grande circa 27rem per 29 e le piccole circa 12rem; da 40rem la grande metà dello schermo e le piccole un quarto; sotto, la
    // grande tutto lo schermo e le piccole un terzo.
    const sizes = (slide: GallerySlide, index: number) => {
        const ratio = slide.width && slide.height ? slide.width / slide.height : 4 / 5;
        const crop = Math.max(1, ratio * (5 / 4));
        if (!featured) return `(min-width: 64rem) ${Math.ceil(16 * crop)}rem, ${Math.ceil(50 * crop)}vw`;
        // Sul telefono la grande è in 4:3: una foto più larga riempie l'altezza
        const [wide, middle, narrow] =
            index === 0 ? [Math.max(27, 29 * ratio), 50 * crop, 100 * Math.max(1, ratio * (3 / 4))] : [12 * crop, 25 * crop, 34 * crop];
        return `(min-width: 64rem) ${Math.ceil(wide)}rem, (min-width: 40rem) ${Math.ceil(middle)}vw, ${Math.ceil(narrow)}vw`;
    };
</script>

<ul data-featured={featured || undefined}>
    {#each slides as slide, index (slide.id)}
        <!-- Il colore dominante della foto fa da fondo finché l'immagine non arriva -->
        <!-- Nella figura, la griglia ha il titolo sopra e tutta la larghezza, come le schede (layout.css) -->
        <li style:background-color={slide.color}>
            <figure>
                {#if link}
                    <!-- Anche il video è un'immagine, il suo fotogramma di copertina: si guarda nella pagina dove porta il link -->
                    <a href={link(slide)}>
                        <img
                            src={slide.imageUrl}
                            srcset={slide.srcset}
                            sizes={sizes(slide, index)}
                            width={slide.width}
                            height={slide.height}
                            alt={slide.mediaType === "VIDEO" ? `Video: ${slide.alt}` : slide.alt}
                            loading="lazy"
                        />
                    </a>
                {:else if slide.mediaType === "VIDEO"}
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
                            sizes={sizes(slide, index)}
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
    <!-- SEGNAPOSTO: le caselle vuote della griglia, finché su Instagram non ci sono abbastanza post con #filarmonicastradella -->
    {#each { length: placeholders }, i (i)}
        <li>
            <figure>
                <p>[Foto da Instagram]</p>
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

    /* Il segnaposto: una casella 4:5 come le foto, sul fondo rialzato, con la scritta tra parentesi quadre */
    figure:has(> p) {
        display: grid;
        place-items: center;
        block-size: 100%;
        aspect-ratio: 4 / 5;
        background-color: var(--bg-raised);
        color: var(--text-muted);
        font-size: var(--fs-small);
    }

    /*
     * Nella home (featured) la foto più recente comanda e le altre fanno da contorno, a ogni larghezza (le caselle in più, foto o
     * segnaposto, si nascondono):
     * - sul telefono la grande a tutta larghezza, in 4:3 (le foto sono quasi tutte orizzontali, e in 4:5 sarebbe troppo alta), e
     *   sotto tre piccole in una riga, in 4:5 (quattro foto);
     * - da 40rem la grande a sinistra, larga metà e alta due righe, e a destra quattro piccole in due righe da due (cinque foto);
     * - da 64rem la griglia segue le due colonne delle sezioni (layout.css): la grande nella prima colonna, alta due righe, e nella
     *   seconda, larga quanto la colonna di testo, sei piccole su due righe (sette foto). Le righe hanno l'altezza delle piccole in
     *   4:5, così la grande non cambia misura.
     */
    [data-featured] {
        grid-template-columns: repeat(3, minmax(0, 1fr));

        & > li:first-child {
            grid-column: 1 / -1;
        }

        & > li:first-child :is(img, video, figure:has(> p)) {
            aspect-ratio: 4 / 3;
        }

        & > li:nth-child(n + 5) {
            display: none;
        }
    }

    @media (min-width: 40rem) {
        [data-featured] {
            grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr));

            & > li:nth-child(5) {
                display: block;
            }

            /* La grande: alta due righe, a fianco delle piccole */
            & > li:first-child {
                grid-column: auto;
                grid-row: span 2;
            }

            & > li:first-child :is(figure, a, img, video) {
                block-size: 100%;
            }

            & > li:first-child :is(img, video, figure:has(> p)) {
                aspect-ratio: auto;
            }
        }
    }

    @media (min-width: 64rem) {
        [data-featured] {
            --small: calc((var(--container-text) - 2 * var(--space-2)) / 3);
            grid-template-columns: minmax(0, 1fr) repeat(3, var(--small));
            grid-template-rows: repeat(2, calc(var(--small) * 5 / 4));

            & > li:nth-child(-n + 7) {
                display: block;
            }

            /* La grande: lo stacco tra le colonne delle sezioni, non quello tra le foto */
            & > li:first-child {
                margin-inline-end: calc(var(--space-6) - var(--space-2));
            }
        }
    }
</style>
