<script lang="ts">
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { article, level = 3 }: { article: Article; level?: 2 | 3 | 4 } = $props();
</script>

<!-- Come la card evento (docs/DESIGN.md): occhiello, titolo, descrizione e in fondo la firma come didascalia -->
<article itemscope itemtype="https://schema.org/Article">
    <a itemprop="url" href={article.href}>
        <p><span itemprop="articleSection">{categoryName(article.category)}</span></p>
        <svelte:element this={`h${level}`} itemprop="headline">{article.title}</svelte:element>
        <p itemprop="description">{article.excerpt}</p>
        <p>
            {#if article.author}
                di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span></span> ·
            {/if}
            <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
        </p>
    </a>
</article>

<style>
    /* La firma come didascalia, sempre in fondo alla scheda */
    [itemprop="description"] + p {
        margin-block-start: auto;
        color: var(--text-muted);
        font-size: var(--fs-small);
    }

    /*
     * Quando la scheda è larga (gli indici degli articoli su schermo largo), come le sezioni da leggere
     * (layout.css): categoria e firma a sinistra, titolo e riassunto a destra nella colonna di testo, sotto
     * un filetto da un bordo all'altro. Nella colonna stretta di una sezione (la home) resta una scheda sola.
     */
    article {
        container-type: inline-size;
    }

    @container (min-width: 48rem) {
        a {
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
    }
</style>
