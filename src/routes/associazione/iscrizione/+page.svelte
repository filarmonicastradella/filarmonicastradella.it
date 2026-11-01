<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";

    // Iscrizione o variazione dei dati e dei consensi di un socio (dal 1/11/2026, prima i consensi avevano un modulo loro):
    // stesso modulo e stessi campi, cambiano solo la richiesta e l'oggetto dell'email. "?modo=variazione" la sceglie da un link.
    let request = $derived(browser && page.url.searchParams.get("modo") === "variazione" ? "variazione" : "iscrizione");
    const isChange = $derived(request === "variazione");

    // I canali della liberatoria su carta (moduli 04.06 e 04.07), uno per uno
    const imageChannels = [
        { name: "consenso_archivio", label: "Archivio interno e documentazione delle attività" },
        { name: "consenso_sito", label: "Sito internet dell'associazione" },
        { name: "consenso_social", label: "Canali social ufficiali dell'associazione" },
        { name: "consenso_stampa", label: "Materiale a stampa e comunicazioni alla stampa" },
        { name: "consenso_piattaforme", label: "Registrazioni dei concerti su piattaforme di condivisione" },
        { name: "consenso_progetti", label: "Documentazione dei progetti per enti finanziatori, scuole e pubbliche amministrazioni" }
    ];

    let birthDate = $state("");
    let domicilioUgualeResidenza = $state(true);

    const maxBirthDate = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Rome" }); // AAAA-MM-GG, il giorno in Italia

    const age = $derived.by(() => {
        if (!birthDate) return null;
        const today = new Date();
        const born = new Date(birthDate);
        let years = today.getFullYear() - born.getFullYear();
        const months = today.getMonth() - born.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < born.getDate())) {
            years--;
        }
        return years;
    });

    // Per chi è l'iscrizione: si sceglie in cima al modulo, e la data di nascita la imposta da sola; chi compila può cambiarla
    let applicant = $derived(age !== null && age < 18 ? "minore" : "maggiorenne");

    const isMinorenne = $derived(applicant === "minore");

    const isTooYoung = $derived(age !== null && age < 14);

    type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

    function handleCF(e: InputEvent) {
        e.currentTarget.value = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
    }

    function handleCAP(e: InputEvent) {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 5);
    }
</script>

<svelte:head>
    <title>Iscrizione e variazioni — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Domanda di iscrizione come socio della Filarmonica Alessandro Stradella APS di Fivizzano, quota annuale di 12 €, anche per i minorenni con un genitore; per chi è già socio, variazione dei dati e dei consensi." />
</svelte:head>

