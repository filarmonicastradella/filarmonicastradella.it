<script lang="ts">
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>I nostri musicisti — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I musicisti che suonano nelle formazioni della Filarmonica Alessandro Stradella." />
</svelte:head>

<main id="contenuto">
    <h1>I nostri musicisti</h1>
    <p>I musicisti che suonano nelle formazioni della Filarmonica Alessandro Stradella.</p>

    <ul>
        {#each ensembles as ensemble (ensemble.slug)}
            <li>
                <h2><a href="/about/ensembles/{ensemble.slug}">{ensemble.title}</a></h2>
                <p>Elenco dei musicisti in arrivo.</p>
            </li>
        {/each}
    </ul>

    <p>Pagina in costruzione: i contenuti saranno pubblicati a breve.</p>
</main>
