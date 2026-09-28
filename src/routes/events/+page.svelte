<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";
    import Section from "$lib/components/Section.svelte";
    import type { EventItem } from "$lib/events";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    interface MonthGroup {
        month: string;
        title: string;
        items: EventItem[];
    }

    // Eventi raggruppati per anno e poi per mese, nell'ordine in cui arrivano dal calendario.
    const years = $derived.by(() => {
        const byYear = new Map<string, Map<string, EventItem[]>>();
        for (const event of data.events) {
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

    // Indice dei mesi per raggiungerli con un collegamento interno, utile quando sono più di uno.
    const monthLinks = $derived(
        years.flatMap(({ year, months }) => months.map(({ month, title }) => ({ id: `mese-${year}-${month}`, label: `${title} ${year}` })))
    );
</script>

<svelte:head>
    <title>Eventi — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="I prossimi concerti, le prove aperte e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano." />
</svelte:head>

{#snippet monthList(year: string, months: MonthGroup[], level: 2 | 3)}
    {#each months as { month, title, items } (month)}
        <Section {title} {level} id="mese-{year}-{month}">
            <ol>
                {#each items as event (event.id)}
                    <li><EventCard {event} level={level === 2 ? 3 : 4} /></li>
                {/each}
            </ol>
        </Section>
    {/each}
{/snippet}

<main id="contenuto">
    <header>
        <h1>Eventi</h1>
        <p>Scopri i prossimi concerti, le prove aperte, i saggi e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
    </header>

    {#if monthLinks.length > 1}
        <nav aria-label="Vai al mese">
            <ul>
                {#each monthLinks as { id, label } (id)}
                    <li><a href="#{id}">{label}</a></li>
                {/each}
            </ul>
        </nav>
    {/if}

    {#if data.events.length === 0}
        <p>Al momento non ci sono eventi in programma. Torna a trovarci presto!</p>
    {:else}
        <!-- Il titolo dell'anno serve solo quando gli eventi coprono più di un anno. -->
        {#if years.length > 1}
            {#each years as { year, months } (year)}
                <Section title={year}>
                    {@render monthList(year, months, 3)}
                </Section>
            {/each}
        {:else}
            {@render monthList(years[0].year, years[0].months, 2)}
        {/if}
    {/if}
</main>
