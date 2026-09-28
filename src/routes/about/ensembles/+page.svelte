<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Ensemble e formazioni — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le formazioni musicali della Filarmonica Alessandro Stradella: banda, musica antica, musica sinfonica e progetti giovanili." />
</svelte:head>

<main id="contenuto">
    <h1>Ensemble e formazioni</h1>
    <p>
        Dalla tradizione bandistica alla riscoperta della musica antica, fino alla musica sinfonica e ai progetti giovanili: una costellazione di gruppi aperti alla sperimentazione e ai progetti dei soci.
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
