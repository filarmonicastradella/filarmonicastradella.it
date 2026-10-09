<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { calendarUrl, fetchUpcomingEvents } from "$lib/calendar";
    import type { EventItem } from "$lib/events";

    // Gli eventi si chiedono a Google Calendar a ogni visita: `null` finché non arrivano.
    let events = $state.raw<EventItem[] | null>(null);
    let loading = $state(false);
    let failed = $state(false);

    onMount(() => {
        loading = true;
        fetchUpcomingEvents()
            .then((all) => (events = all.slice(0, 3)))
            .catch(() => (failed = true))
            .finally(() => (loading = false));
    });
</script>

<section>
    <h2>Prossimi eventi</h2>
    <div role="status">
        {#if loading}
            Caricamento del calendario…
        {:else if failed}
            Non riusciamo a caricare il calendario in questo momento: <a href={calendarUrl} target="_blank" rel="noopener noreferrer">guardalo su Google Calendar</a>.
        {:else if events?.length === 0}
            Nessun evento in programma.
        {/if}
    </div>
    <noscript>
        <p>Il calendario si carica con JavaScript: <a href={calendarUrl} target="_blank" rel="noopener noreferrer">guardalo su Google Calendar</a>.</p>
    </noscript>
    {#if events?.length}
        <ol>
            {#each events as event (event.id)}
                <li><EventCard {event} /></li>
            {/each}
        </ol>
    {/if}

    <p><a href="/events">Tutti gli eventi</a></p>
</section>
