<script lang="ts">
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Ensemble — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Gli ensemble della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Orchestra Infieri e Filarmonici Dissonanti." />
</svelte:head>

<header>
    <h1>Ensemble</h1>
    <p>
        Quattro formazioni per suonare insieme: Stradella Facendo, la nostra orchestra di fiati; la Streetella Band; l'Orchestra Infieri; i Filarmonici
        Dissonanti.
    </p>
</header>

<ul>
    {#each ensembles as ensemble (ensemble.slug)}
        <li>
            <a href="/about/ensembles/{ensemble.slug}">
                <h2>{ensemble.title}</h2>
                <p>{ensemble.summary}</p>
            </a>
        </li>
    {/each}
</ul>

<section>
    <h2>Suona con noi</h2>
    <p>Per suonare in un ensemble iscriviti alla Filarmonica con la <a href="/support/join">richiesta di iscrizione</a>.</p>
</section>

<section>
    <h2>Al tuo evento</h2>
    <p>Vuoi una delle nostre formazioni a un concerto, una festa o una cerimonia? <a href="/booking">Scopri come richiederla</a>.</p>
</section>
