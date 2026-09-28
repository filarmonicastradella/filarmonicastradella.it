<svelte:head>
    <title>Scrivici — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Scrivi alla Filarmonica Alessandro Stradella APS: compila il modulo e ti risponderemo all'indirizzo email che indichi." />
</svelte:head>

<main id="contenuto">
    <header>
        <h1>Scrivici</h1>
        <p>Compila il modulo per inviarci un messaggio: ti risponderemo all'indirizzo email che indichi.</p>
    </header>

    <form
            action="https://formsubmit.co/info@filarmonicastradella.it"
            method="POST"
        >
            <input type="hidden" name="_subject" value="Nuovo messaggio dal sito - Filarmonica Stradella" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://filarmonicastradella.it/contacts/thanks" />
            <div hidden><input type="text" name="_honey" tabindex="-1" autocomplete="off" /></div>

            <p>
                <label for="contatto-nome">Nome e cognome</label>
                <input type="text" id="contatto-nome" name="nome" autocomplete="name" required minlength="2" maxlength="80" />
            </p>

            <p>
                <label for="contatto-email">Indirizzo email</label>
                <input type="email" id="contatto-email" name="email" autocomplete="email" required maxlength="120" />
            </p>

            <p>
                <label for="contatto-motivo">Motivo del messaggio</label>
                <select id="contatto-motivo" name="motivo" required>
                    <option value="Informazioni generali">Informazioni generali</option>
                    <option value="Iscrizione">Iscrizione</option>
                    <option value="Eventi e ingaggi">Eventi e ingaggi</option>
                    <option value="Altro">Altro</option>
                </select>
            </p>

            <p>
                <label for="contatto-messaggio">Messaggio</label>
                <textarea id="contatto-messaggio" name="messaggio" rows="6" required minlength="10" maxlength="2000"></textarea>
            </p>

            <p>
                <input type="checkbox" id="contatto-privacy" name="consenso_privacy" value="Sì" required />
                <label for="contatto-privacy">Ho letto l'<a href="/legal/privacy" target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al trattamento dei dati per ricevere una risposta.</label>
            </p>

            <p><button type="submit">Invia il messaggio</button></p>
        </form>

    <p><a href="/contacts">Tutti i recapiti</a></p>
</main>
