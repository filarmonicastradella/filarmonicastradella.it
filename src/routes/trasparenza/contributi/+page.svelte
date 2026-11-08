<script lang="ts">
    import { amountFormat, contributions } from "$lib/contributions";
</script>

<svelte:head>
    <title>Contributi pubblici ricevuti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="L'elenco dei contributi e dei vantaggi economici ricevuti da pubbliche amministrazioni, pubblicato per trasparenza." />
</svelte:head>

<header>
    <h1>Contributi pubblici ricevuti</h1>
    <p>Qui l'associazione pubblica l'elenco dei contributi, delle sovvenzioni e dei vantaggi economici ricevuti da pubbliche amministrazioni.</p>
    <!-- Gli stessi dati della tabella, da $lib/contributions, in un file da aprire con un foglio di calcolo -->
    <p><a href="/trasparenza/contributi.csv" type="text/csv" download>Scarica i dati</a></p>
</header>

<section>
    <h2 id="elenco">Elenco dei contributi</h2>
    <table aria-labelledby="elenco">
        <thead>
            <tr>
                <th scope="col">Anno</th>
                <th scope="col">Ente erogante</th>
                <th scope="col">Importo</th>
                <th scope="col">Causale</th>
            </tr>
        </thead>
        <tbody>
            {#each contributions as { year, grantor, amount, purpose }, index (index)}
                <tr>
                    <td>{year}</td>
                    <td>{grantor}</td>
                    <td>{amountFormat.format(amount)}</td>
                    <td>{purpose}</td>
                </tr>
            {:else}
                <tr>
                    <td colspan="4">Finora l'associazione non ha ricevuto contributi pubblici.</td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<p class="rimando"><a href="/trasparenza">Amministrazione trasparente</a></p>
