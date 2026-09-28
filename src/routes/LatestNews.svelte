<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import NewsCard from "$lib/components/NewsCard.svelte";
    import { news } from "$lib/news";

    const latestNews = news.slice(0, 3);
</script>

<Section title="Ultime notizie">
    {#if latestNews.length === 0}
        <p>Nessuna notizia recente.</p>
    {:else}
        <ol>
            {#each latestNews as post (post.slug)}
                <li><NewsCard {post} /></li>
            {/each}
        </ol>
    {/if}

    <p><a href="/news">Tutte le notizie</a></p>
</Section>
