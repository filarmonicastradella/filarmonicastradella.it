<script lang="ts">
    import { news, formatNewsDate } from "$lib/news";
</script>

<svelte:head>
    <title>Notizie — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le ultime notizie della Filarmonica Alessandro Stradella APS di Fivizzano." />
</svelte:head>

<main id="contenuto">
    <h1>Notizie</h1>

    {#if news.length === 0}
        <p>Nessuna notizia pubblicata.</p>
    {:else}
        <ul>
            {#each news as post (post.slug)}
                <li>
                    <article>
                        <p><time datetime={post.date}>{formatNewsDate(post.date)}</time></p>
                        <h2><a href="/news/{post.slug}">{post.title}</a></h2>
                        <p>{post.excerpt}</p>
                    </article>
                </li>
            {/each}
        </ul>
    {/if}
</main>
