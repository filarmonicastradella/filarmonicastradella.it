<script lang="ts">
    import { page } from "$app/state";
    import { fetchEvent, type EventItem } from "$lib/events";
    import type { LoadStatus } from "$lib/types/load-status";

    let event = $state.raw<EventItem>();
    let status = $state<LoadStatus>("loading");

    // Si ricarica se cambia l'evento nell'indirizzo; una risposta arrivata in ritardo viene scartata.
    $effect(() => {
        const id = page.params.id!;
        let current = true;

        status = "loading";
        fetchEvent(id)
            .then((result) => {
                if (!current) return;
                event = result;
                status = "ready";
            })
            .catch(() => {
                if (current) status = "error";
            });

        return () => (current = false);
    });

    const title = $derived(status === "ready" && event ? event.summary : status === "error" ? "Evento non trovato" : "Evento");
</script>

<svelte:head>
    <title>{title} — Filarmonica Alessandro Stradella APS</title>
    {#if status === "ready" && event}
        <meta name="description" content={event.location ? `${event.when} — ${event.location}` : event.when} />
    {/if}
</svelte:head>

<main id="contenuto">
    <h1>{status === "ready" && event ? event.summary : status === "error" ? "Evento non trovato" : "Evento"}</h1>

    <div role="status">
        {#if status === "loading"}
            <p>Caricamento dell'evento in corso…</p>
        {:else if status === "error" || !event}
            <p>L'evento richiesto non esiste più o non è stato possibile caricarlo.</p>
        {/if}
    </div>

    {#if status === "ready" && event}
        <article itemscope itemtype="https://schema.org/Event">
            <meta itemprop="name" content={event.summary} />
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
    {/if}

    <p><a href="/events">Tutti gli eventi</a></p>
</main>
