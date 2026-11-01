<script lang="ts">
    import Hero from "./Hero.svelte";
    import UpcomingEvents from "./UpcomingEvents.svelte";
    import Gallery from "./Gallery.svelte";
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articles } from "$lib/articles";
    import { press } from "$lib/press";
    import { ensembles } from "$lib/ensembles";
    import { legalSeat } from "$lib/locations";
    // Il corsivo serve solo al titolo della home: richiesto subito, solo qui
    import cormorantItalicFont from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2?url";
    import { organization } from "$lib/organization";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    // Dati strutturati dell'associazione per i motori di ricerca: un ente non profit (NGO, sottotipo di
    // Organization), con le formazioni come MusicGroup e la Lunigiana come zona in cui opera.
    const [street, place] = legalSeat.address;
    const [, postalCode, locality, region] = place.match(/^(\d{5}) (.+) \((\w+)\)$/) ?? [];
    // L'ente e il sito, con un "@id" a cui rimandano le altre pagine (hooks.server.ts, eventi, articoli, formazioni)
    const ente = {
        "@type": "NGO",
        "@id": `${organization.url}/#ente`,
        name: organization.name,
        alternateName: "Filarmonica Alessandro Stradella",
        description: "Associazione musicale di Fivizzano, in Lunigiana, dal 1777.",
        url: `${organization.url}/`,
        logo: `${organization.url}/logo.png`,
        image: `${organization.url}/anteprima.jpg`,
        foundingDate: organization.foundingYear,
        foundingLocation: { "@type": "Place", name: "Fivizzano" },
        areaServed: { "@type": "Place", name: "Lunigiana" },
        subOrganization: ensembles.map(({ slug, title, summary }) => ({
            "@type": "MusicGroup",
            "@id": `${organization.url}/ensembles/${slug}#formazione`,
            name: title,
            description: summary,
            url: `${organization.url}/ensembles/${slug}`
        })),
        address: { "@type": "PostalAddress", streetAddress: street, postalCode, addressLocality: locality, addressRegion: region, addressCountry: "IT" },
        email: organization.email,
        telephone: organization.phone,
        taxID: organization.taxCode,
        memberOf: { "@type": "Organization", name: organization.affiliation.name, url: organization.affiliation.href },
        sameAs: organization.socials.filter(({ profile }) => profile).map(({ href }) => href)
    };
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            ente,
            {
                "@type": "WebSite",
                "@id": `${organization.url}/#sito`,
                url: `${organization.url}/`,
                name: "Filarmonica Alessandro Stradella",
                alternateName: "Filarmonica Stradella",
                inLanguage: "it-IT",
                publisher: { "@id": ente["@id"] }
            }
        ]
    };

    // "<" come \u003c: nessun testo dei dati può chiudere lo script prima del tempo
    const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}<\/script>`;

    // In home solo le notizie (la categoria Notizie degli articoli); ricerche e altri scritti stanno in /articles
    const latestNews = articles.filter(({ category }) => category === "news").slice(0, 2);
    const latestPress = press.slice(0, 2);
</script>

<svelte:head>
    <title>Filarmonica Alessandro Stradella APS — Fivizzano dal 1777</title>
    <meta name="description" content="La Filarmonica Alessandro Stradella fa musica a Fivizzano, in Lunigiana, dal 1777: quattro formazioni, concerti a ingresso libero e posto per chi vuole suonare." />
    <link rel="preload" href={cormorantItalicFont} as="font" type="font/woff2" crossorigin="anonymous" />
    {@html structuredDataScript}
</svelte:head>

<Hero />

<UpcomingEvents events={data.events} />

<section>
    <h2>Chi siamo</h2>
    <p>
        Dal 1777 la Filarmonica fa musica a Fivizzano, in Lunigiana: una storia lunga quasi due secoli e mezzo. Oggi riunisce quattro formazioni
        ({#each ensembles as { slug, title }, i (slug)}{i === 0 ? "" : i === ensembles.length - 1 ? " e " : ", "}<a href="/ensembles/{slug}"
                >{title}</a
            >{/each}) e porta il suo repertorio nelle sale e nelle piazze del territorio.
    </p>
    <p class="rimando"><a href="/about">Scopri l'associazione</a></p>
</section>

<section>
    <h2>Suona con noi</h2>
    <p>
        Cerchiamo musicisti di ogni livello, anche chi comincia da zero. Strumento, parti e sala prove li mette a disposizione l'associazione.
    </p>
    <p class="rimando"><a href="/about/join">Domanda di iscrizione</a></p>
</section>

<!--
    Come "Prossimi eventi": righe una sotto l'altra, mai titoli in Cormorant affiancati (docs/DESIGN.md).
    Finché non c'è nessuna notizia pubblicata la sezione non compare.
-->
{#if latestNews.length > 0}
    <section>
        <h2>Notizie</h2>
        <ol>
            {#each latestNews as article (article.href)}
                <li><ArticleCard {article} /></li>
            {/each}
        </ol>
        <p class="rimando"><a href="/articles/news">Tutte le notizie</a></p>
    </section>
{/if}

<!-- Home alleggerita il 9/10/2026: versione precedente di "Chi siamo", sostituita dalla bozza sopra.
<section>
    <h2>Chi siamo</h2>
    <p>
        La Filarmonica Alessandro Stradella APS rappresenta un punto di riferimento storico e culturale per il territorio di Fivizzano e della Lunigiana. Custodiamo una tradizione secolare di musica e aggregazione, unendo la passione per il repertorio bandistico alla formazione di nuove generazioni di strumentisti.
    </p>
    <p>
        La nostra missione è mantenere viva la musica bandistica come bene comune: la suoniamo, la insegniamo alle nuove generazioni e la portiamo nelle piazze, nelle feste e nelle occasioni della nostra comunità.
    </p>
    <p class="rimando"><a href="/about/mission">La nostra missione</a></p>
</section>
-->

<!-- Home alleggerita il 9/10/2026: "In primo piano", assorbito da "Chi siamo" ("Ultime notizie" è tornata il 29/10/2026
     come "Notizie", sopra, dalla categoria degli articoli). Commenti annidati resi con [...].
<section>
    <h2>In primo piano</h2>
    <ul>
        [Da riattivare insieme a /ensembles:
        <li>
            <a href="/ensembles">
                <h3>Le nostre formazioni</h3>
                <p>
                    Quattro formazioni per suonare insieme: Stradella Facendo, la nostra orchestra di fiati; la Streetella Band; l'Orchestra Infieri; i Filarmonici Dissonanti.
                </p>
            </a>
        </li>
        ]
        <li>
            <a href="/articles/history/filarmonica">
                <h3>La Nostra Storia</h3>
                <p>
                    Radici profonde che affondano nel 1777. Un viaggio attraverso i secoli tra cultura bandistica, strumenti storici e la memoria viva della nostra comunità.
                </p>
            </a>
        </li>
        <li>
            <a href="https://accademiastradella.it" target="_blank" rel="noopener noreferrer">
                <h3>Accademia Stradella</h3>
                <p>
                    La scuola di musica è gestita da un'altra associazione, con cui collaboriamo. Corsi e iscrizioni sono sul suo sito.
                </p>
            </a>
        </li>
    </ul>
</section>

-->

<!-- Gli ultimi articoli dei giornali, come le notizie: righe una sotto l'altra, con la testata in occhiello -->
<section>
    <h2>Parlano di noi</h2>
    <ol>
        {#each latestPress as item (item.title)}
            <li><ArticleCard article={item} /></li>
        {/each}
    </ol>
    <p class="rimando"><a href="/about/press">Rassegna stampa</a></p>
</section>

<Gallery slides={data.gallery} />

<section>
    <h2>Sostieni la Filarmonica</h2>
    <p>Puoi diventare socio o fare una donazione: ogni contributo va alla musica, agli strumenti e ai giovani che iniziano a suonare.</p>
    <p class="rimando"><a href="/support">Sostienici</a></p>
</section>

<!-- Home alleggerita il 9/10/2026: versione precedente, con le schede già presenti in /support.
<section>
    <h2>Sostieni la Filarmonica</h2>
    <p>
        Il sostegno di soci, amici e donatori è fondamentale per permettere all'associazione di continuare la propria attività musicale, promuovere la formazione dei giovani e custodire la nostra tradizione.
    </p>

    <ul>
        <li>
            <a href="/support/join">
                <h3>Diventa socio</h3>
                <p>Entra a far parte della nostra grande famiglia musicale, partecipa alla vita dell'associazione e supporta i nostri progetti formativi e concertistici.</p>
            </a>
        </li>
        <li>
            <a href="/support/donate">
                <h3>Erogazioni liberali</h3>
                <p>Sostieni i nostri progetti con un contributo libero tramite bonifico bancario. Le erogazioni a favore delle APS godono delle agevolazioni fiscali previste dalla normativa vigente.</p>
            </a>
        </li>
        [5x1000: da riattivare quando l'associazione è beneficiaria (rinominare anche support/5x1000/_page.svelte in +page.svelte).
        <li>
            <h3>Sostienici con il 5x1000</h3>
            <p>Dona il tuo 5x1000 alla Filarmonica Alessandro Stradella APS. Un piccolo gesto che non costa nulla ma che per noi fa una grande differenza.</p>
            <p class="rimando"><a href="/support/5x1000">Scopri come fare</a></p>
        </li>
        ]
    </ul>
</section>
-->
