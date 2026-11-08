<script lang="ts">
    import CopyValue from "$lib/components/CopyValue.svelte";
    import { ensembles } from "$lib/ensembles";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    // I materiali per chi scrive della Filarmonica (dal 9/11/2026, prima una pagina disattivata in /mediateca/kit): un testo di
    // presentazione da copiare, i dati essenziali, il simbolo e i contatti. Le foto sono in Foto e video, quelle in alta
    // risoluzione su richiesta. Il logo solo per articoli e notizie sulla Filarmonica (regole d'uso dei segni distintivi, art. 6).
    const presentation = `La ${organization.name} è un'associazione musicale di Fivizzano, in Lunigiana, nata nel ${organization.foundingYear}. Riunisce quattro formazioni: ${ensembles.map(({ title }) => title).join(", ").replace(/, ([^,]*)$/, " e $1")}.`;
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
    <p><CopyValue text={presentation}>Copia il testo</CopyValue></p>
</section>

<section>
    <h2>In breve</h2>
    <dl>
        <dt>Denominazione</dt>
        <dd>{organization.name}</dd>
        <dt>Fondazione</dt>
        <dd>{organization.foundingYear}, Fivizzano</dd>
        <dt>Sede legale</dt>
        <dd>{legalSeat.address.join(", ")}</dd>
        <dt>Formazioni</dt>
        {#each ensembles as { slug, title } (slug)}
            <dd><a href="/formazioni/{slug}">{title}</a></dd>
        {/each}
        <dt>Affiliazione</dt>
        <dd>{organization.affiliation.name}</dd>
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
