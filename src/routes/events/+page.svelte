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
    <title>Calendario — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I prossimi concerti, le prove aperte e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano." />
</svelte:head>

<header>
    <h1>Calendario</h1>
    <p>Scopri i prossimi concerti, le prove aperte, i saggi e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
</header>

{#if events.length === 0}
    <p>Al momento non ci sono eventi in programma. Torna a trovarci presto!</p>
{:else}
    <TimelineSections items={events} date={(event) => event.start}>
        {#snippet entry(event, level)}
            <EventCard {event} {level} />
        {/snippet}
    </TimelineSections>
{/if}
