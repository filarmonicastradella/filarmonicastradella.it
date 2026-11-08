<script lang="ts">
    import { signaturePattern } from "$lib/signature";
    import { describeDevice } from "$lib/device";
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { ensembles } from "$lib/ensembles";
    import { articles } from "$lib/articles";
    import { bookingFaq } from "$lib/faq";
    import { occasions } from "$lib/occasions";
    import { organization } from "$lib/organization";

    // Il modulo per scriverci, in una pagina sua sotto Contatti (dal 8/11/2026, prima in Contatti stessa).
    // Un solo modulo per scriverci e per chiedere un ingaggio (dal 1/11/2026, prima l'ingaggio aveva un modulo suo in /booking):
    // con il motivo «Ingaggio per un evento» compaiono i campi dell'evento. Con «Materiale storico» il modulo diventa la
    // dichiarazione di consegna e liberatoria della raccolta per mostre e archivio (dal 3/11/2026, al posto del foglio di carta):
    // chi ritira il materiale nei punti di raccolta (personale di quell'ente, che ne prende la custodia) aiuta a compilarlo chi non usa il telefono.
    const BOOKING = "Ingaggio per un evento";
    const MATERIAL = "Materiale storico";
    // La richiesta di una ricevuta (dal 8/11/2026): per una donazione i dati del modello «Ricevuta di erogazione liberale» (art. 83 CTS)
    // della tesoreria, per una persona o per un ente; per la quota bastano il socio e l'anno (il resto è nel libro soci).
    const RECEIPT = "Ricevute";

    // A chi arriva il messaggio, secondo il motivo. Senza JS l'indirizzo resta quello del primo motivo, info@.
    // Sei motivi (dal 8/11/2026): uno generico per tutto ciò che è solo un messaggio (domande, iscrizioni, donazioni, collaborazioni,
    // sponsor, stampa, segnalazioni sul sito e sugli articoli), e uno per ogni richiesta che ha campi o avvisi suoi: gli ingaggi,
    // il materiale storico, le ricevute, la privacy, la tutela dei minori. La chiave sceglie il motivo da un link
    // (/contatti/scrivi?motivo=ingaggio); le chiavi dei motivi accorpati restano valide come alias, perché ci sono link e QR che le usano.
    const topics = [
        {
            key: "informazioni",
            aliases: ["altro", "iscrizione", "donazioni", "sito", "articoli", "collaborazioni", "stampa", "sponsor", "enti"],
            name: "Informazioni",
            mailbox: "info"
        },
        { key: "ingaggio", name: BOOKING, mailbox: "info" },
        { key: "storia", name: MATERIAL, mailbox: "info" },
        { key: "ricevuta", name: RECEIPT, mailbox: "tesoreria" },
        { key: "privacy", name: "Privacy e dati personali", mailbox: "privacy" },
        { key: "minori", name: "Tutela dei minori", mailbox: "safeguarding" }
    ];

    // Il motivo scelto dal link (chiave, alias o nome intero), aggiornato anche se si arriva da un altro link della stessa pagina;
    // poi si cambia dal menu. In prerender non c'è l'indirizzo.
    const requested = $derived(browser ? page.url.searchParams.get("motivo") : null);
    let topic = $derived(
        topics.find(({ key, aliases, name }) => requested !== null && (key === requested || aliases?.includes(requested) || name === requested))?.name ??
            topics[0].name
    );
    const mailbox = $derived(topics.find(({ name }) => name === topic)?.mailbox ?? "info");
    const isBooking = $derived(topic === BOOKING);

    // Dal fondo di un articolo (&articolo=/articoli/storia/filarmonica) il messaggio comincia con il suo titolo e indirizzo
    const requestedArticle = $derived(browser ? page.url.searchParams.get("articolo") : null);
    const reportedArticle = $derived(articles.find(({ href, publisher }) => !publisher && href === requestedArticle));
    // Dal piè di pagina (&pagina=/calendario) l'indirizzo della pagina da cui si segnala il problema, nel gruppo «La pagina»;
    // solo indirizzi interni, che cominciano con una barra
    const requestedPage = $derived(browser ? page.url.searchParams.get("pagina") : null);
    const reportedPage = $derived(requestedPage && /^\/[\w\-./%]*$/.test(requestedPage) ? requestedPage : null);
    // Il dispositivo e il browser di chi segnala, ricavati dal browser stesso (src/lib/device.ts); in prerender niente
    const device = browser ? describeDevice() : "";
    const messageStart = $derived(
        reportedArticle
            ? `Articolo «${reportedArticle.title}» (${organization.url}${reportedArticle.href}):\n\n`
            : ""
    );

    // La formazione preferita per un ingaggio: dal link della sua pagina (?formazione=stradella-facendo), altrimenti nessuna
    const NO_PREFERENCE = "Nessuna preferenza";
    const requestedEnsemble = $derived(browser ? page.url.searchParams.get("formazione") : null);
    let ensemble = $derived(ensembles.find(({ slug }) => slug === requestedEnsemble)?.title ?? NO_PREFERENCE);
    const isMaterial = $derived(topic === MATERIAL);
    const isReceipt = $derived(topic === RECEIPT);
    const isSafeguarding = $derived(topics.find(({ name }) => name === topic)?.key === "minori");
    const isPrivacy = $derived(topics.find(({ name }) => name === topic)?.key === "privacy");
    // I diritti del GDPR, detti come li direbbe chi scrive (artt. 15, 16, 17, 7.3, 21, 20)
    const privacyRequests = [
        "Vedere i miei dati",
        "Correggere i miei dati",
        "Cancellare i miei dati",
        "Revocare un consenso",
        "Oppormi a un trattamento",
        "Ricevere i miei dati in un file",
        "Altro"
    ];

    // Chi ha donato: una persona (nascita, codice fiscale, residenza) o un ente (denominazione, codice fiscale o partita IVA, sede)
    let donor = $state("persona");
    // Per cosa è la ricevuta: una donazione o la quota (dal link &per=quota)
    const requestedReceipt = $derived(browser ? page.url.searchParams.get("per") : null);
    // Il socio della quota: chi scrive (il nome è quello di «Chi scrive») o un'altra persona, per esempio un figlio
    let member = $state("io");
    let receiptFor = $derived(requestedReceipt === "quota" ? "quota" : "donazione");
    // I contanti non danno diritto alle agevolazioni, ma la ricevuta si fa lo stesso
    const paymentMethods = ["Bonifico", "Carta, online", "Assegno", "Altro pagamento tracciabile", "Contanti"];
    // Dalla pagina di ringraziamento di Stripe (&modalita=carta) la modalità è già scelta
    const requestedMethod = $derived(browser ? page.url.searchParams.get("modalita") : null);
    let paymentMethod = $derived(requestedMethod === "carta" ? "Carta, online" : "");

    // Materiale storico: le scansioni si mandano dal modulo, gli originali si portano a un punto di raccolta (gli stessi del calendario)
    let delivery = $state("scansioni");

    // I ricordi consegnati, uno per gruppo: con JS se ne aggiungono altri, senza ce n'è uno e il resto va nel messaggio
    const pieceTypes = ["Foto", "Filmato", "Locandina", "Programma", "Altro"];
    let pieces = $state([1]);
    let nextPiece = 2;
    // L'anno di un ricordo: al massimo quello in corso (il sito si ricostruisce ogni 3 ore); prima, qualsiasi
    const thisYear = new Date().getFullYear();
    const handsOriginals = $derived(isMaterial && delivery === "originali");
    // Le firme della consegna, in fondo: nome e cognome di chi consegna e di chi ritira, gli stessi scritti sopra (src/lib/signature.ts)
    let senderName = $state("");
    let receiverName = $state("");
    const collectionPoints = [
        "Agenzia Vittoria Assicurazioni Orietti, Fivizzano",
        "Dal libro alla solidarietà, piazza Medicea, Fivizzano",
        "Biblioteca civica Abate E. Gerini, Fivizzano",
        "Biblioteca Mario Tobino, Magliano",
        "Biblioteca Mario Rigoni Stern, Sassalbo"
    ];

    // Si può chiedere un ingaggio per qualsiasi data futura, poi valutiamo noi (dal 6/11/2026; prima almeno 30 giorni):
    // il limite è solo oggi, il giorno in Italia (AAAA-MM-GG); il sito si ricostruisce ogni 3 ore, il limite resta aggiornato
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Rome" });
</script>

