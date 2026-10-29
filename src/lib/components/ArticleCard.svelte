<script lang="ts">
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { article, level = 3 }: { article: Article; level?: 2 | 3 | 4 } = $props();
</script>

<article itemscope itemtype="https://schema.org/Article">
    <a itemprop="url" href={article.href}>
        <p>
            <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time> ·
            <span itemprop="articleSection">{categoryName(article.category)}</span>
        </p>
        <svelte:element this={`h${level}`}><span itemprop="headline">{article.title}</span></svelte:element>
        <p itemprop="description">{article.excerpt}</p>
    </a>
</article>
