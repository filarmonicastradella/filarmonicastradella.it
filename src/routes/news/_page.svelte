<script lang="ts">
    import NewsCard from "$lib/components/NewsCard.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import { news } from "$lib/news";
</script>

<svelte:head>
    <title>Notizie — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le ultime notizie della Filarmonica Alessandro Stradella APS di Fivizzano." />
</svelte:head>

<header>
    <h1>Notizie</h1>
    <p>Le notizie dell'associazione, dalla più recente.</p>
</header>

{#if news.length === 0}
    <p>Nessuna notizia pubblicata.</p>
{:else}
    <TimelineSections items={news} date={(post) => post.date}>
        {#snippet entry(post, level)}
            <NewsCard {post} {level} />
        {/snippet}
    </TimelineSections>
{/if}
