<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { activeCategories, articles } from "$lib/articles";
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

<nav aria-label="Categorie">
    <ul>
        {#each activeCategories as category (category.slug)}
            <li><a href="/articles/{category.slug}">{category.name}</a></li>
        {/each}
    </ul>
</nav>

<ul>
    {#each articles as article (article.href)}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ul>
