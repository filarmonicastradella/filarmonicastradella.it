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
        {#if isPress}
            <!-- Per i motori di ricerca: l'articolo di giornale parla della Filarmonica (l'ente descritto nella home) -->
            <link itemprop="about" href="{organization.url}/#ente" />
        {/if}
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
            /*
             * A destra titolo e descrizione uno dopo l'altro; a sinistra occhiello e firma, in alto, nella stessa cella alta
             * quanto la scheda: la firma scende sotto l'occhiello di quanto è alta la sua riga, qualunque sia la lunghezza del titolo.
             */
            grid-template-rows: auto 1fr;
            align-items: start;
            gap: var(--space-3) var(--space-6);
        }

        /* L'occhiello all'altezza della prima riga del titolo */
        p:first-child {
            grid-area: 1 / 1 / 3 / 2;
            padding-block-start: var(--space-2);
        }

        :is(h2, h3, h4) {
            grid-area: 1 / 2;
        }

        [itemprop="description"] {
            grid-area: 2 / 2;
        }

        [itemprop="description"] + p {
            grid-area: 1 / 1 / 3 / 2;
            margin: calc(var(--space-2) + var(--fs-eyebrow) * var(--lh-body) + var(--space-3)) 0 0;
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
