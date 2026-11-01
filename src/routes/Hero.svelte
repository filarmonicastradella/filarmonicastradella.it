<script lang="ts">
    // La stessa foto della copertina di Stradella Facendo (© Eleonora Rocchi), alla qualità predefinita: è a colori e
    // a tutta larghezza, e con la qualità 40 delle foto d'archivio si vedeva sfocata.
    // In verticale la fascia è più alta che larga in proporzione alla foto (3:2), che la riempie tagliando i lati:
    // da qui i 160vw di "sizes", altrimenti il browser sceglie una versione larga quanto lo schermo e la ingrandisce.
    // Più larghezze delle due predefinite (metà e intera): con solo 1024 e 2048 un telefono scaricava sempre la 2048.
    // SOSPESA finché non ci sono i consensi alle immagini di chi suona oggi (modulo dei consensi); al suo posto la foto
    // d'archivio degli anni Ottanta. Per tornare indietro: togliere il commento a queste due righe, all'alt e alla
    // posizione, e cancellare le due righe della foto d'archivio.
    // import cover from "$lib/assets/imgs/ensembles/stradella-facendo.jpg?enhanced&w=2048;1600;1280;960;640";
    // import coverPlaceholder from "$lib/assets/imgs/ensembles/stradella-facendo.jpg?w=24&blur=2&format=webp&inline";
    import cover from "$lib/assets/imgs/anni_80.jpeg?enhanced&w=2048;1600;1280;960;640";
    // Anteprima sfocata della copertina, visibile subito mentre la foto si carica
    import coverPlaceholder from "$lib/assets/imgs/anni_80.jpeg?w=24&blur=2&format=webp&inline";
</script>

<!--
    Apertura della home: l'intestazione con foto di tutte le pagine (layout.css, copertina), con la fascia
    più alta, l'occhiello, il titolo in corpo display e la comparsa della prima schermata.
-->
<!-- SOSPESA, la posizione della foto di Stradella Facendo: style:--cover-position="center 35%" -->
<header style:--cover-placeholder="url({coverPlaceholder})" style:--cover-position="center 60%">
    <hgroup>
        <p>Fivizzano · dal 1777</p>
        <h1>Filarmonica <span>Alessandro <em>Stradella</em></span></h1>
        <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro</strong>.</p>
    </hgroup>
    <p><a href="/contacts?motivo=ingaggio#scrivici">Per il tuo evento</a></p>
    <enhanced:img
        src={cover}
        alt="La Filarmonica in concerto di sera su un palco in piazza, negli anni Ottanta"
        sizes="(orientation: portrait) 160vw, 100vw"
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
        /* Una colonna larga quanto lo schermo, mai quanto il titolo: con i caratteri molto grandi il titolo va a capo */
        grid-template-columns: minmax(0, 1fr);
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

    /* A capo dopo "Filarmonica", come nel logotipo: il nome di Stradella resta intero sulla seconda riga */
    h1 span {
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
     * Pulsante secondario (contorno inchiostro): l'unico pulsante pieno della schermata è "Sostienici"
     * nell'intestazione del sito; da qui si va agli ingaggi.
     */
    header > p > a {
        border-color: var(--border-strong);
        background-color: transparent;
        color: var(--text);
    }

    header > p > a:hover {
        border-color: var(--text-brand);
        background-color: transparent;
        color: var(--text-brand);
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

    /* Le corde scendono ogni volta che si torna qui, non solo alla prima apertura come nelle altre intestazioni */
    @media (prefers-reduced-motion: no-preference) {
        header::after {
            animation: corde-scendono var(--duration-slow) var(--ease) calc(var(--stagger) * 3) both;
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
