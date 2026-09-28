<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";

    const calendarId = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
    const apiKey = "AIzaSyC9-pNI0BctliGuvjWlUWUP9eeAT2oaBBM";

    let eventId = $derived(page.params.id);
    let event = $state(null);
    let loading = $state(true);
    let error = $state(null);

    let isFromCalendar = $state(false);

    onMount(async () => {
        if (typeof window !== 'undefined') {
            if (sessionStorage.getItem('fromCalendar') === 'true') {
                isFromCalendar = true;
                sessionStorage.removeItem('fromCalendar');
            } else if (document.referrer && document.referrer.includes('calendar')) {
                isFromCalendar = true;
            }
        }

        if (!eventId) return;
        try {
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&singleEvents=true`);
            if (!res.ok) throw new Error("Impossibile caricare l'evento.");
            const data = await res.json();
            event = (data.items || []).find(item => item.id === eventId);
            if (!event) throw new Error("Evento non trovato.");
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    function handleBack(e) {
        if (!isFromCalendar && typeof window !== 'undefined' && window.history.length > 1) {
            e.preventDefault();
            history.back();
        }
    }

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const formatTime = (d) => d ? new Date(d).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) : '';
</script>

<svelte:head>
    <title>{event?.summary || "Evento"} | Filarmonica Alessandro Stradella</title>
</svelte:head>

<main id="contenuto">
    <p>
        <a href="/activities/calendar" class="back-link" onclick={handleBack}>
            <Icon icon="mdi:arrow-left" width="1.1em" /> {isFromCalendar ? "Tutti gli eventi" : "Indietro"}
        </a>
    </p>

    {#if loading}
        <p>Caricamento...</p>
    {:else if error}
        <p>{error}</p><!-- style="color: #d32f2f;" -->
    {:else if event}
        {@const start = event.start.dateTime || event.start.date}
        {@const isAllDay = !event.start.dateTime}

        <article>
            <h1>{event.summary}</h1>

            <p class="meta">
                <span><Icon icon="mdi:calendar" width="1.1em" /> {formatDate(start)}</span>
                {#if !isAllDay && event.start.dateTime}
                    <span><Icon icon="mdi:clock-outline" width="1.1em" /> Ore {formatTime(event.start.dateTime)}</span>
                {/if}
                {#if event.location}
                    <span><Icon icon="mdi:map-marker" width="1.1em" /> {event.location}</span>
                {/if}
            </p>

            {#if event.description}
                <div class="desc">
                    {@html event.description.replace(/\n/g, '<br>')}
                </div>
            {/if}

            <div class="actions">
                {#if event.location}
                    <a href="https://maps.google.com/?q={encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:map-marker" width="1.1em" /> Apri in Maps
                    </a>
                {/if}
                <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                    <Icon icon="simple-icons:googlecalendar" width="1.1em" /> Aggiungi a Google Calendar
                </a>
            </div>
        </article>
    {/if}
</main>

<!--
<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 3rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    a {
        color: inherit;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
    }

    a:hover {
        opacity: 0.7;
    }

    .back-link {
        font-weight: 600;
        color: var(--color-heading);
    }

    .back-link:hover {
        text-decoration: underline;
    }

    article {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    h1 {
        font-family: var(--font-serif);
        font-size: 2.25rem;
        margin: 0;
        color: var(--color-heading);
        line-height: 1.2;
    }

    .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        color: var(--color-text-muted);
        font-size: 0.95rem;
        margin: 0;
    }

    .meta span {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        text-transform: capitalize;
    }

    .desc {
        line-height: 1.6;
        color: var(--color-text);
        border-top: 1px solid var(--color-border);
        padding-top: 1.5rem;
    }

    .actions {
        display: flex;
        gap: 1.5rem;
        border-top: 1px solid var(--color-border);
        padding-top: 1.5rem;
        font-size: 0.95rem;
        font-weight: 500;
    }
</style>
-->