<script lang="ts">
    import InstagramGrid from "$lib/components/InstagramGrid.svelte";
    import type { GallerySlide } from "$lib/gallery";

    // `null` quando il feed non era raggiungibile durante la build.
    let { slides }: { slides: GallerySlide[] | null } = $props();

    // Le ultime sette foto: da 64rem una grande e sei piccole, sotto le prime quattro (InstagramGrid). Le altre sono in Foto e video.
    const SHOWN = 7;
    const shown = $derived(slides?.slice(0, SHOWN) ?? []);
</script>

<!-- Senza foto (feed non raggiungibile o vuoto) la sezione non c'è: il link a Instagram resta nel piè di pagina -->
{#if shown.length > 0}
    <section>
        <h2>Momenti in musica</h2>
        <InstagramGrid slides={shown} featured placeholders={SHOWN - shown.length} />

        <!-- Come ogni sezione della home, finisce con il rimando alla pagina che riassume: tutte le foto, per post. Instagram è in Foto e
             video, nel piè di pagina e in ogni foto -->
        <p class="rimando"><a href="/associazione/mediateca">Foto e video</a></p>
    </section>
{/if}
