<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.ensemble.title} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={data.ensemble.summary} />
</svelte:head>

<main id="contenuto">
    <article>
        <h1>{data.ensemble.title}</h1>
        <p>{data.ensemble.summary}</p>

        <data.ensemble.component />
    </article>

    <p><a href="/ensembles">Tutte le formazioni</a></p>
</main>
