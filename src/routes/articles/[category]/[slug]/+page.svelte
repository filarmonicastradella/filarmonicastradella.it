<script lang="ts">
    import { categoryName, formatArticleDate } from "$lib/articles";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const Content = $derived(data.article.component!);
</script>

<svelte:head>
    <title>{data.article.title} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={data.article.excerpt} />
</svelte:head>

<article itemscope itemtype="https://schema.org/Article">
    <header>
        <p>
            <time itemprop="datePublished" datetime={data.article.date}>{formatArticleDate(data.article.date)}</time> ·
            <a itemprop="articleSection" href="/articles/{data.article.category}">{categoryName(data.article.category)}</a>
            {#if data.article.author}
                · di <span itemprop="author">{data.article.author}</span>
            {/if}
        </p>
        <h1 itemprop="headline">{data.article.title}</h1>
    </header>

    <Content />
</article>

<p class="rimando"><a href="/articles">Tutti gli articoli</a></p>
