<script lang="ts">
    import { formatNewsDate } from "$lib/news";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.post.title} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={data.post.excerpt} />
</svelte:head>

<article itemscope itemtype="https://schema.org/NewsArticle">
    <header>
        <p><time itemprop="datePublished" datetime={data.post.date}>{formatNewsDate(data.post.date)}</time></p>
        <h1 itemprop="headline">{data.post.title}</h1>
    </header>

    <data.post.component />
</article>

<p><a href="/news">Tutte le notizie</a></p>
