<script lang="ts">
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

    // Niente date passate (il sito si ricostruisce ogni 3 ore, il limite resta aggiornato)
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Rome" }); // AAAA-MM-GG, il giorno in Italia
</script>

<svelte:head>
    <title>La Filarmonica al tuo evento — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Concerti, convegni, cerimonie civili, feste in piazza e private: chiedi alla Filarmonica Alessandro Stradella di suonare al tuo evento."
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
        <summary>Suonate a funzioni religiose o eventi politici?</summary>
        <p>
            No: siamo un'associazione laica e apartitica, e non svolgiamo servizi religiosi né suoniamo a feste e iniziative di partito.
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
            <label for="evento-nome">Nome</label>
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
