<script lang="ts">
    import { ensembles } from "$lib/ensembles";

    // Il modulo di contatto si apre con il motivo già scelto (con JS; senza, lo si sceglie a mano)
    const request = `/contacts/message?motivo=${encodeURIComponent("Eventi e ingaggi")}`;
</script>

<svelte:head>
    <title>La Filarmonica al tuo evento — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Concerti, feste, cortei e cerimonie: scopri quale formazione della Filarmonica Alessandro Stradella fa per il tuo evento e come richiederla."
    />
</svelte:head>

<header>
    <h1>La Filarmonica al tuo evento</h1>
    <p>Quattro formazioni per concerti, feste, cortei e cerimonie: scegli quella adatta alla tua occasione e scrivici.</p>
    <p><a href={request}>Richiedi la Filarmonica</a></p>
</header>

<section>
    <h2>Quale formazione per quale occasione</h2>
    <ul>
        {#each ensembles as ensemble (ensemble.slug)}
            <li>
                <a href="/about/ensembles/{ensemble.slug}">
                    <h3>{ensemble.title}</h3>
                    <p>{ensemble.occasions.join(" · ")}</p>
                </a>
            </li>
        {/each}
    </ul>
</section>

<section>
    <h2>Come funziona</h2>
    <ol>
        <li>Scrivici dal <a href={request}>modulo di contatto</a> con data, luogo, tipo di evento e durata.</li>
        <li>Ti rispondiamo con la disponibilità della formazione e una proposta.</li>
        <li>Ci accordiamo sui dettagli: repertorio, orari e spazi.</li>
    </ol>
</section>

<!-- SEGNAPOSTO: zona, preavviso, esigenze tecniche e costi da confermare con il consiglio direttivo. -->
<section>
    <h2>Cosa serve sapere</h2>
    <dl>
        <dt>Dove suoniamo</dt>
        <dd>[Zona in cui ci spostiamo]</dd>
        <dt>Preavviso</dt>
        <dd>[Con quanto anticipo scriverci]</dd>
        <dt>Spazio ed esigenze tecniche</dt>
        <dd>[Spazio, sedie, corrente, riparo dalla pioggia]</dd>
        <dt>Costi</dt>
        <dd>[Compenso, rimborso spese o offerta libera]</dd>
    </dl>
</section>

<p><a href={request}>Scrivici per il tuo evento</a></p>
