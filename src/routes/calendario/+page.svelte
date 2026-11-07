<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import { hasNotEnded } from "$lib/events";
    import { organization } from "$lib/organization";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    // Con JS si nascondono gli eventi già conclusi dalla build.
    let now = $state<Date>();
    const events = $derived(now ? data.events.filter((event) => hasNotEnded(event, now!)) : data.events);

    /*
     * Il calendario a cui iscriversi (calendario.ics), con un solo pulsante: di base porta a Google Calendar (computer,
     * Android e senza JS); su iPhone e iPad apre il calendario del dispositivo con webcal://. Il browser non dice quali
     * programmi di calendario ci sono (per la privacy), quindi si guarda solo il sistema. L'iPad si presenta come un
     * Mac: lo distingue lo schermo touch.
     */
    const feed = `${organization.url}/calendario.ics`;
    const webcal = feed.replace(/^https?:/, "webcal:");
    const google = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`;
    let ios = $state(false);

    onMount(() => {
        now = new Date();
        ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (/macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    });
</script>

<svelte:head>
    <title>Calendario — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="I prossimi concerti e le altre attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano, in Lunigiana: date, orari e luoghi." />
</svelte:head>

<header>
    <h1>Calendario</h1>
    <p>I prossimi concerti e le altre attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
    <p><a href={ios ? webcal : google}>Segui il calendario</a></p>
    <p>
        <small>
            I nuovi eventi compaiono da soli nel tuo calendario.
            {#if !ios}
                Con altri programmi iscriviti a <a href={feed}>{feed}</a>.
            {/if}
        </small>
    </p>
    <!-- Senza eventi l'avviso sta nell'intestazione: niente testo sciolto nella pagina -->
    {#if events.length === 0}
        <p>Per ora non ci sono eventi in programma.</p>
    {/if}
</header>

{#if events.length > 0}
    <TimelineSections items={events} date={(event) => event.start}>
        {#snippet entry(event, level)}
            <EventCard {event} {level} />
        {/snippet}
    </TimelineSections>
{/if}

