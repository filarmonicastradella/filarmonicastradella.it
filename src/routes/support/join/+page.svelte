<script>
    import Icon from "@iconify/svelte";

    let birthDate = $state("");
    let domicilioUgualeResidenza = $state(true);
    let documentoFileEl = $state(/** @type {HTMLInputElement | null} */ (null));
    let documentoFileName = $state("");
    let isDraggingFile = $state(false);

    const maxBirthDate = new Date().toISOString().split("T")[0];

    let age = $derived.by(() => {
        if (!birthDate) return null;
        const today = new Date();
        const born = new Date(birthDate);
        let diff = today.getFullYear() - born.getFullYear();
        const m = today.getMonth() - born.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < born.getDate())) {
            diff--;
        }
        return diff;
    });

    let isMinorenne = $derived(age !== null && age < 18);
    let isTooYoung = $derived(age !== null && age < 14);

    function handleCF(e) {
        const input = e.target;
        input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
    }

    function handleCAP(e) {
        const input = e.target;
        input.value = input.value.replace(/\D/g, '').slice(0, 5);
    }

    function handleFileChange(e) {
        documentoFileName = e.target.files?.[0]?.name ?? "";
    }

    function handleDragOver(e) {
        e.preventDefault();
        isDraggingFile = true;
    }

    function handleDragLeave() {
        isDraggingFile = false;
    }

    function handleDrop(e) {
        e.preventDefault();
        isDraggingFile = false;
        const file = e.dataTransfer?.files?.[0];
        if (file && documentoFileEl) {
            const transfer = new DataTransfer();
            transfer.items.add(file);
            documentoFileEl.files = transfer.files;
            documentoFileName = file.name;
        }
    }
</script>

<svelte:head>
    <title>Richiesta di Iscrizione | Filarmonica Alessandro Stradella APS</title>
</svelte:head>

