<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Mediateca — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Foto e video della Filarmonica Alessandro Stradella APS, dal nostro profilo Instagram." />
</svelte:head>

<header>
    <h1>Mediateca</h1>
    <p>Le foto e i video dei nostri concerti e delle nostre attività, dal profilo Instagram dell'associazione.</p>
</header>

{#if data.slides === null}
    <p>La mediateca non è al momento disponibile. Puoi guardare foto e video direttamente sul nostro profilo Instagram.</p>
{:else if data.slides.length === 0}
    <p>Non ci sono ancora foto o video da mostrare.</p>
{:else}
    <ul>
        {#each data.slides as slide (slide.id)}
            <li>
                {#if slide.mediaType === "VIDEO"}
                    <figure>
                        <!-- svelte-ignore a11y_media_has_caption -->
                        <video src={slide.mediaUrl} poster={slide.thumbnailUrl} controls preload="none" playsinline>
                            <a href={slide.mediaUrl}>Scarica il video</a>
                        </video>
                        <figcaption>
                            <a href={slide.permalink} target="_blank" rel="noopener noreferrer">{slide.alt} (Instagram)</a>
                        </figcaption>
                    </figure>
                {:else}
                    <a href={slide.permalink} target="_blank" rel="noopener noreferrer">
                        <img src={slide.imageUrl} alt={slide.alt} loading="lazy" />
                    </a>
                {/if}
            </li>
        {/each}
    </ul>
{/if}

<p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>

<!-- Da riattivare quando ci sono i contenuti (rinominare _page.svelte in +page.svelte):
interviste: /media/interviews, rassegna stampa: /media/press, materiali per la stampa: /media/kit
-->
