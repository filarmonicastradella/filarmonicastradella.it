<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Ensemble e formazioni — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le formazioni della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Infieri e Filarmonici Dissonanti." />
</svelte:head>

<main id="contenuto">
    <h1>Ensemble e formazioni</h1>
    <p>
        Una concert band, una street band, un'orchestra con archi e un gruppo di musica antica e barocca: quattro formazioni per suonare insieme.
    </p>

    <Section title="Le nostre formazioni">
        <ul>
            {#each ensembles as ensemble (ensemble.slug)}
                <li>
                    <h3><a href="/about/ensembles/{ensemble.slug}">{ensemble.title}</a></h3>
                    <p>{ensemble.summary}</p>
                </li>
            {/each}
        </ul>
    </Section>

    <p><a href="/support/auditions">Suona con noi</a></p>
</main>
