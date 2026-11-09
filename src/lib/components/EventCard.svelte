<script lang="ts">
    import { eventAddress, eventDate, eventPlace, eventTime, type EventItem } from "$lib/events";
    import EventMicrodata from "$lib/components/EventMicrodata.svelte";
    import PostalAddress from "$lib/components/PostalAddress.svelte";
    import { organization } from "$lib/organization";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();

    const date = $derived(eventDate(event));
    const time = $derived(eventTime(event));
    const place = $derived(eventPlace(event));
    const separator = $derived(time && place ? " · " : "");
</script>

<!-- Lo stesso evento della sua pagina ("itemid"), così i motori di ricerca non lo contano due volte -->
<article itemscope itemtype="https://schema.org/Event" itemid="{organization.url}/calendario/{event.id}#evento">
    <a itemprop="url" href="/calendario/{event.id}">
        <!-- In testa le informazioni pratiche: la data e, sotto, ora e luogo -->
        <p>
            <time itemprop="startDate" datetime={event.start}>{date}</time>
            {#if time || place}
                <br /><span
                    >{time}{separator}{#if place}<span itemprop="location" itemscope itemtype="https://schema.org/Place"
                            ><span itemprop="name">{place}</span><PostalAddress address={eventAddress(event) || event.location} /></span
                        >{/if}</span
                >
            {/if}
        </p>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}
        <svelte:element this={`h${level}`}><span itemprop="name">{event.summary}</span></svelte:element>
        {#if event.description}
            <p itemprop="description">{event.description}</p>
        {/if}
    </a>
    <EventMicrodata {event} />
</article>

<style>
    /*
     * Le schede sono sempre una sotto l'altra, quindi niente altezze fisse: titolo e descrizione hanno solo un
     * limite, due e tre righe, con i puntini; il testo intero è nella pagina dell'evento.
     */
    h3,
    h4,
    [itemprop="description"] {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* L'interlinea dei titoli (--lh-snug, typography.css) tiene dentro le code delle lettere dell'ultima riga */
    h3,
    h4 {
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    [itemprop="description"] {
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }
</style>
