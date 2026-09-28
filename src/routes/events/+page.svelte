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

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    // Eventi raggruppati per anno e poi per mese, nell'ordine in cui arrivano dal calendario.
    const years = $derived.by(() => {
        const byYear = new Map<string, Map<string, EventItem[]>>();
        for (const event of events) {
            const [year, month] = event.start.split("-");
            const months = byYear.get(year) ?? new Map<string, EventItem[]>();
            months.set(month, [...(months.get(month) ?? []), event]);
            byYear.set(year, months);
        }
        return [...byYear].map(([year, months]) => ({
            year,
            months: [...months].map(([month, items]) => ({
                month,
                title: capitalize(new Date(Number(year), Number(month) - 1).toLocaleDateString("it-IT", { month: "long" })),
                items
            }))
        }));
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
        {#each years as { year, months } (year)}
            <Section title={year}>
                {#each months as { month, title, items } (month)}
                    <Section {title} level={3}>
                        <ul>
                            {#each items as event (event.id)}
                                <li><EventCard {event} level={4} /></li>
                            {/each}
                        </ul>
                    </Section>
                {/each}
            </Section>
        {/each}
    {/if}

    <noscript>
        <p>Per vedere gli eventi è necessario abilitare JavaScript.</p>
    </noscript>
</main>
