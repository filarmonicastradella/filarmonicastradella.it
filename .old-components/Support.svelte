<script>
    import Icon from "@iconify/svelte";
</script>

<section aria-labelledby="sostienici-heading">
    <div>
        <header>
            <div class="header-titles">
                <span aria-hidden="true">Partecipa</span>
                <h2 id="sostienici-heading">Sostieni la Filarmonica</h2>
            </div>
        </header>

        <p class="section-intro">
            Il sostegno di soci, amici e donatori è fondamentale per permettere all'associazione di continuare la propria attività musicale, promuovere la formazione dei giovani e custodire la nostra tradizione.
        </p>

        <div class="grid">
            <article class="support-card">
                <div class="card-content">
                    <h3>Diventa socio</h3>
                    <p>Entra a far parte della nostra grande famiglia musicale, partecipa alla vita dell'associazione e supporta i nostri progetti formativi e concertistici.</p>
                </div>
                <div class="card-action">
                    <a href="/support/join">
                        <span>Diventa socio</span>
                        <Icon icon="mdi:arrow-right" width="1.1em" />
                    </a>
                </div>
            </article>

            <article class="support-card">
                <div class="card-content">
                    <h3>Erogazioni liberali</h3>
                    <p>Sostieni i nostri progetti con un contributo libero tramite bonifico bancario. Le erogazioni a favore delle APS godono delle agevolazioni fiscali previste dalla normativa vigente.</p>
                </div>
                <div class="card-action">
                    <a href="/support/donate">
                        <span>Scopri come donare</span>
                        <Icon icon="mdi:arrow-right" width="1.1em" />
                    </a>
                </div>
            </article>

            <!-- 
            <article class="support-card">
                <div class="card-content">
                    <h3>Sostienici con il 5x1000</h3>
                    <p>Dona il tuo 5x1000 alla Filarmonica Alessandro Stradella APS. Un piccolo gesto che non costa nulla ma che per noi fa una grande differenza.</p>
                </div>
                <div class="card-action">
                    <a href="/support/donate">
                        <span>Scopri come fare</span>
                        <Icon icon="mdi:arrow-right" width="1.1em" />
                    </a>
                </div>
            </article> 
            -->
        </div>
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

    .header-titles {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    span[aria-hidden="true"] {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-wide);
        color: var(--color-primary);
        text-transform: uppercase;
        margin-bottom: var(--space-2xs);
    }

    h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-heading);
        color: var(--text-main);
        margin: 0;
    }

    .section-intro {
        font-size: var(--font-size-lg);
        color: var(--text-muted);
        line-height: var(--line-height-body);
        max-width: 800px;
        margin: 0;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    .support-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color-subtle);
        border-radius: var(--radius-md);
        padding: var(--space-xl);
        box-sizing: border-box;
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    .support-card:hover {
        border-color: var(--border-color-medium);
        box-shadow: var(--shadow-md);
    }

    .card-content {
        display: flex;
        flex-direction: column;
        margin-bottom: var(--space-xl);
    }

    h3 {
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-heading);
        margin: 0 0 var(--space-sm) 0;
        color: var(--text-main);
    }

    .card-content p {
        font-size: var(--font-size-md);
        color: var(--text-muted);
        line-height: var(--line-height-body);
        margin: 0;
    }

    .card-action {
        border-top: 1px solid var(--border-color-subtle);
        padding-top: var(--space-md);
        margin-top: auto;
    }

    .card-action a {
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
        transition: color var(--transition-fast);
    }

    .card-action a:hover {
        color: var(--color-primary-hover);
    }

    @media (min-width: 768px) {
        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
-->