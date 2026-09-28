<script lang="ts">
    import "$lib/styles/typography.css";
    import "$lib/styles/colors.css";
    import "$lib/styles/layout.css";
    import "$lib/styles/content.css";
    import "$lib/styles/forms.css";
    import { onNavigate } from "$app/navigation";
    import favicon from "$lib/assets/favicon.svg";
    import SiteHeader from "./SiteHeader.svelte";
    import SiteFooter from "./SiteFooter.svelte";
    import OldFooterReference from "./OldFooterReference.svelte"; // TEMPORANEO: da togliere dopo il confronto

    // Cormorant Garamond — pesi specifici
    import "@fontsource/cormorant-garamond/latin-400.css";
    import "@fontsource/cormorant-garamond/latin-500.css";
    import "@fontsource/cormorant-garamond/latin-600.css";
    import "@fontsource/cormorant-garamond/latin-700.css";
    import "@fontsource/cormorant-garamond/latin-400-italic.css";
    import "@fontsource/cormorant-garamond/latin-700-italic.css";

    // Montserrat — variable
    import "@fontsource-variable/montserrat/wght.css";

    let { children } = $props();

    // Cambio di pagina animato con le View Transitions (dove il browser le supporta; il CSS descrive l'animazione).
    onNavigate((navigation) => {
        if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<a href="#contenuto">Salta al contenuto</a>

<SiteHeader />

<main id="contenuto">
    {@render children()}
</main>

<OldFooterReference />
<SiteFooter />
