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
                    <!-- Il post su Instagram, sotto la didascalia (a contorno, come «Seguici su Instagram») -->
                    <p><a itemprop="url" href={post.permalink} target="_blank" rel="noopener noreferrer">Vedi su Instagram</a></p>
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

    /*
     * Nella riga d'agenda la data (qui il titolo) sta a sinistra, dove le schede hanno la data, e a destra la didascalia con sotto
     * «Vedi su Instagram»; sul telefono una sotto l'altra, in quest'ordine
     */
    article > div > :global(:is(h3, h4)) {
        grid-area: 1 / 1 / 3 / 2;
    }

    article > div > [itemprop="description"] {
        grid-area: 1 / 2;
    }

    article > div > p:has(> a) {
        grid-area: 2 / 2;
        align-self: start;
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
</style>
