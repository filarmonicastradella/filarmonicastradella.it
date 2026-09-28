<script lang="ts">
    import { news, formatNewsDate } from "$lib/news";

    const latestNews = news.slice(0, 3);
</script>

<section aria-labelledby="notizie-heading">
    <h2 id="notizie-heading">Ultime notizie</h2>

    {#if latestNews.length === 0}
        <p>Nessuna notizia recente.</p>
    {:else}
        <ul>
            {#each latestNews as post (post.slug)}
                <li>
                    <article>
                        <p><time datetime={post.date}>{formatNewsDate(post.date)}</time></p>
                        <h3><a href="/news/{post.slug}">{post.title}</a></h3>
                        <p>{post.excerpt}</p>
                    </article>
                </li>
            {/each}
        </ul>
    {/if}

    <p><a href="/news">Tutte le notizie</a></p>
</section>
