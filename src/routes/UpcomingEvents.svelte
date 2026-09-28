<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { onMount } from "svelte";
    import { fetchUpcomingEvents, type EventItem } from "$lib/events";
    import { trackScrollEdges } from "$lib/attachments";
    import type { LoadStatus } from "$lib/types/load-status";

    // Caricati dal browser, aggiornati quando la scheda torna visibile.
    const REFRESH_MIN_INTERVAL = 5 * 60 * 1000;
    let events = $state.raw<EventItem[]>([]);
    let status = $state<LoadStatus>("idle");
    let lastRefresh = 0;

    async function loadEvents() {
        if (Date.now() - lastRefresh < REFRESH_MIN_INTERVAL) return;
        lastRefresh = Date.now();
        if (status !== "ready") status = "loading";
        try {
            events = await fetchUpcomingEvents();
            status = "ready";
        } catch {
            lastRefresh = 0;
            if (status !== "ready") status = "error";
        }
    }

    onMount(loadEvents);

    // Pulsanti di scorrimento
    let eventsList = $state<HTMLUListElement>();
    let edges = $state({ canScrollStart: false, canScrollEnd: false });

    const scrollEvents = (direction: number) => {
        if (!eventsList) return;
        const item = eventsList.querySelector("li");
        if (!item) return;
        const gap = parseFloat(getComputedStyle(eventsList).columnGap) || 24;
        eventsList.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: "smooth" });
    };
</script>

<svelte:document onvisibilitychange={() => document.visibilityState === "visible" && loadEvents()} />

<Section title="Prossimi eventi">

    {#if status === "loading"}
        <p role="status">Caricamento degli eventi in corso…</p>
    {:else if status === "error"}
        <p role="alert">Non è stato possibile caricare gli eventi. Riprova più tardi.</p>
    {:else if status === "ready" && events.length === 0}
        <p>Nessun evento in programma.</p>
    {:else if status === "ready"}
        <div role="group" aria-label="Scorrimento eventi">
            <button type="button" onclick={() => scrollEvents(-1)} disabled={!edges.canScrollStart}>Eventi precedenti</button>
            <button type="button" onclick={() => scrollEvents(1)} disabled={!edges.canScrollEnd}>Eventi successivi</button>
        </div>

        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul bind:this={eventsList} tabindex="0" aria-label="Elenco dei prossimi eventi" {@attach trackScrollEdges((e) => (edges = e))}>
            {#each events as evt (evt.id)}
                <li><EventCard event={evt} /></li>
            {/each}
        </ul>
    {/if}

    <noscript>
        <p>Per vedere i prossimi eventi è necessario abilitare JavaScript.</p>
    </noscript>

    <p><a href="/events">Tutti gli eventi</a></p>
</Section>
