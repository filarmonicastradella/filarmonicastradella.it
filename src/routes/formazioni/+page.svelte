<script lang="ts">
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Le nostre formazioni — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Le formazioni della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Orchestra Infieri e Filarmonici Dissonanti." />
</svelte:head>

<header>
    <h1>Le nostre formazioni</h1>
    <p>
        Quattro formazioni, perché ogni repertorio chiede un organico diverso: il concerto in sala per Stradella Facendo, la nostra orchestra di fiati;
        la musica in movimento per la Streetella Band; archi e fiati insieme per l'Orchestra Infieri; la musica antica per i Filarmonici Dissonanti.
    </p>
</header>

<ul>
    {#each ensembles as ensemble (ensemble.slug)}
        <li>
            <a href="/formazioni/{ensemble.slug}">
                <h2>{ensemble.title}</h2>
                <p>{ensemble.summary}</p>
            </a>
        </li>
    {/each}
</ul>

