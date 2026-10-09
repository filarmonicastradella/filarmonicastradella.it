<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import SiteMenu from "./SiteMenu.svelte";
    import { menu } from "$lib/menu.svelte";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');
</script>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span><span>Filarmonica</span> Alessandro Stradella</span>
    </a>

    <button
        type="button"
        aria-expanded={menu.open}
        aria-label={menu.open ? "Chiudi menu" : "Apri menu"}
        onclick={() => (menu.open = !menu.open)}
    >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
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
     * Il pulsante del menu sono tre corde distese (tre span, non un <svg>): stesso spessore e stessa distanza
     * delle corde di layout.css, così formano un quadrato grande quanto --corde-span. Aprendo il menu il
     * pulsante ruota di 90° e prende il colore delle corde: diventa la cima delle corde del pannello, che
     * scendono proprio da lì (SiteMenu.svelte). L'area da toccare è un quadrato di --space-7 (48px); il
     * margine negativo tiene le linee allineate al bordo della pagina e centrate sopra le corde.
     */
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--corde-gap);
        inline-size: var(--space-7);
        block-size: var(--space-7);
        margin-inline-end: calc((var(--corde-span) - var(--space-7)) / 2);
        padding: 0;
        appearance: none;
        background: none;
        border: none;
        color: inherit;
        /* Stessa durata del pannello del menu. Alla chiusura il giro aspetta che le corde siano risalite */
        transition:
            rotate var(--duration-slow) var(--ease) var(--duration-slow),
            color var(--duration-slow) var(--ease) var(--duration-slow);
    }

    button:hover {
        background: none;
    }

    button span {
        display: block;
        inline-size: var(--corde-span);
        block-size: var(--corde-width);
        background-color: currentColor;
    }

    /* Unica rotazione del sito, eccezione prevista dal design system (Movimento) */
    button[aria-expanded="true"] {
        rotate: 90deg;
        color: var(--corde-color);
        transition-delay: 0s;
    }

    @media (prefers-reduced-motion: reduce) {
        button {
            transition: color var(--duration-slow) var(--ease);
        }
    }

    @media (min-width: 64rem) {
        button {
            display: none;
        }
    }
</style>
