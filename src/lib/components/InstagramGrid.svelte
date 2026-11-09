<script lang="ts">
    import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
    import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
    import PlayIcon from "~icons/heroicons/play-20-solid";
    import type { GallerySlide } from "$lib/gallery";

    // La griglia delle foto e dei video di Instagram, per la galleria in home e per Foto e video. Con `featured` (la home) la prima
    // foto è grande e le altre piccole intorno, in tre composizioni secondo la larghezza (nello stile, sotto).
    // `placeholders`: caselle segnaposto dopo le foto, finché non ce ne sono abbastanza per riempire la griglia.
    // `link`: dove porta ogni casella, foto o video (la home porta al post in Foto e video). Senza (Foto e video), ogni casella apre
    // la foto grande o il video in una finestra (sotto); senza JS, il file
    let {
        slides,
        featured = false,
        placeholders = 0,
        link
    }: { slides: GallerySlide[]; featured?: boolean; placeholders?: number; link?: (slide: GallerySlide) => string } = $props();

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

    // La finestra di Foto e video (dal 9/11/2026): solo la foto alla misura dello schermo, o il video con il player del browser, che
    // non parte da solo (docs/DESIGN.md, Movimento); data e didascalia sono nella pagina. Si chiude con Esc (il <dialog> lo fa da sé),
    // con «Chiudi» o toccando fuori; chiudendo il video si ferma, perché sparisce. «Precedente» e «Successiva» (anche con i tasti
    // freccia) passano alle altre foto della stessa griglia, cioè dello stesso post; alla prima e all'ultima sono spenti.
    let dialog = $state<HTMLDialogElement>();
    let index = $state<number | null>(null);
    const current = $derived(index === null ? null : slides[index]);

    function show(slideIndex: number, event: MouseEvent) {
        event.preventDefault();
        index = slideIndex;
        dialog?.showModal();
    }

    const go = (step: -1 | 1) => {
        if (index !== null && slides[index + step]) index += step;
    };

    // Le frecce della tastiera, tranne quando il fuoco è sul video, dove servono a spostarsi nel video
    function keydown(event: KeyboardEvent) {
        if (event.target instanceof HTMLVideoElement) return;
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
    }
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
                {:else}
                    <!-- Il link porta al file, la foto grande o il video: con JS si apre nella finestra -->
                    <a href={slide.mediaUrl} onclick={(event) => show(index, event)}>
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

{#if !link}
    <!-- Toccando fuori dalla finestra (sul fondo) si chiude; con la tastiera c'è Esc -->
    <dialog
        bind:this={dialog}
        aria-label={current?.alt}
        onclose={() => (index = null)}
        onclick={(event) => event.target === dialog && dialog.close()}
        onkeydown={keydown}
    >
        {#if current}
            <!-- Solo la foto o il video: data e didascalia stanno nella pagina, accanto alla griglia -->
            {#if current.mediaType === "VIDEO"}
                <!-- svelte-ignore a11y_media_has_caption -->
                <video src={current.mediaUrl} poster={current.thumbnailUrl} width={current.width} height={current.height} controls playsinline></video>
            {:else}
                <img src={current.imageUrl} srcset={current.srcset} sizes="90vw" width={current.width} height={current.height} alt={current.alt} />
            {/if}
            <p>
                <button type="button" onclick={() => go(-1)} disabled={index === 0}><ChevronLeftIcon aria-hidden="true" /> Precedente</button>
                <button type="button" onclick={() => go(1)} disabled={index === slides.length - 1}>Successiva <ChevronRightIcon aria-hidden="true" /></button>
                <button type="button" onclick={() => dialog?.close()}>Chiudi</button>
            </p>
        {/if}
    </dialog>
{/if}

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
     * - Da 64rem la impagina la pagina Foto e video, insieme alla data e alla didascalia del post (la griglia diventa trasparente,
     *   display: contents): la grande sotto la data, le piccole sotto la didascalia.
     */
    /* Le piccole riempiono la loro casella, alta quanto la riga (a ogni larghezza) */
    ul:not([data-featured]) > li:not(:first-child) :is(img, video) {
        block-size: 100%;
        aspect-ratio: auto;
    }

    /* Solo sotto 64rem: da lì in su impagina la pagina, e queste regole (più specifiche delle sue) la scavalcherebbero */
    @media (width < 64rem) {
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
            }

            & > li:nth-last-child(2):nth-child(3n + 2),
            & > li:last-child:nth-child(3n) {
                grid-column: span 3;
            }

            & > li:last-child:nth-child(3n + 2) {
                grid-column: 1 / -1;
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
    img,
    video {
        inline-size: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
    }

    [data-featured] :is(img, video) {
        aspect-ratio: 4 / 5;
    }

    /*
     * La finestra: sul fondo rialzato, che si stacca dal velo scuro dietro (--backdrop); la foto intera (non ritagliata) alla misura che ci sta e, sotto, i pulsanti. Compare sfumando (--duration-slow, solo
     * opacità); mentre è aperta la pagina sotto non scorre.
     * Misura fissa, quasi tutto lo schermo (al massimo 80rem di larghezza), uguale per ogni foto: così i pulsanti
     * stanno sempre nello stesso punto, in fondo, e passando da una foto all'altra non si spostano. La foto prende lo
     * spazio che resta, intera.
     */
    dialog {
        box-sizing: border-box;
        inline-size: min(100vw - 2 * var(--space-4), 80rem);
        block-size: calc(100dvh - 2 * var(--space-4));
        max-inline-size: none;
        max-block-size: none;
        padding: var(--space-4);
        border: none;
        border-radius: var(--radius);
        background-color: var(--bg-raised);
        color: var(--text);
    }

    dialog[open] {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        animation: fade-in var(--duration-slow) var(--ease);
    }

    /* All'apertura il fuoco va sulla finestra stessa: il suo contorno non serve, i comandi dentro hanno il loro */
    dialog:focus-visible {
        outline: none;
    }

    dialog::backdrop {
        background-color: var(--backdrop);
    }

    :global(html:has(dialog[open])) {
        overflow: hidden;
    }

    dialog :is(img, video) {
        display: block;
        inline-size: 100%;
        block-size: 100%;
        min-block-size: 0;
        aspect-ratio: auto;
        object-fit: contain;
    }

    /* La riga dei comandi è larga quanto la finestra, non quanto una colonna di testo come gli altri paragrafi: «Chiudi» va al bordo destro */
    dialog > p {
        max-inline-size: none;
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        margin: var(--space-4) 0 0;
    }

    /* «Precedente» e «Successiva» a sinistra, «Chiudi» a destra, tutti alti uguali (si allungano all'altezza della riga, anche «Chiudi», che non ha l'icona) */
    dialog > p > button:last-child {
        margin-inline-start: auto;
    }

    dialog > p > button > :global(svg) {
        inline-size: 1.25rem;
        block-size: 1.25rem;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
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
