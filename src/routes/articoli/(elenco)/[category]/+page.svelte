<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articleKey } from "$lib/articles";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.category.name} — Articoli — Filarmonica Alessandro Stradella</title>
    <meta name="description" content={data.category.description} />
</svelte:head>

<ol>
    {#each data.articles as article (articleKey(article))}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ol>
