<script lang="ts">
    import wallpaper from "$lib/assets/wallpaper.webp";
</script>

<!-- La foto è uno sfondo CSS, che il browser scoprirebbe tardi: è l'elemento più grande della prima schermata, la chiede subito -->
<svelte:head>
    <link rel="preload" href={wallpaper} as="image" fetchpriority="high" />
</svelte:head>

<header style="--hero-image: url({wallpaper})">
    <hgroup>
        <p>Fivizzano · dal 1777</p>
        <h1>Filarmonica <em>Alessandro Stradella</em></h1>
        <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro</strong>.</p>
    </hgroup>
    <p><a href="/support/join">Unisciti a noi</a></p>
</header>

<style>
    /*
     * Apertura della landing come nel design system: testo su carta a sinistra, foto virata verso
     * inchiostro e bordeaux (il trattamento "duotone") a destra, le corde sopra la foto nello stesso punto
     * di tutte le altre corde del sito (il bordo destro del contenitore), nel colore chiaro delle superfici scure.
     * La foto è uno sfondo su uno pseudo-elemento: nessun elemento in più nel markup.
     * Sotto i 64rem la foto diventa una fascia in alto e il testo scorre sotto: più stretta, la colonna
     * di testo accanto alla foto non conterrebbe il titolo, che finirebbe sotto le corde.
     */
    header {
        /*
         * La hero occupa tutta la riga della griglia di "main" (layout.css): è larga quanto la pagina, e
         * le percentuali di padding e posizioni si riferiscono tutte alla stessa larghezza.
         */
        --split: 45%;
        --edge: var(--page-inline);
        grid-column: full;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-7);
        min-height: calc(100svh - var(--header-height));
        padding-block: var(--space-9);
        padding-inline: var(--edge) calc(var(--split) + var(--space-8));
        box-sizing: border-box;
    }

    header::before {
        content: "";
        position: absolute;
        inset-block: 0;
        inset-inline-end: 0;
        inline-size: var(--split);
        background-image:
            linear-gradient(
                color-mix(in srgb, var(--color-bordeaux-notte) 45%, transparent),
                color-mix(in srgb, var(--color-inchiostro) 55%, transparent)
            ),
            var(--hero-image);
        background-position: center;
        background-size: cover;
        filter: grayscale(0.6);
    }

    /*
     * Le corde (layout.css) dove sono in tutto il sito, sopra la foto: chiare, come sulle superfici scure.
     * Scendono dall'alto e si fermano all'altezza del fondo del testo, con i terminali a pallino.
     */
    header::after {
        --corde-color: var(--color-cipria);
        inset-block-end: var(--space-9);
        inset-inline-end: var(--edge);
    }

    hgroup {
        margin: 0;
    }

    hgroup > * {
        margin: 0;
    }

    /* Occhiello sopra il titolo */
    hgroup p:first-child {
        color: var(--text-brand);
        font-size: var(--fs-eyebrow);
        font-weight: var(--fw-text-strong);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    h1 {
        margin-block-start: var(--space-4);
        font-size: var(--fs-display);
        font-weight: var(--fw-display);
        line-height: var(--lh-display);
    }

    h1 em {
        display: block;
    }

    hgroup p:last-child {
        margin-block-start: var(--space-5);
        color: var(--text-muted);
        font-size: var(--fs-lead);
    }

    hgroup p:last-child strong {
        color: var(--text);
    }

    header > p {
        margin: 0;
    }

    /*
     * Sotto i 64rem: la hero è alta quanto lo schermo meno l'intestazione. Il testo prende lo spazio che
     * gli serve, la foto riempie quello che resta sopra (mai meno di un quarto dello schermo). Le corde
     * attraversano la foto e si fermano appena sotto, accanto all'occhiello, lontane dal pulsante. Foto e
     * corde diventano elementi della stessa cella della griglia.
     */
    @media (max-width: 63.999rem) {
        header {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: minmax(25svh, 1fr) auto auto;
            padding-block: 0 var(--space-7);
            padding-inline: var(--edge);
        }

        header::before {
            position: static;
            grid-area: 1 / 1;
            inline-size: auto;
            background:
                linear-gradient(
                    color-mix(in srgb, var(--color-bordeaux-notte) 45%, transparent),
                    color-mix(in srgb, var(--color-inchiostro) 55%, transparent)
                ),
                var(--hero-image) center / cover;
            margin-inline: calc(-1 * var(--edge));
            margin-block-end: var(--space-6);
        }

        hgroup {
            grid-row: 2;
        }

        header > p {
            grid-row: 3;
            margin-block-start: var(--space-6);
        }

        /*
         * Nella stessa cella della foto, sopra (con la sola riga il browser le metterebbe in una colonna
         * nuova). Attraversano la foto in colore chiaro, ne escono di --below e sulla carta tornano del
         * loro colore, pallini compresi: finiscono accanto all'occhiello, a freccia verso il titolo.
         * Ogni tratto chiaro si ferma sul bordo della foto, misurato dal fondo della sua corda.
         */
        header::after {
            --corde-color: inherit;
            --below: var(--space-8);
            --line-long: linear-gradient(
                var(--color-cipria) calc(100% - var(--below) + var(--corde-dot-size) / 2),
                var(--corde-color) 0
            );
            --line-short: linear-gradient(
                var(--color-cipria) calc(100% - var(--below) + var(--corde-dot-offset) + var(--corde-dot-size) / 2),
                var(--corde-color) 0
            );
            position: static;
            grid-area: 1 / 1;
            justify-self: end;
            /* La cella finisce --space-6 sotto la foto (il suo margine): le corde ne escono di --below */
            margin-block-end: calc(var(--space-6) - var(--below));
        }
    }

    /*
     * Comparsa della prima schermata (docs/DESIGN.md, Movimento), in CSS puro, funziona anche senza JS:
     * la foto sfuma, poi occhiello, titolo, sottotitolo e pulsante salgono uno dopo l'altro, e per ultime
     * le corde si tendono dall'alto in basso. Con il movimento ridotto resta solo la dissolvenza.
     */
    header {
        --shift: var(--space-5); /* 1,5rem, il massimo ammesso */
    }

    @media (prefers-reduced-motion: reduce) {
        header {
            --shift: 0;
        }
    }

    header::before {
        animation: dissolvenza var(--duration-entrance) var(--ease) both;
    }

    /* Le corde si tendono dall'alto in basso (keyframe "corde-scendono" in layout.css) */
    @media (prefers-reduced-motion: no-preference) {
        header::after {
            animation: corde-scendono var(--duration-entrance) var(--ease) calc(var(--stagger) * 3) both;
        }
    }

    /* "--order": posizione nella sequenza (il ritardo sta nella stessa dichiarazione dell'animazione) */
    hgroup > *,
    header > p {
        animation: comparsa var(--duration-entrance) var(--ease) calc(var(--stagger) * var(--order, 0)) both;
    }

    h1 {
        --order: 1;
    }

    hgroup p:last-child {
        --order: 2;
    }

    header > p {
        --order: 3;
    }

    @keyframes dissolvenza {
        from {
            opacity: 0;
        }
    }

    @keyframes comparsa {
        from {
            opacity: 0;
            translate: 0 var(--shift);
        }
    }
</style>
