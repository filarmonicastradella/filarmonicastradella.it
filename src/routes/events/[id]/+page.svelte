<script lang="ts">
    import { eventDate, eventPlace, eventTime, eventWhen } from "$lib/events";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const event = $derived(data.event);

    const date = $derived(eventDate(event));
    const place = $derived(eventPlace(event));
    // Il resto dell'indirizzo, dopo il nome del luogo
    const address = $derived(event.location.split(",").slice(1).join(",").trim());
</script>

<svelte:head>
    <title>{event.summary} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={[date, eventTime(event), place].filter(Boolean).join(", ")} />
</svelte:head>

<!--
    Ogni informazione una volta sola (docs/DESIGN.md): la data in occhiello e il titolo nell'intestazione, ora e
    luogo per esteso in "Quando e dove". I microdati dell'evento collegano, con "itemref", le sezioni sotto.
-->
<header itemscope itemtype="https://schema.org/Event" itemref="evento-dettagli evento-descrizione">
    <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
    {#if event.end}
        <meta itemprop="endDate" content={event.end} />
    {/if}
    {#if event.description}
        <meta itemprop="description" content={event.description} />
    {/if}
    <h1 itemprop="name">{event.summary}</h1>
</header>

<section id="evento-dettagli">
    <h2>Quando e dove</h2>
    <dl>
        <dt>Quando</dt>
        <dd>{eventWhen(event)}</dd>
        {#if event.location}
            <dt>Dove</dt>
            <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
                <span itemprop="name">{place}</span>
                {#if address}
                    <br />
                    <a
                        itemprop="address"
                        href="https://maps.google.com/?q={encodeURIComponent(event.location)}"
                        target="_blank"
                        rel="noopener noreferrer">{address}</a
                    >
                {/if}
            </dd>
        {/if}
    </dl>
    <p><a href="/events/{event.id}.ics" download>Aggiungi al tuo calendario</a></p>
</section>

<!-- La descrizione del calendario, già pulita alla build (src/lib/server/calendar.ts): paragrafi, elenchi, link -->
{#if event.descriptionHtml}
    <section id="evento-descrizione">
        <h2>L'evento</h2>
        {@html event.descriptionHtml}
    </section>
{/if}

<p class="rimando"><a href="/events">Tutto il calendario</a></p>
