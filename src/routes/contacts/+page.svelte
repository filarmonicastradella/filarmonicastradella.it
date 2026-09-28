<script lang="ts">
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

    <section>
        <h2>Recapiti generali</h2>
        <dl>
            <dt>Telefono</dt>
            <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
            <dt>Posta elettronica</dt>
            <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
            <dt>Posta elettronica certificata</dt>
            <dd><a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a></dd>
        </dl>
        <p><a href="/contacts/message">Scrivici tramite il modulo di contatto</a></p>
    </section>

    <section>
        <h2>Uffici e presidenza</h2>
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
    </section>

    <section id="sedi">
        <h2>Le nostre sedi</h2>
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
    </section>
</main>
