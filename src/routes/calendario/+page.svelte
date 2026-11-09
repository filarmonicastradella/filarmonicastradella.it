<script lang="ts">
    import { isIos } from "$lib/device";
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

    // Il calendario a cui iscriversi (calendario.ics), con un solo pulsante: Google Calendar, o il calendario del dispositivo su iPhone e iPad
    const feed = `${organization.url}/calendario.ics`;
    const webcal = feed.replace(/^https?:/, "webcal:");
    const google = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`;
    let ios = $state(false);

    onMount(() => {
        now = new Date();
        ios = isIos();
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

<!-- Gli eventi già conclusi hanno una pagina loro, impaginata come questa -->
{#if data.hasPast}
    <section>
        <h2>Eventi passati</h2>
        <p>I concerti e gli appuntamenti che ci sono già stati, mese per mese: <a href="/calendario/archivio">eventi passati</a>.</p>
    </section>
{/if}

<!-- Chi guarda dove suoniamo può volerci al suo evento: l'invito porta alla pagina degli ingaggi, che spiega occasioni e formazioni -->
<section>
    <h2>Al tuo evento</h2>
    <p>
        Un matrimonio, una festa di paese, una ricorrenza? Le nostre formazioni possono suonare anche per te:
        <a href="/contatti/ingaggi">ecco come chiederci un ingaggio</a>.
    </p>
</section>
