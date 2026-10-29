<script lang="ts">
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { faq } from "$lib/faq";
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

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Si paga l'ingresso?</summary>
        <p>No, i concerti sono a ingresso libero.</p>
    </details>
    <details>
        <summary>Devo prenotare?</summary>
        <p>
            Non è obbligatorio, ma ci aiuta sapere in quanti verrete, per organizzare la sala e per la sicurezza:
            <a href="/contacts#scrivici">scrivici</a> per segnalare la tua presenza.
        </p>
    </details>
    <details>
        <summary>E se piove?</summary>
        <p>Per i concerti all'aperto abbiamo sempre pronto un posto al chiuso nelle vicinanze.</p>
    </details>
    <FaqItem item={faq.evento} />
</section>
