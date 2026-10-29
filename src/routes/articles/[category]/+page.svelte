<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import CategoryNav from "../CategoryNav.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.category.name} — Articoli — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={data.category.description} />
</svelte:head>

<header>
    <h1>{data.category.name}</h1>
    <p>{data.category.description}</p>
</header>

<CategoryNav />

<ol>
    {#each data.articles as article (article.href)}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ol>

<p class="rimando"><a href="/articles">Tutti gli articoli</a></p>
