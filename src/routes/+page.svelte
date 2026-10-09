<script lang="ts">
    import Hero from "./Hero.svelte";
    import UpcomingEvents from "./UpcomingEvents.svelte";
    // import OldEventsCarouselReference from "./OldEventsCarouselReference.svelte"; // TEMPORANEO: confronto concluso
    import Gallery from "./Gallery.svelte";
    // import NewsCard from "$lib/components/NewsCard.svelte"; // con "Ultime notizie", commentata sotto
    // import { news } from "$lib/news";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    // const latestNews = news.slice(0, 3);
</script>

<svelte:head>
    <title>Filarmonica Alessandro Stradella APS — Fivizzano dal 1777</title>
    <meta name="description" content="Filarmonica Alessandro Stradella APS, a Fivizzano in Lunigiana dal 1777: concerti, calendario degli eventi e come sostenerci." />
</svelte:head>

<Hero />

<!-- <OldEventsCarouselReference events={data.events} /> -->
<UpcomingEvents events={data.events} />

<!-- BOZZA: testo provvisorio nel tono di docs/DESIGN.md, da confermare -->
<section>
    <h2>Chi siamo</h2>
    <p>
        Dal 1777 la Filarmonica fa musica a Fivizzano, in Lunigiana: una storia lunga quasi due secoli e mezzo. Oggi riunisce quattro formazioni (orchestra, orchestra di fiati, musica antica e street band) e porta il suo repertorio nelle sale e nelle piazze del territorio.
    </p>
    <p><a href="/about">Scopri l'associazione</a></p>
</section>

<!-- Home alleggerita il 9/10/2026: versione precedente di "Chi siamo", sostituita dalla bozza sopra.
<section>
    <h2>Chi siamo</h2>
    <p>
        La Filarmonica Alessandro Stradella APS rappresenta un punto di riferimento storico e culturale per il territorio di Fivizzano e della Lunigiana. Custodiamo una tradizione secolare di musica e aggregazione, unendo la passione per il repertorio bandistico alla formazione di nuove generazioni di strumentisti.
    </p>
    <p>
        La nostra missione è mantenere viva la musica bandistica come bene comune: la suoniamo, la insegniamo alle nuove generazioni e la portiamo nelle piazze, nelle feste e nelle occasioni della nostra comunità.
    </p>
    <p><a href="/about/mission">La nostra missione</a></p>
</section>
-->

<!-- Home alleggerita il 9/10/2026: "In primo piano" (assorbito da "Chi siamo") e "Ultime notizie"
     (da riattivare insieme a /news, oggi disattivata). Commenti annidati resi con [...].
<section>
    <h2>In primo piano</h2>
    <ul>
        [Da riattivare insieme a /about/ensembles:
        <li>
            <a href="/about/ensembles">
                <h3>Gli Ensemble</h3>
                <p>
                    Una concert band, una street band, un'orchestra con archi e un gruppo di musica antica e barocca: quattro ensemble per suonare insieme.
                </p>
            </a>
        </li>
        ]
        <li>
            <a href="/about/history">
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

<section>
    <h2>Ultime notizie</h2>
    {#if latestNews.length === 0}
        <p>Nessuna notizia recente.</p>
    {:else}
        <ol>
            {#each latestNews as post (post.slug)}
                <li><NewsCard {post} /></li>
            {/each}
        </ol>
    {/if}

    <p><a href="/news">Tutte le notizie</a></p>
</section>
-->

<Gallery slides={data.gallery} />

<section>
    <h2>Sostieni la Filarmonica</h2>
    <p>Puoi diventare socio o fare una donazione: ogni contributo va alla musica, agli strumenti e ai giovani che iniziano a suonare.</p>
    <p><a href="/support">Come sostenerci</a></p>
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
            <p><a href="/support/5x1000">Scopri come fare</a></p>
        </li>
        ]
    </ul>
</section>
-->
