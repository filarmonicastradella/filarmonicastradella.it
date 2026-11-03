<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { occasions } from "$lib/occasions";
    import { organization } from "$lib/organization";

    // Un solo modulo per scriverci e per chiedere un ingaggio (dal 1/11/2026, prima l'ingaggio aveva un modulo suo in /booking):
    // con il motivo «Ingaggio per un evento» compaiono i campi dell'evento. Con «Materiale storico» il modulo diventa la
    // dichiarazione di consegna e liberatoria della raccolta per mostre e archivio (dal 3/11/2026, al posto del foglio di carta):
    // chi ritira il materiale nei punti di raccolta (personale di quell'ente, che ne prende la custodia) aiuta a compilarlo chi non usa il telefono.
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

    // Il motivo scelto dal link (chiave o nome intero), aggiornato anche se si arriva da un altro link della stessa pagina;
    // poi si cambia dal menu. In prerender non c'è l'indirizzo.
    const requested = $derived(browser ? page.url.searchParams.get("motivo") : null);
    let topic = $derived(topics.find(({ key, name }) => key === requested || name === requested)?.name ?? topics[0].name);
    const mailbox = $derived(topics.find(({ name }) => name === topic)?.mailbox ?? "info");
    const isBooking = $derived(topic === BOOKING);
    const isMaterial = $derived(topic === MATERIAL);

    // Materiale storico: le scansioni si mandano dal modulo, gli originali si portano a un punto di raccolta (gli stessi del calendario)
    let delivery = $state("scansioni");

    // I ricordi consegnati, uno per gruppo: con JS se ne aggiungono altri, senza ce n'è uno e il resto va nel messaggio
    const pieceTypes = ["Foto", "Filmato", "Locandina", "Programma", "Altro"];
    let pieces = $state([1]);
    let nextPiece = 2;
    // L'anno di un ricordo: al massimo quello in corso (il sito si ricostruisce ogni 3 ore); prima, qualsiasi
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

