<script>
    import Icon from "@iconify/svelte";
</script>

<section aria-label="In Primo Piano">
    <header>
        <h2>In Primo Piano</h2>
    </header>

    <div>
        <article>
            <a href="/about/ensembles">
                <h3>Gli Ensemble</h3>
                <p>
                    Dalla tradizione bandistica alla riscoperta della
                    musica antica, fino alla musica sinfonica e ai
                    progetti giovanili: una costellazione di gruppi
                    aperti alla sperimentazione e ai progetti dei soci.
                </p>
                <span>
                    <span>Scopri di più</span>
                    <Icon icon="mdi:arrow-right" width="1.2em" />
                </span>
            </a>
        </article>

        <article>
            <a href="/about/history">
                <h3>La Nostra Storia</h3>
                <p>
                    Radici profonde che affondano nel 1777. Un viaggio
                    attraverso i secoli tra cultura bandistica,
                    strumenti storici e la memoria viva della nostra
                    comunità.
                </p>
                <span>
                    <span>Scopri di più</span>
                    <Icon icon="mdi:arrow-right" width="1.2em" />
                </span>
            </a>
        </article>

        <article>
            <a href="/calendar">
                <h3>Eventi e Territorio</h3>
                <p>
                    Dalle rassegne concertistiche stagionali alle
                    rievocazioni storiche: la musica della Filarmonica
                    protagonista negli appuntamenti culturali e sociali.
                </p>
                <span>
                    <span>Scopri di più</span>
                    <Icon icon="mdi:arrow-right" width="1.2em" />
                </span>
            </a>
        </article>
    </div>
</section>

<!--
<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: var(--space-3xl) var(--space-lg);
    }

    section header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: 1px solid var(--border-color-subtle);
        padding-bottom: var(--space-md);
    }

    h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-heading);
        margin: 0;
        color: var(--text-main);
    }

    section > div {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
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

    article a > span {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        color: var(--color-primary);
        margin-top: auto;
        padding-top: var(--space-md);
        border-top: 1px solid var(--border-color-subtle);
        transition: color var(--transition-fast);
    }

    article a:hover > span {
        color: var(--color-primary-hover);
    }

    @media (min-width: 1000px) {
        section > div {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
-->