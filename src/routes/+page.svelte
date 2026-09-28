<script lang="ts">
    import { onMount } from "svelte";
    import bgImage from "$lib/assets/wallpaper.jpg";
    import { fetchUpcomingEvents, type EventItem } from "$lib/events";
    import { fetchGallery, type GallerySlide } from "$lib/gallery";
    import { dragScroll, scaleByDistance, trackScrollEdges } from "$lib/attachments";

    type LoadStatus = "idle" | "loading" | "ready" | "error";

    // Prossimi eventi: caricati dal browser, aggiornati quando la scheda torna visibile.
    const EVENTS_REFRESH_MIN_INTERVAL = 5 * 60 * 1000;
    let events = $state.raw<EventItem[]>([]);
    let eventsStatus = $state<LoadStatus>("idle");
    let lastEventsRefresh = 0;

    async function loadEvents() {
        if (Date.now() - lastEventsRefresh < EVENTS_REFRESH_MIN_INTERVAL) return;
        lastEventsRefresh = Date.now();
        if (eventsStatus !== "ready") eventsStatus = "loading";
        try {
            events = await fetchUpcomingEvents();
            eventsStatus = "ready";
        } catch {
            lastEventsRefresh = 0;
            if (eventsStatus !== "ready") eventsStatus = "error";
        }
    }

    // Galleria
    let slides = $state.raw<GallerySlide[]>([]);
    let galleryStatus = $state<LoadStatus>("idle");

    async function loadGallery() {
        galleryStatus = "loading";
        try {
            slides = await fetchGallery();
            galleryStatus = "ready";
        } catch {
            galleryStatus = "error";
        }
    }

    onMount(() => {
        loadEvents();
        loadGallery();
    });

    // Prossimi eventi: pulsanti di scorrimento
    let eventsList = $state<HTMLUListElement>();
    let edges = $state({ canScrollStart: false, canScrollEnd: false });

    const scrollEvents = (direction: number) => {
        if (!eventsList) return;
        const item = eventsList.querySelector("li");
        if (!item) return;
        const gap = parseFloat(getComputedStyle(eventsList).columnGap) || 24;
        eventsList.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: "smooth" });
    };

    // Ultime notizie (segnaposto)
    const news = [
        {
            id: 1,
            title: "Concerto d'Estate in Piazza della Verruca",
            date: "2026-07-28",
            excerpt: "Una serata indimenticabile all'insegna del grande repertorio bandistico e delle composizioni storiche della nostra tradizione.",
            url: "/news/concerto-estate-2026"
        },
        {
            id: 2,
            title: "Apertura delle iscrizioni alla Scuola di Musica",
            date: "2026-07-15",
            excerpt: "Al via i corsi di strumento per l'anno accademico. Scopri l'offerta formativa per tutte le età e i laboratori orchestrali.",
            url: "/news/apertura-corsi-musica"
        },
        {
            id: 3,
            title: "Rinnovo del Consiglio Direttivo APS",
            date: "2026-06-30",
            excerpt: "Pubblicati i verbali dell'assemblea generale e le cariche ufficiali per il triennio associativo in corso.",
            url: "/news/rinnovo-consiglio-direttivo"
        }
    ];

    const formatNewsDate = (date: string) =>
        new Date(date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });
</script>

<svelte:document onvisibilitychange={() => document.visibilityState === "visible" && loadEvents()} />

<svelte:head>
    <title>Filarmonica Alessandro Stradella APS — Fivizzano dal 1777</title>
    <meta name="description" content="Filarmonica Alessandro Stradella APS: banda e scuola di musica di Fivizzano, in Lunigiana, dal 1777. Concerti, eventi, notizie e come sostenerci." />
</svelte:head>

