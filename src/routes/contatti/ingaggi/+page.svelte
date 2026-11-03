<script lang="ts">
    import { ensembles } from "$lib/ensembles";
    import { occasions } from "$lib/occasions";
    import { organization } from "$lib/organization";

    // La pagina per chi cerca musica per un evento (dal 3/11/2026): spiega occasioni e formazioni e porta al modulo di Contatti,
    // che resta l'unico modulo. I dati strutturati descrivono il servizio offerto dall'ente in Lunigiana.
    const form = "/contatti?motivo=ingaggio#scrivici";
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "La Filarmonica al tuo evento",
        serviceType: "Musica dal vivo per eventi",
        description: "Concerti, cerimonie civili, feste in piazza, convegni e feste private in Lunigiana, con la formazione adatta all'occasione.",
        provider: { "@id": `${organization.url}/#ente` },
        areaServed: { "@type": "Place", name: "Lunigiana" },
        url: `${organization.url}/contatti/ingaggi`
    };
    // "<" come \u003c: nessun testo dei dati può chiudere lo script prima del tempo
    const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}<\/script>`;
</script>

<svelte:head>
    <title>La Filarmonica al tuo evento — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Musica dal vivo per il tuo evento in Lunigiana: concerti, cerimonie civili, feste in piazza, convegni e matrimoni, con la formazione della Filarmonica adatta all'occasione."
    />
    {@html structuredDataScript}
</svelte:head>

<header>
    <h1>La Filarmonica al tuo evento</h1>
    <p>
        Concerti, cerimonie civili, feste in piazza, convegni, matrimoni: la Filarmonica suona in tutta la Lunigiana, con la formazione adatta
        all'occasione.
    </p>
    <p><a href={form}>Chiedi un ingaggio</a></p>
</header>

<section>
    <h2>Le occasioni</h2>
    <ul>
        {#each occasions.filter((occasion) => occasion !== "Altro") as occasion (occasion)}
            <li>{occasion}</li>
        {/each}
    </ul>
    <p>Non suoniamo a funzioni religiose né a iniziative di partito: siamo un'associazione laica e apartitica.</p>
</section>

<section>
    <h2>Le formazioni</h2>
    <ul>
        {#each ensembles as { slug, title, summary } (slug)}
            <li>
                <a href="/formazioni/{slug}">
                    <h3>{title}</h3>
                    <p>{summary}</p>
                </a>
            </li>
        {/each}
    </ul>
</section>

<section>
    <h2>Come chiedere</h2>
    <p>
        Scrivici almeno 30 giorni prima dell'evento con il <a href={form}>modulo di Contatti</a>: dicci l'occasione, la data e il luogo, e ti
        rispondiamo con la disponibilità e una proposta.
    </p>
</section>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Dove suonate?</summary>
        <p>Ci spostiamo in tutta la Lunigiana.</p>
    </details>
    <details>
        <summary>Suonate a funzioni religiose o a iniziative di partito?</summary>
        <p>
            No: siamo un'associazione laica e apartitica, e non suoniamo a funzioni religiose né a feste e iniziative di partito.
            Per le occasioni religiose collaboriamo però con le realtà musicali amiche della Lunigiana, e possiamo indicarti a chi rivolgerti.
        </p>
    </details>
    <details>
        <summary>Con quanto anticipo devo scrivervi?</summary>
        <p>Almeno 30 giorni prima dell'evento.</p>
    </details>
    <details>
        <summary>Con quanti musicisti suonate?</summary>
        <p>Dipende dalla formazione e dall'occasione: te lo indichiamo nella proposta.</p>
    </details>
    <details>
        <summary>Cosa serve sul posto?</summary>
        <p>
            Uno spazio adatto alla formazione, le sedie e un riparo in caso di pioggia. La corrente elettrica non sempre è necessaria, ma è gradita.
        </p>
    </details>
</section>

<p class="rimando"><a href="/contatti">Contatti</a></p>
