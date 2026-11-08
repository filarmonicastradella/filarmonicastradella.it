<script lang="ts">
    import { onMount } from "svelte";
    import CopyValue from "$lib/components/CopyValue.svelte";
    import { ensembles } from "$lib/ensembles";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    // I materiali per chi scrive della Filarmonica (dal 9/11/2026, prima una pagina disattivata in /mediateca/kit): un testo di
    // presentazione da copiare, i dati essenziali, il simbolo e i contatti. Le foto sono in Foto e video, quelle in alta
    // risoluzione su richiesta. Il logo solo per articoli e notizie sulla Filarmonica (regole d'uso dei segni distintivi, art. 6).
    const presentation = `La ${organization.name} è un'associazione musicale di Fivizzano, in Lunigiana, nata nel ${organization.foundingYear}. Riunisce quattro formazioni: ${ensembles.map(({ title }) => title).join(", ").replace(/, ([^,]*)$/, " e $1")}.`;

    // I dati essenziali, ognuno da copiare con un tocco, oppure tutti insieme con «Copia i dati», come nelle donazioni
    const facts = [
        { term: "Denominazione", values: [organization.name] },
        { term: "Fondazione", values: [`${organization.foundingYear}, Fivizzano`] },
        { term: "Sede legale", values: [legalSeat.address.join(", ")] },
        { term: "Formazioni", values: ensembles.map(({ title }) => title) },
        { term: "Affiliazione", values: [organization.affiliation.name] }
    ];
    const allFacts = facts.map(({ term, values }) => `${term}: ${values.join(", ")}`).join("\n");

    // «Copia il testo» e «Copia i dati», a contorno come «Copia i dati» delle donazioni: solo con JS e con gli appunti, poi per
    // tre secondi dicono che è fatto
    let canCopy = $state(false);
    let copied = $state<"testo" | "dati" | null>(null);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copy(text: string, what: "testo" | "dati") {
        try {
            await navigator.clipboard.writeText(text);
            copied = what;
            setTimeout(() => (copied = null), 3000);
        } catch {
            copied = null;
        }
    }
</script>

<svelte:head>
    <title>Materiali per la stampa — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Presentazione, dati, simbolo e contatti per chi scrive della Filarmonica Alessandro Stradella APS di Fivizzano." />
</svelte:head>

<header>
    <h1>Materiali per la stampa</h1>
    <p>Una presentazione, i dati essenziali, il simbolo e i contatti, per chi scrive della Filarmonica.</p>
</header>

<section>
    <h2>Presentazione</h2>
    <p>{presentation}</p>
    {#if canCopy}
        <p><button type="button" onclick={() => copy(presentation, "testo")} aria-live="polite"><span hidden={copied === "testo"}>Copia il testo</span><span hidden={copied !== "testo"}>Testo copiato</span></button></p>
    {/if}
</section>

<section>
    <h2>In breve</h2>
    <!-- Ogni dato si copia con un tocco (CopyValue), come i dati dell'ente in Amministrazione trasparente, o tutti insieme -->
    <dl>
        {#each facts as { term, values } (term)}
            <dt>{term}</dt>
            {#each values as value (value)}
                <dd><CopyValue text={value}>{value}</CopyValue></dd>
            {/each}
        {/each}
    </dl>
    {#if canCopy}
        <p><button type="button" onclick={() => copy(allFacts, "dati")} aria-live="polite"><span hidden={copied === "dati"}>Copia i dati</span><span hidden={copied !== "dati"}>Dati copiati</span></button></p>
    {/if}
</section>

<section>
    <h2>Simbolo</h2>
    <p>La lira con la mezzaluna, in bordeaux su fondo trasparente. Si usa per articoli e notizie sulla Filarmonica, senza modificarlo; per altri usi serve l'autorizzazione del presidente.</p>
    <p><a href="/documents/kit/simbolo.svg" type="image/svg+xml" download>Scarica il simbolo in SVG</a></p>
    <p><a href="/documents/kit/simbolo.png" type="image/png" download>Scarica il simbolo in PNG</a></p>
</section>

<section>
    <h2>Foto</h2>
    <p>
        Le foto dei concerti e delle attività sono in <a href="/associazione/mediateca">Foto e video</a>. Per averle in alta risoluzione, o per
        una foto di una formazione, scrivi a <a href="mailto:{organization.pressEmail}">{organization.pressEmail}</a>.
    </p>
</section>

<section>
    <h2>Contatti per la stampa</h2>
    <dl>
        <dt>Email</dt>
        <dd><a href="mailto:{organization.pressEmail}">{organization.pressEmail}</a></dd>
        <dt>Telefono</dt>
        <dd><a href="tel:{organization.phone.replaceAll(' ', '')}">{organization.phone}</a></dd>
    </dl>
</section>

<p class="rimando"><a href="/contatti">Contatti</a></p>
