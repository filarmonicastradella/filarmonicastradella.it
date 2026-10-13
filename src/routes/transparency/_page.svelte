<script lang="ts">
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";
</script>

<svelte:head>
    <title>Amministrazione trasparente — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Dati dell'ente, organi e documenti che la Filarmonica Alessandro Stradella APS pubblica per trasparenza." />
</svelte:head>

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
        <dt><abbr title="Registro unico nazionale del Terzo settore">RUNTS</abbr></dt>
        <dd>
            <a href={organization.runts.href} target="_blank" rel="noopener noreferrer">{organization.runts.name}</a>
        </dd>
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
            <a href="/transparency/statute">
                <h3>Statuto</h3>
                <p>Scopi, associati, organi e regole di funzionamento dell'associazione.</p>
            </a>
        </li>
        <li>
            <a href="/transparency/contributions">
                <h3>Contributi pubblici ricevuti</h3>
                <p>Contributi e vantaggi economici ricevuti da pubbliche amministrazioni.</p>
            </a>
        </li>
        <!-- Da riattivare quando ci sono i documenti (rinominare _page.svelte in +page.svelte):
        <li>
            <a href="/transparency/budgets">
                <h3>Rendiconti</h3>
                <p>I rendiconti per cassa, approvati dall'assemblea.</p>
            </a>
        </li>
        <li>
            <a href="/transparency/rules">
                <h3>Regolamenti</h3>
                <p>I regolamenti interni che integrano lo statuto.</p>
            </a>
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
