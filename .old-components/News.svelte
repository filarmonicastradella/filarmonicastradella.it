<script>
    import Icon from "@iconify/svelte";

    // JSON segnaposto per le notizie
    let news = $state([
        {
            id: 1,
            title: "Concerto d'Estate in Piazza della Verruca",
            date: "2026-07-28",
            excerpt: "Una serata indimenticabile all'insegna del grande repertorio bandistico e delle composizioni storiche della nostra tradizione.",
            url: "/news/concerto-estate-2026"
        },
        {
            id: 2,
            title: "Apertura delle iscrizioni alla Scuola di Musica",
            date: "2026-07-15",
            excerpt: "Al via i corsi di strumento per l'anno accademico. Scopri l'offerta formativa per tutte le età e i laboratori orchestrali.",
            url: "/news/apertura-corsi-musica"
        },
        {
            id: 3,
            title: "Rinnovo del Consiglio Direttivo APS",
            date: "2026-06-30",
            excerpt: "Pubblicati i verbali dell'assemblea generale e le cariche ufficiali per il triennio associativo in corso.",
            url: "/news/rinnovo-consiglio-direttivo"
        }
    ]);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
    };
</script>

<section aria-labelledby="notizie-heading">
    <div>
        <header>
            <h2 id="notizie-heading">Ultime notizie</h2>
            <a href="/notizie" class="view-all">
                <span>Vedi tutte</span>
                <Icon icon="mdi:arrow-right" width="1.2em" />
            </a>
        </header>

        {#if news.length === 0}
            <p class="status-msg">Nessuna notizia recente.</p>
        {:else}
            <div class="grid">
                {#each news as item}
                    <article>
                        <a href={item.url}>
                            <header>
                                <time datetime={item.date}>{formatDate(item.date)}</time>
                            </header>
                            <h3>{item.title}</h3>
                            <p>{item.excerpt}</p>
                            <footer>
                                <span>
                                    <span>Leggi tutto</span>
                                    <Icon icon="mdi:arrow-right" width="1.1em" />
                                </span>
                            </footer>
                        </a>
                    </article>
                {/each}
            </div>
        {/if}
    </div>
</section>

<!--
<style>
    section {
        background-color: var(--bg-surface);
        border-bottom: 1px solid var(--border-color-subtle);
        padding: var(--space-3xl) 0;
    }

    section > div {
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: 0 var(--space-lg);
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
    }

    section > div > header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid var(--border-color-subtle);
        padding-bottom: var(--space-md);
    }

    h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-heading);
        color: var(--text-main);
        margin: 0;
    }

    .view-all {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        color: var(--color-primary);
        text-decoration: none;
        padding-bottom: var(--space-2xs);
        transition: color var(--transition-fast);
    }

    .view-all:hover {
        color: var(--color-primary-hover);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    .status-msg {
        font-size: var(--font-size-md);
        color: var(--text-muted);
        margin: 0;
    }

    article {
        background: var(--bg-surface);
        border: 1px solid var(--border-color-subtle);
        border-radius: var(--radius-md);
        padding: var(--space-xl);
        box-sizing: border-box;
        box-shadow: var(--shadow-sm);
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    article:hover {
        border-color: var(--border-color-medium);
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
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-heading);
        margin: 0 0 var(--space-sm) 0;
        color: var(--text-main);
    }

    p {
        font-size: var(--font-size-md);
        color: var(--text-muted);
        line-height: var(--line-height-body);
        margin: 0 0 var(--space-xl) 0;
        flex-grow: 1;
    }

    footer {
        margin-top: auto;
        border-top: 1px solid var(--border-color-subtle);
        padding-top: var(--space-md);
    }

    footer > span {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        color: var(--color-primary);
        transition: color var(--transition-fast);
    }

    article a:hover footer > span {
        color: var(--color-primary-hover);
    }

    @media (min-width: 1000px) {
        .grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
-->