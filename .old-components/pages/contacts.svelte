<script>
    import Icon from "@iconify/svelte";
</script>

<main id="contenuto" class="contacts-page">
    <div class="contacts-container">
        
        <!-- Page Header -->
        <header class="page-header">
            <h2>Contatti e Sede</h2>
            <p>Mettiti in contatto con noi per informazioni sulle iscrizioni, i corsi di musica e i nostri prossimi eventi, oppure vieni a trovarci nelle nostre sedi a Fivizzano e Serricciolo.</p>
        </header>

        <!-- Official Contacts & Institutional Emails Grid -->
        <div class="contacts-grid">
            
            <!-- Contatti Generali e PEC -->
            <section class="section-card" aria-labelledby="contatti-rapidi-heading">
                <h3 id="contatti-rapidi-heading">Recapiti Generali</h3>
                <dl class="contacts-dl">
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:phone" />
                            </span>
                            Telefono
                        </dt>
                        <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:mail" />
                            </span>
                            Posta Elettronica
                        </dt>
                        <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:shield-check" />
                            </span>
                            Posta Elettronica Certificata
                        </dt>
                        <dd><a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a></dd>
                    </div>
                </dl>
            </section>

            <!-- Contatti Istituzionali / Uffici -->
            <section class="section-card" aria-labelledby="contatti-istituzionali-heading">
                <h3 id="contatti-istituzionali-heading">Uffici e Presidenza</h3>
                <dl class="contacts-dl">
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:user-cog" />
                            </span>
                            Presidenza
                        </dt>
                        <dd><a href="mailto:presidente@filarmonicastradella.it">presidente@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:folder-pen" />
                            </span>
                            Segreteria
                        </dt>
                        <dd><a href="mailto:segreteria@filarmonicastradella.it">segreteria@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:wallet" />
                            </span>
                            Tesoreria
                        </dt>
                        <dd><a href="mailto:tesoreria@filarmonicastradella.it">tesoreria@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:shield-alert" />
                            </span>
                            Safeguarding
                        </dt>
                        <dd><a href="mailto:safeguarding@filarmonicastradella.it">safeguarding@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:lock" />
                            </span>
                            Privacy
                        </dt>
                        <dd><a href="mailto:privacy@filarmonicastradella.it">privacy@filarmonicastradella.it</a></dd>
                    </div>
                    <div class="contact-row">
                        <dt>
                            <span class="icon-wrapper">
                                <Icon icon="lucide:code" />
                            </span>
                            Webmaster
                        </dt>
                        <dd><a href="mailto:webmaster@filarmonicastradella.it">webmaster@filarmonicastradella.it</a></dd>
                    </div>
                </dl>
            </section>

        </div>

        <!-- Locations Grid -->
        <div class="locations-grid">
            
            <!-- Sede di Fivizzano -->
            <section class="location-card" aria-labelledby="sede-fivizzano-heading">
                <h3 id="sede-fivizzano-heading">Sede di Fivizzano</h3>

                <address class="location-address">
                    <a href="https://maps.google.com/?q=Via+Radda+7,+54013+Fivizzano+MS" target="_blank" rel="noopener noreferrer">
                        <strong>Filarmonica Alessandro Stradella APS</strong><br>
                        Via Radda 7<br>
                        54013 Fivizzano (MS)<br>
                        Italia
                    </a>
                </address>

                <p class="location-desc">Sede dell'associazione, storicamente nota in gergo come "Sala Operaia", aperta in occasione di prove, eventi pubblici e sportelli informativi dedicati.</p>

                <figure class="map-figure">
                    <iframe
                        title="Mappa della sede di Fivizzano"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.784404098921!2d10.1278!3d44.2375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d515364166299b%3A0x6b772421371cb14b!2sVia%20Radda%2C%207%2C%2054013%20Fivizzano%20MS!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit"
                        width="100%"
                        height="280"
                        loading="lazy">
                    <!-- style="border:0;" -->
                    </iframe>
                    <figcaption>
                        <a href="https://maps.google.com/?q=Via+Radda+7,+54013+Fivizzano+MS" target="_blank" rel="noopener noreferrer">
                            Apri mappa a schermo intero <span aria-hidden="true">&rarr;</span>
                        </a>
                    </figcaption>
                </figure>
            </section>

            <!-- Sede di Serricciolo -->
            <section class="location-card" aria-labelledby="sede-serricciolo-heading">
                <h3 id="sede-serricciolo-heading">Sede di Serricciolo</h3>

                <address class="location-address">
                    <a href="https://maps.app.goo.gl/FYszuhGgyCZdf5zm6" target="_blank" rel="noopener noreferrer">
                        <strong>Circolo Culturale "Giovanni Fantoni"</strong><br>
                        Via la Spezia 7<br>
                        54013 Serricciolo, Fivizzano (MS)<br>
                        Italia
                    </a>
                </address>

                <p class="location-desc">Sede dell'associazione, situata presso il Circolo Fantoni e attiva per le iniziative e gli incontri sul territorio.</p>

                <figure class="map-figure">
                    <iframe
                        title="Mappa della sede di Serricciolo"
                        src="https://maps.google.com/maps?q=Via+la+Spezia+7,+Serricciolo,+Fivizzano+MS&output=embed"
                        width="100%"
                        height="280"
                        loading="lazy">
                    <!-- style="border:0;" -->
                    </iframe>
                    <figcaption>
                        <a href="https://maps.app.goo.gl/FYszuhGgyCZdf5zm6" target="_blank" rel="noopener noreferrer">
                            Apri mappa a schermo intero <span aria-hidden="true">&rarr;</span>
                        </a>
                    </figcaption>
                </figure>
            </section>

        </div>

    </div>
