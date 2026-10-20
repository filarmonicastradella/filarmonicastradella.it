<script lang="ts">
    import wallpaper from "$lib/assets/wallpaper.webp?enhanced";
    // Anteprima sfocata della copertina, visibile subito mentre la foto si carica
    import wallpaperPlaceholder from "$lib/assets/wallpaper.webp?w=24&blur=2&format=webp&inline";
</script>

<!--
    Apertura della home: l'intestazione con foto di tutte le pagine (layout.css, copertina), con la fascia
    più alta, l'occhiello, il titolo in corpo display e la comparsa della prima schermata.
-->
<header style="--cover-placeholder: url({wallpaperPlaceholder})">
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
        sizes="100vw"
        fetchpriority="high"
    />
</header>

<style>
    /*
     * L'apertura è alta una schermata: il testo prende lo spazio che gli serve e la foto riempie il resto
     * (mai meno di 12rem). La fascia diventa una riga della griglia invece di stare sopra l'imbottitura.
     */
    header {
        display: grid;
        grid-template-rows: minmax(12rem, 1fr) auto auto;
        min-block-size: calc(100svh - var(--header-height));
        box-sizing: border-box;
        padding-block-start: 0;
        padding-inline: 0;
    }

    /* La foto va da bordo a bordo, il testo rientra nel contenitore e lascia il posto alle corde */
    hgroup,
    header > p {
        padding-inline: var(--page-inline) calc(var(--page-inline) + var(--corde-span) + var(--space-6));
    }

    /*
     * Le corde (layout.css) accanto al testo, dal bordo della foto in giù: qui l'altezza della foto non è
     * fissa, quindi sono una cella della griglia, nelle righe del testo, invece di essere posizionate.
     */
    header::after {
        position: relative;
        inset: auto;
        grid-row: 2 / -1;
        grid-column: 1;
        justify-self: end;
        margin-inline-end: calc(var(--page-inline) - var(--pad));
    }

    header > :global(picture) {
        position: relative;
        grid-row: 1;
        inset: auto;
        block-size: auto;
    }

    /* Fuori dal flusso, così non è la foto a decidere l'altezza della riga */
    header > :global(picture) > :global(img) {
        position: absolute;
        inset: 0;
    }

    /* Righe esplicite: le corde stanno nelle stesse celle, e la griglia altrimenti sposterebbe il testo */
    hgroup {
        grid-area: 2 / 1;
        margin-block-start: var(--space-7);
    }

    header > p {
        grid-area: 3 / 1;
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
     * Comparsa della prima schermata (docs/DESIGN.md, Movimento), in CSS puro, funziona anche senza JS:
     * la foto sfuma, poi occhiello, titolo, sottotitolo e pulsante salgono uno dopo l'altro. Con il
     * movimento ridotto resta solo la dissolvenza.
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
