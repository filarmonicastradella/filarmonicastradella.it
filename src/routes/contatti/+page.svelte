<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { organization } from "$lib/organization";

    // Un solo modulo per scriverci e per chiedere un ingaggio (dal 1/11/2026, prima l'ingaggio aveva un modulo suo in /booking):
    // con il motivo «Ingaggio per un evento» compaiono i campi dell'evento. Con «Materiale storico» il modulo diventa la
    // dichiarazione di consegna e liberatoria della raccolta per la mostra (dal 3/11/2026, al posto del foglio di carta):
    // chi ritira il materiale nei punti di raccolta aiuta a compilarlo chi non usa il telefono.
    const BOOKING = "Ingaggio per un evento";
    const MATERIAL = "Materiale storico";

    // A chi arriva il messaggio, secondo il motivo. Senza JS l'indirizzo resta quello del primo motivo, info@.
    // La chiave sceglie il motivo da un link: /contatti?motivo=ingaggio#scrivici
    const topics = [
        { key: "informazioni", name: "Informazioni generali", mailbox: "info" },
        { key: "ingaggio", name: BOOKING, mailbox: "info" },
        { key: "iscrizione", name: "Iscrizione e quote", mailbox: "segreteria" },
        { key: "donazioni", name: "Donazioni e ricevute", mailbox: "tesoreria" },
        { key: "collaborazioni", name: "Collaborazioni, enti e sponsor", mailbox: "presidente" },
        { key: "stampa", name: "Stampa e media", mailbox: "presidente" },
        { key: "storia", name: MATERIAL, mailbox: "info" },
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
    const isMaterial = $derived(topic === MATERIAL);

    // Materiale storico: le scansioni si mandano dal modulo, gli originali si portano a un punto di raccolta (gli stessi del calendario)
    let delivery = $state("scansioni");

    // I pezzi consegnati, uno per riga: con JS se ne aggiungono altri, senza ce n'è uno e il resto va nel messaggio
    const pieceTypes = ["Foto", "Filmato", "Locandina", "Programma", "Altro"];
    let pieces = $state([1]);
    let nextPiece = 2;
    // L'anno di un pezzo: al massimo quello in corso (il sito si ricostruisce ogni 3 ore); prima, qualsiasi
    const thisYear = new Date().getFullYear();
    const handsOriginals = $derived(isMaterial && delivery === "originali");
    const collectionPoints = [
        "Agenzia Vittoria Assicurazioni Orietti, Fivizzano",
        "Dal libro alla solidarietà, piazza Medicea, Fivizzano",
        "Biblioteca civica Abate E. Gerini, Fivizzano",
        "Biblioteca Mario Tobino, Magliano",
        "Biblioteca Mario Rigoni Stern, Sassalbo"
    ];

    // Almeno 30 giorni da oggi, il giorno in Italia (AAAA-MM-GG); il sito si ricostruisce ogni 3 ore, il limite resta aggiornato
    const minDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-CA", { timeZone: "Europe/Rome" });

    // Una data troppo vicina: al posto del messaggio generico del browser, la regola dei 30 giorni
    type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

    function explainDate(e: InputEvent) {
        if (e.currentTarget.validity.rangeUnderflow) {
            e.currentTarget.setCustomValidity("Scrivici almeno 30 giorni prima dell'evento");
        }
    }
</script>

<svelte:head>
    <title>Contatti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Telefono, email e modulo di contatto della Filarmonica Alessandro Stradella APS di Fivizzano, in Lunigiana: informazioni, iscrizioni, donazioni ed eventi." />
</svelte:head>

<!-- Chi scrive (o, per il materiale, chi consegna): in un punto diverso del modulo a seconda del motivo -->
{#snippet sender()}
    <fieldset>
        <legend>{isMaterial ? "Chi consegna" : "Chi scrive"}</legend>

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
{/snippet}

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
        <dd><a href="mailto:info@filarmonicastradella.it?subject=Informazioni">info@filarmonicastradella.it</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    <!-- Da riattivare insieme a /faq:
    <p>Prima di scriverci, guarda le <a href="/faq">domande frequenti</a>.</p>
    -->
</section>

<section id="scrivici">
    <h2>Scrivici</h2>
    <form action="https://formsubmit.co/{mailbox}@filarmonicastradella.it" method="POST" enctype="multipart/form-data">
        <input
            type="hidden"
            name="_subject"
            value={isBooking
                ? "Richiesta per un evento – Filarmonica Stradella"
                : isMaterial
                  ? "Materiale per la mostra «La tradizione bandistica in Lunigiana» – Filarmonica Stradella"
                  : "Nuovo messaggio dal sito – Filarmonica Stradella"}
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

        {#if isMaterial}
            <fieldset>
                <legend>Consegna</legend>

                <p>
                    <input type="radio" id="consegna-scansioni" name="consegna" value="scansioni" bind:group={delivery} />
                    <label for="consegna-scansioni">Mando da qui le scansioni o le foto del materiale</label>
                </p>

                <p>
                    <input type="radio" id="consegna-originali" name="consegna" value="originali" bind:group={delivery} />
                    <label for="consegna-originali">Consegno gli originali a un punto di raccolta</label>
                </p>
            </fieldset>

            {@render sender()}

            <!-- Gli originali portati a un punto di raccolta: compila chi ritira, con chi consegna accanto -->
            {#if handsOriginals}
                <fieldset>
                    <legend>Chi ritira</legend>

                    <p>
                        <label for="contatto-punto">Punto di raccolta</label>
                        <select id="contatto-punto" name="punto_di_raccolta" required>
                            <option value="" disabled selected>Scegli il punto di raccolta</option>
                            {#each collectionPoints as point (point)}
                                <option>{point}</option>
                            {/each}
                        </select>
                    </p>

                    <p>
                        <label for="contatto-ricevuto">Nome e cognome</label>
                        <input type="text" id="contatto-ricevuto" name="ricevuto_da" required minlength="2" maxlength="120" />
                    </p>

                    <!-- Chi ritira guarda il documento di chi consegna, senza copiarlo: servirà a restituire gli originali alla persona giusta -->
                    <p>
                        <input type="checkbox" id="contatto-documento-visto" name="documento_verificato" value="Sì" required />
                        <label for="contatto-documento-visto">Ho verificato l'identità di chi consegna con un documento.</label>
                    </p>
                </fieldset>
            {/if}

            <fieldset>
                <legend>Il materiale</legend>

                {#each pieces as piece, i (piece)}
                    <fieldset>
                        <legend>Pezzo {i + 1}</legend>

                        <p>
                            <label for="pezzo-{piece}-tipo">Che cos'è</label>
                            <select id="pezzo-{piece}-tipo" name="pezzo_{i + 1}_tipo" required>
                                <option value="" disabled selected>Scegli</option>
                                {#each pieceTypes as type (type)}
                                    <option>{type}</option>
                                {/each}
                            </select>
                        </p>

                        <p>
                            <label for="pezzo-{piece}-descrizione">Descrizione</label>
                            <textarea id="pezzo-{piece}-descrizione" name="pezzo_{i + 1}_descrizione" rows="3" required minlength="3" maxlength="1000"></textarea>
                        </p>

                        <p>
                            <label for="pezzo-{piece}-anno">Anno</label>
                            <input type="number" id="pezzo-{piece}-anno" name="pezzo_{i + 1}_anno" max={thisYear} step="1" inputmode="numeric" />
                        </p>

                        <p>
                            <label for="pezzo-{piece}-autore">Autore</label>
                            <input type="text" id="pezzo-{piece}-autore" name="pezzo_{i + 1}_autore" maxlength="120" />
                        </p>

                        <!-- Un file per pezzo: la scansione mandata da casa, o la foto fatta da chi ritira l'originale -->
                        <p>
                            <label for="pezzo-{piece}-file">{handsOriginals ? "Foto al momento della consegna (JPG o PNG)" : "Scansione o foto (JPG, PNG o PDF)"}</label>
                            <input
                                type="file"
                                id="pezzo-{piece}-file"
                                name="attachment"
                                required
                                accept={handsOriginals ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
                            />
                        </p>

                        {#if pieces.length > 1}
                            <p><button type="button" onclick={() => (pieces = pieces.filter((p) => p !== piece))}>Togli il pezzo {i + 1}</button></p>
                        {/if}
                    </fieldset>
                {/each}

                <p><button type="button" onclick={() => pieces.push(nextPiece++)}>Aggiungi un altro pezzo</button></p>
            </fieldset>

            <!-- La dichiarazione di consegna e liberatoria della raccolta, una casella per impegno -->
            <fieldset>
                <legend>Autorizzazioni</legend>

                <p>
                    <input type="checkbox" id="materiale-maggiorenne" name="maggiorenne" value="Sì" required />
                    <label for="materiale-maggiorenne">Dichiaro di essere maggiorenne.</label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-diritti" name="diritti_sul_materiale" value="Sì" required />
                    <label for="materiale-diritti">
                        Dichiaro che il materiale è mio, o che ho comunque il diritto di disporne e di concedere quanto segue.
                    </label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-uso" name="autorizzazione_uso" value="Sì" required />
                    <label for="materiale-uso">
                        Lo presto gratuitamente perché venga digitalizzato e autorizzo la Filarmonica, senza compenso e senza limiti di tempo, a
                        ritoccarne le copie per restauro e impaginazione; a esporre le copie, stampate o su schermo, nella mostra «La tradizione
                        bandistica in Lunigiana» e nelle sue repliche, anche in altri luoghi e negli anni successivi, e nei materiali che le presentano
                        (locandine, stampa, catalogo); a conservare le copie digitali nel proprio archivio storico e a consegnarne una copia alla
                        Biblioteca civica Abate E. Gerini di Fivizzano, che può conservarla e renderla consultabile per finalità di studio e ricerca.
                        La Filarmonica sceglie liberamente quali pezzi esporre e pubblicare.
                    </label>
                </p>

                {#if handsOriginals}
                    <p>
                        <input type="checkbox" id="materiale-custodia" name="custodia_e_ritiro" value="Sì" required />
                        <label for="materiale-custodia">
                            So che gli originali non vengono esposti: la Filarmonica li custodisce gratuitamente per il tempo necessario alla
                            digitalizzazione e li restituisce appena digitalizzati, possibilmente prima dell'apertura della mostra; risponde di perdite
                            o danni solo in caso di dolo o colpa grave e il materiale non è assicurato. Mi impegno a ritirarlo quando mi verrà
                            comunicato che è pronto: se non lo ritiro entro sei mesi da quella comunicazione, rinuncio alla restituzione e il
                            materiale resta alla Filarmonica.
                        </label>
                    </p>
                {/if}

                <p>
                    <input type="checkbox" id="materiale-online" name="pubblicazione_online" value="Sì" />
                    <label for="materiale-online">
                        Acconsento alla pubblicazione delle copie sul sito e sui canali social della Filarmonica, per finalità culturali e senza
                        scopo di lucro.
                    </label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-nome" name="nome_nelle_didascalie" value="Sì" />
                    <label for="materiale-nome">Acconsento a indicare il mio nome nelle didascalie e nella scheda della copia data alla Biblioteca.</label>
                </p>

                <p>
                    Il consenso alla pubblicazione online si può revocare scrivendo a
                    <a href="mailto:privacy@filarmonicastradella.it?subject=Revoca%20della%20pubblicazione%20del%20materiale">privacy@filarmonicastradella.it</a>: la
                    revoca vale per il futuro e non riguarda la mostra, l'archivio né i materiali già stampati o diffusi.
                </p>
            </fieldset>
        {/if}

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

        {#if !isMaterial}
            {@render sender()}
        {/if}

        <p>
            <input type="checkbox" id="contatto-privacy" name="consenso_privacy" value="Sì" required />
            <label for="contatto-privacy">
                {#if isMaterial}
                    Ho letto l'<a href="/informative/materiale" target="_blank" rel="noopener noreferrer">informativa per la raccolta del materiale</a>.
                {:else}
                    Ho letto l'<a href="/informative/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento
                    dei dati per ricevere una risposta.
                {/if}
            </label>
        </p>

        <p>
            <button type="submit">
                {isBooking ? "Invia la richiesta" : handsOriginals ? "Registra la consegna" : isMaterial ? "Invia il materiale" : "Invia il messaggio"}
            </button>
        </p>
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
