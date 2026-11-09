<script lang="ts">
    import { onMount } from "svelte";
    import CopyValue from "$lib/components/CopyValue.svelte";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    // I dati dell'ente si copiano uno per uno (CopyValue) oppure tutti insieme con «Copia i dati», come i dati del bonifico
    // nelle donazioni: solo con JS e con gli appunti; per tre secondi il pulsante dice «Dati copiati»
    const allData = [
        `Denominazione: ${organization.name}`,
        `Codice fiscale: ${organization.taxCode}`,
        `RUNTS: ${organization.runts.name}`,
        `Sede legale: ${legalSeat.address.join(", ")}`,
        `PEC: ${organization.pec}`
    ].join("\n");

    let canCopy = $state(false);
    let copiedAll = $state(false);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copyAll() {
        try {
            await navigator.clipboard.writeText(allData);
            copiedAll = true;
            setTimeout(() => (copiedAll = false), 3000);
        } catch {
            copiedAll = false;
        }
    }
</script>

<svelte:head>
    <title>Amministrazione trasparente — Filarmonica Alessandro Stradella</title>
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
        <dd><CopyValue text={organization.name}>{organization.name}</CopyValue></dd>
        <dt>Codice fiscale</dt>
        <dd><CopyValue text={organization.taxCode}>{organization.taxCode}</CopyValue></dd>
        <dt><abbr title="Registro unico nazionale del Terzo settore">RUNTS</abbr></dt>
        <dd><CopyValue text={organization.runts.name.replace(/\D/g, "")}>{organization.runts.name}</CopyValue></dd>
        <dt>Sede legale</dt>
        <dd><a href={legalSeat.mapsHref} target="_blank" rel="noopener noreferrer">{legalSeat.address.join(", ")}</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    {#if canCopy}
        <p><button type="button" onclick={copyAll} aria-live="polite"><span hidden={copiedAll}>Copia i dati</span><span hidden={!copiedAll}>Dati copiati</span></button></p>
    {/if}
</section>

<section>
    <h2>Organi</h2>
    <p>Il <a href="/trasparenza/consiglio">consiglio direttivo</a> è l'organo di amministrazione: viene nominato dall'assemblea e resta in carica un anno.</p>
</section>

<section>
    <h2>Documenti</h2>
    <ul>
        <li>
            <a href="/trasparenza/statuto">
                <h3>Statuto</h3>
                <p>Scopi, associati, organi e regole di funzionamento dell'associazione.</p>
            </a>
        </li>
        <li>
            <a href="/trasparenza/contributi">
                <h3>Contributi pubblici ricevuti</h3>
                <p>Contributi e vantaggi economici ricevuti da pubbliche amministrazioni.</p>
            </a>
        </li>
        <!-- Da riattivare quando ci sono i documenti (rinominare _page.svelte in +page.svelte):
        <li>
            <a href="/trasparenza/rendiconti">
                <h3>Rendiconti</h3>
                <p>I rendiconti per cassa, approvati dall'assemblea.</p>
            </a>
        </li>
        <li>
            <a href="/trasparenza/regolamenti">
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
        <li><a href="/informative/privacy">Informativa sulla privacy</a></li>
        <li><a href="/informative/cookie">Informativa sui cookie</a></li>
    </ul>
</section>
