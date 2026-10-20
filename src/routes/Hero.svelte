<script lang="ts">
    import wallpaper from "$lib/assets/wallpaper.webp?enhanced";
</script>

<!--
    Apertura della home: è l'intestazione con foto di tutte le pagine (layout.css, copertina), con in più
    l'occhiello, il titolo in corpo display e la comparsa della prima schermata.
-->
<header>
    <hgroup>
        <p>Fivizzano · dal 1777</p>
        <h1>Filarmonica <em>Alessandro Stradella</em></h1>
        <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro</strong>.</p>
    </hgroup>
    <p><a href="/support/join">Unisciti a noi</a></p>
    <!-- SEGNAPOSTO: foto di repertorio, da sostituire con una foto della Filarmonica (docs/DESIGN.md: solo foto nostre) -->
    <enhanced:img
        src={wallpaper}
        alt="Violinisti in concerto"
        sizes="(min-width: 64rem) 29rem, 100vw"
        fetchpriority="high"
    />
</header>

<style>
    /*
     * Da 64rem la prima schermata è tutta dell'apertura, e il titolo in corpo display ha bisogno di più
     * spazio della colonna dei titoli: la foto si stringe a poco meno di metà del contenitore.
     */
    @media (min-width: 64rem) {
        header {
            --cover-inline-size: calc((100% - var(--page-inline) * 2) * 0.45);
            min-block-size: calc(100svh - var(--header-height));
        }
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
        font-weight: var(--fw-display);
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
        margin-block-start: var(--space-7);
    }

    /*
     * Duotone inchiostro e bordeaux (docs/DESIGN.md, Fotografia): la foto a colori quasi desaturata,
     * con sopra un velo dal bordeaux notte all'inchiostro.
     */
    header > :global(picture) > :global(img) {
        filter: grayscale(0.6);
    }

    header > :global(picture)::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            color-mix(in srgb, var(--color-bordeaux-notte) 45%, transparent),
            color-mix(in srgb, var(--color-inchiostro) 55%, transparent)
        );
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

    header > :global(picture) {
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
