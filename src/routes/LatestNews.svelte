<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import { news, formatNewsDate } from "$lib/news";

    const latestNews = news.slice(0, 3);
</script>

<Section title="Ultime notizie">

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
</Section>
