<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { hasNotEnded, type EventItem } from "$lib/events";

    let { events: builtEvents }: { events: EventItem[] } = $props();

    // Con JS si nascondono gli eventi già conclusi dalla build (la pagina resta in cache fino a 3 ore).
    let now = $state<Date>();
    const events = $derived((now ? builtEvents.filter((event) => hasNotEnded(event, now!)) : builtEvents).slice(0, 3));

    onMount(() => {
        now = new Date();
    });
</script>

<svelte:document onvisibilitychange={() => document.visibilityState === "visible" && (now = new Date())} />

<section>
    <h2>Prossimi eventi</h2>
    {#if events.length === 0}
        <p>Nessun evento in programma.</p>
    {:else}
        <ol>
            {#each events as event (event.id)}
                <li><EventCard {event} /></li>
            {/each}
        </ol>
    {/if}

    <p><a href="/events">Tutti gli eventi</a></p>
</section>
