<script lang="ts">
    import { onMount } from "svelte";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import EventCard from "$lib/components/EventCard.svelte";
    import { trackScrollEdges } from "$lib/attachments";
    import { hasNotEnded, type EventItem } from "$lib/events";

    let { events: builtEvents }: { events: EventItem[] } = $props();

    // Con JS si nascondono gli eventi già conclusi dalla build; i pulsanti di scorrimento servono solo con JS.
    let now = $state<Date>();
    const enhanced = $derived(now !== undefined);
    const events = $derived(now ? builtEvents.filter((event) => hasNotEnded(event, now!)) : builtEvents);

    onMount(() => {
        now = new Date();
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

<svelte:document onvisibilitychange={() => document.visibilityState === "visible" && (now = new Date())} />

<section>
    <h2>Prossimi eventi</h2>
    {#if events.length === 0}
        <p>Nessun evento in programma.</p>
    {:else}
        {#if enhanced}
            <div role="group" aria-label="Scorrimento eventi">
                <button type="button" onclick={() => scrollEvents(-1)} disabled={!edges.canScrollStart}><ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" /> <span>Eventi precedenti</span></button>
                <button type="button" onclick={() => scrollEvents(1)} disabled={!edges.canScrollEnd}><ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" /> <span>Eventi successivi</span></button>
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
</section>
