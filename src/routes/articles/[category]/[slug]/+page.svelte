<script lang="ts">
    import ArticleHeader from "../../ArticleHeader.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const Content = $derived(data.article.component!);
</script>

<svelte:head>
    <title>{data.article.title} — Filarmonica Alessandro Stradella</title>
    <meta name="description" content={data.article.excerpt} />
</svelte:head>

<ArticleHeader article={data.article} />

<Content />

<p class="rimando"><a href="/articles">Tutti gli articoli</a></p>
