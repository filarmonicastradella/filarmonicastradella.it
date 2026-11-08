<script lang="ts">
    import { onMount, type Snippet } from "svelte";

    /*
     * Un dato da copiare con un clic (dati del bonifico, dati dell'ente nel piè di pagina): un pulsante con l'aspetto di
     * un link (il titolo «Copia» lo fa riconoscere in forms.css) che copia `text` e per tre secondi dice «Copiato». Solo con JS e con gli
     * appunti: senza, resta il testo, da copiare a mano.
     */
    let { text, children }: { text: string; children: Snippet } = $props();

    let canCopy = $state(false);
    let copied = $state(false);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copy() {
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => (copied = false), 3000);
        } catch {
            copied = false;
        }
    }
</script>

{#if canCopy}
    <button type="button" onclick={copy} title="Copia" aria-live="polite">
        {#if copied}Copiato{:else}{@render children()}{/if}
    </button>
{:else}
    {@render children()}
{/if}
