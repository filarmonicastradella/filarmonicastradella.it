<script lang="ts">
    import { organization } from "$lib/organization";
</script>

<svelte:head>
    <title>Contatti — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Telefono, email e uffici della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<header>
    <h1>Contatti</h1>
    <p>Per informazioni, iscrizioni e concerti scrivici o chiamaci.</p>
</header>

<section>
    <h2>Recapiti</h2>
    <dl>
        <dt>Telefono</dt>
        <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
        <dt>Email</dt>
        <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    <p><a href="/contacts/message">Scrivici con il modulo</a></p>
    <!-- Da riattivare insieme a /faq:
    <p>Prima di scriverci, guarda le <a href="/faq">domande frequenti</a>.</p>
    -->
</section>

<section>
    <h2>Uffici</h2>
    <dl>
        <dt>Presidenza</dt>
        <dd><a href="mailto:presidente@filarmonicastradella.it">presidente@filarmonicastradella.it</a></dd>
        <dt>Segreteria</dt>
        <dd><a href="mailto:segreteria@filarmonicastradella.it">segreteria@filarmonicastradella.it</a></dd>
        <dt>Tesoreria</dt>
        <dd><a href="mailto:tesoreria@filarmonicastradella.it">tesoreria@filarmonicastradella.it</a></dd>
        <dt>Tutela dei minori</dt>
        <dd><a href="mailto:safeguarding@filarmonicastradella.it">safeguarding@filarmonicastradella.it</a></dd>
        <dt>Privacy</dt>
        <dd><a href="mailto:privacy@filarmonicastradella.it">privacy@filarmonicastradella.it</a></dd>
        <dt>Sito web</dt>
        <dd><a href="mailto:webmaster@filarmonicastradella.it">webmaster@filarmonicastradella.it</a></dd>
    </dl>
</section>

<!-- Da riattivare insieme a /about/locations:
<section>
    <h2>Sedi</h2>
    <p>Indirizzi e mappe della sede legale e delle sedi operative sono nella pagina <a href="/about/locations">Le nostre sedi</a>.</p>
</section>
-->
