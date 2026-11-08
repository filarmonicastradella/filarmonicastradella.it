<script lang="ts">
    import ArticleHeader from "../../ArticleHeader.svelte";
    import ArticleFooter from "../../ArticleFooter.svelte";
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

<ArticleFooter article={data.article} />
