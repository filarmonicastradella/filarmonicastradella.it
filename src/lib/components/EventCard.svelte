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

    /* Con l'interlinea stretta dei titoli "overflow: hidden" taglierebbe le lettere che scendono (g, p, q) dell'ultima riga */
    h3,
    h4 {
        -webkit-line-clamp: 2;
        line-clamp: 2;
        padding-block-end: var(--space-1);
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

    /*
     * Quando la scheda è larga (gli elenchi di eventi su schermo largo, content.css) è una riga d'agenda, come
     * la scheda degli articoli: data e didascalia a sinistra, titolo e descrizione nella colonna di testo.
     */
    article {
        container-type: inline-size;
    }

    @container (min-width: 48rem) {
        a {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, var(--container-text));
            /*
             * A destra titolo e descrizione uno dopo l'altro; a sinistra data e didascalia, in alto, nella stessa cella alta
             * quanto la scheda: la didascalia scende sotto la data di quanto è alta la sua riga, qualunque sia la lunghezza del titolo.
             */
            grid-template-rows: auto 1fr;
            align-items: start;
            gap: var(--space-3) var(--space-6);
        }

        /* La data all'altezza della prima riga del titolo */
        a > p:first-child {
            grid-area: 1 / 1 / 3 / 2;
            padding-block-start: var(--space-2);
        }

        h3,
        h4 {
            grid-area: 1 / 2;
        }

        [itemprop="description"] {
            grid-area: 2 / 2;
        }

        :is(h3, h4) ~ p:not([itemprop="description"]) {
            grid-area: 1 / 1 / 3 / 2;
            margin: calc(var(--space-2) + var(--fs-eyebrow) * var(--lh-body) + var(--space-3)) 0 0;
        }
    }
</style>
