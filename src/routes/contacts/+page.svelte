<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import MapEmbed from "./MapEmbed.svelte";
</script>

<svelte:head>
    <title>Contatti e sedi — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Recapiti, uffici e sedi della Filarmonica Alessandro Stradella APS a Fivizzano e Serricciolo." />
</svelte:head>

<main id="contenuto">
    <header>
        <h1>Contatti e sedi</h1>
        <p>Mettiti in contatto con noi per informazioni sulle iscrizioni, i corsi di musica e i nostri prossimi eventi, oppure vieni a trovarci nelle nostre sedi a Fivizzano e Serricciolo.</p>
    </header>

    <Section title="Recapiti generali">
        <dl>
            <dt>Telefono</dt>
            <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
            <dt>Posta elettronica</dt>
            <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
            <dt>Posta elettronica certificata</dt>
            <dd><a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a></dd>
        </dl>
    </Section>

    <Section title="Scrivici" id="scrivici">
        <p>Compila il modulo per inviarci un messaggio: ti risponderemo all'indirizzo email che indichi.</p>

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
    </Section>

    <Section title="Uffici e presidenza">
        <dl>
            <dt>Presidenza</dt>
            <dd><a href="mailto:presidente@filarmonicastradella.it">presidente@filarmonicastradella.it</a></dd>
            <dt>Segreteria</dt>
            <dd><a href="mailto:segreteria@filarmonicastradella.it">segreteria@filarmonicastradella.it</a></dd>
            <dt>Tesoreria</dt>
            <dd><a href="mailto:tesoreria@filarmonicastradella.it">tesoreria@filarmonicastradella.it</a></dd>
            <dt>Safeguarding</dt>
            <dd><a href="mailto:safeguarding@filarmonicastradella.it">safeguarding@filarmonicastradella.it</a></dd>
            <dt>Privacy</dt>
            <dd><a href="mailto:privacy@filarmonicastradella.it">privacy@filarmonicastradella.it</a></dd>
            <dt>Webmaster</dt>
            <dd><a href="mailto:webmaster@filarmonicastradella.it">webmaster@filarmonicastradella.it</a></dd>
        </dl>
    </Section>

    <Section title="Le nostre sedi">
        <article>
            <h3>Sede di Fivizzano</h3>

            <address>
                Filarmonica Alessandro Stradella APS<br />
                Via Radda 7<br />
                54013 Fivizzano (MS)<br />
                Italia
            </address>

            <p>Sede dell'associazione, storicamente nota in gergo come "Sala Operaia", aperta in occasione di prove, eventi pubblici e sportelli informativi dedicati.</p>

            <MapEmbed
                title="Mappa della sede di Fivizzano"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.784404098921!2d10.1278!3d44.2375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d515364166299b%3A0x6b772421371cb14b!2sVia%20Radda%2C%207%2C%2054013%20Fivizzano%20MS!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit"
                href="https://maps.google.com/?q=Via+Radda+7,+54013+Fivizzano+MS"
            />
        </article>

        <article>
            <h3>Sede di Serricciolo</h3>

            <address>
                Circolo Culturale "Giovanni Fantoni"<br />
                Via la Spezia 7<br />
                54013 Serricciolo, Fivizzano (MS)<br />
                Italia
            </address>

            <p>Sede dell'associazione, situata presso il Circolo Fantoni e attiva per le iniziative e gli incontri sul territorio.</p>

            <MapEmbed
                title="Mappa della sede di Serricciolo"
                src="https://maps.google.com/maps?q=Via+la+Spezia+7,+Serricciolo,+Fivizzano+MS&output=embed"
                href="https://maps.app.goo.gl/FYszuhGgyCZdf5zm6"
            />
        </article>
    </Section>
</main>
