<script lang="ts">
    import type { EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();

    // Giorno e mese separati per la data grande della scheda (design system), nel fuso di Fivizzano.
    const start = $derived(new Date(event.start));
    const day = $derived(start.toLocaleDateString("it-IT", { day: "numeric", timeZone: "Europe/Rome" }));
    const month = $derived(start.toLocaleDateString("it-IT", { month: "short", timeZone: "Europe/Rome" }));
</script>

<article itemscope itemtype="https://schema.org/Event">
    <a itemprop="url" href="/events/{event.id}">
        <p><time itemprop="startDate" datetime={event.start}><span>{day}</span> {month}</time></p>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}
        <svelte:element this={`h${level}`}><span itemprop="name">{event.summary}</span></svelte:element>
        <p>{event.when}</p>
        {#if event.description}
            <p itemprop="description">{event.description}</p>
        {/if}
        {#if event.location}
            <p itemprop="location">{event.location}</p>
        {/if}
    </a>
</article>

<style>
    /* La data grande: giorno in Cormorant nel colore del marchio, mese come occhiello accanto */
    time {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
    }

    time span {
        font-family: var(--font-display);
        font-size: 3rem;
        font-weight: var(--fw-display);
        font-variant-numeric: oldstyle-nums;
        letter-spacing: 0;
        line-height: 1;
    }

    /* Giorno e orario completi, come didascalia sotto il titolo */
    h3 + p,
    h4 + p {
        color: var(--text-muted);
        font-size: var(--fs-small);
    }

    /* La descrizione a volte è il programma intero: al massimo quattro righe */
    [itemprop="description"] {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        overflow: hidden;
    }

    /* Il luogo in fondo alla scheda, come didascalia */
    [itemprop="location"] {
        margin-block-start: auto;
        padding-block-start: var(--space-3);
        border-block-start: var(--border-width) solid var(--border);
        color: var(--text-muted);
        font-size: var(--fs-small);
    }
</style>
