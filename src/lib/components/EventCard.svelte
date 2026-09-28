<script lang="ts">
    import type { EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();
</script>

<article itemscope itemtype="https://schema.org/Event">
    <p><time itemprop="startDate" datetime={event.start}>{event.when}</time></p>
    {#if event.end}
        <meta itemprop="endDate" content={event.end} />
    {/if}
    <svelte:element this={`h${level}`}>
        <a itemprop="url" href="/events/{event.id}"><span itemprop="name">{event.summary}</span></a>
    </svelte:element>
    {#if event.description}
        <p itemprop="description">{event.description}</p>
    {/if}
    {#if event.location}
        <p itemprop="location">{event.location}</p>
    {/if}
</article>
