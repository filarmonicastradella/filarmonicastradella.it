<script>
    let { src, alt, caption } = $props();
    let dialogElement;

    function openModal() {
        dialogElement?.showModal();
    }

    function closeModal(e) {
        if (e.target === dialogElement) {
            dialogElement?.close();
        }
    }
</script>

<figure>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img {src} {alt} onclick={openModal} loading="lazy" />
    {#if caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialogElement} onclick={closeModal}>
    <figure>
        <img {src} {alt} />
        {#if caption}
            <figcaption>{caption}</figcaption>
        {/if}
    </figure>
</dialog>

<!--
<style>
    figure {
        margin: 2.5rem 0;
        border-radius: 0;
    }

    figure img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0;
        cursor: zoom-in;
    }

    figcaption {
        margin-top: 0.25rem;
        font-size: 0.85rem;
        color: var(--color-text-muted);
        font-style: italic;
        border-radius: 0;
    }

    dialog {
        padding: 2rem;
        background: transparent;
        border: none;
        max-width: 100vw;
        max-height: 100vh;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        border-radius: 0;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.95);
    }

    dialog[open] {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    dialog figure {
        margin: 0;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: default;
        border-radius: 0;
    }

    dialog img {
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        cursor: default;
        border-radius: 0;
    }

    dialog figcaption {
        color: #fff;
        margin-top: 0.75rem;
        text-align: center;
        border-radius: 0;
    }
</style>
-->