<script lang="ts">
    import InstagramGrid from "$lib/components/InstagramGrid.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import { formatArticleDate } from "$lib/articles";
    import { galleryPosts } from "$lib/gallery";
</script>

<svelte:head>
    <title>Foto e video — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Le foto e i video dei concerti e delle attività della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<header>
    <h1>Foto e video</h1>
    <p>I nostri concerti e le nostre attività, raccolti dal profilo Instagram della Filarmonica.</p>
    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Seguici su Instagram</a></p>
</header>

<!-- Come il calendario: sezioni per mese (e per anno, se più di uno) con l'indice in cima, e un post per riga d'agenda, la data a
     sinistra e la didascalia a destra; sotto, le sue foto -->
{#if galleryPosts.length > 0}
    <TimelineSections items={galleryPosts} date={(post) => post.date}>
        {#snippet entry(post, level)}
            <article id={post.anchor} itemscope itemtype="https://schema.org/SocialMediaPosting">
                <div>
                    <!-- La didascalia di Instagram non è un titolo: il titolo del post è la sua data, con l'aspetto delle date -->
                    <svelte:element this={`h${level}`}><time itemprop="datePublished" datetime={post.date}>{formatArticleDate(post.date)}</time></svelte:element>
                    {#if post.paragraphs.length > 0}
                        <div itemprop="description">
                            {#each post.paragraphs as paragraph, i (i)}
                                <p>{paragraph}</p>
                            {/each}
                        </div>
                    {/if}
                    <link itemprop="url" href={post.permalink} />
                </div>
                <InstagramGrid slides={post.slides} />
            </article>
        {/snippet}
    </TimelineSections>
{/if}

<section>
    <h2>Hai foto o video di un nostro concerto?</h2>
    <p>
        <a href="/contatti/scrivi?motivo=foto">Mandaceli dal modulo</a>: scegliamo i migliori per Instagram, e da lì arrivano anche su
        questa pagina.
    </p>
</section>

<p class="rimando"><a href="/associazione">Associazione</a></p>

<style>
    /*
     * La scheda di un post è una riga d'agenda come quelle del calendario (content.css), ma con le foto sotto: la parte di testo
     * resta alta quanto il suo contenuto, invece di tutta la scheda, e la griglia la segue con lo stacco tra titolo e testo.
     */
    article > div {
        block-size: auto;
    }

    /* Nella riga d'agenda la data (qui il titolo) sta a sinistra, dove le schede hanno la data, e la didascalia a destra dall'alto */
    article > div > :global(:is(h3, h4)) {
        grid-area: 1 / 1 / 3 / 2;
    }

    article > div > [itemprop="description"] {
        grid-area: 1 / 2 / 3 / 3;
    }

    /* La data e la prima riga della didascalia sulla stessa linea di base; tra i paragrafi lo stacco del testo (layout.css) */
    article > div {
        align-items: baseline;
    }

    [itemprop="description"] > p {
        margin: 0;
    }

    [itemprop="description"] > p + p {
        margin-block-start: var(--space-5);
    }

    article > div + :global(ul) {
        margin-block-start: var(--space-5);
    }

    /*
     * Da 64rem la data, la didascalia e le foto del post stanno in una griglia sola (la parte di testo e la griglia delle foto diventano
     * trasparenti, display: contents): a sinistra la data e sotto la foto grande, che arriva fino in fondo alle piccole; a destra la
     * didascalia e sotto le piccole, tre per riga su sei colonne larghe in tutto quanto la colonna di testo. La foto grande non decide
     * l'altezza delle righe (contain: size): la riempie. Il filetto in alto della scheda passa all'articolo. Una foto sola sta a destra,
     * sotto la didascalia.
     */
    @media (min-width: 64rem) {
        article {
            --small: calc((var(--container-text) - 5 * var(--space-2)) / 6);
            --row: calc((var(--small) * 2 + var(--space-2)) * 3 / 4);
            display: grid;
            grid-template-columns: minmax(0, 1fr) repeat(6, var(--small));
            grid-template-rows: auto auto;
            grid-auto-rows: var(--row);
            gap: var(--space-2);
            align-items: baseline;
            padding-block-start: var(--space-5);
            border-block-start: var(--rule-width) solid var(--border);
        }

        article > div,
        article > div + :global(ul) {
            display: contents;
        }

        article > div > :global(:is(h3, h4)) {
            grid-area: 1 / 1;
            margin-inline-end: calc(var(--space-6) - var(--space-2));
        }

        article > div > [itemprop="description"] {
            grid-area: 1 / 2 / 3 / -1;
            margin-block-end: var(--space-3);
        }

        article > :global(ul) > :global(li) {
            align-self: stretch;
        }

        article > :global(ul) > :global(li:first-child) {
            grid-column: 1;
            grid-row: 2 / span 2;
            margin-inline-end: calc(var(--space-6) - var(--space-2));
            contain: size;
        }

        article:has(li:nth-child(5)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 3;
        }

        article:has(li:nth-child(8)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 4;
        }

        article:has(li:nth-child(11)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 5;
        }

        article:has(li:nth-child(14)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 6;
        }

        article:has(li:nth-child(17)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 7;
        }

        article:has(li:nth-child(20)) > :global(ul) > :global(li:first-child) {
            grid-row: 2 / span 8;
        }

        article > :global(ul) > :global(li:first-child) :global(:is(figure, a, img, video)) {
            block-size: 100%;
        }

        article > :global(ul) > :global(li:first-child) :global(:is(img, video)) {
            aspect-ratio: auto;
        }

        /* Le piccole a destra: due colonne ciascuna, tre per riga; l'ultima riga si allarga (InstagramGrid) entro la colonna di destra */
        article > :global(ul) > :global(li:not(:first-child)) {
            grid-column: span 2;
        }

        article > :global(ul) > :global(li:nth-last-child(2):nth-child(3n + 2)),
        article > :global(ul) > :global(li:last-child:nth-child(3n)) {
            grid-column: span 3;
        }

        article > :global(ul) > :global(li:not(:first-child):last-child:nth-child(3n + 2)) {
            grid-column: 2 / -1;
        }

        /* Una foto sola: a destra sotto la didascalia, in 4:3 */
        article:not(:has(li:nth-child(2))) {
            grid-auto-rows: auto;
        }

        article:not(:has(li:nth-child(2))) > :global(ul) > :global(li:first-child) {
            grid-column: 2 / -1;
            grid-row: 3;
            margin-inline-end: 0;
            contain: none;
        }

        article:not(:has(li:nth-child(2))) > :global(ul) > :global(li:first-child) :global(:is(img, video)) {
            aspect-ratio: 4 / 3;
        }
    }
</style>
