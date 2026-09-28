<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    // `items` va passato già nell'ordine voluto; `entry` riceve l'elemento e il livello del suo titolo.
    let {
        items,
        date,
        entry
    }: {
        items: T[];
        date: (item: T) => string;
        entry: Snippet<[T, 3 | 4]>;
    } = $props();

    interface MonthGroup {
        month: string;
        title: string;
        items: T[];
    }

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    // Elementi raggruppati per anno e poi per mese, nell'ordine in cui arrivano.
    const years = $derived.by(() => {
        const byYear = new Map<string, Map<string, T[]>>();
        for (const item of items) {
            const [year, month] = date(item).split("-");
            const months = byYear.get(year) ?? new Map<string, T[]>();
            months.set(month, [...(months.get(month) ?? []), item]);
            byYear.set(year, months);
        }
        return [...byYear].map(([year, months]) => ({
            year,
            months: [...months].map(
                ([month, monthItems]): MonthGroup => ({
                    month,
                    title: capitalize(new Date(Number(year), Number(month) - 1).toLocaleDateString("it-IT", { month: "long" })),
                    items: monthItems
                })
            )
        }));
    });
</script>

{#snippet monthList(year: string, months: MonthGroup[], level: 2 | 3)}
    {#each months as { month, title, items: monthItems } (month)}
        <section id="mese-{year}-{month}">
            <svelte:element this={`h${level}`}>{title}</svelte:element>
            <ol>
                {#each monthItems as item}
                    <li>{@render entry(item, level === 2 ? 3 : 4)}</li>
                {/each}
            </ol>
        </section>
    {/each}
{/snippet}

<!-- L'indice segue la struttura delle sezioni: anni (se più di uno) e mesi. -->
{#if years.length > 1 || (years[0]?.months.length ?? 0) > 1}
    <nav aria-label="Vai alla sezione">
        <ul>
            {#if years.length > 1}
                {#each years as { year, months } (year)}
                    <li>
                        <a href="#anno-{year}">{year}</a>
                        <ul>
                            {#each months as { month, title } (month)}
                                <li><a href="#mese-{year}-{month}">{title}</a></li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            {:else}
                {#each years[0].months as { month, title } (month)}
                    <li><a href="#mese-{years[0].year}-{month}">{title}</a></li>
                {/each}
            {/if}
        </ul>
    </nav>
{/if}

<!-- Il titolo dell'anno serve solo quando gli elementi coprono più di un anno. -->
{#if years.length > 1}
    {#each years as { year, months } (year)}
        <section id="anno-{year}">
            <h2>{year}</h2>
            {@render monthList(year, months, 3)}
        </section>
    {/each}
{:else if years.length === 1}
    {@render monthList(years[0].year, years[0].months, 2)}
{/if}
