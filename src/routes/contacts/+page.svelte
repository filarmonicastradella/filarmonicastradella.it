<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import MapEmbed from "./MapEmbed.svelte";
    import { legalSeat, operationalSeats } from "$lib/locations";
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

    <Section title="Le nostre sedi" id="sedi">
        <article>
            <h3>{legalSeat.name}</h3>
            <address>
                {#each legalSeat.address as line}{line}<br />{/each}
            </address>
            <p>{legalSeat.description}</p>
            <p><a href={legalSeat.mapsHref} target="_blank" rel="noopener noreferrer">Apri la mappa su Google Maps</a></p>
        </article>

        {#each operationalSeats as seat (seat.id)}
            <article>
                <h3>{seat.name}</h3>
                <address>
                    {#each seat.address as line}{line}<br />{/each}
                </address>
                <p>{seat.description}</p>
                {#if seat.mapEmbed}
                    <MapEmbed title="Mappa della {seat.name.toLowerCase()}" src={seat.mapEmbed} href={seat.mapsHref} />
                {/if}
            </article>
        {/each}
    </Section>
</main>
