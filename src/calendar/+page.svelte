<script>
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";

    let events = $state([]);
    let loading = $state(true);
    let error = $state(null);

    const calendarId = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
    const apiKey = "AIzaSyC9-pNI0BctliGuvjWlUWUP9eeAT2oaBBM";

    onMount(async () => {
        try {
            const now = new Date().toISOString();
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(now)}&maxResults=50&orderBy=startTime&singleEvents=true`);
            const data = await res.json();
            events = data.items || [];
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    const cleanDesc = (html) => html ? html.replace(/<[^>]*>?/gm, "").trim() : "";

    const formatEventTime = (evt) => {
        const startVal = evt.start.dateTime || evt.start.date;
        const endVal = evt.end?.dateTime || evt.end?.date;
        const startDate = new Date(startVal);
        const isAllDay = !evt.start.dateTime;

        const formatDate = (d) => d.toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" }).toUpperCase();
        const formatTime = (d) => d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

        const startFormatted = formatDate(startDate);

        if (!endVal) {
            return isAllDay ? startFormatted : `${startFormatted} • ${formatTime(startDate)}`;
        }

        const endDate = new Date(endVal);

        if (isAllDay) {
            const realEndDate = new Date(endDate);
            realEndDate.setDate(realEndDate.getDate() - 1);

            if (startDate.toDateString() === realEndDate.toDateString()) {
                return startFormatted;
            } else {
                return `${startFormatted} - ${formatDate(realEndDate)}`;
            }
        } else {
            const sameDay = startDate.toDateString() === endDate.toDateString();
            if (sameDay) {
                return `${startFormatted} • ${formatTime(startDate)} - ${formatTime(endDate)}`;
            } else {
                return `${startFormatted} ${formatTime(startDate)} - ${formatDate(endDate)} ${formatTime(endDate)}`;
            }
        }
    };

    // Raggruppamento eventi prima per Anno e poi per Mese
    let groupedEvents = $derived(() => {
        const yearsMap = {};

        for (const evt of events) {
            const startStr = evt.start.dateTime || evt.start.date;
            if (!startStr) continue;
            
            const date = new Date(startStr);
            const year = date.getFullYear().toString();
            
            const monthIndex = date.getMonth();
            const monthName = date.toLocaleDateString("it-IT", { month: "long" });
            const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
            const monthKey = String(monthIndex).padStart(2, '0');

            if (!yearsMap[year]) {
                yearsMap[year] = {
                    year: year,
                    monthsMap: {}
                };
            }

            if (!yearsMap[year].monthsMap[monthKey]) {
                yearsMap[year].monthsMap[monthKey] = {
                    title: capitalizedMonth,
                    events: []
                };
            }

            yearsMap[year].monthsMap[monthKey].events.push(evt);
        }

        return Object.keys(yearsMap)
            .sort()
            .map(year => {
                const yearData = yearsMap[year];
                const sortedMonths = Object.keys(yearData.monthsMap)
                    .sort()
                    .map(monthKey => yearData.monthsMap[monthKey]);

                return {
                    year: yearData.year,
                    months: sortedMonths
                };
            });
    });
</script>

<svelte:head>
    <title>Calendario Eventi | Filarmonica Alessandro Stradella APS</title>
</svelte:head>

<main id="contenuto" aria-label="Archivio Calendario Eventi">
    <header class="page-header">
        <h1>Calendario Eventi</h1>
        <p>Scopri i prossimi concerti, le prove aperte, i saggi e tutte le attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano.</p>
    </header>

    {#if loading}
        <p class="state-msg" aria-live="polite">Caricamento eventi dal calendario...</p>
    {:else if error}
        <p class="state-msg error" role="alert">Si è verificato un errore nel caricamento degli eventi.</p>
    {:else if events.length === 0}
        <p class="state-msg">Al momento non ci sono eventi in programma. Torna a trovarci presto!</p>
    {:else}
        <div class="calendar-sections" role="feed" aria-label="Lista degli eventi in programma per anno e mese">
            {#each groupedEvents() as yearGroup}
                <section class="year-section" aria-labelledby="year-{yearGroup.year}">
                    <header class="year-header">
                        <h2 id="year-{yearGroup.year}" class="year-title">{yearGroup.year}</h2>
                    </header>

                    <div class="months-container">
                        {#each yearGroup.months as monthGroup}
                            <section class="month-section" aria-labelledby="month-{yearGroup.year}-{monthGroup.title.toLowerCase()}">
                                <header class="month-header">
                                    <h3 id="month-{yearGroup.year}-{monthGroup.title.toLowerCase()}">{monthGroup.title}</h3>
                                </header>

                                <div class="events-grid">
                                    {#each monthGroup.events as evt}
                                        {@const start = evt.start.dateTime || evt.start.date}
                                        <article>
                                            <a href="/calendar/{evt.id}">
                                                <header>
                                                    <time datetime={start}>{formatEventTime(evt)}</time>
                                                </header>

                                                <h4>{evt.summary}</h4>

                                                <p>{cleanDesc(evt.description)}</p>

                                                {#if evt.location}
                                                    <footer>
                                                        <address>
                                                            <span>
                                                                <Icon icon="mdi:map-marker" width="1.1em" />
                                                                <span>{evt.location}</span>
                                                            </span>
                                                        </address>
                                                    </footer>
                                                {/if}
                                            </a>
                                        </article>
                                    {/each}
                                </div>
                            </section>
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    {/if}
</main>

<!--
<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        padding: 3rem 2rem;
        box-sizing: border-box;
    }

    .page-header {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 1.5rem;
    }

    h1 {
        font-family: var(--font-serif);
        font-size: 2.5rem;
        font-weight: 600;
        margin: 0;
        color: var(--color-heading);
    }

    .page-header p {
        font-size: 1.15rem;
        color: var(--color-text-muted, #666);
        margin: 0;
        line-height: 1.5;
    }

    .calendar-sections {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
    }

    .year-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .year-header {
        border-bottom: 2px solid var(--color-heading);
        padding-bottom: 0.5rem;
    }

    .year-title {
        font-family: var(--font-serif);
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
        color: var(--color-heading);
    }

    .months-container {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    .month-section {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .month-header {
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.75rem;
    }

    .month-section h3 {
        font-family: var(--font-serif);
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: var(--color-heading);
    }

    .state-msg {
        color: var(--color-text-muted, #666);
        font-size: 1rem;
        margin: 0;
    }

    .state-msg.error {
        color: #d32f2f;
    }

    .events-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        width: 100%;
    }

    article {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 0;
        padding: 1.75rem;
        width: 100%;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }

    article:hover {
        border-color: var(--color-heading);
    }

    article a {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    article header {
        border: none;
        padding: 0;
        margin-bottom: 0.5rem;
    }

    time {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        color: var(--color-text-muted, #666);
        text-transform: uppercase;
    }

    h4 {
        font-family: var(--font-serif);
        font-size: 1.35rem;
        font-weight: 600;
        line-height: 1.35;
        margin: 0 0 0.75rem 0;
        color: var(--color-heading);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p {
        font-size: 0.95rem;
        color: var(--color-text, #444);
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
    }

    footer {
        margin-top: auto;
        border-top: 1px solid var(--color-border);
        padding-top: 1rem;
        font-size: 0.85rem;
    }

    address {
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    address span {
        color: var(--color-text-muted, #666);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    address span span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (min-width: 1000px) {
        .events-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
-->