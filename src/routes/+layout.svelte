<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import { afterNavigate } from "$app/navigation";
    import { navItems } from "$lib/navigation";

    // Cormorant Garamond — pesi specifici
    import "@fontsource/cormorant-garamond/400.css";
    import "@fontsource/cormorant-garamond/500.css";
    import "@fontsource/cormorant-garamond/600.css";
    import "@fontsource/cormorant-garamond/700.css";
    import "@fontsource/cormorant-garamond/400-italic.css";
    import "@fontsource/cormorant-garamond/700-italic.css";

    // Montserrat — variable
    import "@fontsource-variable/montserrat/wght.css";

    let { children } = $props();

    // Il menu è un <details> nativo: funziona senza JS. Con JS si richiude dopo la navigazione.
    let menuOpen = $state(false);

    afterNavigate(() => {
        menuOpen = false;
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<a href="#contenuto">Salta al contenuto</a>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logoSvg}</span>
        <span>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></span>
    </a>

    <nav aria-label="Navigazione principale">
        <details bind:open={menuOpen}>
            <summary>Menu</summary>
            <ul>
                {#each navItems as item}
                    {#if "links" in item}
                        <li>
                            <details name="menu-accordion">
                                <summary>{item.title}</summary>
                                <ul>
                                    {#each item.links as link}
                                        <li><a href={link.href}>{link.label}</a></li>
                                    {/each}
                                </ul>
                            </details>
                        </li>
                    {:else}
                        <li><a href={item.href}>{item.title}</a></li>
                    {/if}
                {/each}
            </ul>
        </details>
    </nav>
</header>

{@render children()}

<footer>
    <section aria-labelledby="footer-contatti-heading">
        <h2 id="footer-contatti-heading">Contatti</h2>

        <address>
            <dl>
                <dt>Indirizzo</dt>
                <dd>
                    <a href="https://maps.google.com/?q=Via+Stretta+5+54013+Fivizzano+MS" target="_blank" rel="noopener noreferrer">Via Stretta 5, 54013 Fivizzano (MS)</a>
                </dd>
                <dt>Telefono</dt>
                <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
                <dt>Email</dt>
                <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
                <dt>PEC</dt>
                <dd><a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a></dd>
            </dl>
        </address>
    </section>

    <nav aria-label="Social media">
        <ul>
            <li><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://wa.me/393505363110" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="https://youtube.com/@filarmonicastradella" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://tiktok.com/@filarmonicastradella" target="_blank" rel="noopener noreferrer">TikTok</a></li>
        </ul>
    </nav>

    <section aria-labelledby="footer-associazione-heading">
        <h2 id="footer-associazione-heading">L'associazione</h2>

        <dl>
            <dt>Denominazione</dt>
            <dd>Filarmonica Alessandro Stradella APS</dd>
            <dt>Codice fiscale</dt>
            <dd>90021290458</dd>
            <dt>Iscrizione al RUNTS</dt>
            <dd>Repertorio n. 176207</dd>
            <dt>Affiliazione</dt>
            <dd>
                <a href="https://www.anbima.it/massacarrara/regionetoscana-massacarrara-unita-di-base" target="_blank" rel="noopener noreferrer">ANBIMA APS</a>
            </dd>
        </dl>
    </section>

    <nav aria-label="Informazioni legali">
        <ul>
            <li><a href="/legal/privacy">Informativa Privacy</a></li>
            <li><a href="/legal/cookies">Politica dei Cookie</a></li>
            <li><a href="/legal/terms">Termini e Condizioni</a></li>
        </ul>
    </nav>

    <p><small>&copy; {new Date().getFullYear()} Filarmonica Alessandro Stradella APS. Tutti i diritti riservati.</small></p>
</footer>

<!--
<style>
    :global(:root) {
        /* ==========================================================================
       1. TIPOGRAFIA & FONT FAMILIES
       ========================================================================== */
        --font-heading: "Cormorant Garamond", Georgia, serif;
        --font-body: "Montserrat Variable", system-ui, -apple-system,
            sans-serif;
        --font-family-code: "ui-monospace", "SFMono-Regular", "Menlo", "Monaco",
            "Consolas", monospace;

        /* Pesi Font */
        --font-weight-regular: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;

        /* Scala Tipografica Armonizzata (Ratio 1.25 - Terza Maggiore | Base 16px) */
        --font-size-xs: 0.75rem; /* 12.0px | Note legali, didascalie, micro-badge */
        --font-size-sm: 0.875rem; /* 14.0px | Metadati, tag, form labels */
        --font-size-md: 1rem; /* 16.0px | Corpo testo (Base) */
        --font-size-lg: 1.25rem; /* 20.0px | Lead text, H5, Subtitles */
        --font-size-xl: 1.563rem; /* 25.0px | Titoli di Card / Modali, H4 */
        --font-size-2xl: 1.953rem; /* ~31.2px | Titoli di Sezione, H3 */
        --font-size-3xl: 2.441rem; /* ~39.0px | Titoli di Pagina, H2 */
        --font-size-4xl: 3.052rem; /* ~48.8px | Main Headline / Hero Title, H1 */
        --font-size-display: 3.815rem; /* ~61.0px | Display / Big Poster Hero */
        --font-size-6xl: 4.768rem; /* ~76.3px | Extra Large Display / Hero Hero */

        /* Line Heights (Calibrati per la nuova scala) */
        --line-height-display: 1.05;
        --line-height-heading: 1.15;
        --line-height-body: 1.6;

        /* Letter Spacing */
        --letter-spacing-tight: -0.02em;
        --letter-spacing-normal: 0em;
        --letter-spacing-wide: 0.04em;

        /* ==========================================================================
       2. TEMA CHIARO (Light Theme - Default)
       ========================================================================== */
        /* Primario - Granata */
        --color-primary-50: #fbf4f4;
        --color-primary-100: #f5e6e6;
        --color-primary-200: #eccbcb;
        --color-primary-300: #dfa4a4;
        --color-primary-400: #cb7171;
        --color-primary-500: #b54747;
        --color-primary: #701c1c; /* Granata originale */
        --color-primary-hover: #591515;
        --color-primary-active: #420f0f;
        --color-primary-contrast: #ffffff;

        /* Secondario - Oro / Ottone */
        --color-secondary-light: #f4f0e8;
        --color-secondary: #c98a2c; /* Oro originale */
        --color-secondary-hover: #b07621;
        --color-secondary-contrast: #ffffff;

        /* Neutrali Caldi (Ispirati alla pietra lavica e all'avorio sofisticato) */
        --bg-page: #fbf9f7;
        --bg-surface: #ffffff;
        --bg-surface-raised: #ffffff;
        --bg-subtle: #f4efe9;
        --bg-hover: #ede6dd;

        /* Testi */
        --text-main: #1d1a18; /* Antracite neutro-caldo ad altissimo contrasto */
        --text-muted: #625c56; /* Leggibilità garantita per metadati */
        --text-disabled: #a09890;
        --text-on-primary: #ffffff;

        /* Bordi */
        --border-color-subtle: #f0eae1;
        --border-color-medium: #e2d9cd;
        --border-color-strong: #c2b5a3;

        /* Feedback */
        --color-success: #2b7036;
        --color-warning: #c76a13;
        --color-error: #c52828;
        --color-info: #1d72aa;

        /* ==========================================================================
       3. EFFETTI VISIVI E OMBRE (Light)
       ========================================================================== */
        --shadow-sm: 0 1px 2px 0 rgba(35, 25, 20, 0.04);
        --shadow-md: 0 4px 12px -2px rgba(35, 25, 20, 0.06),
            0 2px 4px -1px rgba(35, 25, 20, 0.02);
        --shadow-lg: 0 16px 28px -4px rgba(35, 25, 20, 0.08),
            0 6px 10px -3px rgba(35, 25, 20, 0.03);

        /* ==========================================================================
       4. SPAZIATURE E LAYOUT (Grid a base 8px)
       ========================================================================== */
        --space-2xs: 0.25rem; /* 4px */
        --space-xs: 0.5rem; /* 8px */
        --space-sm: 0.75rem; /* 12px */
        --space-md: 1rem; /* 16px */
        --space-lg: 1.5rem; /* 24px */
        --space-xl: 2rem; /* 32px */
        --space-2xl: 3rem; /* 48px */
        --space-3xl: 4rem; /* 64px */

        --content-max-width-text: 65ch;
        --content-max-width-page: 1400px;
        --navbar-height: 73px;

        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;
        --radius-full: 9999px;

        --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);

        --z-dropdown: 1000;
        --z-sticky: 1020;
        --z-fixed: 1030;
        --z-modal-backdrop: 1040;
        --z-modal: 1050;
        --z-toast: 1060;

        --transition-duration: 250ms;
        --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ==========================================================================
   5. TEMA NOTTURNO (Dark Theme Ricalibrato)
   ========================================================================== */
    @media (prefers-color-scheme: dark) {
        :global(:root) {
            /* Primario - Granata Vivo e fedele a #701c1c */
            --color-primary-50: #2d1212;
            --color-primary-100: #421818;
            --color-primary-200: #591b1b;
            --color-primary-300: #731e1e;
            --color-primary-400: #812121;
            --color-primary-500: #892222;
            --color-primary: #8f2323;
            --color-primary-hover: #a62b2b;
            --color-primary-active: #bd3434;
            --color-primary-contrast: #ffffff;

            /* Secondario - Oro caldo e bilanciato */
            --color-secondary-light: #2b2318;
            --color-secondary: #dca042;
            --color-secondary-hover: #e8b258;
            --color-secondary-contrast: #141312;

            /* Neutrali Scuri - Ardesia/Antracite Caldo */
            --bg-page: #141312;
            --bg-surface: #1d1b1a;
            --bg-surface-raised: #262422;
            --bg-subtle: #2d2a28;
            --bg-hover: #383431;

            /* Testi Avorio/Perla */
            --text-main: #f4f0eb;
            --text-muted: #b0a79e;
            --text-disabled: #6e665e;
            --text-on-primary: #ffffff;

            /* Bordi */
            --border-color-subtle: #2a2725;
            --border-color-medium: #3d3835;
            --border-color-strong: #59524d;

            /* Ombreggiatura Dark */
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
            --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
            --shadow-lg: 0 16px 28px -4px rgba(0, 0, 0, 0.6);
        }
    }

    /* Override per Toggle Manuale Dark Mode */
    :global(:root.dark) {
        --color-primary-50: #2d1212;
        --color-primary-100: #421818;
        --color-primary-200: #591b1b;
        --color-primary-300: #731e1e;
        --color-primary-400: #812121;
        --color-primary-500: #892222;
        --color-primary: #8f2323;
        --color-primary-hover: #a62b2b;
        --color-primary-active: #bd3434;
        --color-primary-contrast: #ffffff;

        --color-secondary-light: #2b2318;
        --color-secondary: #dca042;
        --color-secondary-hover: #e8b258;
        --color-secondary-contrast: #141312;

        --bg-page: #141312;
        --bg-surface: #1d1b1a;
        --bg-surface-raised: #262422;
        --bg-subtle: #2d2a28;
        --bg-hover: #383431;

        --text-main: #f4f0eb;
        --text-muted: #b0a79e;
        --text-disabled: #6e665e;
        --text-on-primary: #ffffff;

        --border-color-subtle: #2a2725;
        --border-color-medium: #3d3835;
        --border-color-strong: #59524d;

        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
        --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
        --shadow-lg: 0 16px 28px -4px rgba(0, 0, 0, 0.6);
    }

    /* ==========================================================================
   RESET E STILI GLOBALI BASE
   ========================================================================== */

    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(body) {
        font-family: var(--font-body);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-body);
        color: var(--text-main);
        background-color: var(--bg-page);

        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Gerarchia Titoli */
    :global(h1, h2, h3, h4, h5, h6) {
        font-family: var(--font-heading);
        font-weight: var(--font-weight-bold);
        color: var(--text-main);
        margin-top: 0;
        margin-bottom: var(--space-xs);
        letter-spacing: var(--letter-spacing-tight);
    }

    :global(h1) {
        font-size: clamp(2rem, 3.5vw + 1rem, var(--font-size-4xl));
        line-height: var(--line-height-display);
    }

    :global(h2) {
        font-size: clamp(1.625rem, 2.5vw + 1rem, var(--font-size-3xl));
        line-height: var(--line-height-heading);
    }

    :global(h3) {
        font-size: var(--font-size-2xl);
        line-height: var(--line-height-heading);
    }

    :global(h4) {
        font-size: var(--font-size-xl);
        line-height: var(--line-height-heading);
    }

    :global(h5) {
        font-size: var(--font-size-lg);
        line-height: var(--line-height-heading);
    }

    /* Links */
    :global(a) {
        color: var(--color-primary);
        text-decoration: none;
        transition: color var(--transition-fast);
    }

    :global(a:hover) {
        color: var(--color-primary-hover);
    }

    /* Accessibility Focus */
    :global(:focus-visible) {
        outline: 2px solid var(--color-secondary);
        outline-offset: 2px;
    }
</style>
-->