<main id="contenuto">
    <!-- Hero -->
    <!-- style="background-image: url({bgImage});" -->
    <section aria-labelledby="hero-heading">
        <hgroup>
            <h1 id="hero-heading">Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></h1>
            <p>Dal <strong>1777</strong> al <strong>{new Date().getFullYear()}</strong></p>
            <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro.</strong></p>
        </hgroup>
        <p><a href="/support/join">Diventa socio</a></p>
    </section>

    <!-- Prossimi eventi -->
    <section aria-labelledby="eventi-heading">
        <h2 id="eventi-heading">Prossimi eventi</h2>

        {#if eventsStatus === "loading"}
            <p role="status">Caricamento degli eventi in corso…</p>
        {:else if eventsStatus === "error"}
            <p role="alert">Non è stato possibile caricare gli eventi. Riprova più tardi.</p>
        {:else if eventsStatus === "ready" && events.length === 0}
            <p>Nessun evento in programma.</p>
        {:else if eventsStatus === "ready"}
            <div role="group" aria-label="Scorrimento eventi">
                <button type="button" onclick={() => scrollEvents(-1)} disabled={!edges.canScrollStart}>Eventi precedenti</button>
                <button type="button" onclick={() => scrollEvents(1)} disabled={!edges.canScrollEnd}>Eventi successivi</button>
            </div>

            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul bind:this={eventsList} tabindex="0" aria-label="Elenco dei prossimi eventi" {@attach trackScrollEdges((e) => (edges = e))}>
                {#each events as evt (evt.id)}
                    <li>
                        <article>
                            <p><time datetime={evt.start}>{evt.when}</time></p>
                            <h3><a href="/events/{evt.id}">{evt.summary}</a></h3>
                            {#if evt.description}
                                <p>{evt.description}</p>
                            {/if}
                            {#if evt.location}
                                <p>{evt.location}</p>
                            {/if}
                        </article>
                    </li>
                {/each}
            </ul>
        {/if}

        <noscript>
            <p>Per vedere i prossimi eventi è necessario abilitare JavaScript.</p>
        </noscript>

        <p><a href="/events">Tutti gli eventi</a></p>
    </section>

    <!-- Chi siamo -->
    <section aria-labelledby="chi-siamo-heading">
        <h2 id="chi-siamo-heading">Chi siamo</h2>
        <p>
            La Filarmonica Alessandro Stradella APS rappresenta un punto di riferimento storico e culturale per il territorio di Fivizzano e della Lunigiana. Custodiamo una tradizione secolare di musica e aggregazione, unendo la passione per il repertorio bandistico alla formazione di nuove generazioni di strumentisti.
        </p>
        <p>
            La nostra missione è mantenere viva la musica bandistica come bene comune: la suoniamo, la insegniamo alle nuove generazioni e la portiamo nelle piazze, nelle feste e nelle occasioni della nostra comunità.
        </p>
        <ul>
            <li><a href="/about/history">Scopri la nostra storia</a></li>
            <li><a href="/about/mission">La nostra missione</a></li>
        </ul>
    </section>

    <!-- In primo piano -->
    <section aria-labelledby="in-primo-piano-heading">
        <h2 id="in-primo-piano-heading">In primo piano</h2>
        <ul>
            <li>
                <h3><a href="/about/ensembles">Gli Ensemble</a></h3>
                <p>
                    Dalla tradizione bandistica alla riscoperta della musica antica, fino alla musica sinfonica e ai progetti giovanili: una costellazione di gruppi aperti alla sperimentazione e ai progetti dei soci.
                </p>
            </li>
            <li>
                <h3><a href="/support/auditions">Suona con noi</a></h3>
                <p>
                    Suoni uno strumento o vuoi iniziare? Scopri come entrare a far parte della banda e degli ensemble.
                </p>
            </li>
            <li>
                <h3><a href="https://accademiastradella.it" target="_blank" rel="noopener noreferrer">Accademia Stradella</a></h3>
                <p>
                    La scuola di musica è gestita da un'altra associazione, con cui collaboriamo. Corsi e iscrizioni sono sul suo sito.
                </p>
            </li>
        </ul>
    </section>

    <!-- Ultime notizie -->
    <section aria-labelledby="notizie-heading">
        <h2 id="notizie-heading">Ultime notizie</h2>

        {#if news.length === 0}
            <p>Nessuna notizia recente.</p>
        {:else}
            <ul>
                {#each news as item (item.id)}
                    <li>
                        <article>
                            <p><time datetime={item.date}>{formatNewsDate(item.date)}</time></p>
                            <h3><a href={item.url}>{item.title}</a></h3>
                            <p>{item.excerpt}</p>
                        </article>
                    </li>
                {/each}
            </ul>
        {/if}

        <p><a href="/news">Tutte le notizie</a></p>
    </section>

    <!-- Galleria -->
    <section aria-labelledby="galleria-heading">
        <h2 id="galleria-heading">Momenti in musica</h2>

        {#if galleryStatus === "loading"}
            <p role="status">Caricamento della galleria in corso…</p>
        {:else if galleryStatus === "error"}
            <p role="alert">Non è stato possibile caricare la galleria. Puoi guardarla direttamente sul nostro profilo Instagram.</p>
        {:else if galleryStatus === "ready"}
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul tabindex="0" aria-label="Galleria di foto e video" {@attach dragScroll} {@attach scaleByDistance}>
                {#each slides as slide (slide.id)}
                    <li>
                        {#if slide.mediaType === "VIDEO"}
                            <figure>
                                <!-- svelte-ignore a11y_media_has_caption -->
                                <video src={slide.mediaUrl} poster={slide.thumbnailUrl} controls preload="none" playsinline>
                                    <a href={slide.mediaUrl}>Scarica il video</a>
                                </video>
                                <figcaption>
                                    <a href={slide.permalink} target="_blank" rel="noopener noreferrer">{slide.alt} (Instagram)</a>
                                </figcaption>
                            </figure>
                        {:else}
                            <a href={slide.permalink} target="_blank" rel="noopener noreferrer">
                                <img src={slide.imageUrl} alt={slide.alt} loading="lazy" />
                            </a>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}

        <noscript>
            <p>Per vedere la galleria è necessario abilitare JavaScript.</p>
        </noscript>

        <p><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Guarda tutto su Instagram</a></p>
    </section>

    <!-- Sostieni la Filarmonica -->
    <section aria-labelledby="sostienici-heading">
        <h2 id="sostienici-heading">Sostieni la Filarmonica</h2>
        <p>
            Il sostegno di soci, amici e donatori è fondamentale per permettere all'associazione di continuare la propria attività musicale, promuovere la formazione dei giovani e custodire la nostra tradizione.
        </p>

        <ul>
            <li>
                <h3>Diventa socio</h3>
                <p>Entra a far parte della nostra grande famiglia musicale, partecipa alla vita dell'associazione e supporta i nostri progetti formativi e concertistici.</p>
                <p><a href="/support/join">Diventa socio</a></p>
            </li>
            <li>
                <h3>Erogazioni liberali</h3>
                <p>Sostieni i nostri progetti con un contributo libero tramite bonifico bancario. Le erogazioni a favore delle APS godono delle agevolazioni fiscali previste dalla normativa vigente.</p>
                <p><a href="/support/donate">Scopri come donare</a></p>
            </li>
            <!--
            <li>
                <h3>Sostienici con il 5x1000</h3>
                <p>Dona il tuo 5x1000 alla Filarmonica Alessandro Stradella APS. Un piccolo gesto che non costa nulla ma che per noi fa una grande differenza.</p>
                <p><a href="/support/donate">Scopri come fare</a></p>
            </li>
            -->
        </ul>
    </section>
</main>
