<script lang="ts">
    import Hero from "./Hero.svelte";
    import UpcomingEvents from "./UpcomingEvents.svelte";
    import About from "./About.svelte";
    import Featured from "./Featured.svelte";
    import LatestNews from "./LatestNews.svelte";
    import Gallery from "./Gallery.svelte";
    import Support from "./Support.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Filarmonica Alessandro Stradella APS — Fivizzano dal 1777</title>
    <meta name="description" content="Filarmonica Alessandro Stradella APS: banda e scuola di musica di Fivizzano, in Lunigiana, dal 1777. Concerti, eventi, notizie e come sostenerci." />
</svelte:head>

<main id="contenuto">
    <Hero />
    <UpcomingEvents events={data.events} />
    <About />
    <Featured />
    <LatestNews />
    <Gallery slides={data.gallery} />
    <Support />
</main>
