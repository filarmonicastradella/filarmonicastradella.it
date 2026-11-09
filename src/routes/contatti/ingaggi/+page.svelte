<script lang="ts">
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { ensembles } from "$lib/ensembles";
    import { bookingFaq } from "$lib/faq";
    import { occasions } from "$lib/occasions";
    import { organization } from "$lib/organization";

    // La pagina per chi cerca musica per un evento (dal 3/11/2026): spiega occasioni e formazioni e porta al modulo Scrivici
    // (/contatti/scrivi), che resta l'unico modulo. I dati strutturati descrivono il servizio offerto dall'ente in Lunigiana.
    const form = "/contatti/scrivi?motivo=ingaggio";
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "La Filarmonica al tuo evento",
        serviceType: "Musica dal vivo per eventi",
        description: "Concerti, cerimonie civili, feste in piazza, convegni e feste private in Lunigiana, con la formazione adatta all'occasione.",
        provider: { "@id": `${organization.url}/#ente` },
        // Soprattutto in Lunigiana, ma andiamo ovunque se ne vale la pena
        areaServed: [
            { "@type": "Place", name: "Lunigiana" },
            { "@type": "Country", name: "Italia" }
        ],
        url: `${organization.url}/contatti/ingaggi`,
        // Nessun compenso: il rimborso delle spese documentate, e un'offerta libera di chi partecipa
        offers: { "@type": "Offer", description: "Rimborso delle spese documentate; offerta libera dei partecipanti.", priceCurrency: "EUR" },
        image: `${organization.url}/anteprima.jpg`,
        // Le occasioni, come catalogo: chi cerca «musica per matrimonio» o «banda per sagra» trova la stessa offerta
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Occasioni",
            itemListElement: occasions
                .filter((occasion) => occasion !== "Altro")
                .map((occasion) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: occasion } }))
        },
        // La richiesta si fa con il modulo
        potentialAction: { "@type": "CommunicateAction", target: organization.url + form, name: "Chiedi un ingaggio" }
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
        Compila la <a href={form}>richiesta di ingaggio</a>: dicci l'occasione, la data e il luogo, e ti rispondiamo con la disponibilità e una
        proposta.
    </p>
</section>

<section>
    <h2>Domande frequenti</h2>
    {#each bookingFaq as item (item.question)}
        <FaqItem {item} />
    {/each}
</section>

<p class="rimando"><a href="/contatti">Contatti</a></p>
