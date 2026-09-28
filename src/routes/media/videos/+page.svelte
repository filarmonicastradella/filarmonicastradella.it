<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Video — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I video della Filarmonica Alessandro Stradella APS, dal nostro profilo Instagram." />
</svelte:head>

<main id="contenuto">
    <h1>Video</h1>
    <p>I video dei nostri concerti e delle nostre attività, dal profilo Instagram dell'associazione.</p>

    {#if data.slides === null}
        <p>I video non sono al momento disponibili. Puoi guardarli direttamente sul nostro profilo Instagram.</p>
    {:else if data.slides.length === 0}
        <p>Non ci sono ancora video da mostrare.</p>
    {:else}
        <ul>
            {#each data.slides as slide (slide.id)}
                <li>
                    <figure>
                        <!-- svelte-ignore a11y_media_has_caption -->
                        <video src={slide.mediaUrl} poster={slide.thumbnailUrl} controls preload="none" playsinline>
                            <a href={slide.mediaUrl}>Scarica il video</a>
                        </video>
                        <figcaption>
                            <a href={slide.permalink} target="_blank" rel="noopener noreferrer">{slide.alt} (Instagram)</a>
                        </figcaption>
                    </figure>
                </li>
            {/each}
        </ul>
    {/if}

    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
</main>
