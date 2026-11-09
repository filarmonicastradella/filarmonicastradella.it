<script lang="ts">
    import type { GallerySlide } from "$lib/gallery";

    // La griglia delle foto e dei video di Instagram, per la galleria in home e per Foto e video. Con `featured` (la home), da 64rem
    // la prima foto è grande nella prima colonna delle sezioni e le altre sei piccole nella seconda, su due righe; sotto, le prime quattro.
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
    // Da 64rem: un quarto del contenitore (circa 16rem), oppure nella home la grande (circa 27rem per 29) e le piccole (circa 12rem);
    // sotto, metà dello schermo.
    const sizes = (slide: GallerySlide, index: number) => {
        const ratio = slide.width && slide.height ? slide.width / slide.height : 4 / 5;
        const crop = Math.max(1, ratio * (5 / 4));
        const wide = !featured ? 16 * crop : index === 0 ? Math.max(27, 29 * ratio) : 12 * crop;
        return `(min-width: 64rem) ${Math.ceil(wide)}rem, ${Math.ceil(50 * crop)}vw`;
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

    /* Nella home, sotto 64rem, le prime quattro foto: due righe da due */
    [data-featured] > li:nth-child(n + 5) {
        display: none;
    }

    /*
     * Nella home, da 64rem, la griglia segue le due colonne delle sezioni (layout.css): nella prima la foto più recente, grande e
     * alta due righe; nella seconda, larga quanto la colonna di testo, sei foto piccole su due righe. Le righe hanno l'altezza delle
     * piccole in 4:5, così se le foto sono meno di sette restano spazi vuoti e la grande non cambia misura.
     */
    @media (min-width: 64rem) {
        [data-featured] {
            --small: calc((var(--container-text) - 2 * var(--space-2)) / 3);
            grid-template-columns: minmax(0, 1fr) repeat(3, var(--small));
            grid-template-rows: repeat(2, calc(var(--small) * 5 / 4));
        }

        [data-featured] > li:nth-child(n + 5) {
            display: block;
        }

        /* La grande: lo stacco tra le colonne delle sezioni, non quello tra le foto */
        [data-featured] > li:first-child {
            grid-row: span 2;
            margin-inline-end: calc(var(--space-6) - var(--space-2));
        }

        [data-featured] > li:first-child :is(figure, a, img, video) {
            block-size: 100%;
        }

        [data-featured] > li:first-child :is(img, video) {
            aspect-ratio: auto;
        }
    }
</style>
