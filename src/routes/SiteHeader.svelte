<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import SiteMenu from "./SiteMenu.svelte";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');

    // Menu a scomparsa sotto i 64rem; da 64rem le voci sono sempre visibili in linea.
    let open = $state(false);
</script>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span><span>Filarmonica</span> Alessandro Stradella</span>
    </a>

    <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        onclick={() => (open = !open)}
    >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </button>

    <SiteMenu {open} onClose={() => (open = false)} />
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
     * Due barre semplici (non un <svg>): ruotare un elemento normale intorno al centro è prevedibile ovunque.
     * L'area da toccare è un quadrato di --space-7 (48px, più dei 44 consigliati); le barre restano piccole
     * al centro e il margine negativo le tiene allineate al bordo della pagina come prima.
     */
    button {
        --bars-width: var(--space-6);
        --bars-distance: calc(var(--space-5) - var(--space-1)); /* da una barra all'altra */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--bars-distance) - var(--rule-width));
        inline-size: var(--space-7);
        block-size: var(--space-7);
        margin-inline-end: calc((var(--bars-width) - var(--space-7)) / 2);
        padding: 0;
        appearance: none;
        background: none;
        border: none;
        color: inherit;
    }

    button:hover {
        background: none;
    }

    button span {
        display: block;
        inline-size: var(--bars-width);
        block-size: var(--rule-width);
        background-color: currentColor;
        transform-origin: center;
        /* Stessa durata del pannello del menu, che si apre e si chiude insieme alla X */
        transition: transform var(--duration-slow) var(--ease);
    }

    /* La X: unica rotazione del sito, eccezione prevista dal design system (Movimento) */
    button[aria-expanded="true"] span:first-child {
        transform: translateY(calc(var(--bars-distance) / 2)) rotate(-45deg);
    }

    button[aria-expanded="true"] span:last-child {
        transform: translateY(calc(var(--bars-distance) / -2)) rotate(45deg);
    }

    @media (prefers-reduced-motion: reduce) {
        button span {
            transition: none;
        }
    }

    @media (min-width: 64rem) {
        button {
            display: none;
        }
    }
</style>
