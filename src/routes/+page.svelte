<script lang="ts">
    import Hero from "$lib/components/landing/Hero.svelte";
    import UpcomingEvents from "$lib/components/landing/UpcomingEvents.svelte";
    import About from "$lib/components/landing/About.svelte";
    import Featured from "$lib/components/landing/Featured.svelte";
    import LatestNews from "$lib/components/landing/LatestNews.svelte";
    import Gallery from "$lib/components/landing/Gallery.svelte";
    import Support from "$lib/components/landing/Support.svelte";
</script>

<svelte:head>
    <title>Filarmonica Alessandro Stradella APS — Fivizzano dal 1777</title>
    <meta name="description" content="Filarmonica Alessandro Stradella APS: banda e scuola di musica di Fivizzano, in Lunigiana, dal 1777. Concerti, eventi, notizie e come sostenerci." />
</svelte:head>

<main id="contenuto">
    <Hero />
    <UpcomingEvents />
    <About />
    <Featured />
    <LatestNews />
    <Gallery />
    <Support />
</main>
