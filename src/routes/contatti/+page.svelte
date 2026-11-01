<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { organization } from "$lib/organization";

    // Un solo modulo per scriverci e per chiedere un ingaggio (dal 1/11/2026, prima l'ingaggio aveva un modulo suo in /booking):
    // con il motivo «Ingaggio per un evento» compaiono i campi dell'evento.
    const BOOKING = "Ingaggio per un evento";

    // A chi arriva il messaggio, secondo il motivo. Senza JS l'indirizzo resta quello del primo motivo, info@.
    // La chiave sceglie il motivo da un link: /contatti?motivo=ingaggio#scrivici
    const topics = [
        { key: "informazioni", name: "Informazioni generali", mailbox: "info" },
        { key: "ingaggio", name: BOOKING, mailbox: "info" },
        { key: "iscrizione", name: "Iscrizione e quote", mailbox: "segreteria" },
        { key: "donazioni", name: "Donazioni e ricevute", mailbox: "tesoreria" },
        { key: "collaborazioni", name: "Collaborazioni, enti e sponsor", mailbox: "presidente" },
        { key: "stampa", name: "Stampa e media", mailbox: "presidente" },
        { key: "storia", name: "Materiale storico", mailbox: "info" },
        { key: "minori", name: "Tutela dei minori", mailbox: "safeguarding" },
        { key: "privacy", name: "Privacy e dati personali", mailbox: "privacy" },
        { key: "sito", name: "Problemi con il sito", mailbox: "webmaster" },
        { key: "altro", name: "Altro", mailbox: "info" }
    ];

    // Chi organizza ragiona per occasioni: la formazione adatta la proponiamo noi. Niente funzioni religiose né eventi
    // di partito (associazione laica e apartitica, vedi le domande frequenti); i convegni sono tra le occasioni più frequenti.
    const occasions = [
        "Concerto, rassegna o festival",
        "Convegno o conferenza",
        "Cerimonia o ricorrenza civile",
        "Festa in piazza, sagra o corteo",
        "Rievocazione storica",
        "Festa privata o matrimonio",
        "Ospedale, RSA o iniziativa sociale",
        "Altro"
    ];

    // Il motivo scelto dal link (chiave o nome intero), aggiornato anche se si arriva da un altro link della stessa pagina;
    // poi si cambia dal menu. In prerender non c'è l'indirizzo.
    const requested = $derived(browser ? page.url.searchParams.get("motivo") : null);
    let topic = $derived(topics.find(({ key, name }) => key === requested || name === requested)?.name ?? topics[0].name);
    const mailbox = $derived(topics.find(({ name }) => name === topic)?.mailbox ?? "info");
    const isBooking = $derived(topic === BOOKING);

    // Almeno 30 giorni da oggi, il giorno in Italia (AAAA-MM-GG); il sito si ricostruisce ogni 3 ore, il limite resta aggiornato
    const minDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-CA", { timeZone: "Europe/Rome" });

    // Una data troppo vicina: al posto del messaggio generico del browser, la regola dei 30 giorni e la prima data utile
    type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
    const firstDate = new Date(minDate).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

    function explainDate(e: InputEvent) {
        if (e.currentTarget.validity.rangeUnderflow) {
            e.currentTarget.setCustomValidity(`Scrivici almeno 30 giorni prima dell'evento: la prima data possibile è il ${firstDate}.`);
        }
    }
</script>

<svelte:head>
    <title>Contatti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Telefono, email e modulo di contatto della Filarmonica Alessandro Stradella APS di Fivizzano, in Lunigiana: informazioni, iscrizioni, donazioni ed eventi." />
</svelte:head>

<header>
    <h1>Contatti</h1>
    <p>Per informazioni, iscrizioni e concerti scrivici o chiamaci.</p>
</header>

<section>
    <h2>Recapiti</h2>
    <dl>
        <dt>Telefono</dt>
        <dd><a href="tel:+393505363110">+39&nbsp;350&nbsp;536&nbsp;3110</a></dd>
        <dt>Email</dt>
        <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    <!-- Da riattivare insieme a /faq:
    <p>Prima di scriverci, guarda le <a href="/faq">domande frequenti</a>.</p>
    -->
</section>

