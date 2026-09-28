<script lang="ts">
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";
</script>

<svelte:head>
    <title>Amministrazione trasparente — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Dati dell'ente, organi e documenti che la Filarmonica Alessandro Stradella APS pubblica per trasparenza." />
</svelte:head>

<main id="contenuto">
    <header>
        <h1>Amministrazione trasparente</h1>
        <p>In questa sezione l'associazione pubblica i documenti e le informazioni previsti per gli enti del Terzo settore.</p>
    </header>

    <section>
        <h2>Dati dell'ente</h2>
        <dl>
            <dt>Denominazione</dt>
            <dd>{organization.name}</dd>
            <dt>Codice fiscale</dt>
            <dd>{organization.taxCode}</dd>
            <dt>Iscrizione al RUNTS</dt>
            <dd>{organization.runts}</dd>
            <dt>Sede legale</dt>
            <dd>{legalSeat.address.join(", ")}</dd>
            <dt>PEC</dt>
            <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
        </dl>
    </section>

    <section>
        <h2>Organi</h2>
        <p>Il <a href="/about/board">Consiglio direttivo</a> è l'organo di amministrazione: viene nominato dall'assemblea e resta in carica un anno.</p>
    </section>

    <section>
        <h2>Documenti</h2>
        <ul>
            <li>
                <h3><a href="/transparency/statute">Statuto</a></h3>
                <p>Scopi, associati, organi e regole di funzionamento dell'associazione.</p>
            </li>
            <li>
                <h3><a href="/transparency/contributions">Contributi pubblici ricevuti</a></h3>
                <p>Contributi e vantaggi economici ricevuti da pubbliche amministrazioni.</p>
            </li>
            <!-- Da riattivare quando ci sono i documenti (rinominare _page.svelte in +page.svelte):
            <li>
                <h3><a href="/transparency/budgets">Rendiconti</a></h3>
                <p>I rendiconti per cassa, approvati dall'assemblea.</p>
            </li>
            <li>
                <h3><a href="/transparency/rules">Regolamenti</a></h3>
                <p>I regolamenti interni che integrano lo statuto.</p>
            </li>
            -->
        </ul>
    </section>

    <section>
        <h2>Informative</h2>
        <ul>
            <li><a href="/legal/privacy">Informativa sulla privacy</a></li>
            <li><a href="/legal/cookies">Politica sui cookie</a></li>
        </ul>
    </section>
</main>
