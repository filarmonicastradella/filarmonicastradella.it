<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articles } from "$lib/articles";
    import CategoryNav from "./CategoryNav.svelte";
</script>

<svelte:head>
    <title>Articoli — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Ricerche d'archivio, didattica, teoria musicale e storie della Filarmonica Alessandro Stradella APS di Fivizzano."
    />
</svelte:head>

<header>
    <h1>Articoli</h1>
    <p>Ricerche, lezioni e racconti della Filarmonica, dal più recente.</p>
</header>

<CategoryNav />

<!-- In ordine di data, dal più recente: un elenco ordinato, una scheda sotto l'altra -->
<ol>
    {#each articles as article (article.href)}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ol>
