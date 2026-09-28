<script lang="ts">
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Ensemble — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Gli ensemble della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Infieri e Filarmonici Dissonanti." />
</svelte:head>

<main id="contenuto">
    <h1>Ensemble</h1>
    <p>
        Una concert band, una street band, un'orchestra con archi e un gruppo di musica antica e barocca: quattro ensemble per suonare insieme.
    </p>

    <section>
        <h2>I nostri ensemble</h2>
        <ul>
            {#each ensembles as ensemble (ensemble.slug)}
                <li>
                    <h3><a href="/ensembles/{ensemble.slug}">{ensemble.title}</a></h3>
                    <p>{ensemble.summary}</p>
                </li>
            {/each}
        </ul>
    </section>

    <section>
        <h2>Come suonare con noi</h2>
        <ol>
            <li>Iscriviti come socio dell'associazione con la <a href="/support/join">richiesta di iscrizione</a>.</li>
            <li>Chiedi di entrare nell'ensemble in cui vuoi suonare.</li>
        </ol>
    </section>
</main>
