<script lang="ts">
    import type { Snippet } from "svelte";
    import { postalAddress } from "$lib/events";

    /*
     * L'indirizzo di un luogo per i microdati (itemprop="address"): diviso nelle sue parti (PostalAddress) quando ha la forma
     * di Google Calendar, altrimenti il testo così com'è. `children` è quello che si vede (niente, nelle schede).
     */
    let { address, children }: { address: string; children?: Snippet } = $props();
    const parts = $derived(postalAddress(address));
</script>

{#if parts}
    <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"
        >{@render children?.()}{#each Object.entries(parts) as [name, value] (name)}{#if value}<meta itemprop={name} content={value} />{/if}{/each}</span
    >
{:else if children}
    <span itemprop="address">{@render children()}</span>
{:else}
    <meta itemprop="address" content={address} />
{/if}
