<script lang="ts">
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";
    import { organization } from "$lib/organization";
    import type { PressItem } from "$lib/press";

    // Un nostro articolo (occhiello: la categoria) o un articolo di giornale della rassegna stampa (occhiello: la
    // testata, link al giornale). `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { article, level = 3 }: { article: Article | PressItem; level?: 2 | 3 | 4 } = $props();

    const isPress = $derived("publisher" in article);
</script>

<!-- Come la card evento (docs/DESIGN.md): occhiello, titolo, descrizione e in fondo la firma come didascalia -->
<!-- Senza link (un articolo di giornale solo su carta) il contenuto sta in un <div>: content.css, Schede -->
<article itemscope itemtype="https://schema.org/{isPress ? 'NewsArticle' : 'Article'}">
    <svelte:element
        this={article.href ? "a" : "div"}
        itemprop={article.href ? "url" : undefined}
        href={article.href}
        target={isPress && article.href ? "_blank" : undefined}
        rel={isPress && article.href ? "noopener noreferrer" : undefined}
    >
        <!-- In testa la categoria (o la testata) e, sotto, la firma: autore e data -->
        <p>
            {#if "publisher" in article}
                <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><span itemprop="name">{article.publisher}</span></span>
            {:else}
                <span itemprop="articleSection">{categoryName(article.category)}</span>
            {/if}
            <br /><span>
                {#if article.author}
                    di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span></span> ·
                {/if}
                <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
                {#if !article.href}
                    · edizione cartacea
                {/if}
            </span>
        </p>
        <svelte:element this={`h${level}`} itemprop="headline">{article.title}</svelte:element>
        <p itemprop="description">{article.excerpt}</p>
        {#if isPress}
            <!-- Per i motori di ricerca: l'articolo di giornale parla della Filarmonica (l'ente descritto nella home) -->
            <link itemprop="about" href="{organization.url}/#ente" />
        {/if}
    </svelte:element>
</article>

