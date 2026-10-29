<script lang="ts">
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Le nostre formazioni — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le formazioni della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Orchestra Infieri e Filarmonici Dissonanti." />
</svelte:head>

<header>
    <h1>Le nostre formazioni</h1>
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
    <h2>Domande frequenti</h2>
    <details>
        <summary>Come si entra in una formazione?</summary>
        <p>
            Prima ci si iscrive alla Filarmonica con la <a href="/support/join">domanda di iscrizione</a>; da soci si chiede di entrare nella formazione.
            Ognuna ha i suoi requisiti.
        </p>
    </details>
    <details>
        <summary>Quanto spesso provate?</summary>
        <p>Una o due volte a settimana, più spesso prima dei concerti.</p>
    </details>
</section>

<p class="rimando"><a href="/booking">Per il tuo evento</a></p>
