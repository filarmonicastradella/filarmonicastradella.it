<script lang="ts">
    import wallpaper from "$lib/assets/wallpaper.webp";
</script>

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
     * inchiostro e bordeaux (il trattamento "duotone") a destra, le corde sul confine tra le due.
     * La foto è uno sfondo su uno pseudo-elemento: nessun elemento in più nel markup.
     * Sotto i 64rem la foto diventa una fascia in alto e il testo scorre sotto: più stretta, la colonna
     * di testo accanto alla foto non conterrebbe il titolo, che finirebbe sotto le corde.
     */
    header {
        /*
         * In vw e non in %: la stessa misura serve al padding (dove % si riferirebbe a "main") e alla
         * posizione di foto e corde (dove si riferirebbe alla hero). Con % le due non coincidevano e le
         * corde finivano sopra il testo su alcune larghezze. La hero è larga 100vw, quindi 45vw è il 45%.
         */
        --split: 45vw;
        /* "main" ha già i margini della pagina: la hero li scavalca per arrivare ai bordi dello schermo */
        --edge: max(var(--gutter), calc((100vw - var(--container)) / 2));
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-7);
        min-height: calc(100svh - var(--header-height));
        width: 100vw;
        margin-inline: calc(50% - 50vw);
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

    /* Le corde (layout.css) sul confine tra testo e foto */
    header::after {
        inset-inline-end: calc(var(--split) + var(--space-6));
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

    /* Pulsante primario del design system */
    header > p a {
        display: inline-block;
        padding: var(--space-3) var(--space-5);
        border: var(--border-width) solid var(--accent);
        border-radius: var(--radius);
        background-color: var(--accent);
        color: var(--on-accent);
        font-size: var(--fs-button);
        font-weight: var(--fw-text-strong);
        text-decoration: none;
        transition: background-color var(--duration) var(--ease);
    }

    header > p a:hover {
        border-color: var(--accent-hover);
        background-color: var(--accent-hover);
    }

    /*
     * Sotto i 64rem: la hero è alta quanto lo schermo meno l'intestazione. Il testo prende lo spazio che
     * gli serve, la foto riempie quello che resta sopra (mai meno di un quarto dello schermo), le corde
     * scendono accanto al testo. Foto e corde diventano elementi della griglia invece che sovrapposti.
     */
    @media (max-width: 63.999rem) {
        header {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            grid-template-rows: minmax(25svh, 1fr) auto auto;
            gap: 0 var(--space-6);
            padding-block: 0 var(--space-7);
            padding-inline: var(--edge);
        }

        header::before {
            position: static;
            grid-column: 1 / -1;
            inline-size: auto;
            margin-inline: calc(-1 * var(--edge));
            margin-block-end: var(--space-6);
        }

        hgroup {
            grid-column: 1;
            grid-row: 2;
        }

        header > p {
            grid-column: 1;
            grid-row: 3;
            margin-block-start: var(--space-6);
        }

        header::after {
            position: static;
            grid-column: 2;
            grid-row: 2 / 4;
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
