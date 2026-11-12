<script lang="ts">
    import { onMount } from "svelte";
    import { share } from "$lib/share";
    import { pushState, replaceState } from "$app/navigation";
    import { page } from "$app/state";
    import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
    import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
    import PlayIcon from "~icons/heroicons/play-20-solid";
    import { slidePath, type GallerySlide } from "$lib/gallery";

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
    // Ogni foto ha il suo indirizzo, la sua pagina (dal 12/11/2026, `slidePath`): la casella porta lì, e con JS la finestra si apre
    // sopra Foto e video con quell'indirizzo nella barra (shallow routing di SvelteKit: `pushState`, e la foto aperta in
    // `page.state.photo`). Così il link che si condivide porta alla foto, e «indietro» sul telefono chiude la finestra.
    let dialog = $state<HTMLDialogElement>();
    const index = $derived.by(() => {
        const found = slides.findIndex(({ id }) => id === page.state.photo);
        return found === -1 ? null : found;
    });
    const current = $derived(index === null ? null : slides[index]);

    function show(slide: GallerySlide, event: MouseEvent) {
        // Con i tasti per aprire in un'altra scheda o finestra, il link fa da sé
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        pushState(slidePath(slide), { photo: slide.id });
        preparePhoto(slide);
    }

    const go = (step: -1 | 1) => {
        const next = index === null ? undefined : slides[index + step];
        if (!next) return;
        replaceState(slidePath(next), { photo: next.id });
        preparePhoto(next);
    };

    // La finestra segue la foto scelta: si apre quando c'è, si chiude quando non c'è più (anche con «indietro»)
    const followSelection = (node: HTMLDialogElement) => {
        if (current && !node.open) node.showModal();
        if (!current && node.open) node.close();
    };

    /*
     * «Condividi» nella finestra: il menu di condivisione del dispositivo con la foto stessa (a WhatsApp, alle storie di Instagram…),
     * convertita in JPEG perché il WebP del sito non tutte le app lo accettano come foto; dove i file non si possono condividere, e per
     * i video, troppo pesanti, il link alla pagina. Sul computer copia il link della pagina della foto; se il dispositivo rifiuta,
     * il link si copia e il pulsante dice «Link copiato» (`$lib/share`). La foto si prepara già quando compare nella finestra: il
     * menu si apre solo subito dopo il tocco, e convertirla al momento farebbe perdere il tocco.
     */
    let canShare = $state(false);
    let copied = $state(false);
    let photo: { id: string; file: Promise<File | null> } | undefined;
    onMount(() => {
        canShare = "share" in navigator || "clipboard" in navigator;
    });

    async function jpeg(src: string) {
        const image = new Image();
        image.src = src;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d")!.drawImage(image, 0, 0);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
        return blob && new File([blob], "filarmonica-stradella.jpg", { type: "image/jpeg" });
    }

    // La foto in JPEG della slide nella finestra, preparata quando compare (in show e go)
    function preparePhoto(slide: GallerySlide) {
        photo = { id: slide.id, file: slide.mediaType === "IMAGE" && slide.imageUrl ? jpeg(slide.imageUrl).catch(() => null) : Promise.resolve(null) };
    }

    async function sharePhoto() {
        if (!current) return;
        if (photo?.id !== current.id) preparePhoto(current);
        const file = await photo!.file;
        let result = await share(file ? { files: [file], title: current.alt } : { title: current.alt, url: location.href });
        // Se il dispositivo rifiuta la foto, il link
        if (result === "failed" && file) result = await share({ title: current.alt, url: location.href });
        if (result === "copied") {
            copied = true;
            setTimeout(() => (copied = false), 3000);
        }
    }

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
                    <!-- Il link porta alla pagina della foto o del video: con JS si apre nella finestra, con l'indirizzo della pagina -->
                    <a href={slidePath(slide)} onclick={(event) => show(slide, event)}>
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
        onclose={() => current && history.back()}
        {@attach followSelection}
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
                {#if canShare}
                    <button type="button" onclick={sharePhoto} aria-live="polite"
                        ><span hidden={copied}>Condividi</span><span hidden={!copied}>Link copiato</span></button
                    >
                {/if}
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

        & > li:not(:first-child) :is(img, video) {
            block-size: 100%;
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

            & > li:first-child :is(figure, a, img, video) {
                block-size: 100%;
            }

            & > li:first-child :is(img, video) {
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

            & > li:first-child :is(img, video) {
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

    /* «Precedente» e «Successiva» a sinistra, «Condividi» (dove c'è) e «Chiudi» a destra, tutti alti uguali (si allungano all'altezza
       della riga, anche quelli senza icona) */
    dialog > p > button:nth-child(3) {
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
