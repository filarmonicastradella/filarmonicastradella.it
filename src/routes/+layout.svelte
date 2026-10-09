<script lang="ts">
    import "$lib/styles/typography.css";
    import "$lib/styles/colors.css";
    import "$lib/styles/layout.css";
    import "$lib/styles/content.css";
    import "$lib/styles/forms.css";
    import { onNavigate } from "$app/navigation";
    import { menu } from "$lib/menu.svelte";
    import { page } from "$app/state";
    import { organization } from "$lib/organization";
    import favicon from "$lib/assets/icon.svg";
    import SiteHeader from "./SiteHeader.svelte";
    import SiteFooter from "./SiteFooter.svelte";
    // import OldFooterReference from "./OldFooterReference.svelte"; // TEMPORANEO: confronto visivo concluso, da togliere del tutto

    // Cormorant Garamond: solo i pesi del design system (500, 600 e il corsivo 500 per la parola evidenziata)
    import "@fontsource/cormorant-garamond/latin-500.css";
    import "@fontsource/cormorant-garamond/latin-600.css";
    import "@fontsource/cormorant-garamond/latin-500-italic.css";

    // Plus Jakarta Sans — variable
    import "@fontsource-variable/plus-jakarta-sans/wght.css";

    let { children } = $props();

    const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cambio di pagina animato con le View Transitions (dove il browser le supporta; il CSS descrive l'animazione).
    onNavigate((navigation) => {
        // Dal menu aperto basta la sua chiusura: la nuova pagina si carica subito dietro il pannello, ancora
        // coperta mentre le corde risalgono, e il pannello sfumando la scopre. Niente dissolvenza in più.
        if (menu.open) {
            menu.open = false;
            return;
        }
        if (!document.startViewTransition || reducedMotion()) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<!--
    Per motori di ricerca e anteprime dei link: l'indirizzo canonico della pagina (sempre senza "www") e
    un'immagine unica per le condivisioni. Titolo e descrizione delle anteprime vengono dal <title> e dalla
    meta description di ogni pagina.
-->
<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="canonical" href={organization.url + page.url.pathname} />
    <meta property="og:site_name" content={organization.name} />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={organization.url + page.url.pathname} />
    <meta property="og:image" content="{organization.url}/anteprima.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="I musicisti della Filarmonica in concerto" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a href="#contenuto">Salta al contenuto</a>

<SiteHeader />

<!-- Con il menu aperto il resto della pagina, coperto dal pannello, non si raggiunge con la tastiera -->
<main id="contenuto" inert={menu.open}>
    {@render children()}
</main>

<!-- <OldFooterReference /> -->
<SiteFooter inert={menu.open} />

<style>
    /* Visibile solo quando riceve il focus da tastiera: chi naviga con Tab salta subito al contenuto */
    a[href="#contenuto"] {
        position: absolute;
        z-index: 20;
        top: var(--space-4);
        left: var(--space-4);
        padding: var(--space-3) var(--space-5);
        background-color: var(--accent);
        color: var(--on-accent);
        transform: translateY(-150%);
    }

    a[href="#contenuto"]:focus {
        transform: none;
    }
</style>
