<script lang="ts">
    let forMinor = $state(false);

    // I canali della liberatoria su carta (moduli 04.06 e 04.07), uno per uno
    const imageChannels = [
        { name: "consenso_archivio", label: "Archivio interno e documentazione delle attività" },
        { name: "consenso_sito", label: "Sito internet dell'associazione" },
        { name: "consenso_social", label: "Canali social ufficiali dell'associazione" },
        { name: "consenso_stampa", label: "Materiale a stampa e comunicazioni alla stampa" },
        { name: "consenso_piattaforme", label: "Registrazioni dei concerti su piattaforme di condivisione" },
        { name: "consenso_progetti", label: "Documentazione dei progetti per enti finanziatori, scuole e pubbliche amministrazioni" }
    ];

    const messageChannels = [
        { name: "consenso_messaggi", label: "Avvisi e comunicazioni organizzative con la messaggistica istantanea" },
        { name: "consenso_email", label: "Aggiornamenti sulle attività all'indirizzo email indicato" }
    ];

    type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

    function handleCF(e: InputEvent) {
        e.currentTarget.value = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
    }
</script>

<svelte:head>
    <title>Modifica dei consensi — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Il modulo per cambiare i consensi dati alla Filarmonica Alessandro Stradella APS: foto e riprese canale per canale, messaggi ed email."
    />
</svelte:head>

{#snippet identityFields(prefix: string, section: string)}
    <p>
        <label for="{prefix}nome">Nome</label>
        <input type="text" id="{prefix}nome" name="{prefix}nome" autocomplete="section-{section} given-name" required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}cognome">Cognome</label>
        <input type="text" id="{prefix}cognome" name="{prefix}cognome" autocomplete="section-{section} family-name" required minlength="2" maxlength="50" />
    </p>

    <p>
        <label for="{prefix}codice_fiscale">Codice fiscale</label>
        <input type="text" id="{prefix}codice_fiscale" name="{prefix}codice_fiscale" required minlength="16" maxlength="16" pattern={"[A-Za-z0-9]{16}"} autocapitalize="characters" spellcheck="false" oninput={handleCF} />
    </p>
{/snippet}

{#snippet choice(name: string, label: string)}
    <p>
        <input type="checkbox" id={name} {name} value="Sì" />
        <label for={name}>{label}</label>
    </p>
{/snippet}

<header>
    <h1>Modifica dei consensi</h1>
    <p>
        Qui cambi i consensi dati all'iscrizione: foto e riprese, canale per canale, e le comunicazioni. Le scelte che invii sostituiscono quelle di
        prima: una casella non spuntata vale come no.
    </p>
</header>

<form action="https://formsubmit.co/privacy@filarmonicastradella.it" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_subject" value="Modifica dei consensi – Filarmonica Stradella" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_next" value="https://filarmonicastradella.it/legal/consents/thanks" />
    <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>
    <input type="hidden" name="compilato_da" value={forMinor ? "Genitore o tutore, per un minore" : "Il socio"} />

    <fieldset>
        <legend>{forMinor ? "Dati del minore" : "I tuoi dati"}</legend>

        <p>
            <input type="checkbox" id="per_minore" bind:checked={forMinor} />
            <label for="per_minore">Compilo per un minore, come genitore o tutore</label>
        </p>

        {@render identityFields("", "socio")}
    </fieldset>

    {#if forMinor}
        <fieldset>
            <legend>Dati del genitore o tutore</legend>
            {@render identityFields("genitore_", "genitore")}
        </fieldset>
    {/if}

    <fieldset>
        <legend>Contatti</legend>
        <p>
            <label for="email">{forMinor ? "Email del genitore o tutore" : "Email"}</label>
            <input type="email" id="email" name="email" autocomplete="email" inputmode="email" required maxlength="100" />
        </p>
    </fieldset>

    <fieldset>
        <legend>Foto e riprese</legend>
        <p>
            Spunta i canali dove autorizzi l'uso di foto e riprese {forMinor ? "del minore" : "in cui compari"}. Cosa comporta lo spiega la
            <a href="/legal/images" target="_blank" rel="noopener noreferrer">liberatoria per immagini, voce ed esecuzioni</a>.
        </p>
        {#each imageChannels as { name, label } (name)}
            {@render choice(name, label)}
        {/each}
    </fieldset>

    <fieldset>
        <legend>Comunicazioni</legend>
        {#each messageChannels as { name, label } (name)}
            {@render choice(name, label)}
        {/each}
    </fieldset>

    <fieldset>
        <legend>Documento e conferma</legend>
        <p>
            <label for="documento_identita">{forMinor ? "Documento di identità del genitore o tutore" : "Documento di identità"} (PDF, JPG o PNG)</label>
            <input type="file" id="documento_identita" name="attachment" required multiple accept="application/pdf,image/jpeg,image/png" />
        </p>

        {#if forMinor}
            <p>
                <input type="checkbox" id="intesa_genitori" name="intesa_genitori" required />
                <label for="intesa_genitori">Dichiaro di agire d'intesa con l'altro genitore o tutore.</label>
            </p>
        {/if}

        <p>
            <input type="checkbox" id="conferma" name="conferma" required />
            <label for="conferma">
                Ho letto l'<a href="/legal/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e chiedo che queste scelte
                sostituiscano quelle date finora.
            </label>
        </p>
    </fieldset>

    <p>
        <button type="submit">Invia i consensi</button>
    </p>
</form>
