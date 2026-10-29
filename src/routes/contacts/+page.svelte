<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { organization } from "$lib/organization";

    // A chi arriva il messaggio, secondo il motivo. Senza JS l'indirizzo resta quello del primo motivo, info@.
    const topics = [
        { name: "Informazioni generali", mailbox: "info" },
        { name: "Iscrizione e quote", mailbox: "segreteria" },
        { name: "Donazioni e ricevute", mailbox: "tesoreria" },
        { name: "Collaborazioni, enti e sponsor", mailbox: "presidente" },
        { name: "Stampa e media", mailbox: "presidente" },
        { name: "Materiale storico", mailbox: "info" },
        { name: "Tutela dei minori", mailbox: "safeguarding" },
        { name: "Privacy e dati personali", mailbox: "privacy" },
        { name: "Problemi con il sito", mailbox: "webmaster" },
        { name: "Altro", mailbox: "info" }
    ];
    // Un link può scegliere il motivo con "?motivo=..."; in prerender non c'è l'indirizzo
    const requested = browser ? page.url.searchParams.get("motivo") : null;
    let topic = $state(topics.find(({ name }) => name === requested)?.name ?? topics[0].name);
    const mailbox = $derived(topics.find(({ name }) => name === topic)?.mailbox ?? "info");
</script>

<svelte:head>
    <title>Contatti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Telefono, email e modulo di contatto della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<header>
    <h1>Contatti</h1>
    <p>Per informazioni, iscrizioni e concerti scrivici o chiamaci.</p>
</header>

<section>
    <h2>Recapiti</h2>
    <dl>
        <dt>Telefono</dt>
        <dd><a href="tel:+393505363110">+39&nbsp;350&nbsp;536&nbsp;3110</a></dd>
        <dt>Email</dt>
        <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    <!-- Da riattivare insieme a /faq:
    <p>Prima di scriverci, guarda le <a href="/faq">domande frequenti</a>.</p>
    -->
</section>

<section>
    <h2>Ingaggi</h2>
    <p class="rimando"><a href="/booking">La Filarmonica al tuo evento</a></p>
</section>

<section id="scrivici">
    <h2>Scrivici</h2>
    <form action="https://formsubmit.co/{mailbox}@filarmonicastradella.it" method="POST">
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
            <select id="contatto-motivo" name="motivo" required bind:value={topic}>
                {#each topics as { name } (name)}
                    <option value={name}>{name}</option>
                {/each}
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
</section>

<!-- Da riattivare insieme a /about/locations:
<section>
    <h2>Sedi</h2>
    <p>Indirizzi e mappe della sede legale e delle sedi operative sono nella pagina <a href="/about/locations">Le nostre sedi</a>.</p>
</section>
-->
