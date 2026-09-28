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
    {#if status === "loading"}
        <p role="status">Caricamento dell'evento in corso…</p>
    {:else if status === "error" || !event}
        <h1>Evento non trovato</h1>
        <p role="alert">L'evento richiesto non esiste più o non è stato possibile caricarlo.</p>
    {:else}
        <article>
            <header>
                <p><time datetime={event.start}>{event.when}</time></p>
                <h1>{event.summary}</h1>
                {#if event.location}
                    <p>{event.location}</p>
                {/if}
            </header>

            {#each event.description.split(/\n+/).filter(Boolean) as paragraph}
                <p>{paragraph}</p>
            {/each}

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
