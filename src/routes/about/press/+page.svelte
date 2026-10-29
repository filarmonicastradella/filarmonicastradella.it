<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { press } from "$lib/press";
</script>

<svelte:head>
    <title>Rassegna stampa — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Gli articoli dei giornali sulla Filarmonica Alessandro Stradella di Fivizzano, dal più recente, con il link alla testata." />
</svelte:head>

<header>
    <h1>Rassegna stampa</h1>
    <p>Gli articoli dei giornali sulla Filarmonica, dal più recente.</p>
</header>

<ol>
    {#each press as item (item.title)}
        <li><ArticleCard article={item} level={2} /></li>
    {/each}
</ol>

<p class="rimando"><a href="/about">L'associazione</a></p>
