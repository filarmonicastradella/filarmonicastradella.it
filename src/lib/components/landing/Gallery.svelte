<script lang="ts">
    import { onMount } from "svelte";
    import { fetchGallery, type GallerySlide } from "$lib/gallery";
    import { dragScroll, scaleByDistance } from "$lib/attachments";
    import type { LoadStatus } from "$lib/types/load-status";

    let slides = $state.raw<GallerySlide[]>([]);
    let status = $state<LoadStatus>("idle");

    onMount(async () => {
        status = "loading";
        try {
            slides = await fetchGallery();
            status = "ready";
        } catch {
            status = "error";
        }
    });
</script>

<section aria-labelledby="galleria-heading">
    <h2 id="galleria-heading">Momenti in musica</h2>

    {#if status === "loading"}
        <p role="status">Caricamento della galleria in corso…</p>
    {:else if status === "error"}
        <p role="alert">Non è stato possibile caricare la galleria. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else if status === "ready"}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul tabindex="0" aria-label="Galleria di foto e video" {@attach dragScroll} {@attach scaleByDistance}>
            {#each slides as slide (slide.id)}
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

    <noscript>
        <p>Per vedere la galleria è necessario abilitare JavaScript.</p>
    </noscript>

    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
</section>
