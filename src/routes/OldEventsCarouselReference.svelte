<!--
    Temporaneo: il vecchio carosello eventi (da .old-components/UpcompingEvents.svelte), mostrato
    sopra a quello attuale solo per un confronto visivo. Da togliere insieme a +page.svelte quando
    il confronto è finito. Adattato per usare gli eventi già letti alla build (`EventItem[]`,
    stesso dato del carosello nuovo) invece della sua chiamata originale al vivo a Google Calendar
    con una chiave nel codice: qui serve solo per guardare lo stile, non per rifare la rete.
-->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { EventItem } from "$lib/events";

    let { events }: { events: EventItem[] } = $props();

    let carousel: HTMLElement | undefined = $state();
    let canScrollLeft = $state(false);
    let canScrollRight = $state(false);

    const updateScrollState = () => {
        if (!carousel) return;
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        canScrollLeft = scrollLeft > 1;
        canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    };

    const scroll = (dir: number) => {
        if (!carousel) return;
        const item = carousel.querySelector("article");
        if (item) {
            const itemWidth = item.clientWidth + parseFloat(getComputedStyle(carousel).gap || "24");
            carousel.scrollBy({ left: dir * itemWidth, behavior: "smooth" });
        }
    };
</script>

<p>↓ Vecchio carosello eventi, solo per confronto ↓</p>

<section class="vecchio-carosello" aria-label="Prossimi Eventi (vecchio)">
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

    {#if events.length === 0}
        <p>Nessun evento in programma</p>
    {:else}
        <div bind:this={carousel} onscroll={updateScrollState} tabindex="0" role="region" aria-label="Lista eventi a scorrimento">
            {#each events as event (event.id)}
                <article>
                    <a href="/events/{event.id}">
                        <header>
                            <time datetime={event.start}>{event.when}</time>
                        </header>

                        <h3>{event.summary}</h3>

                        <p>{event.description}</p>

                        {#if event.location}
                            <footer>
                                <address>
                                    <span>
                                        <Icon icon="mdi:map-marker" width="1.1em" />
                                        <span>{event.location}</span>
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

<style>
    p {
        margin: 0;
        padding: var(--space-sm);
        background: var(--color-brand-tint);
        color: var(--color-brand-dark);
        font-size: var(--font-size-sm);
        text-align: center;
    }

    .vecchio-carosello {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
        max-width: var(--page-width);
        margin: 0 auto;
        padding: var(--space-3xl) var(--gutter);
        border-bottom: 4px dashed var(--color-brand);
    }

    .vecchio-carosello > header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: 1px solid var(--border-soft);
        padding-bottom: var(--space-md);
    }

    .vecchio-carosello h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin: 0;
        color: var(--text-main);
    }

    .vecchio-carosello nav {
        display: flex;
        gap: var(--space-2xs);
    }

    .vecchio-carosello button {
        background: var(--bg-surface);
        border: 1px solid var(--border);
        width: 36px;
        height: 36px;
        padding: 0;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-main);
        transition: background var(--transition), color var(--transition), border-color var(--transition);
    }

    .vecchio-carosello button:hover:not(:disabled) {
        background: var(--color-brand);
        color: var(--on-image);
        border-color: var(--color-brand);
    }

    .vecchio-carosello button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .vecchio-carosello > div {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        gap: var(--space-lg);
        padding-bottom: var(--space-xs);
        scrollbar-width: none;
        outline: none;
    }

    .vecchio-carosello > div::-webkit-scrollbar {
        display: none;
    }

    .vecchio-carosello article {
        background: var(--bg-surface);
        border: 1px solid var(--border-soft);
        border-radius: 8px;
        padding: var(--space-lg);
        flex: 0 0 85%;
        width: 85%;
        scroll-snap-align: start;
        box-sizing: border-box;
        box-shadow: var(--shadow);
        transition: border-color var(--transition), box-shadow var(--transition);
    }

    .vecchio-carosello article:hover {
        border-color: var(--color-brand);
    }

    .vecchio-carosello article a {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .vecchio-carosello article header {
        border: none;
        padding: 0;
        margin-bottom: var(--space-xs);
    }

    .vecchio-carosello time {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-wide);
        color: var(--text-muted);
        text-transform: uppercase;
    }

    .vecchio-carosello h3 {
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
    }

    .vecchio-carosello p {
        all: revert;
        font-size: var(--font-size-md);
        color: var(--text-muted);
        line-height: var(--line-height-body);
        margin: 0 0 var(--space-xl) 0;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: break-word;
    }

    .vecchio-carosello footer {
        margin-top: auto;
        border-top: 1px solid var(--border-soft);
        padding-top: var(--space-md);
        font-size: var(--font-size-sm);
    }

    .vecchio-carosello address {
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .vecchio-carosello address span {
        color: var(--text-muted);
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (min-width: 62.5rem) {
        .vecchio-carosello article {
            flex: 0 0 calc((100% - var(--space-lg)) / 2);
            width: calc((100% - var(--space-lg)) / 2);
        }
    }
</style>