{#snippet identityFields(/** @type {string} */ prefix, /** @type {string} */ section, /** @type {boolean} */ bindsBirthDate)}
    <div class="field">
        <label for="{prefix}nome">Nome</label>
        <input type="text" id="{prefix}nome" name="{prefix}nome" autocomplete={section ? `section-${section} given-name` : "given-name"} required minlength="2" maxlength="50" />
    </div>

    <div class="field">
        <label for="{prefix}cognome">Cognome</label>
        <input type="text" id="{prefix}cognome" name="{prefix}cognome" autocomplete={section ? `section-${section} family-name` : "family-name"} required minlength="2" maxlength="50" />
    </div>

    <div class="field">
        <label for="{prefix}comune_nascita">Comune di Nascita</label>
        <input type="text" id="{prefix}comune_nascita" name="{prefix}comune_nascita" required minlength="2" maxlength="50" />
    </div>

    <div class="field">
        <label for="{prefix}data_nascita">Data di Nascita</label>
        {#if bindsBirthDate}
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete="bday" bind:value={birthDate} required max={maxBirthDate} />
        {:else}
            <input type="date" id="{prefix}data_nascita" name="{prefix}data_nascita" autocomplete="bday" required max={maxBirthDate} />
        {/if}
    </div>

    <div class="field">
        <label for="{prefix}codice_fiscale">Codice Fiscale</label>
        <input type="text" id="{prefix}codice_fiscale" name="{prefix}codice_fiscale" required minlength="16" oninput={handleCF} />
    </div>
{/snippet}

{#snippet addressFields(/** @type {string} */ prefix)}
    <div class="field">
        <label for="{prefix}_comune">Comune</label>
        <input type="text" id="{prefix}_comune" name="{prefix}_comune" autocomplete="section-{prefix} address-level2" required minlength="2" maxlength="50" />
    </div>

    <div class="field">
        <label for="{prefix}_cap">CAP</label>
        <input type="text" id="{prefix}_cap" name="{prefix}_cap" autocomplete="section-{prefix} postal-code" inputmode="numeric" required minlength="5" oninput={handleCAP} />
    </div>

    <div class="field">
        <label for="{prefix}_via">Via / Piazza</label>
        <input type="text" id="{prefix}_via" name="{prefix}_via" autocomplete="section-{prefix} address-line1" required minlength="2" maxlength="80" />
    </div>

    <div class="field">
        <label for="{prefix}_civico">N°</label>
        <input type="text" id="{prefix}_civico" name="{prefix}_civico" autocomplete="section-{prefix} address-line2" required maxlength="10" />
    </div>
{/snippet}

<main id="contenuto" class="join-page">
    <div class="join-container">
        <header class="page-header">
            <h1>Richiesta di Iscrizione</h1>
            <p>Compila il modulo per richiedere l'adesione alla Filarmonica Alessandro Stradella APS. Per i minorenni l'iscrizione può essere richiesta online da un genitore o tutore.</p>
        </header>

        <form
            class="join-form"
            action="https://formsubmit.co/47c75ae3189afeb17aa6672e17f0b7c6"
            method="POST"
            enctype="multipart/form-data"
        >
            <input type="hidden" name="_subject" value="Nuova richiesta di iscrizione - Filarmonica Stradella" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://filarmonicastradella.it/" />
            <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>
            <input type="hidden" name="tipo_richiedente" value={isMinorenne ? "Minorenne (iscrizione tramite genitore/tutore)" : "Maggiorenne"} />

            <fieldset>
                <legend><Icon icon={isMinorenne ? "lucide:baby" : "lucide:user"} aria-hidden="true" /> {isMinorenne ? "Dati Anagrafici del Minore" : "Dati Anagrafici del Richiedente"}</legend>

                <div class="field-grid">
                    {@render identityFields("", "", true)}
                </div>
            </fieldset>

            {#if isTooYoung}
                <div class="alert-card" role="alert">
                    <p>L'iscrizione online non è abilitata per i minori di 14 anni: <a href="/contacts">contattate l'Associazione</a> per completare la pratica.</p>
                    <Icon icon="lucide:alert-triangle" width="28" height="28" aria-hidden="true" />
                </div>
            {:else}
                {#if isMinorenne}
                    <fieldset>
                        <legend><Icon icon="lucide:users" aria-hidden="true" /> Dati Anagrafici del Genitore</legend>

                        <div class="field-grid">
                            {@render identityFields("genitore_", "genitore", false)}
                        </div>
                    </fieldset>
                {/if}

                <fieldset>
                    <legend><Icon icon="lucide:home" aria-hidden="true" /> Residenza</legend>

                    <div class="field-grid">
                        {@render addressFields("residenza")}
                    </div>

                    <div class="checkbox-row">
                        <input type="checkbox" id="domicilio_uguale_residenza" name="domicilio_uguale_residenza" bind:checked={domicilioUgualeResidenza} />
                        <label for="domicilio_uguale_residenza">Il domicilio corrisponde alla residenza</label>
                    </div>
                </fieldset>

                {#if !domicilioUgualeResidenza}
                    <fieldset>
                        <legend><Icon icon="lucide:map-pin" aria-hidden="true" /> Domicilio</legend>

                        <div class="field-grid">
                            {@render addressFields("domicilio")}
                        </div>
                    </fieldset>
                {/if}

                <fieldset>
                    <legend><Icon icon="lucide:phone" aria-hidden="true" /> Contatti</legend>

                    <div class="field-grid">
                        <div class="field">
                            <label for="telefono">{isMinorenne ? "Telefono del Genitore" : "Telefono"}</label>
                            <input type="tel" id="telefono" name="telefono" autocomplete="tel" inputmode="tel" required minlength="9" maxlength="15" />
                        </div>

                        <div class="field">
                            <label for="email">{isMinorenne ? "Email del Genitore" : "Email"}</label>
                            <input type="email" id="email" name="email" autocomplete="email" inputmode="email" required maxlength="100" />
                        </div>

                        {#if isMinorenne}
                            <div class="field">
                                <label for="telefono_minore">Telefono del Minore</label>
                                <input type="tel" id="telefono_minore" name="telefono_minore" autocomplete="off" inputmode="tel" minlength="9" maxlength="15" />
                            </div>

                            <div class="field">
                                <label for="email_minore">Email del Minore</label>
                                <input type="email" id="email_minore" name="email_minore" autocomplete="off" inputmode="email" maxlength="100" />
                            </div>
                        {/if}
                    </div>
                </fieldset>

                <fieldset>
                    <legend><Icon icon="lucide:file-check-2" aria-hidden="true" /> Dichiarazioni</legend>

                    <div class="checkbox-row">
                        <input type="checkbox" id="privacy" name="privacy" required />
                        <label for="privacy">
                            Dichiaro di aver preso visione dell'<a href="/legal/privacy" target="_blank" rel="noopener noreferrer">Informativa Privacy</a>.
                        </label>
                    </div>

                    <div class="checkbox-row">
                        <input type="checkbox" id="statuto" name="statuto" required />
                        <label for="statuto">
                            {#if isMinorenne}
                                Dichiaro di conoscere e accettare lo <a href="https://filarmonicastradella.it/statuto.pdf" target="_blank" rel="noopener noreferrer">Statuto</a>, impegnandomi a rispettarlo anche per conto del minore.
                            {:else}
                                Dichiaro di conoscere e accettare lo <a href="https://filarmonicastradella.it/statuto.pdf" target="_blank" rel="noopener noreferrer">Statuto</a>, impegnandomi a rispettarlo.
                            {/if}
                        </label>
                    </div>

                    {#if isMinorenne}
                        <div class="checkbox-row">
                            <input type="checkbox" id="intesa_genitori" name="intesa_genitori" required />
                            <label for="intesa_genitori">
                                Dichiaro di agire d'intesa con l'altro genitore o tutore, manlevando l'Associazione da eventuali contestazioni in caso contrario.
                            </label>
                        </div>

                        <div class="checkbox-row">
                            <input type="checkbox" id="autorizzazione_uscita" name="autorizzazione_uscita" required />
                            <label for="autorizzazione_uscita">
                                Autorizzo il minore ad allontanarsi autonomamente al termine delle attività istituzionali, esonerando l'Associazione da ogni obbligo di vigilanza oltre tale orario.
                            </label>
                        </div>
                    {/if}
                </fieldset>

                <fieldset>
                    <legend><Icon icon="lucide:heart-handshake" aria-hidden="true" /> Consensi Facoltativi</legend>

                    <div class="checkbox-row">
                        <input type="checkbox" id="consenso_messaggi" name="consenso_messaggi" />
                        <label for="consenso_messaggi">Acconsento alla ricezione di avvisi e comunicazioni organizzative tramite strumenti di messaggistica istantanea</label>
                    </div>

                    <div class="checkbox-row">
                        <input type="checkbox" id="consenso_email" name="consenso_email" />
                        <label for="consenso_email">Acconsento alla ricezione di aggiornamenti sulle attività istituzionali all'indirizzo email sopraindicato</label>
                    </div>

                    <div class="checkbox-row">
                        <input type="checkbox" id="consenso_immagini" name="consenso_immagini" />
                        <label for="consenso_immagini">
                            {#if isMinorenne}
                                Acconsento alla pubblicazione di immagini e riprese video che ritraggono il minore, per finalità istituzionali e promozionali
                            {:else}
                                Acconsento alla pubblicazione di immagini e riprese video che mi ritraggono, per finalità istituzionali e promozionali
                            {/if}
                        </label>
                    </div>
                </fieldset>

                <fieldset
                    class="dropzone"
                    class:dropzone-active={isDraggingFile}
                    ondragover={handleDragOver}
                    ondragleave={handleDragLeave}
                    ondrop={handleDrop}
                >
                    <legend><Icon icon="lucide:id-card" aria-hidden="true" /> {isMinorenne ? "Documento di Identità del Genitore" : "Documento di Identità"}</legend>

                    <label for="documento_identita" class="dropzone-label">
                        <Icon icon="lucide:upload-cloud" width="32" height="32" aria-hidden="true" />
                        {#if documentoFileName}
                            <span class="dropzone-filename">{documentoFileName}</span>
                        {:else}
                            <span>Trascina qui il documento o clicca per selezionarlo</span>
                        {/if}
                        <span class="dropzone-hint">PDF, JPG o PNG</span>
                        <input
                            type="file"
                            id="documento_identita"
                            name="attachment"
                            required
                            accept="application/pdf,image/jpeg,image/png"
                            bind:this={documentoFileEl}
                            onchange={handleFileChange}
                            class="visually-hidden"
                        />
                    </label>
                </fieldset>

                <label class="signature-card">
                    <input type="checkbox" id="richiesta_iscrizione" name="richiesta_iscrizione" required />
                    <span class="signature-text">
                        {#if isMinorenne}
                            Chiedo, in qualità di genitore o tutore, l'iscrizione del minore sopra indicato come socio della Filarmonica Alessandro Stradella APS.
                        {:else}
                            Chiedo la mia iscrizione come socio della Filarmonica Alessandro Stradella APS.
                        {/if}
                    </span>
                    <span class="signature-icon"><Icon icon="lucide:pen-line" width="22" height="22" aria-hidden="true" /></span>
                </label>
            {/if}

            <p class="form-note">I campi contrassegnati con <span aria-hidden="true">*</span><span class="visually-hidden">asterisco</span> sono obbligatori.</p>

            <div class="form-actions">
                <button type="reset"><Icon icon="lucide:rotate-ccw" width="16" height="16" aria-hidden="true" /> Cancella campi</button>
                <button type="submit" disabled={isTooYoung}>
                    <Icon icon="lucide:send" width="16" height="16" aria-hidden="true" /> Invia richiesta di iscrizione
                </button>
            </div>
        </form>
    </div>
</main>

<!--
<style>
    .join-page {
        padding: var(--space-3xl) var(--space-lg);
        background-color: var(--bg-page);
        color: var(--text-main);
    }

    .join-container {
        max-width: 760px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-2xl);
    }

    .page-header {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .page-header p {
        color: var(--text-muted);
        font-size: var(--font-size-lg);
        margin: 0;
    }

    .join-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
    }

    fieldset {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-lg);
        padding: var(--space-xl);
        box-shadow: var(--shadow-sm);
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
    }

    legend {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-main);
        padding: 0 var(--space-2xs);
    }

    legend :global(svg) {
        color: var(--color-primary);
    }

    .field-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-lg) var(--space-md);
    }

    .field {
        flex: 1 1 220px;
        display: flex;
        flex-direction: column;
        gap: var(--space-2xs);
    }

    .field-grid .field:has(input[name$="_cap"]) {
        flex: 0 1 110px;
    }

    .field-grid .field:has(input[name$="_civico"]) {
        flex: 0 1 90px;
    }

    .field-grid .field:has(input[name$="_via"]) {
        flex: 2 1 260px;
    }

    label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--text-muted);
    }

    .field:has(> input:required) > label::after,
    .checkbox-row:has(> input:required) > label::after {
        content: " *";
        color: var(--color-error);
    }

    .signature-card:has(> input:required) .signature-text::after {
        content: " *";
        color: var(--color-error);
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .dropzone {
        padding: var(--space-2xl) var(--space-lg);
    }

    .dropzone:has(input:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    .dropzone-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-2xs);
        text-align: center;
        cursor: pointer;
    }

    .dropzone-label :global(svg) {
        color: var(--color-primary);
    }

    .dropzone-filename {
        font-weight: var(--font-weight-semibold);
        color: var(--text-main);
    }

    .dropzone-hint {
        font-size: var(--font-size-xs);
        color: var(--text-disabled);
    }

    input[type="text"],
    input[type="date"],
    input[type="email"],
    input[type="tel"] {
        padding: var(--space-sm) var(--space-md);
        font-family: var(--font-body);
        font-size: var(--font-size-md);
        color: var(--text-main);
        background-color: var(--bg-page);
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-md);
        transition: border-color var(--transition-fast);
    }

    input:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 1px;
        border-color: var(--color-primary);
    }

    .checkbox-row {
        display: grid;
        grid-template-columns: 1.25rem 1fr;
        align-items: start;
        gap: var(--space-sm);
    }

    .checkbox-row input[type="checkbox"],
    .signature-card input[type="checkbox"] {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-sm);
        background-color: var(--bg-page);
        accent-color: var(--color-primary);
        cursor: pointer;
    }

    .checkbox-row input[type="checkbox"] {
        margin-top: 0.15rem;
    }

    .checkbox-row label,
    .signature-text,
    .alert-card p {
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-regular);
        color: var(--text-main);
        line-height: var(--line-height-body);
    }

    .checkbox-row label {
        cursor: pointer;
    }

    .checkbox-row a,
    .alert-card a {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
        text-decoration: underline;
    }

    .signature-card {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        border-radius: var(--radius-lg);
        padding: var(--space-lg) var(--space-xl);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
    }

    .signature-card:has(input:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    .signature-card input[type="checkbox"]:focus-visible {
        outline: none;
    }

    .signature-icon {
        display: flex;
        flex-shrink: 0;
    }

    .signature-icon :global(svg) {
        color: var(--color-primary);
    }

    .signature-text {
        flex: 1;
    }

    .alert-card {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        background-color: var(--bg-subtle);
        border-left: 3px solid var(--color-warning);
        border-radius: var(--radius-md);
        padding: var(--space-lg);
    }

    .alert-card :global(svg) {
        flex-shrink: 0;
        color: var(--color-warning);
    }

    .alert-card p {
        margin: 0;
    }

    .form-note {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
    }

    .form-actions {
        display: flex;
        gap: var(--space-md);
        justify-content: flex-end;
        flex-wrap: wrap;
    }

    button {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-sm) var(--space-xl);
        font-family: var(--font-body);
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-md);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: background-color var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
    }

    button:disabled,
    form:invalid button[type="submit"] {
        opacity: 0.5;
        cursor: not-allowed;
    }

    form:invalid button[type="submit"] {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
    }

    button[type="reset"] {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color-medium);
        color: var(--text-main);
    }

    button[type="reset"]:hover {
        background-color: var(--bg-hover);
        border-color: var(--border-color-strong);
    }

    button[type="submit"] {
        background-color: var(--color-primary);
        border: 1px solid var(--color-primary);
        color: var(--color-primary-contrast);
    }

    button[type="submit"]:hover {
        background-color: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
    }

    @media (max-width: 640px) {
        .join-page {
            padding: var(--space-xl) var(--space-md);
        }

        fieldset {
            padding: var(--space-lg);
        }

        .field-grid {
            flex-direction: column;
        }

        .field-grid .field:has(input[name$="_cap"]),
        .field-grid .field:has(input[name$="_civico"]),
        .field-grid .field:has(input[name$="_via"]) {
            flex-basis: auto;
        }

        .form-actions {
            flex-direction: column-reverse;
        }

        button {
            justify-content: center;
        }
    }
</style>
-->
