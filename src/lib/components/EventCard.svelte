<script lang="ts">
    import type { EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();
</script>

<article>
    <p><time datetime={event.start}>{event.when}</time></p>
    <svelte:element this={`h${level}`}><a href="/events/{event.id}">{event.summary}</a></svelte:element>
    {#if event.description}
        <p>{event.description}</p>
    {/if}
    {#if event.location}
        <p>{event.location}</p>
    {/if}
</article>