{#snippet identityFields(prefix: string, section: string, bindsBirthDate: boolean)}
    <p>
        <label for="{prefix}nome">Nome</label>
        <input type="text" id="{prefix}nome" name="{prefix}nome" autocomplete={section ? `section-${section} given-name` : "given-name"} required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}cognome">Cognome</label>
        <input type="text" id="{prefix}cognome" name="{prefix}cognome" autocomplete={section ? `section-${section} family-name` : "family-name"} required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}comune_nascita">Comune di nascita</label>
        <input type="text" id="{prefix}comune_nascita" name="{prefix}comune_nascita" required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}data_nascita">Data di nascita</label>
        {#if bindsBirthDate}
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete={(section ? `section-${section} bday` : "bday") as AutoFill} bind:value={birthDate} required max={maxBirthDate} />
        {:else}
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete={(section ? `section-${section} bday` : "bday") as AutoFill} required max={maxBirthDate} />
        {/if}
    </p>

    <p>
        <label for="{prefix}codice_fiscale">Codice fiscale</label>
        <input type="text" id="{prefix}codice_fiscale" name="{prefix}codice_fiscale" required minlength="16" maxlength="16" pattern={"[A-Za-z0-9]{16}"} autocapitalize="characters" spellcheck="false" oninput={handleCF} />
    </p>
{/snippet}

{#snippet addressFields(prefix: string)}
    <p>
        <label for="{prefix}_comune">Comune</label>
        <input type="text" id="{prefix}_comune" name="{prefix}_comune" autocomplete="section-{prefix} address-level2" required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}_cap">CAP</label>
        <input type="text" id="{prefix}_cap" name="{prefix}_cap" autocomplete="section-{prefix} postal-code" inputmode="numeric" required minlength="5" maxlength="5" pattern={"[0-9]{5}"} oninput={handleCAP} />
    </p>

    <p>
        <label for="{prefix}_via">Via o piazza</label>
        <input type="text" id="{prefix}_via" name="{prefix}_via" autocomplete="section-{prefix} address-line1" required minlength="2" maxlength="80" />
    </p>

    <p>
        <label for="{prefix}_civico">Numero civico</label>
        <input type="text" id="{prefix}_civico" name="{prefix}_civico" required maxlength="10" />
    </p>
{/snippet}

<header>
    <h1>Iscrizione e variazioni</h1>
    <p>
        Per iscriverti come socio o, se lo sei già, per aggiornare i tuoi dati e i consensi. Il consiglio direttivo esamina le nuove domande e ti comunica
        l'esito per email.
    </p>
</header>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Quanto costa iscriversi?</summary>
        <p>La quota annuale è di 12 € e si rinnova entro il 31 dicembre.</p>
    </details>
    <details>
        <summary>Che impegno è richiesto? C'è un obbligo di presenza?</summary>
        <p>
            Nessun obbligo: per essere socio basta la quota annuale. Le prove sono una o due volte a settimana, più spesso prima dei concerti, e
            contiamo su di te quando puoi esserci, perché la musica si fa insieme.
        </p>
    </details>
    <details>
        <summary>Devo avere uno strumento mio?</summary>
        <p>No: strumento, parti e sala prove li mette a disposizione l'associazione.</p>
    </details>
    <details>
        <summary>Ci sono limiti di età?</summary>
        <p>
            No: si può suonare a qualsiasi età. Per un minorenne l'iscrizione la fa un genitore: inserisci i dati del minore
            e poi i tuoi, con il tuo documento di identità. Sotto i 14 anni online non si può: <a href="/contatti">contattaci</a> e completiamo la
            pratica di persona.
        </p>
    </details>
    <details>
        <summary>Posso aiutare senza suonare?</summary>
        <p>Sì: da socio puoi dare una mano con il tuo tempo e le tue competenze.</p>
    </details>
</section>

<form action="https://formsubmit.co/segreteria@filarmonicastradella.it" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_subject" value={isChange ? "Variazione dei dati di un socio – Filarmonica Stradella" : "Nuova domanda di iscrizione – Filarmonica Stradella"} />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_next" value="https://filarmonicastradella.it/associazione/iscrizione/grazie" />
    <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>
    <fieldset>
        <legend>Che cosa vuoi fare</legend>

        <p>
            <input type="radio" id="richiesta_iscrizione_nuova" name="tipo_richiesta" value="iscrizione" bind:group={request} />
            <label for="richiesta_iscrizione_nuova">Nuova iscrizione</label>
        </p>

        <p>
            <input type="radio" id="richiesta_variazione" name="tipo_richiesta" value="variazione" bind:group={request} />
            <label for="richiesta_variazione">Variazione dei dati o dei consensi, per chi è già socio</label>
        </p>
    </fieldset>

    <fieldset>
        <legend>{isChange ? "Per chi" : "Chi si iscrive"}</legend>

        <p>
            <input type="radio" id="richiedente_maggiorenne" name="tipo_richiedente" value="maggiorenne" bind:group={applicant} />
            <label for="richiedente_maggiorenne">{isChange ? "Per me" : "Mi iscrivo io"}</label>
        </p>

        <p>
            <input type="radio" id="richiedente_minore" name="tipo_richiedente" value="minore" bind:group={applicant} />
            <label for="richiedente_minore">{isChange ? "Per un minore" : "Iscrivo un minore"}</label>
        </p>
    </fieldset>

    <fieldset>
        <legend>{isMinorenne ? "Dati anagrafici del minore" : "Dati anagrafici del richiedente"}</legend>
        {@render identityFields("", "", true)}
    </fieldset>

    <!-- Avvisa, anche chi usa uno screen reader, se la casella e la data di nascita non coincidono; di solito è vuoto -->
    <p role="status">{isMinorenne && age !== null && age >= 18 ? "La data di nascita è di un maggiorenne: controlla la data o la scelta qui sopra." : ""}</p>

    {#if isTooYoung}
        <p role="alert">
            Sotto i 14 anni l'iscrizione online non è possibile: <a href="/contatti">contattaci</a> e completiamo la pratica di persona.
        </p>
    {:else}
        {#if isMinorenne}
            <fieldset>
                <legend>Dati anagrafici del genitore</legend>
                {@render identityFields("genitore_", "genitore", false)}
            </fieldset>
        {/if}

        <fieldset>
            <legend>Residenza</legend>
            {@render addressFields("residenza")}

            <p>
                <input type="checkbox" id="domicilio_uguale_residenza" name="domicilio_uguale_residenza" bind:checked={domicilioUgualeResidenza} />
                <label for="domicilio_uguale_residenza">Il domicilio corrisponde alla residenza</label>
            </p>
        </fieldset>

        {#if !domicilioUgualeResidenza}
            <fieldset>
                <legend>Domicilio</legend>
                {@render addressFields("domicilio")}
            </fieldset>
        {/if}

        <fieldset>
            <legend>Contatti</legend>

            <p>
                <label for="telefono">{isMinorenne ? "Telefono del genitore" : "Telefono"}</label>
                <input type="tel" id="telefono" name="telefono" autocomplete="tel" inputmode="tel" required minlength="9" maxlength="15" />
            </p>

            <p>
                <label for="email">{isMinorenne ? "Email del genitore" : "Email"}</label>
                <input type="email" id="email" name="email" autocomplete="email" inputmode="email" required maxlength="100" />
            </p>

            {#if isMinorenne}
                <p>
                    <label for="telefono_minore">Telefono del minore (facoltativo)</label>
                    <input type="tel" id="telefono_minore" name="telefono_minore" autocomplete="off" inputmode="tel" minlength="9" maxlength="15" />
                </p>

                <p>
                    <label for="email_minore">Email del minore (facoltativo)</label>
                    <input type="email" id="email_minore" name="email_minore" autocomplete="off" inputmode="email" maxlength="100" />
                </p>
            {/if}
        </fieldset>

        <fieldset>
            <legend>Dichiarazioni</legend>

            <p>
                <input type="checkbox" id="privacy" name="privacy" required />
                <label for="privacy">
                    Dichiaro di aver preso visione dell'<a href="/informative/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento dei miei dati personali per la gestione della domanda di iscrizione.
                </label>
            </p>

            <p>
                <input type="checkbox" id="statuto" name="statuto" required />
                <label for="statuto">
                    {#if isMinorenne}
                        Dichiaro di conoscere e accettare lo <a href="/documents/statuto.pdf" target="_blank" rel="noopener noreferrer">statuto</a>, impegnandomi a rispettarlo anche per conto del minore.
                    {:else}
                        Dichiaro di conoscere e accettare lo <a href="/documents/statuto.pdf" target="_blank" rel="noopener noreferrer">statuto</a>, impegnandomi a rispettarlo.
                    {/if}
                </label>
            </p>

            {#if isMinorenne}
                <p>
                    <input type="checkbox" id="intesa_genitori" name="intesa_genitori" required />
                    <label for="intesa_genitori">
                        Dichiaro di agire d'intesa con l'altro genitore.
                    </label>
                </p>

                <p>
                    <input type="checkbox" id="autorizzazione_uscita" name="autorizzazione_uscita" required />
                    <label for="autorizzazione_uscita">
                        Autorizzo il minore ad allontanarsi autonomamente al termine delle attività istituzionali, esonerando l'associazione da ogni obbligo di vigilanza oltre tale orario.
                    </label>
                </p>
            {/if}
        </fieldset>

        <fieldset>
            <legend>Consensi</legend>

            <p>
                Una casella non spuntata vale come no{isChange ? ", e le scelte che invii sostituiscono quelle date finora" : ""}. Foto e riprese:
                cosa comporta lo spiega la <a href="/informative/immagini" target="_blank" rel="noopener noreferrer">liberatoria per immagini, voce ed esecuzioni</a>.
            </p>

            <p>
                <input type="checkbox" id="consenso_messaggi" name="consenso_messaggi" />
                <label for="consenso_messaggi">Acconsento alla ricezione di avvisi e comunicazioni organizzative tramite strumenti di messaggistica istantanea.</label>
            </p>

            <p>
                <input type="checkbox" id="consenso_email" name="consenso_email" />
                <label for="consenso_email">Acconsento alla ricezione di aggiornamenti sulle attività istituzionali all'indirizzo email indicato.</label>
            </p>

            <!-- Per i minori al massimo il nome proprio, come nella liberatoria per le immagini -->
            <p>
                <input type="checkbox" id="consenso_nome" name="consenso_nome" value="Sì" />
                <label for="consenso_nome">
                    {isMinorenne ? "Pubblicazione del nome proprio del minore" : "Pubblicazione del mio nome e cognome"} nell'elenco dei musicisti del sito.
                </label>
            </p>

            {#each imageChannels as { name, label } (name)}
                <p>
                    <input type="checkbox" id={name} {name} value="Sì" />
                    <label for={name}>{isMinorenne ? "Foto e riprese del minore" : "Foto e riprese che mi ritraggono"}: {label.toLowerCase()}</label>
                </p>
            {/each}
        </fieldset>

        <fieldset>
            <legend>Documento e richiesta</legend>
            <p>
                <label for="documento_identita">{isMinorenne ? "Documento di identità del genitore" : "Documento di identità"} (PDF, JPG o PNG)</label>
                <input type="file" id="documento_identita" name="attachment" required multiple accept="application/pdf,image/jpeg,image/png" />
            </p>

            <p>
                <input type="checkbox" id="richiesta_iscrizione" name="richiesta_iscrizione" required />
                <label for="richiesta_iscrizione">
                    {#if isChange && isMinorenne}
                        Chiedo, in qualità di genitore, di aggiornare i dati e i consensi del minore sopra indicato, socio della Filarmonica Alessandro Stradella APS.
                    {:else if isChange}
                        Chiedo di aggiornare i miei dati e i miei consensi di socio della Filarmonica Alessandro Stradella APS.
                    {:else if isMinorenne}
                        Chiedo, in qualità di genitore, l'iscrizione del minore sopra indicato come socio della Filarmonica Alessandro Stradella APS.
                    {:else}
                        Chiedo la mia iscrizione come socio della Filarmonica Alessandro Stradella APS.
                    {/if}
                </label>
            </p>
        </fieldset>
    {/if}

    <p>
        <button type="submit" disabled={isTooYoung}>{isChange ? "Invia la variazione" : "Invia la domanda di iscrizione"}</button>
    </p>
</form>


<style>
    /*
     * Da 40rem i campi brevi si affiancano: una griglia di sei colonne in cui ogni campo ne occupa tre,
     * i campi corti (CAP, numero civico) due e quelli lunghi (comune, via) quattro. Caselle, scelte e file su
     * tutta la riga.
     */
    @media (min-width: 40rem) {
        form > fieldset {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            column-gap: var(--space-4);
        }

        form > fieldset > p {
            grid-column: span 3;
        }

        form > fieldset > p:has(> [id$="_cap"], > [id$="_civico"]) {
            grid-column: span 2;
        }

        form > fieldset > p:has(> [id$="_comune"], > [id$="_via"]) {
            grid-column: span 4;
        }

        form > fieldset > p:has(> input:is([type="checkbox"], [type="radio"], [type="file"])),
        form > fieldset > p:not(:has(> input, > select, > textarea)) {
            grid-column: 1 / -1;
        }
    }
</style>
