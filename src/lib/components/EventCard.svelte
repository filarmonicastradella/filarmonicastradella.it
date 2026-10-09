<script lang="ts">
    import { eventDate, eventPlace, eventTime, type EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();

    const date = $derived(eventDate(event));
    const time = $derived(eventTime(event));
    const place = $derived(eventPlace(event));
    const separator = $derived(time && place ? " · " : "");
</script>

<article itemscope itemtype="https://schema.org/Event">
    <a itemprop="url" href="/events/{event.id}">
        <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}
        <svelte:element this={`h${level}`}><span itemprop="name">{event.summary}</span></svelte:element>
        {#if event.description}
            <p itemprop="description">{event.description}</p>
        {/if}
        {#if time || place}
            <p>{time}{separator}{#if place}<span itemprop="location">{place}</span>{/if}</p>
        {/if}
    </a>
</article>

<style>
    /*
     * Ogni parte ha un numero fisso di righe, così nella griglia date, titoli e descrizioni partono alla
     * stessa altezza in tutte le schede: data e didascalia su una riga, titolo su due, descrizione su tre.
     * Il testo che non ci sta si interrompe con i puntini; quello intero è nella pagina dell'evento.
     */
    a > p:first-child,
    :is(h3, h4) ~ p:not([itemprop="description"]) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h3,
    h4,
    [itemprop="description"] {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    h3,
    h4 {
        -webkit-line-clamp: 2;
        line-clamp: 2;
        min-block-size: 2lh;
    }

    [itemprop="description"] {
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }

    /* Ora e luogo come didascalia, sempre in fondo alla scheda */
    :is(h3, h4) ~ p:not([itemprop="description"]) {
        margin-block-start: auto;
        font-size: var(--fs-small);
    }
</style>
