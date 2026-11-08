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
     sinistra, la prima frase della didascalia come titolo e il resto a destra; sotto, le sue foto -->
{#if galleryPosts.length > 0}
    <TimelineSections items={galleryPosts} date={(post) => post.date}>
        {#snippet entry(post, level)}
            <article itemscope itemtype="https://schema.org/SocialMediaPosting">
                <div>
                    <p><time itemprop="datePublished" datetime={post.date}>{formatArticleDate(post.date)}</time></p>
                    <svelte:element this={`h${level}`} itemprop="headline">{post.title}</svelte:element>
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

    article > div + :global(ul) {
        margin-block-start: var(--space-5);
    }
</style>
