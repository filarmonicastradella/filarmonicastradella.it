<script lang="ts">
    import { formatNewsDate } from "$lib/news";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.post.title} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={data.post.excerpt} />
</svelte:head>

<main id="contenuto">
    <article>
        <header>
            <p><time datetime={data.post.date}>{formatNewsDate(data.post.date)}</time></p>
            <h1>{data.post.title}</h1>
        </header>

        <data.post.component />
    </article>

    <p><a href="/news">Tutte le notizie</a></p>
</main>