<svelte:head>
    <title>Scrivici — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Scrivi alla Filarmonica Alessandro Stradella APS di Fivizzano, in Lunigiana: informazioni, ingaggi per eventi, iscrizioni, donazioni e materiale storico." />
</svelte:head>

<!-- Chi scrive (o, per il materiale, chi consegna): in un punto diverso del modulo a seconda del motivo -->
{#snippet sender()}
    <fieldset>
        <legend>{isMaterial ? "Chi consegna" : "Chi scrive"}</legend>

        <p>
            <label for="contatto-nome">Nome e cognome</label>
            <input type="text" id="contatto-nome" name="nome" autocomplete="name" bind:value={senderName} required minlength="2" maxlength="120" />
        </p>

        <p>
            <label for="contatto-email">Email</label>
            <input type="email" id="contatto-email" name="email" autocomplete="email" required maxlength="120" />
        </p>

        <!-- Molti preferiscono una telefonata o un messaggio WhatsApp a un'email (informativa privacy), ma il telefono è sempre facoltativo:
             per risponderci basta l'email, l'unico recapito obbligatorio (dal 8/11/2026) -->
        <p>
            <label for="contatto-telefono">Telefono</label>
            <input type="tel" id="contatto-telefono" name="telefono" autocomplete="tel" inputmode="tel" minlength="9" maxlength="20" />
        </p>
    </fieldset>
{/snippet}

<header>
    <h1>Scrivici</h1>
    <p>Scegli il motivo: il messaggio arriva direttamente a chi se ne occupa, e ti rispondiamo per email o per telefono.</p>
</header>

<section>
    <h2>Compila il modulo</h2>
    <form action="https://formsubmit.co/{mailbox}@filarmonicastradella.it" method="POST" enctype="multipart/form-data">
        <input
            type="hidden"
            name="_subject"
            value={isBooking
                ? "Richiesta per un evento – Filarmonica Stradella"
                : isReceipt
                  ? "Richiesta di ricevuta – Filarmonica Stradella"
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

            <!-- Privacy: che cosa si chiede, tra i diritti del GDPR; il resto nel messaggio -->
            {#if isPrivacy}
                <p>
                    <label for="contatto-richiesta">Cosa chiedi</label>
                    <select id="contatto-richiesta" name="richiesta" required>
                        <option value="" disabled selected>Scegli</option>
                        {#each privacyRequests as request (request)}
                            <option>{request}</option>
                        {/each}
                    </select>
                </p>
            {/if}

            <!-- Tutela dei minori: nessun campo in più, chi scrive deve poterlo fare liberamente; prima, i numeri per le emergenze -->
            {#if isSafeguarding}
                <p>
                    <strong>Se un minore è in pericolo adesso, chiama il <a href="tel:112">112</a>.</strong> Per un consiglio o una segnalazione,
                    anche senza dire il tuo nome, c'è il <a href="tel:114">114</a> Emergenza Infanzia, gratuito, a tutte le ore.
                </p>
            {/if}

            <p>
                <label for="contatto-messaggio">Messaggio</label>
                <textarea id="contatto-messaggio" name="messaggio" rows="6" required={!isReceipt} minlength="10" maxlength="2000" value={messageStart}></textarea>
            </p>

        </fieldset>

        <!-- Chi scrive sempre subito dopo il messaggio, con ogni motivo; per il materiale storico si chiama «Chi consegna» -->
        {@render sender()}

        <!-- Un problema con il sito, dal link del piè di pagina: la pagina da cui si arriva e il dispositivo, già compilati e modificabili -->
        {#if reportedPage}
            <fieldset>
                <legend>La pagina</legend>

                <p>
                    <label for="segnalazione-pagina">Indirizzo</label>
                    <input type="url" id="segnalazione-pagina" name="pagina" maxlength="300" value="{organization.url}{reportedPage}" />
                </p>

                <p>
                    <label for="segnalazione-dispositivo">Dispositivo e browser</label>
                    <input type="text" id="segnalazione-dispositivo" name="dispositivo" maxlength="160" value={device} />
                </p>
            </fieldset>
        {/if}

        {#if isMaterial}
            <fieldset>
                <legend>Metodo</legend>

                <p>
                    <input type="radio" id="consegna-scansioni" name="consegna" value="scansioni" bind:group={delivery} />
                    <label for="consegna-scansioni">Mando da qui le scansioni o le foto del materiale</label>
                </p>

                <p>
                    <input type="radio" id="consegna-originali" name="consegna" value="originali" bind:group={delivery} />
                    <label for="consegna-originali">Consegno gli originali a un punto di raccolta</label>
                </p>
            </fieldset>

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

                <p><button type="button" onclick={() => pieces.push(nextPiece++)}>Aggiungi un ricordo</button></p>
            </fieldset>

            <!-- Gli originali portati a un punto di raccolta: compila chi ritira. Viene dopo il materiale, perché i gruppi che ci sono
                 già con il metodo di base (le scansioni) restano al loro posto, e quelli in più si aggiungono dopo -->
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
                        <input type="text" id="contatto-ricevuto" name="ricevuto_da" bind:value={receiverName} required minlength="2" maxlength="120" />
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

            <!-- Le firme al posto di una casella di conferma: chi consegna, e per gli originali anche chi ritira -->
            <fieldset>
                <legend>{handsOriginals ? "Firme" : "Firma"}</legend>

                <p>
                    <label for="materiale-firma">Nome e cognome di chi consegna</label>
                    <input type="text" id="materiale-firma" name="firma" autocomplete="off" required minlength="4" maxlength="120" pattern={signaturePattern(senderName)} title="Scrivi il nome e il cognome indicati in «Chi consegna»" />
                </p>

                {#if handsOriginals}
                    <p>
                        <label for="materiale-firma-ritiro">Nome e cognome di chi ritira</label>
                        <input type="text" id="materiale-firma-ritiro" name="firma_di_chi_ritira" autocomplete="off" required minlength="4" maxlength="120" pattern={signaturePattern(receiverName)} title="Scrivi il nome e il cognome indicati in «Chi ritira»" />
                    </p>
                {/if}
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
                        min={today}
                    />
                </p>

                <p>
                    <label for="contatto-luogo">Luogo</label>
                    <input type="text" id="contatto-luogo" name="luogo" required minlength="2" maxlength="120" />
                </p>

                <p>
                    <label for="contatto-formazione">Formazione</label>
                    <select id="contatto-formazione" name="formazione" bind:value={ensemble}>
                        <option>{NO_PREFERENCE}</option>
                        {#each ensembles as { slug, title } (slug)}
                            <option>{title}</option>
                        {/each}
                    </select>
                </p>
            </fieldset>
        {/if}

        {#if isReceipt}
            <fieldset>
                <legend>La ricevuta</legend>

                <p>
                    <input type="radio" id="ricevuta-donazione" name="ricevuta_per" value="donazione" bind:group={receiptFor} />
                    <label for="ricevuta-donazione">Per una donazione</label>
                </p>

                <p>
                    <input type="radio" id="ricevuta-quota" name="ricevuta_per" value="quota" bind:group={receiptFor} />
                    <label for="ricevuta-quota">Per la quota associativa</label>
                </p>
            </fieldset>
        {/if}

        {#if isReceipt && receiptFor === "quota"}
            <fieldset>
                <legend>La quota</legend>

                <p>
                    <label for="quota-chi">Socio</label>
                    <select id="quota-chi" name="socio_e" required bind:value={member}>
                        <option value="io">Io, che scrivo</option>
                        <option value="altro">Un'altra persona, per esempio mio figlio</option>
                    </select>
                </p>

                <!-- Il socio è chi scrive: il nome si copia da «Chi scrive»; altrimenti si scrive -->
                {#if member === "io"}
                    <input type="hidden" name="socio" value={senderName} />
                {:else}
                    <p>
                        <label for="quota-socio">Nome e cognome del socio</label>
                        <input type="text" id="quota-socio" name="socio" autocomplete="off" required minlength="4" maxlength="120" />
                    </p>
                {/if}

                <p>
                    <label for="quota-anno">Anno</label>
                    <input type="number" id="quota-anno" name="anno" required min="2026" max={thisYear + 1} step="1" inputmode="numeric" value={thisYear} />
                </p>
            </fieldset>
        {:else if isReceipt}
            <!-- Per la ricevuta, dopo chi scrive: chi ha donato (spesso la stessa persona), poi il versamento -->
            <fieldset>
                <legend>Chi ha donato</legend>

                <p>
                    <label for="ricevuta-donatore">Donatore</label>
                    <select id="ricevuta-donatore" name="chi_ha_donato" required bind:value={donor}>
                        <option value="persona">Io, che scrivo</option>
                        <option value="ente">Un ente o una società</option>
                    </select>
                </p>

                {#if donor === "persona"}
                    <p>
                        <label for="ricevuta-luogo-nascita">Luogo di nascita</label>
                        <input type="text" id="ricevuta-luogo-nascita" name="luogo_di_nascita" required minlength="2" maxlength="80" />
                    </p>

                    <p>
                        <label for="ricevuta-data-nascita">Data di nascita</label>
                        <input type="date" id="ricevuta-data-nascita" name="data_di_nascita" autocomplete="bday" required max={today} />
                    </p>

                    <p>
                        <label for="ricevuta-codice_fiscale">Codice fiscale</label>
                        <input type="text" id="ricevuta-codice_fiscale" name="codice_fiscale" required minlength="16" maxlength="16" pattern={"[A-Za-z0-9]{16}"} autocapitalize="characters" spellcheck="false" />
                    </p>
                {:else}
                    <p>
                        <label for="ricevuta-ente-nome">Denominazione</label>
                        <input type="text" id="ricevuta-ente-nome" name="denominazione" autocomplete="organization" required minlength="2" maxlength="120" />
                    </p>

                    <p>
                        <label for="ricevuta-ente-codice">Codice fiscale o partita IVA</label>
                        <input type="text" id="ricevuta-ente-codice" name="codice_fiscale_o_partita_iva" required minlength="11" maxlength="16" pattern={"[A-Za-z0-9]{11}|[A-Za-z0-9]{16}"} autocapitalize="characters" spellcheck="false" />
                    </p>
                {/if}

                <p>
                    <label for="ricevuta-indirizzo">{donor === "persona" ? "Indirizzo di residenza" : "Indirizzo della sede"}</label>
                    <input type="text" id="ricevuta-indirizzo" name="indirizzo" autocomplete="address-line1" required minlength="4" maxlength="120" />
                </p>

                <p>
                    <label for="ricevuta_cap">CAP</label>
                    <input type="text" id="ricevuta_cap" name="cap" autocomplete="postal-code" inputmode="numeric" required minlength="5" maxlength="5" pattern={"[0-9]{5}"} />
                </p>

                <p>
                    <label for="ricevuta-comune">Comune</label>
                    <input type="text" id="ricevuta-comune" name="comune" autocomplete="address-level2" required minlength="2" maxlength="60" />
                </p>
            </fieldset>

            <fieldset>
                <legend>La donazione</legend>

                <p>
                    <label for="ricevuta-data">Data del versamento</label>
                    <input type="date" id="ricevuta-data" name="data_del_versamento" required max={today} />
                </p>

                <p>
                    <label for="ricevuta-importo">Importo in euro</label>
                    <input type="number" id="ricevuta-importo" name="importo" required min="1" step="0.01" inputmode="decimal" />
                </p>

                <p>
                    <label for="ricevuta-modalita">Modalità di pagamento</label>
                    <select id="ricevuta-modalita" name="modalita_di_pagamento" required bind:value={paymentMethod}>
                        <option value="" disabled>Scegli</option>
                        {#each paymentMethods as method (method)}
                            <option>{method}</option>
                        {/each}
                    </select>
                </p>

                <p>Le donazioni in contanti non danno diritto alle agevolazioni fiscali.</p>
            </fieldset>
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

        <p><small>I campi con * sono obbligatori.</small></p>

        <p>
            <button type="submit">
                {isBooking ? "Invia la richiesta" : isReceipt ? "Chiedi la ricevuta" : handsOriginals ? "Registra la consegna" : isMaterial ? "Invia il materiale" : "Invia il messaggio"}
            </button>
        </p>
    </form>
</section>

<!-- Le domande cambiano con il motivo: quelle della raccolta per il materiale storico, quelle sugli ingaggi (condivise con
     /contatti/ingaggi, in $lib/faq.ts) per un ingaggio; con gli altri motivi nessuna -->
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
{:else if isBooking}
    <section>
        <h2>Domande frequenti</h2>
        {#each bookingFaq as item (item.question)}
            <FaqItem {item} />
        {/each}
    </section>
{/if}

<p class="rimando"><a href="/contatti">Contatti</a></p>
