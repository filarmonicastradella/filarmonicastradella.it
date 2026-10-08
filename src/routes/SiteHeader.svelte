<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import { page } from "$app/state";
    import SiteMenu from "./SiteMenu.svelte";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');

    // Solo nella landing l'intestazione nasce trasparente sopra la hero (vedi stile sotto).
    const isHome = $derived(page.url.pathname === "/");

    // Stato del menu: niente popover nativo, come nel vecchio sito. Il bottone non fa nulla senza JS.
    let open = $state(false);
</script>

<header data-home={isHome || undefined}>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></span>
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
     * "fixed" e non "sticky": deve poter galleggiare sopra la hero (trasparente) invece di riservare
     * il proprio spazio nel flusso — quello spazio lo riserva "main" (vedi layout.css).
     * Sfondo provvisorio (bianco): i colori definitivi arriveranno con colors.css.
     */
    header {
        display: flex;
        position: fixed;
        top: 0;
        inset-inline: 0;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-sm);
        height: var(--header-height);
        background-color: white;
    }

    /*
     * Nella landing nasce trasparente sopra la hero scura (testo chiaro) e torna opaca (testo normale)
     * quando la hero esce dalla vista: "view-timeline-name: --hero" è dichiarato lì (Hero.svelte).
     * Senza supporto per le scroll-driven animations resta semplicemente opaca fin da subito: sicura
     * e leggibile, l'effetto "vede sopra la hero" è solo un miglioramento, non una base necessaria.
     */
    @supports (view-timeline-name: --t) {
        header[data-home] {
            background-color: transparent;
            color: #f5efe6;
            /* "auto": senza durata esplicita un'animazione guidata dallo scroll avrebbe durata 0 e nessun effetto */
            animation: diventa-opaca auto linear both;
            animation-timeline: --hero;
            animation-range: exit;
        }
    }

    @keyframes diventa-opaca {
        to {
            background-color: white;
            color: inherit;
        }
    }

    header > a {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
    }

    /* Nome dell'associazione in Garamond come i titoli, non nel font del corpo del testo */
    header > a span:last-child {
        font-family: var(--font-heading);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
    }

    /*
     * ":global()": il logo arriva via {@html} (stringa grezza), Svelte non può aggiungergli la classe
     * di scoping. Senza :global() la regola non matcherebbe mai l'svg reale — qui il risultato era
     * casualmente giusto lo stesso, perché la stringa del logo ha già width/height scritti a mano
     * (22×36, vedi sopra), ma la regola in sé non ha mai fatto nulla finché non si tocca quel valore.
     */
    header > a span :global(svg) {
        height: 2.5rem;
        width: auto;
    }

    /*
     * Due barre semplici (non un <svg>): niente stranezze di transform-origin su elementi SVG tra
     * browser (causa più probabile dei problemi avuti con l'icona disegnata a mano in precedenza) —
     * su un elemento normale ruotare intorno al proprio centro è prevedibile ovunque.
     */
    button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 23px;
        padding: 0;
        appearance: none;
        background: none;
        border: none;
    }

    button span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: currentColor;
        transform-origin: center;
        transition: transform 0.2s ease;
    }

    @media (prefers-reduced-motion: reduce) {
        button span {
            transition: none;
        }
    }

    /* Le due barre diventano una X quando il menu è aperto: lo stato è sul bottone stesso, "aria-expanded" */
    button[aria-expanded="true"] span:first-child {
        transform: translateY(10.5px) rotate(-45deg);
    }

    button[aria-expanded="true"] span:last-child {
        transform: translateY(-10.5px) rotate(45deg);
    }
</style>
