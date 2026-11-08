<script lang="ts">
    import InstagramGrid from "$lib/components/InstagramGrid.svelte";
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();

    // Le ultime quattro foto: una riga da 64rem in su, due righe da due sotto. Le altre sono su Instagram.
    const SHOWN = 4;
    const shown = $derived(slides?.slice(0, SHOWN) ?? []);
</script>

<!-- Senza foto (feed non raggiungibile o vuoto) la sezione non c'è: il link a Instagram resta nel piè di pagina -->
{#if shown.length > 0}
    <section>
        <h2>Momenti in musica</h2>
        <InstagramGrid slides={shown} />

        <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
    </section>
{/if}
