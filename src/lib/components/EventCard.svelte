<script lang="ts">
    import type { EventItem } from "$lib/events";

    let { event }: { event: EventItem } = $props();
</script>

<article>
    <p><time datetime={event.start}>{event.when}</time></p>
    <h3><a href="/events/{event.id}">{event.summary}</a></h3>
    {#if event.description}
        <p>{event.description}</p>
    {/if}
    {#if event.location}
        <p>{event.location}</p>
    {/if}
</article>
