<script lang="ts">
    import { eventDate, eventPlace, eventTime } from "$lib/events";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const event = $derived(data.event);

    const date = $derived(eventDate(event));
    const time = $derived(eventTime(event));
    const place = $derived(eventPlace(event));
    const summary = $derived([time, place].filter(Boolean).join(" · "));
    // La descrizione del calendario: i paragrafi sono separati da una riga vuota, le righe singole (programma,
    // musicisti) restano una sotto l'altra.
    const paragraphs = $derived(event.description.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean));
</script>

<svelte:head>
    <title>{event.summary} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={[date, summary].filter(Boolean).join(", ")} />
</svelte:head>

<!--
    L'intestazione è come quella delle altre pagine; i microdati dell'evento la collegano, con "itemref", alle
    sezioni con i dettagli e la descrizione.
-->
<header itemscope itemtype="https://schema.org/Event" itemref="evento-dettagli evento-descrizione">
    <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
    {#if event.end}
        <meta itemprop="endDate" content={event.end} />
    {/if}
    <h1 itemprop="name">{event.summary}</h1>
    {#if summary}
        <p>{summary}</p>
    {/if}
</header>

<section id="evento-dettagli">
    <h2>Quando e dove</h2>
    <dl>
        <dt>Quando</dt>
        <dd>{event.when}</dd>
        {#if event.location}
            <dt>Dove</dt>
            <dd itemprop="location">{event.location}</dd>
            <dd><a href="https://maps.google.com/?q={encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer">Apri in Google Maps</a></dd>
        {/if}
    </dl>
    {#if event.htmlLink}
        <p><a href={event.htmlLink} target="_blank" rel="noopener noreferrer">Apri in Google Calendar</a></p>
    {/if}
</section>

{#if paragraphs.length > 0}
    <section id="evento-descrizione">
        <h2>L'evento</h2>
        {#each paragraphs as paragraph, i (i)}
            <p itemprop="description">{paragraph}</p>
        {/each}
    </section>
{/if}

<p><a href="/events">Tutto il calendario</a></p>

<style>
    /* Gli a capo del calendario restano a capo */
    [itemprop="description"] {
        white-space: pre-line;
    }
</style>
