<script lang="ts">
    import "$lib/styles/typography.css";
    import "$lib/styles/colors.css";
    import "$lib/styles/layout.css";
    import "$lib/styles/content.css";
    import "$lib/styles/forms.css";
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
