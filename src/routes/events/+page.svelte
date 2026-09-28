<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUpcomingEvents, type EventItem } from "$lib/events";
    import EventCard from "$lib/components/EventCard.svelte";
    import Section from "$lib/components/Section.svelte";
    import type { LoadStatus } from "$lib/types/load-status";

    let events = $state.raw<EventItem[]>([]);
    let status = $state<LoadStatus>("idle");

    onMount(async () => {
        status = "loading";
        try {
            events = await fetchUpcomingEvents(fetch, 100);
            status = "ready";
        } catch {
            status = "error";
        }
    });

    // Eventi raggruppati per mese, nell'ordine in cui arrivano dal calendario.
    const groups = $derived.by(() => {
        const byMonth = new Map<string, EventItem[]>();
        for (const event of events) {
            const month = event.start.slice(0, 7);
            byMonth.set(month, [...(byMonth.get(month) ?? []), event]);
        }
        return [...byMonth].map(([month, items]) => {
            const [year, monthNumber] = month.split("-").map(Number);
            const title = new Date(year, monthNumber - 1).toLocaleDateString("it-IT", { month: "long", year: "numeric" });
            return { month, title, items };
        });
    });
</script>

<svelte:head>
    <title>Eventi — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I prossimi concerti, le prove aperte e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano." />
</svelte:head>

<main id="contenuto">
    <header>
        <h1>Eventi</h1>
        <p>Scopri i prossimi concerti, le prove aperte, i saggi e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
    </header>

    {#if status === "loading"}
        <p role="status">Caricamento degli eventi in corso…</p>
    {:else if status === "error"}
        <p role="alert">Non è stato possibile caricare gli eventi. Riprova più tardi.</p>
    {:else if status === "ready" && events.length === 0}
        <p>Al momento non ci sono eventi in programma. Torna a trovarci presto!</p>
    {:else if status === "ready"}
        {#each groups as group (group.month)}
            <Section title={group.title}>
                <ul>
                    {#each group.items as event (event.id)}
                        <li><EventCard {event} /></li>
                    {/each}
                </ul>
            </Section>
        {/each}
    {/if}

    <noscript>
        <p>Per vedere gli eventi è necessario abilitare JavaScript.</p>
    </noscript>
</main>
