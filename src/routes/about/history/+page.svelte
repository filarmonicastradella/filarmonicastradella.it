<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import Figure from "./Figure.svelte";

    // Importazione degli asset da src/lib/assets/imgs/
    import altaCappellaImg from "$lib/assets/imgs/alta_cappella.jpg";
    import ottocentoImg from "$lib/assets/imgs/ottocento.jpg";
    import anni30Img from "$lib/assets/imgs/anni_30.jpeg";
    import anni80Img from "$lib/assets/imgs/anni_80.jpeg";
    import oggiImg from "$lib/assets/imgs/oggi.jpg";
</script>

<svelte:head>
    <title>La storia della Filarmonica — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Dal 1777 la storia della Filarmonica Alessandro Stradella di Fivizzano: origini, Ottocento, Novecento e oggi." />
</svelte:head>

<main id="contenuto">
    <article>
        <header>
            <h1>La Storia della Filarmonica</h1>
            <p>
                Due secoli di cultura nel cuore della Lunigiana
            </p>
        </header>

        <nav aria-label="Indice delle sezioni">
            <ol>
                <li><a href="#origini">Le origini nel Settecento e il riconoscimento sovrano</a></li>
                <li><a href="#metamorfosi">Il XIX secolo: la trasformazione in Banda Musicale</a></li>
                <li><a href="#novecento">Il Novecento: fusione, resilienza e grandi eventi</a></li>
                <li><a href="#denominazione">La nuova denominazione e il legame con Alessandro Stradella</a></li>
                <li><a href="#oggi">La Filarmonica oggi: un polo musicale poliedrico</a></li>
            </ol>
        </nav>

        <Section title="Le origini nel Settecento e il riconoscimento sovrano" id="origini">
            <p>
                Fondata nel <time datetime="1777">1777</time> nel pieno del
                fervore
                <a
                    href="https://it.wikipedia.org/wiki/Illuminismo"
                    target="_blank"
                    rel="noopener noreferrer">illuminista</a
                >, la
                <strong>Filarmonica "Alessandro Stradella"</strong> di Fivizzano
                è una delle istituzioni musicali più antiche della Toscana. Nei
                suoi primi anni, la compagine dovette adattarsi alle riforme
                granducali di
                <a
                    href="https://it.wikipedia.org/wiki/Pietro_Leopoldo_d'Asburgo-Lorena"
                    target="_blank"
                    rel="noopener noreferrer">Pietro Leopoldo</a
                >, che smantellarono le antiche corporazioni e introdussero un
                rigido iter di riconoscimento formale per ogni sodalizio.
            </p>
            <p>
                Il processo si concluse il <time datetime="1779-08-03"
                    >3 agosto 1779</time
                >
                con l'approvazione ufficiale della "Filarmonica di Canto e
                Suono" da parte dell'Auditore Fiscale di Firenze. La vitalità
                del gruppo emerse fin da subito, con il concerto solenne tenutosi
                il
                <time datetime="1781-01-04">4 gennaio 1781</time> per la festa
                di
                <a
                    href="https://it.wikipedia.org/wiki/Santa_Cecilia"
                    target="_blank"
                    rel="noopener noreferrer">Santa Cecilia</a
                >.
            </p>

            <Figure
                src={altaCappellaImg}
                alt="Formazione di Alta Cappella del XVIII secolo"
                caption="Tipica formazione di Alta Cappella (XVIII secolo)."
            />
        </Section>

        <Section title="Il XIX secolo: la trasformazione in Banda Musicale" id="metamorfosi">
            <p>
                Nel corso dell'Ottocento, il ruolo sociale della musica mutò
                profondamente. Le accademie orchestrali da camera lasciarono
                spazio alla diffusione dei <strong>complessi bandistici</strong
                >, ideali per accompagnare le cerimonie pubbliche e le
                esibizioni all'aperto.
            </p>
            <p>
                Per rispondere a questa esigenza di rappresentanza civica, il
                <time datetime="1831-08-24">24 agosto 1831</time> il Granduca di
                Toscana elevò ufficialmente il nucleo filarmonico al rango di
                <strong
                    ><a
                        href="https://it.wikipedia.org/wiki/Banda_musicale"
                        target="_blank"
                        rel="noopener noreferrer">Banda Musicale</a
                    ></strong
                >. Ai membri fu concessa un'uniforme speciale, sancendo il loro
                status di rappresentanti ufficiali dell'immagine pubblica
                fivizzanese.
            </p>

            <Figure
                src={ottocentoImg}
                alt="Tipica formazione bandistica del XIX secolo"
                caption="Tipica formazione bandistica del XIX secolo."
            />
        </Section>

        <Section title="Il Novecento: fusione, resilienza e grandi eventi" id="novecento">
            <p>
                Il Novecento fu un secolo di coesione e forte resilienza. Dalla
                fusione di due diverse bande cittadine attive nei primi del
                secolo, avvenuta attorno agli anni '20, nacque la struttura
                moderna. Nonostante il devastante terremoto del <time datetime="1934-06">giugno 1934</time> e i
                successivi conflitti, l'attività proseguì sotto l'<strong
                    ><a
                        href="https://it.wikipedia.org/wiki/Dopolavoro"
                        target="_blank"
                        rel="noopener noreferrer">Opera Nazionale Dopolavoro</a
                    ></strong
                >
                a partire dall'
                <time datetime="1934-11-11">11 novembre 1934</time>.
            </p>
            <p>
                Nel secondo dopoguerra, Fivizzano tornò a essere un punto di
                riferimento territoriale: l'<time datetime="1970-01-11"
                    >11 gennaio 1970</time
                >
                ospitò un importantissimo convegno delle bande di Lunigiana e
                Garfagnana, seguito pochi mesi dopo, il
                <time datetime="1970-07-19">19 luglio 1970</time>,
                dall'inaugurazione del primo
                <strong>Concorso Bandistico "Città di Fivizzano"</strong>. Il
                traguardo dei 210 anni fu celebrato nel
                <time datetime="1987-06">giugno 1987</time>.
            </p>

            <Figure
                src={anni30Img}
                alt="I musicisti della Filarmonica negli anni '30"
                caption="I musicisti della Filarmonica negli anni '30."
            />
        </Section>

        <Section title="La nuova denominazione e il legame con Alessandro Stradella" id="denominazione">
            <p>
                Nel <time datetime="1996">1996</time> l'istituzione ha assunto
                l'attuale nome in omaggio al grande compositore barocco
                <strong
                    ><a
                        href="https://it.wikipedia.org/wiki/Alessandro_Stradella"
                        target="_blank"
                        rel="noopener noreferrer">Alessandro Stradella</a
                    ></strong
                >, la cui famiglia era originaria di Fivizzano. Oggi il borgo
                custodisce la memoria del musicista nella storica
                <em>"Casa degli Stradella"</em>, nei pressi delle mura medicee,
                commemorata da una targa apposta nel
                <time datetime="1997">1997</time>.
            </p>

            <Figure
                src={anni80Img}
                alt="I musicisti della Filarmonica negli anni '90"
                caption="I musicisti della Filarmonica negli anni '90."
            />
        </Section>

        <Section title="La Filarmonica oggi: un polo musicale poliedrico" id="oggi">
            <p>
                Fedele alle proprie radici ma aperta all'innovazione,
                l'associazione si configura oggi come un polo musicale dinamico.
                Superando il tradizionale schema bandistico, la Filarmonica
                gestisce molteplici ensemble d'eccellenza: un <strong
                    ><a href="/about/ensembles/i-dissonanti"
                        >Ensemble di Musica Antica</a
                    ></strong
                >, un'<strong
                    ><a href="/about/ensembles/infieri"
                        >Orchestra d'Archi</a
                    ></strong
                >, una
                <strong
                    ><a href="/about/ensembles/concert-band"
                        >Concert Band</a
                    ></strong
                >
                e una
                <strong
                    ><a href="/about/ensembles/street-band">Street Band</a
                    ></strong
                >.
            </p>
            <p>
                Attraverso percorsi formativi mirati e la collaborazione
                costante con le scuole, la
                <strong>Filarmonica "Alessandro Stradella"</strong> continua a essere
                il motore della vita culturale fivizzanese, unendo la ricerca storica
                e il futuro della musica.
            </p>

            <Figure
                src={oggiImg}
                alt="L'InFieri Ensemble della Filarmonica in concerto"
                caption="L'InFieri Ensemble della Filarmonica 'Alessandro Stradella' durante un'esibizione."
            />
        </Section>
    </article>
</main>

<!--
<style>
    main {
        display: flex;
        flex-direction: column;
        padding: var(--space-3xl) var(--space-lg);
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        box-sizing: border-box;
    }

    .history-article {
        width: 100%;
        max-width: var(--content-max-width-text);
        margin: 0 auto;
    }

    .article-header {
        border-bottom: 1px solid var(--border-color-medium);
        padding-bottom: var(--space-xl);
        margin-bottom: var(--space-3xl);
    }

    .subtitle {
        font-family: var(--font-heading);
        font-size: var(--font-size-lg);
        color: var(--text-muted);
        margin: 0;
    }

    .history-section {
        margin-bottom: var(--space-3xl);
    }

    p {
        font-size: var(--font-size-md);
        line-height: var(--line-height-body);
        margin: 0 0 var(--space-lg) 0;
        color: var(--text-main);
        text-align: left;
    }

    @media (min-width: 1000px) {
        p {
            text-align: justify;
            hyphens: auto;
        }
    }
</style>
-->