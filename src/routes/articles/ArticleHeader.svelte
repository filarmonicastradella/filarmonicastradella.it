<script lang="ts">
    import type { Snippet } from "svelte";
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";

    // Intestazione di ogni articolo: categoria in occhiello, titolo, riassunto e firma; `children` è la foto di copertina,
    // se c'è, e `style` le sue proprietà (--cover-placeholder, --cover-position, --cover-archive)
    let { article, children, style }: { article: Article; children?: Snippet; style?: string } = $props();
</script>

<header itemscope itemtype="https://schema.org/Article" {style}>
    <p><a itemprop="articleSection" href="/articles/{article.category}">{categoryName(article.category)}</a></p>
    <h1 itemprop="headline">{article.title}</h1>
    <p itemprop="description">{article.excerpt}</p>
    <p>
        {#if article.author}
            di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span></span> ·
        {/if}
        <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
    </p>
    {@render children?.()}
</header>
