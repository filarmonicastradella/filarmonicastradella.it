<script lang="ts">
    import { onMount } from "svelte";

    /*
     * «Copia l'IBAN» sotto i dati, come «Aggiungi al tuo calendario» negli eventi: lo copia senza spazi, pronto da
     * incollare nell'app della banca, e per tre secondi dice «IBAN copiato». Solo con JS: senza, l'IBAN si copia a mano.
     */
    const iban = "IT52 Z062 3069 9130 0003 0649 193";
    let canCopy = $state(false);
    let copied = $state(false);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copyIban() {
        try {
            await navigator.clipboard.writeText(iban.replace(/ /g, ""));
            copied = true;
            setTimeout(() => (copied = false), 3000);
        } catch {
            copied = false;
        }
    }
</script>

<svelte:head>
    <title>Fai una donazione — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Come sostenere la Filarmonica Alessandro Stradella APS con un contributo libero tramite bonifico bancario." />
</svelte:head>

<header>
    <h1>Fai una donazione</h1>
    <p>Puoi sostenere i nostri progetti con un contributo libero tramite bonifico bancario.</p>
</header>

<section>
    <h2>Dati per il bonifico</h2>
    <dl>
        <dt>Beneficiario</dt>
        <dd>Filarmonica Alessandro Stradella APS</dd>
        <dt>IBAN</dt>
        <dd>{iban}</dd>
        <dt>Banca</dt>
        <dd>Crédit Agricole Italia</dd>
        <dt>Causale</dt>
        <dd>«Erogazione liberale», seguita da nome, cognome e codice fiscale di chi dona</dd>
    </dl>
    {#if canCopy}
        <p><button type="button" onclick={copyIban} aria-live="polite">{copied ? "IBAN copiato" : "Copia l'IBAN"}</button></p>
    {/if}
</section>

<!-- Da riattivare quando ci sarà il pulsante PayPal dell'associazione (sostituire hosted_button_id):
<section>
    <h2>Altri modi per donare</h2>
    <ul>
        <li><a href="https://www.paypal.com/donate/?hosted_button_id=SEGNAPOSTO" target="_blank" rel="noopener noreferrer">Dona con PayPal</a></li>
    </ul>
</section>
-->

<!-- 5x1000: da riattivare quando l'associazione è beneficiaria.
<section>
    <h2>5x1000</h2>
    <p>Puoi sostenerci anche con il <a href="/sostienici/5x1000">5x1000</a>: non ti costa nulla.</p>
</section>
-->

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>A cosa serve la mia donazione?</summary>
        <p>
            Copre le spese di tutto l'anno: strumenti e attrezzatura, spartiti, la sala prove, i costi dei concerti e
            l'assicurazione dei soci.
        </p>
    </details>
    <details>
        <summary>Posso detrarre la donazione? Come ottengo la ricevuta?</summary>
        <p>
            Sì: siamo un'associazione di promozione sociale, e le donazioni a nostro favore godono delle agevolazioni fiscali previste dalla normativa
            vigente. Il pagamento deve essere tracciabile, per esempio con un bonifico: conserva la prova del versamento e chiedi la ricevuta al
            tesoriere, scrivendo a <a href="mailto:tesoreria@filarmonicastradella.it?subject=Ricevuta%20della%20donazione">tesoreria@filarmonicastradella.it</a>. Le condizioni dipendono
            dalla tua situazione, quindi per i dettagli rivolgiti a un consulente o a un commercialista.
        </p>
    </details>
</section>

<p class="rimando"><a href="/sostienici">Sostienici</a></p>
