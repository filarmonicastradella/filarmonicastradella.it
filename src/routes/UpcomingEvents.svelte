<script lang="ts">
    import { onMount } from "svelte";
    import Section from "$lib/components/Section.svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { trackScrollEdges } from "$lib/attachments";
    import type { EventItem } from "$lib/events";

    let { events }: { events: EventItem[] } = $props();

    // I pulsanti di scorrimento servono solo con JS: senza, la lista si scorre da sola.
    let enhanced = $state(false);
    onMount(() => {
        enhanced = true;
    });

    let eventsList = $state<HTMLOListElement>();
    let edges = $state({ canScrollStart: false, canScrollEnd: false });

    const scrollEvents = (direction: number) => {
        if (!eventsList) return;
        const item = eventsList.querySelector("li");
        if (!item) return;
        const gap = parseFloat(getComputedStyle(eventsList).columnGap) || 24;
        eventsList.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: "smooth" });
    };
</script>

<Section title="Prossimi eventi">
    {#if events.length === 0}
        <p>Nessun evento in programma.</p>
    {:else}
        {#if enhanced}
            <div role="group" aria-label="Scorrimento eventi">
                <button type="button" onclick={() => scrollEvents(-1)} disabled={!edges.canScrollStart}>Eventi precedenti</button>
                <button type="button" onclick={() => scrollEvents(1)} disabled={!edges.canScrollEnd}>Eventi successivi</button>
            </div>
        {/if}

        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ol bind:this={eventsList} tabindex="0" aria-label="Elenco dei prossimi eventi" {@attach trackScrollEdges((e) => (edges = e))}>
            {#each events as event (event.id)}
                <li><EventCard {event} /></li>
            {/each}
        </ol>
    {/if}

    <p><a href="/events">Tutti gli eventi</a></p>
</Section>