<section>
    <h2>Per il tuo evento</h2>
    <p>Occasioni, formazioni e domande sugli ingaggi sono nella pagina <a href="/contatti/ingaggi">La Filarmonica al tuo evento</a>.</p>
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
                  ? "Materiale storico – Filarmonica Stradella"
                  : "Nuovo messaggio dal sito – Filarmonica Stradella"}
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://filarmonicastradella.it/contatti/grazie{isMaterial ? '/materiale' : ''}" />
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

                    <p>
                    Il nome di chi ritira serve a documentare la consegna e la custodia:
                    <a href="/informative/materiale" target="_blank" rel="noopener noreferrer">informativa per la raccolta del materiale</a>.
                </p>

                <!-- Chi ritira è del punto di raccolta, non della Filarmonica: guarda il documento di chi consegna senza copiarlo, e prende
                     gli originali in custodia per il suo ente fino alla restituzione -->
                    <p>
                        <input type="checkbox" id="contatto-documento-visto" name="documento_verificato" value="Sì" required />
                        <label for="contatto-documento-visto">Dichiaro di aver verificato l'identità di chi consegna con un documento.</label>
                    </p>

                <p>
                    <input type="checkbox" id="contatto-custodia" name="presa_in_custodia" value="Sì" required />
                    <label for="contatto-custodia">
                        Dichiaro di prendere in custodia gli originali per il punto di raccolta indicato, gratuitamente, fino alla loro
                        restituzione.
                    </label>
                </p>
                </fieldset>
            {/if}

            <fieldset>
                <legend>Il materiale</legend>

                {#each pieces as piece, i (piece)}
                    <fieldset>
                        <legend>Ricordo {i + 1}</legend>

                        <p>
                            <label for="ricordo-{piece}-tipo">Tipologia</label>
                            <select id="ricordo-{piece}-tipo" name="ricordo_{i + 1}_tipo" required>
                                <option value="" disabled selected>Scegli</option>
                                {#each pieceTypes as type (type)}
                                    <option>{type}</option>
                                {/each}
                            </select>
                        </p>

                        <p>
                            <label for="ricordo-{piece}-descrizione">Descrizione</label>
                            <textarea id="ricordo-{piece}-descrizione" name="ricordo_{i + 1}_descrizione" rows="3" required minlength="3" maxlength="1000"></textarea>
                        </p>

                        <p>
                            <label for="ricordo-{piece}-anno">Anno</label>
                            <input type="number" id="ricordo-{piece}-anno" name="ricordo_{i + 1}_anno" max={thisYear} step="1" inputmode="numeric" />
                        </p>

                        <p>
                            <label for="ricordo-{piece}-autore">Autore</label>
                            <input type="text" id="ricordo-{piece}-autore" name="ricordo_{i + 1}_autore" maxlength="120" />
                        </p>

                        <!-- Un file per ricordo: la scansione mandata da casa, o la foto fatta da chi ritira l'originale -->
                        <p>
                            <label for="ricordo-{piece}-file">{handsOriginals ? "Foto alla consegna" : "File"}</label>
                            <input
                                type="file"
                                id="ricordo-{piece}-file"
                                name="attachment"
                                required
                                accept={handsOriginals ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
                            />
                        </p>

                        {#if pieces.length > 1}
                            <p><button type="button" onclick={() => (pieces = pieces.filter((p) => p !== piece))}>Rimuovi il ricordo {i + 1}</button></p>
                        {/if}
                    </fieldset>
                {/each}

                <p><button type="button" onclick={() => pieces.push(nextPiece++)}>Aggiungi un altro ricordo</button></p>
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
                        Dichiaro che i ricordi che consegno sono miei, o che ho il diritto di prestarli.
                    </label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-prestito" name="prestito_per_la_digitalizzazione" value="Sì" required />
                    <label for="materiale-prestito">Presto gratuitamente i ricordi alla Filarmonica perché li digitalizzi.</label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-mostre" name="restauro_ed_esposizione" value="Sì" required />
                    <label for="materiale-mostre">Autorizzo la Filarmonica a restaurare le copie digitali dei ricordi e a esporle in mostre.</label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-archivio" name="conservazione_in_archivio" value="Sì" required />
                    <label for="materiale-archivio">Autorizzo la Filarmonica a conservare le copie nel suo archivio storico, senza limiti di tempo.</label>
                </p>

                {#if handsOriginals}
                    <p>
                        <input type="checkbox" id="materiale-custodia" name="custodia_al_punto_di_raccolta" value="Sì" required />
                        <label for="materiale-custodia">
                            Dichiaro di sapere che gli originali restano in custodia al punto di raccolta e non sono assicurati.
                        </label>
                    </p>

                    <p>
                        <input type="checkbox" id="materiale-ritiro" name="ritiro_entro_sei_mesi" value="Sì" required />
                        <label for="materiale-ritiro">
                            Mi impegno a ritirare gli originali entro sei mesi dall'avviso di restituzione, altrimenti restano alla Filarmonica.
                        </label>
                    </p>
                {/if}

                <p>
                    <input type="checkbox" id="materiale-online" name="pubblicazione_online" value="Sì" />
                    <label for="materiale-online">Acconsento alla pubblicazione delle copie sul sito e sui social della Filarmonica.</label>
                </p>

                <p>
                    <input type="checkbox" id="materiale-nome" name="nome_nelle_didascalie" value="Sì" />
                    <label for="materiale-nome">Acconsento a indicare il mio nome nelle didascalie.</label>
                </p>

                <p>
                    La Filarmonica sceglie quali ricordi esporre e pubblicare. La pubblicazione online si può revocare in qualsiasi momento
                    scrivendo a
                    <a href="mailto:privacy@filarmonicastradella.it?subject=Revoca%20della%20pubblicazione%20del%20materiale">privacy@filarmonicastradella.it</a>; la revoca non riguarda le mostre,
                    l'archivio né i materiali già stampati.
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

<!-- Le domande sulla raccolta del materiale storico, solo quando si sceglie quel motivo; quelle sugli ingaggi sono in /contatti/ingaggi -->
{#if isMaterial}
    <section>
        <h2>Domande frequenti</h2>
        <details>
            <summary>Dove posso consegnare gli originali?</summary>
            <p>In uno dei punti di raccolta: {collectionPoints.join("; ")}. Chi ritira il materiale ti aiuta anche a compilare il modulo.</p>
        </details>
        <details>
            <summary>Quando riavrò gli originali?</summary>
            <p>
                Appena li abbiamo digitalizzati, il prima possibile: ti avvisiamo quando sono pronti, e da quel momento hai sei mesi per ritirarli. Nelle
                mostre esponiamo solo le copie.
            </p>
        </details>
        <details>
            <summary>Posso mandare un filmato?</summary>
            <p>Un file video è troppo grande per il modulo: porta la videocassetta o la pellicola a un punto di raccolta, la riversiamo noi.</p>
        </details>
        <details>
            <summary>Le mie foto finiranno online?</summary>
            <p>
                Solo se lo autorizzi nel modulo, e mai le foto recenti in cui si riconoscono dei minori. Chi si riconosce in una foto può chiederne la
                rimozione dal sito e dai social.
            </p>
        </details>
    </section>
{/if}

<!-- Da riattivare insieme a /associazione/sedi:
<section>
    <h2>Sedi</h2>
    <p>Indirizzi e mappe della sede legale e delle sedi operative sono nella pagina <a href="/associazione/sedi">Le nostre sedi</a>.</p>
</section>
-->
