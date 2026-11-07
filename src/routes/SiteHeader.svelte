<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import SiteMenu from "./SiteMenu.svelte";
    import { menu } from "$lib/menu.svelte";

    // Il file SVG dichiara una dimensione enorme (875×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Solo l'altezza: la larghezza la ricava il browser dal viewBox, così il simbolo non si deforma.
    // Il bordeaux diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg.replace('width="875" height="1382"', 'height="36"').replaceAll('fill="#701521"', 'fill="currentColor"');

    // Con il menu aperto, Esc lo chiude e riporta il focus sul pulsante.
    let toggle = $state<HTMLButtonElement>();
    const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key !== "Escape" || !menu.open) return;
        menu.open = false;
        toggle?.focus();
    };
</script>

<svelte:window onkeydown={closeOnEscape} />

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <!-- «Alessandro» abbreviato (dal 7/11/2026): il nome intero resta nel titolo dell'abbreviazione -->
        <span><span>Filarmonica</span> <span><abbr title="Alessandro">A.</abbr> Stradella</span></span>
    </a>

    <!-- Il nome del pulsante è la parola visibile, "Menu" o "Chiudi"; le tre corde sono solo il segno -->
    <button type="button" aria-controls="menu" aria-expanded={menu.open} onclick={() => (menu.open = !menu.open)} bind:this={toggle}>
        <span>
            <span aria-hidden={menu.open}>Menu</span>
            <span aria-hidden={!menu.open}>Chiudi</span>
        </span>
        <!--
            Le tre corde: 22×22 come --corde-span (linee da 2 a 10 di distanza), agganciate ai pixel dello schermo.
            La centrale comincia 4 px dopo: girato il pulsante, la sua cima resta più in basso, come nel simbolo.
        -->
        <svg aria-hidden="true" viewBox="0 0 22 22" shape-rendering="crispEdges">
            <rect width="22" height="2" />
            <rect x="4" y="10" width="18" height="2" />
            <rect y="20" width="22" height="2" />
        </svg>
    </button>

    <!-- Menu a scomparsa sotto i 64rem; da 64rem le voci sono sempre visibili in linea -->
    <SiteMenu />
</header>

