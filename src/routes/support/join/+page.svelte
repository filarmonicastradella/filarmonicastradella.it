<script lang="ts">
    let birthDate = $state("");
    let domicilioUgualeResidenza = $state(true);

    const maxBirthDate = new Date().toISOString().split("T")[0];

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

    const isMinorenne = $derived(age !== null && age < 18);

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
    <title>Richiesta di iscrizione — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Compila il modulo per richiedere l'iscrizione come socio alla Filarmonica Alessandro Stradella APS." />
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
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete="bday" bind:value={birthDate} required max={maxBirthDate} />
        {:else}
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete="bday" required max={maxBirthDate} />
        {/if}
    </p>

    <p>
        <label for="{prefix}codice_fiscale">Codice fiscale</label>
        <input type="text" id="{prefix}codice_fiscale" name="{prefix}codice_fiscale" required minlength="16" oninput={handleCF} />
    </p>
{/snippet}

{#snippet addressFields(prefix: string)}
    <p>
        <label for="{prefix}_comune">Comune</label>
        <input type="text" id="{prefix}_comune" name="{prefix}_comune" autocomplete="section-{prefix} address-level2" required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}_cap">CAP</label>
        <input type="text" id="{prefix}_cap" name="{prefix}_cap" autocomplete="section-{prefix} postal-code" inputmode="numeric" required minlength="5" oninput={handleCAP} />
    </p>

    <p>
        <label for="{prefix}_via">Via / Piazza</label>
        <input type="text" id="{prefix}_via" name="{prefix}_via" autocomplete="section-{prefix} address-line1" required minlength="2" maxlength="80" />
    </p>

    <p>
        <label for="{prefix}_civico">Numero civico</label>
        <input type="text" id="{prefix}_civico" name="{prefix}_civico" autocomplete="section-{prefix} address-line2" required maxlength="10" />
    </p>
{/snippet}

<header>
    <h1>Richiesta di iscrizione</h1>
    <p>Compila il modulo per richiedere l'adesione alla Filarmonica Alessandro Stradella APS. L'esito ti verrà comunicato all'indirizzo email indicato. Per i minorenni l'iscrizione può essere richiesta online da un genitore o tutore.</p>
</header>

<form action="https://formsubmit.co/47c75ae3189afeb17aa6672e17f0b7c6" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_subject" value="Nuova richiesta di iscrizione - Filarmonica Stradella" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_next" value="https://filarmonicastradella.it/support/join/thanks" />
    <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>
    <input type="hidden" name="tipo_richiedente" value={isMinorenne ? "Minorenne (iscrizione tramite genitore/tutore)" : "Maggiorenne"} />

    <fieldset>
        <legend>{isMinorenne ? "Dati anagrafici del minore" : "Dati anagrafici del richiedente"}</legend>
        {@render identityFields("", "", true)}
    </fieldset>

    {#if isTooYoung}
        <p role="alert">
            L'iscrizione online non è abilitata per i minori di 14 anni: <a href="/contacts">contattate l'associazione</a> per completare la pratica di persona.
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
                    Dichiaro di aver preso visione dell'<a href="/legal/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento dei miei dati personali per la gestione della richiesta di iscrizione.
                </label>
            </p>

            <p>
                <input type="checkbox" id="statuto" name="statuto" required />
                <label for="statuto">
                    {#if isMinorenne}
                        Dichiaro di conoscere e accettare lo <a href="/documents/statuto.pdf" target="_blank" rel="noopener noreferrer">statuto</a> (PDF), impegnandomi a rispettarlo anche per conto del minore.
                    {:else}
                        Dichiaro di conoscere e accettare lo <a href="/documents/statuto.pdf" target="_blank" rel="noopener noreferrer">statuto</a> (PDF), impegnandomi a rispettarlo.
                    {/if}
                </label>
            </p>

            {#if isMinorenne}
                <p>
                    <input type="checkbox" id="intesa_genitori" name="intesa_genitori" required />
                    <label for="intesa_genitori">
                        Dichiaro di agire d'intesa con l'altro genitore o tutore, manlevando l'associazione da eventuali contestazioni in caso contrario.
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
            <legend>Consensi facoltativi</legend>

            <p>
                <input type="checkbox" id="consenso_messaggi" name="consenso_messaggi" />
                <label for="consenso_messaggi">Acconsento alla ricezione di avvisi e comunicazioni organizzative tramite strumenti di messaggistica istantanea.</label>
            </p>

            <p>
                <input type="checkbox" id="consenso_email" name="consenso_email" />
                <label for="consenso_email">Acconsento alla ricezione di aggiornamenti sulle attività istituzionali all'indirizzo email indicato.</label>
            </p>

            <p>
                <input type="checkbox" id="consenso_immagini" name="consenso_immagini" />
                <label for="consenso_immagini">
                    Ho letto la <a href="/legal/images" target="_blank" rel="noopener noreferrer">liberatoria per immagini, voce ed esecuzioni</a> e
                    {isMinorenne ? "autorizzo l'uso di foto e riprese del minore" : "autorizzo l'uso di foto e riprese che mi ritraggono"} sui canali indicati,
                    per finalità istituzionali e promozionali.
                </label>
            </p>
        </fieldset>

        <fieldset>
            <legend>{isMinorenne ? "Documento di identità del genitore" : "Documento di identità"}</legend>
            <p>
                <label for="documento_identita">Documento di identità (PDF, JPG o PNG)</label>
                <input type="file" id="documento_identita" name="attachment" required multiple accept="application/pdf,image/jpeg,image/png" />
            </p>
        </fieldset>

        <p>
            <input type="checkbox" id="richiesta_iscrizione" name="richiesta_iscrizione" required />
            <label for="richiesta_iscrizione">
                {#if isMinorenne}
                    Chiedo, in qualità di genitore o tutore, l'iscrizione del minore sopra indicato come socio della Filarmonica Alessandro Stradella APS.
                {:else}
                    Chiedo la mia iscrizione come socio della Filarmonica Alessandro Stradella APS.
                {/if}
            </label>
        </p>
    {/if}

    <p>
        <button type="submit" disabled={isTooYoung}>Invia la richiesta di iscrizione</button>
        <button type="reset">Cancella i campi</button>
    </p>
</form>

<style>
    /*
     * Da 40rem i campi brevi si affiancano: una griglia di sei colonne in cui ogni campo ne occupa tre,
     * i campi corti (CAP, numero civico) due e quelli lunghi (comune, via) quattro. Caselle e file su
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

        form > fieldset > p:has(> input[type="checkbox"], > input[type="file"]),
        form > fieldset > p:not(:has(> input, > select, > textarea)) {
            grid-column: 1 / -1;
        }
    }
</style>
