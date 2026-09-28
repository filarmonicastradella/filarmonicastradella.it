<script lang="ts">
    import { formatNewsDate, type NewsPost } from "$lib/news";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { post, level = 3 }: { post: NewsPost; level?: 3 | 4 } = $props();
</script>

<article itemscope itemtype="https://schema.org/NewsArticle">
    <a itemprop="url" href="/news/{post.slug}">
        <p><time itemprop="datePublished" datetime={post.date}>{formatNewsDate(post.date)}</time></p>
        <svelte:element this={`h${level}`}><span itemprop="headline">{post.title}</span></svelte:element>
        <p itemprop="description">{post.excerpt}</p>
    </a>
</article>
