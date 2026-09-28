<script lang="ts">
    import { dragScroll, scaleByDistance } from "$lib/attachments";
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();
</script>

<section>
    <h2>Momenti in musica</h2>
    {#if slides === null}
        <p>La galleria non è al momento disponibile. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
    {:else}
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

    <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
</section>
