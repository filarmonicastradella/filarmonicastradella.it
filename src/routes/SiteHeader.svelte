<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import SiteMenu from "./SiteMenu.svelte";
    import { menu } from "$lib/menu.svelte";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');

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
        <span><span>Filarmonica</span> Alessandro Stradella</span>
    </a>

    <!-- Il nome del pulsante è la parola visibile, "Menu" o "Chiudi"; le tre corde sono solo il segno -->
    <button type="button" aria-expanded={menu.open} onclick={() => (menu.open = !menu.open)} bind:this={toggle}>
        <span>
            <span aria-hidden={menu.open}>Menu</span>
            <span aria-hidden={!menu.open}>Chiudi</span>
        </span>
        <!-- Le tre corde: 22×22 come --corde-span (linee da 2 a 10 di distanza), agganciate ai pixel dello schermo -->
        <svg aria-hidden="true" viewBox="0 0 22 22" shape-rendering="crispEdges">
            <rect width="22" height="2" />
            <rect y="10" width="22" height="2" />
            <rect y="20" width="22" height="2" />
        </svg>
    </button>

    <!-- Menu a scomparsa sotto i 64rem; da 64rem le voci sono sempre visibili in linea -->
    <SiteMenu />
</header>

<style>
    /*
     * "fixed": resta in vista scorrendo; lo spazio nel flusso lo riserva "main" (layout.css).
     * Design system: logotipo orizzontale a sinistra (simbolo, occhiello FILARMONICA, nome), voci di
     * menu in linea e un solo pulsante pieno per l'azione principale.
     */
    header {
        display: flex;
        position: fixed;
        z-index: 10;
        top: 0;
        inset-inline: 0;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
        height: var(--header-height);
        padding-inline: var(--page-inline);
        border-block-end: var(--border-width) solid var(--border);
        background-color: var(--bg);
        color: var(--text);
    }

    /* Logo e pulsante del menu restano sopra il pannello del menu aperto, che copre l'intestazione */
    header > a,
    button {
        position: relative;
        z-index: 1;
    }

    header > a {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--text-brand);
        text-decoration: none;
    }

    /* ":global()": il logo arriva via {@html}, Svelte non può aggiungergli la classe di scoping */
    header > a span :global(svg) {
        height: 2.5rem;
        width: auto;
    }

    header > a > span:last-child {
        display: flex;
        flex-direction: column;
        color: var(--text);
        font-family: var(--font-display);
        font-size: var(--fs-h3);
        font-weight: var(--fw-display);
        line-height: 1;
    }

    /* L'occhiello FILARMONICA del logotipo */
    header > a > span:last-child > span {
        margin-block-end: var(--space-1);
        color: var(--text-brand);
        font-family: var(--font-text);
        font-size: 0.625rem;
        font-weight: var(--fw-text-strong);
        letter-spacing: 0.24em;
        text-transform: uppercase;
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
</style>
