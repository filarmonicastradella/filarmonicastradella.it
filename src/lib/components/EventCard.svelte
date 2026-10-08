<script lang="ts">
    import type { EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();
</script>

<article itemscope itemtype="https://schema.org/Event">
    <a itemprop="url" href="/events/{event.id}">
        <p><time itemprop="startDate" datetime={event.start}>{event.when}</time></p>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}
        <svelte:element this={`h${level}`}><span itemprop="name">{event.summary}</span></svelte:element>
        {#if event.description}
            <p itemprop="description">{event.description}</p>
        {/if}
        {#if event.location}
            <p itemprop="location">{event.location}</p>
        {/if}
    </a>
</article>

<style>
    /*
     * In un elenco verticale (anche su desktop) le schede non devono più allinearsi tra loro: titolo,
     * data e luogo scorrono liberi su quante righe servono. Resta solo un tetto massimo alla
     * descrizione, che per qualche evento è lunghissima (l'intero programma del concerto).
     */
    [itemprop="description"] {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
