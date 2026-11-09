<script lang="ts">
    import { onMount } from "svelte";
    import CopyValue from "$lib/components/CopyValue.svelte";
    import { organization } from "$lib/organization";

    /*
     * I dati del bonifico si copiano con un clic (solo con JS: senza, si copiano a mano): ogni valore da solo, toccandolo
     * (CopyValue), oppure tutti insieme con «Copia i dati», per mandarli a qualcuno.
     * L'IBAN si copia senza spazi, pronto per l'app della banca. Per tre secondi il testo dice che è stato copiato.
     */
    const iban = "IT52 Z062 3069 9130 0003 0649 193";
    const details = [
        { term: "Beneficiario", value: "Filarmonica Alessandro Stradella APS", copy: "Filarmonica Alessandro Stradella APS" },
        { term: "IBAN", value: iban, copy: iban.replace(/ /g, "") },
        { term: "Banca", value: "Crédit Agricole Italia", copy: "Crédit Agricole Italia" },
        // Un modello: le parti tra parentesi quadre (in <var> nella pagina) le sostituisce chi dona con i suoi dati
        { term: "Causale", value: "Erogazione liberale – [nome e cognome] – [codice fiscale]", copy: "Erogazione liberale – [nome e cognome] – [codice fiscale]" }
    ];
    const allDetails = details.map(({ term, copy }) => `${term}: ${copy}`).join("\n");

    let canCopy = $state(false);
    let copiedAll = $state(false);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copyAll() {
        try {
            await navigator.clipboard.writeText(allDetails);
            copiedAll = true;
            setTimeout(() => (copiedAll = false), 3000);
        } catch {
            copiedAll = false;
        }
    }
</script>

<!-- Un dato del bonifico: nella causale le parti da sostituire, tra parentesi quadre, diventano variabili (<var>) -->
{#snippet detail(value: string)}
    {#each value.split(/\[([^\]]+)\]/) as part, i (i)}{#if i % 2}<var>{part}</var>{:else}{part}{/if}{/each}
{/snippet}

<svelte:head>
    <title>Fai una donazione — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Come sostenere la Filarmonica Alessandro Stradella APS con un contributo libero: online con carta, Apple Pay o Google Pay, oppure con un bonifico bancario." />
</svelte:head>

<header>
    <h1>Fai una donazione</h1>
    <!-- La donazione online (dal 8/11/2026): la pagina di pagamento di Stripe, con l'importo scelto da chi dona (minimo 5 €)
         e il codice fiscale facoltativo per la ricevuta; dopo il pagamento torna a /sostienici/dona/grazie. Il pulsante «Dona ora»
         sta nella pagina superiore, Sostienici: qui non si ripete, e chi arriva direttamente trova il link nel testo -->
    <p>
        Puoi sostenere i nostri progetti con un contributo libero, <a href={organization.donationHref}>con carta, Apple Pay o Google Pay</a> oppure
        con un bonifico bancario.
    </p>
</header>

<section>
    <h2>Dati per il bonifico</h2>
    <dl>
        {#each details as { term, value, copy: copyText } (term)}
            <dt>{term}</dt>
            <dd><CopyValue text={copyText}>{@render detail(value)}</CopyValue></dd>
        {/each}
    </dl>
    {#if canCopy}
        <p><button type="button" onclick={copyAll} aria-live="polite"><span hidden={copiedAll}>Copia i dati</span><span hidden={!copiedAll}>Dati copiati</span></button></p>
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
            tesoriere con il <a href="/contatti/scrivi?motivo=ricevuta">modulo per la ricevuta</a>. Le condizioni dipendono
            dalla tua situazione, quindi per i dettagli rivolgiti a un consulente o a un commercialista.
        </p>
    </details>
</section>

<p class="rimando"><a href="/sostienici">Sostienici</a></p>
