<script lang="ts">
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";
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
        <p>
            {#if "publisher" in article}
                <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><span itemprop="name">{article.publisher}</span></span>
            {:else}
                <span itemprop="articleSection">{categoryName(article.category)}</span>
            {/if}
        </p>
        <svelte:element this={`h${level}`} itemprop="headline">{article.title}</svelte:element>
        <p itemprop="description">{article.excerpt}</p>
        <p>
            {#if article.author}
                di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span></span> ·
            {/if}
            <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
            {#if !article.href}
                · edizione cartacea
            {/if}
        </p>
    </svelte:element>
</article>

<style>
    /* La firma come didascalia, sempre in fondo alla scheda */
    [itemprop="description"] + p {
        margin-block-start: auto;
        color: var(--text-muted);
        font-size: var(--fs-small);
    }

    /*
     * Quando la scheda è larga (su schermo largo, content.css), come le sezioni da leggere (layout.css) e
     * come la card evento: categoria e firma a sinistra, titolo e riassunto a destra nella colonna di testo,
     * sotto un filetto da un bordo all'altro. Quando è stretta resta una scheda sola.
     */
    article {
        container-type: inline-size;
    }

    @container (min-width: 48rem) {
        article > :is(a, div) {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, var(--container-text));
            grid-template-areas:
                "section title"
                "byline description";
            align-content: start;
            gap: var(--space-3) var(--space-6);
        }

        p:first-child {
            grid-area: section;
            align-self: center;
        }

        :is(h2, h3, h4) {
            grid-area: title;
        }

        [itemprop="description"] {
            grid-area: description;
        }

        [itemprop="description"] + p {
            grid-area: byline;
            margin: 0;
        }

        /* La freccia dei link esterni (rassegna stampa) sta nell'angolo: lo spazio lo lascia il titolo, non la scheda,
           così le colonne restano allineate a quelle delle altre pagine */
        a[target="_blank"] {
            padding-inline-end: 0;
        }

        a[target="_blank"] > :is(h2, h3, h4) {
            padding-inline-end: var(--space-7);
        }
    }
</style>
