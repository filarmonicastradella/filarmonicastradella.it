<script lang="ts">
    import InstagramGrid from "$lib/components/InstagramGrid.svelte";
    import { gallery } from "$lib/gallery";

    // Pagina disattivata finché su Instagram non ci sono abbastanza post con #filarmonicastradella da aggiungere
    // qualcosa alla galleria in home (una decina): per attivarla rinominare _page.svelte in +page.svelte e togliere
    // il commento dalla scheda in Associazione.
</script>

<svelte:head>
    <title>Foto e video — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Le foto e i video dei concerti e delle attività della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<header>
    <h1>Foto e video</h1>
    <p>
        I nostri concerti e le nostre attività, dal profilo
        <a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Instagram</a> della Filarmonica.
    </p>
</header>

{#if gallery?.length}
    <InstagramGrid slides={gallery} />
{/if}

<p class="rimando"><a href="/associazione">Associazione</a></p>
