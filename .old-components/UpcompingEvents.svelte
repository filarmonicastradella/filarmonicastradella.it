<script>
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";

    let events = $state([]);
    let loading = $state(true);
    let error = $state(null);
    let carousel;
    let canScrollLeft = $state(false);
    let canScrollRight = $state(false);

    const calendarId = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
    const apiKey = "AIzaSyC9-pNI0BctliGuvjWlUWUP9eeAT2oaBBM";

    onMount(async () => {
        try {
            const now = new Date().toISOString();
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(now)}&maxResults=10&orderBy=startTime&singleEvents=true`);
            const data = await res.json();
            events = data.items || [];
            setTimeout(updateScrollState, 50);
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    const updateScrollState = () => {
        if (!carousel) return;
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        canScrollLeft = scrollLeft > 1;
        canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    };

    const scroll = (dir) => {
        if (!carousel) return;
        const item = carousel.querySelector("article");
        if (item) {
            const itemWidth = item.offsetWidth + parseFloat(getComputedStyle(carousel).gap || 24);
            carousel.scrollBy({ left: dir * itemWidth, behavior: "smooth" });
        }
    };

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
</script>

<section aria-label="Prossimi Eventi">
    <header>
        <h2>Prossimi Eventi</h2>
        <nav aria-label="Controllo scorrimento eventi">
            <button type="button" onclick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Eventi precedenti">
                <Icon icon="mdi:chevron-left" width="1.2em" />
            </button>
            <button type="button" onclick={() => scroll(1)} disabled={!canScrollRight} aria-label="Eventi successivi">
                <Icon icon="mdi:chevron-right" width="1.2em" />
            </button>
        </nav>
    </header>

    {#if loading}
        <p>Caricamento eventi...</p>
    {:else if error}
        <p>Errore nel caricamento.</p>
    {:else if events.length === 0}
        <p>Nessun evento in programma</p>
    {:else}
        <div 
            bind:this={carousel} 
            onscroll={updateScrollState}
            onresize={updateScrollState}
            tabindex="0" 
            role="region" 
            aria-label="Lista eventi a scorrimento"
        >
            {#each events as evt}
                {@const start = evt.start.dateTime || evt.start.date}
                <article>
                    <a href="/calendar/{evt.id}">
                        <header>
                            <time datetime={start}>{formatEventTime(evt)}</time>
                        </header>

                        <h3>{evt.summary}</h3>

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
    {/if}
</section>

<!--
<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: var(--space-3xl) var(--space-lg);
    }

    section > header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: 1px solid var(--border-color-medium);
        padding-bottom: var(--space-md);
    }

    h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin: 0;
        color: var(--text-main);
    }

    nav {
        display: flex;
        gap: var(--space-2xs);
    }

    button {
        background: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        width: 36px;
        height: 36px;
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-main);
        transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
    }

    button:hover:not(:disabled) {
        background: var(--color-primary);
        color: var(--color-primary-contrast);
        border-color: var(--color-primary);
    }

    button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    section > div {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        gap: var(--space-lg);
        padding-bottom: var(--space-xs);
        scrollbar-width: none;
        outline: none;
    }

    section > div::-webkit-scrollbar {
        display: none;
    }

    article {
        background: var(--bg-surface);
        border: 1px solid var(--border-color-subtle);
        border-radius: var(--radius-md);
        padding: var(--space-lg);
        flex: 0 0 100%;
        width: 100%;
        scroll-snap-align: start;
        box-sizing: border-box;
        box-shadow: var(--shadow-sm);
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    article:hover {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
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
        margin-bottom: var(--space-xs);
    }

    time {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-wide);
        color: var(--text-muted);
        text-transform: uppercase;
    }

    h3 {
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-heading);
        margin: 0 0 var(--space-sm) 0;
        color: var(--text-main);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p {
        font-size: var(--font-size-md);
        color: var(--text-muted);
        line-height: var(--line-height-body);
        margin: 0 0 var(--space-xl) 0;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
    }

    footer {
        margin-top: auto;
        border-top: 1px solid var(--border-color-subtle);
        padding-top: var(--space-md);
        font-size: var(--font-size-sm);
    }

    address {
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    address span {
        color: var(--text-muted);
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
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
        article {
            flex: 0 0 calc((100% - var(--space-lg)) / 2);
            width: calc((100% - var(--space-lg)) / 2);
        }
    }
</style>
-->