<script lang="ts">
    // Chi organizza ragiona per occasioni: la formazione adatta la proponiamo noi
    const occasions = [
        "Cerimonia o ricorrenza ufficiale",
        "Festa patronale, processione o sagra",
        "Matrimonio o evento privato",
        "Rassegna, festival o rievocazione",
        "Altro"
    ];

    // Niente date passate (il sito si ricostruisce ogni 3 ore, il limite resta aggiornato)
    const today = new Date().toISOString().split("T")[0];
</script>

<svelte:head>
    <title>La Filarmonica al tuo evento — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Cerimonie, feste patronali, matrimoni, rassegne: chiedi alla Filarmonica Alessandro Stradella di suonare al tuo evento."
    />
</svelte:head>

<header>
    <h1>La Filarmonica al tuo evento</h1>
    <p>Dicci quando, dove e per quale occasione: ti rispondiamo con la disponibilità e una proposta.</p>
</header>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Dove suonate?</summary>
        <p>Ci spostiamo in tutta la Lunigiana.</p>
    </details>
    <details>
        <summary>Con quanto anticipo devo scrivervi?</summary>
        <p>Almeno 30 giorni prima dell'evento.</p>
    </details>
</section>

<form action="https://formsubmit.co/info@filarmonicastradella.it" method="POST">
    <input type="hidden" name="_subject" value="Richiesta per un evento - Filarmonica Stradella" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_next" value="https://filarmonicastradella.it/contacts/thanks" />
    <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>

    <fieldset>
        <legend>L'evento</legend>

        <p>
            <label for="evento-occasione">Occasione</label>
            <select id="evento-occasione" name="occasione" required>
                <option value="" disabled selected>Scegli</option>
                {#each occasions as occasion (occasion)}
                    <option>{occasion}</option>
                {/each}
            </select>
        </p>

        <p>
            <label for="evento-data">Data</label>
            <input type="date" id="evento-data" name="data" required min={today} />
        </p>

        <p>
            <label for="evento-luogo">Luogo</label>
            <input type="text" id="evento-luogo" name="luogo" required minlength="2" maxlength="120" />
        </p>

        <p>
            <label for="evento-note">Note</label>
            <textarea id="evento-note" name="note" rows="4" maxlength="2000"></textarea>
        </p>
    </fieldset>

    <fieldset>
        <legend>Chi scrive</legend>

        <p>
            <label for="evento-nome">Nome e cognome, o ente</label>
            <input type="text" id="evento-nome" name="nome" autocomplete="name" required minlength="2" maxlength="120" />
        </p>

        <p>
            <label for="evento-email">Email</label>
            <input type="email" id="evento-email" name="email" autocomplete="email" required maxlength="120" />
        </p>

        <p>
            <label for="evento-telefono">Telefono</label>
            <input type="tel" id="evento-telefono" name="telefono" autocomplete="tel" maxlength="20" />
        </p>
    </fieldset>

    <p>
        <input type="checkbox" id="evento-privacy" name="consenso_privacy" value="Sì" required />
        <label for="evento-privacy">
            Ho letto l'<a href="/legal/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento dei dati
            per ricevere una risposta.
        </label>
    </p>

    <p><button type="submit">Invia la richiesta</button></p>
</form>

<style>
    /* Da 40rem i campi brevi si affiancano a due a due (data e luogo, nome ed email); occasione e note su tutta la riga */
    @media (min-width: 40rem) {
        fieldset {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: var(--space-4);
        }

        fieldset > p:has(> select[name="occasione"], > textarea) {
            grid-column: 1 / -1;
        }
    }
</style>