<style>
    /*
     * Il maiuscoletto vero del Garamond, solo per «Filarmonica» nel logotipo: Cormorant SC 600, sottoinsieme latino,
     * licenza SIL Open Font License (static/fonts/OFL.txt). Il Cormorant Garamond non ha il maiuscoletto disegnato.
     */
    @font-face {
        font-family: "Cormorant SC";
        src: url("/fonts/cormorant-sc-600-latin.woff2") format("woff2");
        font-weight: 600;
        font-display: swap;
    }

    /*
     * "fixed": resta in vista scorrendo; lo spazio nel flusso lo riserva "main" (layout.css).
     * Design system: logotipo orizzontale a sinistra (simbolo e il nome su due righe), voci di
     * menu in linea e il pulsante «Sostienici», a contorno (il pulsante pieno è l'azione della pagina).
     */
    header {
        display: flex;
        position: fixed;
        z-index: 10;
        top: 0;
        inset-inline: 0;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3);
        height: var(--header-height);
        padding-inline: var(--page-inline);
        border-block-end: var(--border-width) solid var(--border);
        background-color: var(--bg);
        color: var(--text);
    }

    /* Più respiro quando c'è spazio: sotto, lo spazio serve al logotipo e al bottone */
    @media (min-width: 26rem) {
        header {
            gap: var(--space-6);
        }
    }

    /* Logo e pulsante del menu restano sopra il pannello del menu aperto, che copre l'intestazione */
    header > a,
    button {
        position: relative;
        z-index: 1;
    }

    /* Se lo spazio non basta (caratteri del telefono molto grandi) si stringe il logotipo, mai il pulsante del menu */
    header > a {
        display: flex;
        min-inline-size: 0;
        align-items: center;
        gap: var(--space-3);
        color: var(--text-brand);
        text-decoration: none;
    }

    /* ":global()": il logo arriva via {@html}, Svelte non può aggiungergli la classe di scoping */
    header > a span :global(svg) {
        block-size: var(--logo-height);
        inline-size: auto;
    }

    /*
     * «A. Stradella» è l'elemento principale e decide la larghezza, in Cormorant Garamond 600; sopra «Filarmonica» in
     * maiuscoletto più piccolo, spaziato fino alla stessa larghezza, come il frontespizio di un libro (dal 7/11/2026).
     */
    header > a > span:last-child {
        display: flex;
        flex-direction: column;
        color: var(--text);
        font-family: var(--font-display);
        font-size: clamp(0.9375rem, 4vw, var(--fs-logo));
        font-weight: var(--fw-heading);
        line-height: var(--lh-logo);
        white-space: nowrap;
    }

    header > a > span:last-child > span:first-child {
        margin-block-end: var(--logo-gap);
        font-family: var(--font-logo-first);
        font-size: var(--fs-logo-first);
        letter-spacing: var(--tracking-logo-first);
    }

    /*
     * Il pulsante del menu: una parola in occhiello ("Menu", "Chiudi") e tre corde distese, con lo stesso spessore e la stessa distanza delle corde di layout.css, così formano un quadrato
     * grande quanto --corde-span. Aprendo il menu le corde ruotano di 90° e il pulsante prende il colore delle
     * corde: diventano la cima delle corde del pannello, che scendono proprio da lì (SiteMenu.svelte), mentre
     * la parola sfuma da "Menu" a "Chiudi". Le corde stanno al centro di un quadrato di --space-7 (48px);
     * il margine negativo le tiene allineate al bordo della pagina e centrate sopra le corde del pannello.
     */
    button {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: var(--space-2);
        margin-inline-end: calc((var(--corde-span) - var(--space-7)) / 2);
        padding: 0;
        appearance: none;
        background: none;
        border: none;
        color: inherit;
        /* Stessa durata del pannello del menu. Alla chiusura tutto aspetta che le corde siano risalite */
        transition: color var(--duration-slow) var(--ease) var(--duration-slow);
    }

    button:hover {
        background: none;
    }

    button[aria-expanded="true"] {
        color: var(--corde-color);
        transition-delay: 0s;
    }

    /* La parola: le due versioni nella stessa cella della griglia, così il cambio non sposta niente */
    button > span:first-child {
        display: grid;
        justify-items: end;
        font-size: var(--fs-eyebrow);
        font-weight: var(--fw-text-strong);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    button > span:first-child > span {
        grid-area: 1 / 1;
        transition: opacity var(--duration-slow) var(--ease) var(--duration-slow);
    }

    button[aria-expanded="true"] > span:first-child > span {
        transition-delay: 0s;
    }

    button[aria-expanded="false"] > span:first-child > span:last-child,
    button[aria-expanded="true"] > span:first-child > span:first-child {
        opacity: 0;
    }

    /*
     * Le corde: un SVG con "crispEdges", che aggancia le linee ai pixel dello schermo, così restano dello
     * stesso spessore anche sui display con densità non intera (125%, 150%…). Il padding lo centra in un
     * quadrato di --space-7, che ruota intorno al suo centro.
     */
    button > svg {
        box-sizing: content-box;
        inline-size: var(--corde-span);
        block-size: var(--corde-span);
        padding: calc((var(--space-7) - var(--corde-span)) / 2);
        fill: currentColor;
        transition: rotate var(--duration-slow) var(--ease) var(--duration-slow);
    }

    /* Unica rotazione del sito, eccezione prevista dal design system (Movimento) */
    button[aria-expanded="true"] > svg {
        rotate: 90deg;
        transition-delay: 0s;
    }

    @media (prefers-reduced-motion: reduce) {
        button > svg {
            transition: none;
        }
    }

    @media (min-width: 64rem) {
        button {
            display: none;
        }
    }

    /*
     * Con i caratteri del telefono ingranditi (la soglia è in rem: con i caratteri normali anche un telefono da 320px
     * ne resta fuori) la parola «Menu» non si vede più e restano le corde: il nome del pulsante rimane per gli screen reader.
     */
    @media (max-width: 19.99rem) {
        button > span:first-child {
            position: absolute;
            inline-size: 1px;
            block-size: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }
    }
</style>