<section id="scrivici">
    <h2>Scrivici</h2>
    <form action="https://formsubmit.co/{mailbox}@filarmonicastradella.it" method="POST">
        <input
            type="hidden"
            name="_subject"
            value={isBooking ? "Richiesta per un evento – Filarmonica Stradella" : "Nuovo messaggio dal sito – Filarmonica Stradella"}
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://filarmonicastradella.it/contatti/grazie" />
        <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>

        <fieldset>
            <legend>Il messaggio</legend>

            <p>
                <label for="contatto-motivo">Motivo</label>
                <select id="contatto-motivo" name="motivo" required bind:value={topic}>
                    {#each topics as { name } (name)}
                        <option value={name}>{name}</option>
                    {/each}
                </select>
            </p>

            <p>
                <label for="contatto-messaggio">Messaggio</label>
                <textarea id="contatto-messaggio" name="messaggio" rows="6" required minlength="10" maxlength="2000"></textarea>
            </p>
        </fieldset>

        {#if isBooking}
            <fieldset>
                <legend>L'evento</legend>

                <p>
                    <label for="contatto-occasione">Occasione</label>
                    <select id="contatto-occasione" name="occasione" required>
                        <option value="" disabled selected>Scegli l'occasione</option>
                        {#each occasions as occasion (occasion)}
                            <option>{occasion}</option>
                        {/each}
                    </select>
                </p>

                <p>
                    <label for="contatto-data">Data</label>
                    <input
                        type="date"
                        id="contatto-data"
                        name="data"
                        required
                        min={minDate}
                        oninvalid={explainDate}
                        oninput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                </p>

                <p>
                    <label for="contatto-luogo">Luogo</label>
                    <input type="text" id="contatto-luogo" name="luogo" required minlength="2" maxlength="120" />
                </p>
            </fieldset>
        {/if}

        <fieldset>
            <legend>Chi scrive</legend>

            <p>
                <label for="contatto-nome">Nome e cognome</label>
                <input type="text" id="contatto-nome" name="nome" autocomplete="name" required minlength="2" maxlength="120" />
            </p>

            <p>
                <label for="contatto-email">Email</label>
                <input type="email" id="contatto-email" name="email" autocomplete="email" required maxlength="120" />
            </p>

            <!-- Molti preferiscono una telefonata o un messaggio WhatsApp a un'email: il telefono lo chiediamo sempre (informativa privacy) -->
            <p>
                <label for="contatto-telefono">Telefono</label>
                <input type="tel" id="contatto-telefono" name="telefono" autocomplete="tel" inputmode="tel" required minlength="9" maxlength="20" />
            </p>
        </fieldset>

        <p>
            <input type="checkbox" id="contatto-privacy" name="consenso_privacy" value="Sì" required />
            <label for="contatto-privacy">
                Ho letto l'<a href="/informative/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento dei dati
                per ricevere una risposta.
            </label>
        </p>

        <p><button type="submit">{isBooking ? "Invia la richiesta" : "Invia il messaggio"}</button></p>
    </form>
</section>

<!-- Le domande di chi chiede un ingaggio (fino al 1/11/2026 nella pagina /booking, ora un rimando qui) -->
<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Dove suonate?</summary>
        <p>Ci spostiamo in tutta la Lunigiana.</p>
    </details>
    <details>
        <summary>Suonate a funzioni religiose o a iniziative di partito?</summary>
        <p>
            No: siamo un'associazione laica e apartitica, e non suoniamo a funzioni religiose né a feste e iniziative di partito.
            Per le occasioni religiose collaboriamo però con le realtà musicali amiche della Lunigiana, e possiamo indicarti a chi rivolgerti.
        </p>
    </details>
    <details>
        <summary>Con quanto anticipo devo scrivervi?</summary>
        <p>Almeno 30 giorni prima dell'evento.</p>
    </details>
    <details>
        <summary>Con quanti musicisti suonate?</summary>
        <p>Dipende dalla formazione e dall'occasione: te lo indichiamo nella proposta.</p>
    </details>
    <details>
        <summary>Cosa serve sul posto?</summary>
        <p>
            Uno spazio adatto alla formazione, le sedie e un riparo in caso di pioggia. La corrente elettrica non sempre è necessaria, ma è gradita.
        </p>
    </details>
</section>

<!-- Da riattivare insieme a /associazione/sedi:
<section>
    <h2>Sedi</h2>
    <p>Indirizzi e mappe della sede legale e delle sedi operative sono nella pagina <a href="/associazione/sedi">Le nostre sedi</a>.</p>
</section>
-->
