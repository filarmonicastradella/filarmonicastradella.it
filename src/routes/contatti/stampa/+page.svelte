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

    // «Copia il testo», a contorno come «Copia i dati» delle donazioni: solo con JS e con gli appunti, poi «Testo copiato» per tre secondi
    let canCopy = $state(false);
    let copied = $state(false);
    onMount(() => {
        canCopy = !!navigator.clipboard;
    });

    async function copyPresentation() {
        try {
            await navigator.clipboard.writeText(presentation);
            copied = true;
            setTimeout(() => (copied = false), 3000);
        } catch {
            copied = false;
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
        <p><button type="button" onclick={copyPresentation} aria-live="polite"><span hidden={copied}>Copia il testo</span><span hidden={!copied}>Testo copiato</span></button></p>
    {/if}
</section>

<section>
    <h2>In breve</h2>
    <!-- Ogni dato si copia con un tocco (CopyValue), come i dati dell'ente in Amministrazione trasparente -->
    <dl>
        <dt>Denominazione</dt>
        <dd><CopyValue text={organization.name}>{organization.name}</CopyValue></dd>
        <dt>Fondazione</dt>
        <dd><CopyValue text="{organization.foundingYear}, Fivizzano">{organization.foundingYear}, Fivizzano</CopyValue></dd>
        <dt>Sede legale</dt>
        <dd><CopyValue text={legalSeat.address.join(", ")}>{legalSeat.address.join(", ")}</CopyValue></dd>
        <dt>Formazioni</dt>
        {#each ensembles as { slug, title } (slug)}
            <dd><CopyValue text={title}>{title}</CopyValue></dd>
        {/each}
        <dt>Affiliazione</dt>
        <dd><CopyValue text={organization.affiliation.name}>{organization.affiliation.name}</CopyValue></dd>
    </dl>
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
        una foto di una formazione, scrivici.
    </p>
</section>

<section>
    <h2>Contatti per la stampa</h2>
    <dl>
        <dt>Email</dt>
        <dd><a href="mailto:{organization.email}?subject=Stampa">{organization.email}</a></dd>
        <dt>Telefono</dt>
        <dd><a href="tel:{organization.phone.replaceAll(' ', '')}">{organization.phone}</a></dd>
    </dl>
</section>

<p class="rimando"><a href="/contatti">Contatti</a></p>
