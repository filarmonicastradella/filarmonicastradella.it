<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const event = $derived(data.event);
</script>

<svelte:head>
    <title>{event.summary} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={event.location ? `${event.when} — ${event.location}` : event.when} />
</svelte:head>

<main id="contenuto">
    <article itemscope itemtype="https://schema.org/Event">
        <h1 itemprop="name">{event.summary}</h1>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}

        <dl>
            <dt>Quando</dt>
            <dd><time itemprop="startDate" datetime={event.start}>{event.when}</time></dd>
            {#if event.location}
                <dt>Dove</dt>
                <dd itemprop="location">{event.location}</dd>
            {/if}
        </dl>

        {#if event.description}
            <section aria-labelledby="descrizione-evento">
                <h2 id="descrizione-evento">Descrizione</h2>
                {#each event.description.split(/\n+/).filter(Boolean) as paragraph}
                    <p itemprop="description">{paragraph}</p>
                {/each}
            </section>
        {/if}

        <ul>
            {#if event.location}
                <li>
                    <a href="https://maps.google.com/?q={encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer">Apri il luogo su Google Maps</a>
                </li>
            {/if}
            {#if event.htmlLink}
                <li><a href={event.htmlLink} target="_blank" rel="noopener noreferrer">Aggiungi a Google Calendar</a></li>
            {/if}
        </ul>
    </article>

    <p><a href="/events">Tutti gli eventi</a></p>
</main>
