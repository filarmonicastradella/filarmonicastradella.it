<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Foto — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le foto della Filarmonica Alessandro Stradella APS, dal nostro profilo Instagram." />
</svelte:head>

<main id="contenuto">
    <h1>Foto</h1>
    <p>Le foto dei nostri concerti e delle nostre attività, dal profilo Instagram dell'associazione.</p>

    {#if data.slides === null}
        <p>La galleria non è al momento disponibile. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else if data.slides.length === 0}
        <p>Non ci sono ancora foto da mostrare.</p>
    {:else}
        <ul>
            {#each data.slides as slide (slide.id)}
                <li>
                    <a href={slide.permalink} target="_blank" rel="noopener noreferrer">
                        <img src={slide.imageUrl} alt={slide.alt} loading="lazy" />
                    </a>
                </li>
            {/each}
        </ul>
    {/if}

    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
</main>
