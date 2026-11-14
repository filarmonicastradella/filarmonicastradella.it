<script lang="ts">
    import PlayIcon from "~icons/heroicons/play-20-solid";
    import { slidePath, type GallerySlide } from "$lib/gallery";

    // La griglia delle foto e dei video di Instagram, per la galleria in home e per Foto e video. Con `featured` (la home) la prima
    // foto è grande e le altre piccole intorno, in tre composizioni secondo la larghezza (nello stile, sotto).
    // `placeholders`: caselle segnaposto dopo le foto, finché non ce ne sono abbastanza per riempire la griglia.
    // Ogni casella, foto o video, porta alla pagina della sua foto o del suo video (`slidePath`), anche dalla home (dal 13/11/2026;
    // prima la home portava al post in Foto e video)
    let { slides, featured = false, placeholders = 0 }: { slides: GallerySlide[]; featured?: boolean; placeholders?: number } = $props();

    // Le foto sono ritagliate in 4:5 (la grande alla misura del suo riquadro): una foto orizzontale riempie l'altezza, quindi serve un
    // file più largo della casella, di quanto è più larga. Senza questo il browser sceglie un file troppo piccolo e la foto si sgrana.
    // Senza featured (Foto e video, in 4:3): un quarto del contenitore da 64rem (circa 16rem), metà dello schermo sotto. Nella home (featured): da 64rem la
    // grande circa 27rem per 29 e le piccole circa 12rem; da 40rem la grande metà dello schermo e le piccole un quarto; sotto, la
    // grande tutto lo schermo e le piccole un terzo.
    const sizes = (slide: GallerySlide, index: number) => {
        const ratio = slide.width && slide.height ? slide.width / slide.height : 4 / 5;
        const crop = Math.max(1, ratio * (5 / 4));
        // Foto e video: la grande circa 27rem da 64rem (36rem se è sola) e tutto lo schermo sotto; le piccole fino a metà della colonna
        // di testo (18rem) da 64rem e metà dello schermo sotto. Una foto più larga del 4:3 riempie l'altezza.
        if (!featured) {
            const landscapeCrop = Math.max(1, ratio * (3 / 4));
            const [wide, narrow] = index === 0 ? [slides.length === 1 ? 36 : 27, 100] : [18, 50];
            return `(min-width: 64rem) ${Math.ceil(wide * landscapeCrop)}rem, ${Math.ceil(narrow * landscapeCrop)}vw`;
        }
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
                <!-- Il link porta alla pagina della foto o del video, dove il video si guarda -->
                <a href={slidePath(slide)}>
                    <img
                        src={slide.imageUrl}
                        srcset={slide.srcset}
                        sizes={sizes(slide, index)}
                        width={slide.width}
                        height={slide.height}
                        alt={slide.alt}
                        loading="lazy"
                    />
                    {#if slide.mediaType === "VIDEO"}
                        <span><PlayIcon aria-hidden="true" /> Video</span>
                    {/if}
                </a>
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
    /* Sotto il titolo, a tutta larghezza, angoli quasi vivi */
    ul {
        display: grid;
        gap: var(--space-2);
        padding: 0;
        list-style: none;
    }

    /*
     * Foto e video (senza featured): come nella home la prima foto comanda e le altre fanno da contorno, ma senza segnaposto: la griglia
     * si adatta al numero di foto del post. Le piccole stanno tre per riga su una griglia di sei colonne; nell'ultima riga, se ne resta
     * una prende tutta la riga, se ne restano due metà ciascuna, così non restano caselle vuote. Le righe delle piccole hanno
     * un'altezza fissa (quella di una piccola in 4:3), così le foto più larghe dell'ultima riga restano allineate.
     * - Sotto 64rem: la grande a tutta larghezza in 4:3, sotto le piccole (la riga si misura sulla larghezza della scheda, che è un
     *   contenitore: content.css).
     * - Da 64rem: la grande nella prima colonna delle sezioni, alta quanto tutte le righe delle piccole, e le piccole nella seconda,
     *   larga quanto la colonna di testo. Una foto sola sta nella seconda colonna, sotto la didascalia.
     */
    ul:not([data-featured]) {
        --row: calc((100cqi - 2 * var(--space-2)) / 3 * 3 / 4);
        grid-template-columns: repeat(6, minmax(0, 1fr));
        /* La prima riga è quella della grande, alta quanto la foto in 4:3; le altre hanno l'altezza delle piccole */
        grid-template-rows: auto;
        grid-auto-rows: var(--row);

        & > li {
            grid-column: span 2;
        }

        & > li:first-child {
            grid-column: 1 / -1;
            grid-row: auto;
        }

        & > li:nth-last-child(2):nth-child(3n + 2),
        & > li:last-child:nth-child(3n) {
            grid-column: span 3;
        }

        & > li:last-child:nth-child(3n + 2) {
            grid-column: 1 / -1;
        }

        /* Le piccole riempiono la riga intera, ritagliate (object-fit: cover), senza bande del colore di fondo sotto (dal 14/11/2026) */
        & > li:not(:first-child) :is(figure, a, img) {
            block-size: 100%;
        }

        & > li:not(:first-child) img {
            aspect-ratio: auto;
        }
    }

    @media (min-width: 64rem) {
        ul:not([data-featured]) {
            --small: calc((var(--container-text) - 5 * var(--space-2)) / 6);
            --row: calc((var(--small) * 2 + var(--space-2)) * 3 / 4);
            grid-template-columns: minmax(0, 1fr) repeat(6, var(--small));
            grid-template-rows: none;

            /* La grande: alta quanto tutte le righe delle piccole (tre per riga), con lo stacco tra le colonne delle sezioni */
            & > li:first-child {
                grid-column: 1;
                margin-inline-end: calc(var(--space-6) - var(--space-2));
            }

            & > li:first-child :is(figure, a, img) {
                block-size: 100%;
            }

            & > li:first-child img {
                aspect-ratio: auto;
            }

            & > li:not(:first-child):last-child:nth-child(3n + 2) {
                grid-column: 2 / -1;
            }
        }

        ul:not([data-featured]):has(> li:nth-child(2)) > li:first-child {
            grid-row: span 1;
        }

        ul:not([data-featured]):has(> li:nth-child(5)) > li:first-child {
            grid-row: span 2;
        }

        ul:not([data-featured]):has(> li:nth-child(8)) > li:first-child {
            grid-row: span 3;
        }

        ul:not([data-featured]):has(> li:nth-child(11)) > li:first-child {
            grid-row: span 4;
        }

        ul:not([data-featured]):has(> li:nth-child(14)) > li:first-child {
            grid-row: span 5;
        }

        ul:not([data-featured]):has(> li:nth-child(17)) > li:first-child {
            grid-row: span 6;
        }

        ul:not([data-featured]):has(> li:nth-child(20)) > li:first-child {
            grid-row: span 7;
        }

        /* Una foto sola: nella seconda colonna, sotto la didascalia, in 4:3 */
        ul:not([data-featured]):not(:has(> li:nth-child(2))) {
            grid-auto-rows: auto;

            & > li:first-child {
                grid-column: 2 / -1;
                margin-inline-end: 0;
            }

            & > li:first-child img {
                aspect-ratio: 4 / 3;
            }
        }
    }

    li {
        margin: 0;
        border-radius: var(--radius);
    }

    a:has(img) {
        position: relative;
        display: block;
    }

    /* Sul fotogramma di un video, in basso a sinistra: «Video» con l'icona, sul fondo scuro perché si legga su ogni foto */
    a > span {
        position: absolute;
        inset-block-end: var(--space-2);
        inset-inline-start: var(--space-2);
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius);
        background-color: var(--bg-inverse);
        color: var(--text-inverse);
        font-size: var(--fs-small);
    }

    a > span > :global(svg) {
        inline-size: 1em;
        block-size: 1em;
    }

    /*
     * In Foto e video le foto sono in 4:3, quasi il formato intero delle foto di concerto, che sono orizzontali: lì si guardano.
     * Nella home, che è un'anteprima, in 4:5 come i post social (sotto).
     */
    img {
        inline-size: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
    }

    [data-featured] img {
        aspect-ratio: 4 / 5;
    }

    /* Il segnaposto: una casella 4:5 come le foto della home, sul fondo rialzato, con la scritta tra parentesi quadre */
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

        & > li:first-child :is(img, figure:has(> p)) {
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

            & > li:first-child :is(figure, a, img) {
                block-size: 100%;
            }

            & > li:first-child :is(img, figure:has(> p)) {
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
