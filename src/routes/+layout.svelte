<script lang="ts">
    import "$lib/styles/typography.css";
    import "$lib/styles/colors.css";
    import favicon from "$lib/assets/favicon.svg";
    import SiteHeader from "./SiteHeader.svelte";
    import SiteFooter from "./SiteFooter.svelte";

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
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<a href="#contenuto">Salta al contenuto</a>

<SiteHeader />

{@render children()}

<SiteFooter />

<style>
    :global(body) {
        max-width: 65ch;
        margin-inline: auto;
        padding-inline: 1rem;
        overflow-wrap: break-word;
    }

    :global(img, video) {
        max-width: 100%;
        height: auto;
    }

    :global(iframe) {
        max-width: 100%;
    }
</style>