</main>

<!--
<style>
    .contacts-page {
        padding: var(--space-3xl) var(--space-lg);
        background-color: var(--bg-page);
        color: var(--text-main);
    }

    .contacts-container {
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-3xl);
    }

    /* Page Header */
    .page-header {
        max-width: var(--content-max-width-text);
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .page-header p {
        color: var(--text-muted);
        font-size: var(--font-size-lg);
        margin: 0;
    }

    /* Grids */
    .contacts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-xl);
    }

    .locations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--space-xl);
    }

    /* Section Cards */
    .section-card {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-lg);
        padding: var(--space-xl);
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
    }

    .section-card h3 {
        font-size: var(--font-size-xl);
        margin: 0;
        padding-bottom: var(--space-xs);
        border-bottom: 1px solid var(--border-color-subtle);
    }

    /* Location Cards */
    .location-card {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-lg);
        padding: var(--space-xl);
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        transition: box-shadow var(--transition-normal);
    }

    .location-card:hover {
        box-shadow: var(--shadow-md);
    }

    .location-card h3 {
        font-size: var(--font-size-2xl);
        margin: 0;
        color: var(--text-main);
    }

    /* Definition List Styles */
    .contacts-dl {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        margin: 0;
    }

    .contact-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: var(--space-sm);
        border-bottom: 1px dashed var(--border-color-subtle);
        flex-wrap: wrap;
        gap: var(--space-xs);
    }

    .contact-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .contact-row dt {
        font-weight: var(--font-weight-medium);
        color: var(--text-muted);
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        font-size: var(--font-size-sm);
    }

    .contact-row dd {
        margin: 0;
        font-weight: var(--font-weight-semibold);
        word-break: break-word;
    }

    .icon-wrapper {
        display: inline-flex;
        align-items: center;
        color: var(--color-primary);
        font-size: 1.1rem;
    }

    .location-address {
        font-style: normal;
        font-size: var(--font-size-md);
        line-height: var(--line-height-body);
        color: var(--text-muted);
        background-color: var(--bg-subtle);
        padding: var(--space-md);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-primary);
    }

    .location-address a {
        color: inherit;
        text-decoration: none;
        display: block;
    }

    .location-address a:hover {
        color: var(--color-primary);
    }

    .location-address strong {
        color: var(--text-main);
        font-family: var(--font-heading);
        font-size: var(--font-size-lg);
    }

    .location-desc {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
    }

    /* Map Figure */
    .map-figure {
        margin: 0;
        border-radius: var(--radius-md);
        overflow: hidden;
        border: 1px solid var(--border-color-medium);
        background-color: var(--bg-subtle);
    }

    .map-figure iframe {
        display: block;
        width: 100%;
    }

    .map-figure figcaption {
        padding: var(--space-xs) var(--space-md);
        background-color: var(--bg-surface);
        font-size: var(--font-size-xs);
        text-align: right;
        border-top: 1px solid var(--border-color-subtle);
    }

    .map-figure figcaption a {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
        text-decoration: none;
    }

    .map-figure figcaption a:hover {
        text-decoration: underline;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .contacts-page {
            padding: var(--space-xl) var(--space-md);
        }

        .section-card,
        .location-card {
            padding: var(--space-lg);
        }

        .contact-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
        }

        .contact-row dd {
            align-self: flex-start;
        }
    }
</style>
-->