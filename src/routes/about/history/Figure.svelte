<script lang="ts">
    let { src, alt, caption }: { src: string; alt: string; caption?: string } = $props();

    // Senza JS il link apre l'immagine a grandezza piena; con JS la mostra in una finestra.
    let dialog = $state<HTMLDialogElement>();

    function openDialog(event: MouseEvent) {
        if (!dialog) return;
        event.preventDefault();
        dialog.showModal();
    }
</script>

<figure>
    <a href={src} onclick={openDialog}><img {src} {alt} loading="lazy" /></a>
    {#if caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>

<dialog bind:this={dialog} closedby="any" aria-label={alt}>
    <figure>
        <img {src} {alt} loading="lazy" />
        {#if caption}
            <figcaption>{caption}</figcaption>
        {/if}
    </figure>
    <form method="dialog">
        <button type="submit">Chiudi</button>
    </form>
</dialog>
