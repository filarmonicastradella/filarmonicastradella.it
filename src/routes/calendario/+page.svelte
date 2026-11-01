<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import { hasNotEnded } from "$lib/events";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    // Con JS si nascondono gli eventi già conclusi dalla build.
    let now = $state<Date>();
    const events = $derived(now ? data.events.filter((event) => hasNotEnded(event, now!)) : data.events);

    onMount(() => {
        now = new Date();
    });
</script>

<svelte:head>
    <title>Calendario — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="I prossimi concerti e le altre attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano, in Lunigiana: date, orari e luoghi." />
</svelte:head>

<header>
    <h1>Calendario</h1>
    <p>I prossimi concerti e le altre attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
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
