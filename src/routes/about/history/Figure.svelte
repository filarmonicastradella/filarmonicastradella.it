<script lang="ts">
    import type { Picture } from "vite-imagetools";

    let { src, alt, caption }: { src: Picture; alt: string; caption?: string } = $props();

    // Senza JS il link apre l'immagine a grandezza piena; con JS la mostra in una finestra.
    let dialog = $state<HTMLDialogElement>();

    function openDialog(event: MouseEvent) {
        if (!dialog) return;
        event.preventDefault();
        dialog.showModal();
    }
</script>

<figure>
    <!-- svelte-ignore a11y_consider_explicit_label: il nome del link è l'alt dell'immagine, che il compilatore non vede dentro enhanced:img -->
    <a href={src.img.src} onclick={openDialog}><enhanced:img {src} {alt} sizes="100vw" /></a>
    {#if caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>

<dialog bind:this={dialog} closedby="any" aria-label={alt}>
    <figure>
        <enhanced:img {src} {alt} sizes="100vw" />
        {#if caption}
            <figcaption>{caption}</figcaption>
        {/if}
    </figure>
    <form method="dialog">
        <button type="submit">Chiudi</button>
    </form>
</dialog>
