<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";
    import TimelineSections from "$lib/components/TimelineSections.svelte";
    import type { PageProps } from "./$types";

    // Gli eventi pubblici già conclusi (dal 9/11/2026), impaginati come il Calendario ma dal più recente: sezioni per anno e mese con
    // l'indice in cima, e le stesse schede, che portano alla pagina dell'evento, rimasta online
    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Eventi passati — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="I concerti e gli appuntamenti pubblici già passati della Filarmonica Alessandro Stradella di Fivizzano, mese per mese." />
</svelte:head>

<header>
    <h1>Eventi passati</h1>
    <p>I concerti e gli appuntamenti pubblici della Filarmonica, dal più recente.</p>
    {#if data.events.length === 0}
        <p>Non ci sono ancora eventi passati.</p>
    {/if}
</header>

{#if data.events.length > 0}
    <TimelineSections items={data.events} date={(event) => event.start}>
        {#snippet entry(event, level)}
            <EventCard {event} {level} />
        {/snippet}
    </TimelineSections>
{/if}

<p class="rimando"><a href="/calendario">Calendario</a></p>
