<script lang="ts">
    import InstagramGrid from "$lib/components/InstagramGrid.svelte";
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

<!-- Un post per sezione, dal più recente: la data fa da titolo, poi la didascalia e le foto -->
{#each galleryPosts as post (post.permalink)}
    <section>
        <h2>
            {#if post.date}<time datetime={post.date}>{formatArticleDate(post.date)}</time>{:else}Su Instagram{/if}
        </h2>
        {#each post.paragraphs as paragraph, i (i)}
            <p>{paragraph}</p>
        {/each}
        <InstagramGrid slides={post.slides} />
    </section>
{/each}

<p class="rimando"><a href="/associazione">Associazione</a></p>
