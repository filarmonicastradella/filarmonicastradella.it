<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import { calendarUrl, fetchUpcomingEvents } from "$lib/calendar";
    import type { EventItem } from "$lib/events";

    // Gli eventi si chiedono a Google Calendar a ogni visita: `null` finché non arrivano.
    let events = $state.raw<EventItem[] | null>(null);
    let loading = $state(false);
    let failed = $state(false);

    onMount(() => {
        loading = true;
        fetchUpcomingEvents()
            .then((all) => (events = all))
            .catch(() => (failed = true))
            .finally(() => (loading = false));
    });
</script>

<svelte:head>
    <title>Calendario — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I prossimi concerti e gli appuntamenti pubblici della Filarmonica Alessandro Stradella di Fivizzano." />
</svelte:head>

<header>
    <h1>Calendario</h1>
    <p>I prossimi concerti e gli appuntamenti pubblici della Filarmonica.</p>
</header>

<div role="status">
    {#if loading}
        Caricamento del calendario…
    {:else if failed}
        Non riusciamo a caricare il calendario in questo momento: <a href={calendarUrl} target="_blank" rel="noopener noreferrer">guardalo su Google Calendar</a>.
    {:else if events?.length === 0}
        Al momento non ci sono eventi in programma.
    {/if}
</div>
<noscript>
    <p>Il calendario si carica con JavaScript: <a href={calendarUrl} target="_blank" rel="noopener noreferrer">guardalo su Google Calendar</a>.</p>
</noscript>

{#if events?.length}
    <TimelineSections items={events} date={(event) => event.start}>
        {#snippet entry(event, level)}
            <EventCard {event} {level} />
        {/snippet}
    </TimelineSections>
{/if}
