<script lang="ts">
    import { findArticle } from "$lib/articles";
    import ArticleHeader from "../../ArticleHeader.svelte";
    // Il fregio inciso del foglio, ricalcato da una scansione e reso in PNG: un solo tratto, nessuna fotografia.
    import puttoImg from "$lib/assets/imgs/putto-sonetto.png?enhanced&w=256;512;768";

    const article = findArticle("history", "sonnet")!;
</script>

<svelte:head>
    <title>Sonetto per Santa Cecilia, 1789 — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Il sonetto a stampa che gli Accademici Dissonanti di Fivizzano dedicarono nel 1789 alla festa di Santa Cecilia, patrona dei musicisti, con la trascrizione."
    />
</svelte:head>

<ArticleHeader {article} />

<section>
    <h2>Il foglio</h2>
    <p>
        Per la festa di Santa Cecilia l'Accademia Filarmonica «de i Dissonanti» di Fivizzano fece stampare un sonetto, dedicato al suo principe, Carlo
        Emanuele Malaspina, marchese di Fosdinovo, Gragnola e Viano. Il foglio uscì a Massa nel <time datetime="1789">1789</time>, dalla stamperia ducale
        di Stefano Frediani<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Più sotto ne trovi la trascrizione.
    </p>
    <p>
        La festa si tenne il <time datetime="1789-05-03">3 maggio 1789</time> nella chiesa prepositurale di Fivizzano. La Gazzetta Toscana racconta che
        l'Accademia eseguì «la Messa composta dal celebre Sig. Sarti», cioè Giuseppe Sarti, e i Vespri «di scelta Musica», sotto la direzione del
        giovane maestro di cappella Angiolo Battaglia, e che durante la festa «vennero dispensati dei Sonetti analoghi», dedicati al marchese di
        Fosdinovo, «attual degnissimo Capo dell'Accademia»<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>. Il nostro foglio è uno di quei sonetti.
    </p>
    <p>
        I Dissonanti sono la Filarmonica stessa, nella sua forma settecentesca di accademia. Lo confermano le fonti dell'Ottocento: nel
        <time datetime="1872">1872</time> la statistica ufficiale del Regno d'Italia ricorda l'Accademia filarmonica di Fivizzano, «fondata nel 1779 dal
        Cav. Odoardo Fantoni»<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>, e nel <time datetime="1887">1887</time> la Gazzetta musicale di Milano la chiama ancora «Società Filarmonica dei Dissonanti
        di Fivizzano, fondata nel 1779»<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>. Le fonti ottocentesche datano la fondazione al 1779, l'anno del riconoscimento ufficiale; la tradizione della
        Filarmonica, già celebrata nel <time datetime="1987">1987</time> con i 210 anni<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>, la fa risalire al <time datetime="1777">1777</time>.
    </p>
    <p>
        Il sonetto racconta Cecilia nel giorno delle nozze: mentre fuori suonano le trombe della festa, lei prega in una cella di restare pura, e un angelo
        le annuncia il martirio e la palma che la attende in cielo.
    </p>
</section>

<!-- Trascrizione fedele del foglio, con la grafia e la punteggiatura dell'originale -->
<section>
    <h2>Trascrizione</h2>
    <p>
        In occasione<br />
        della solenne festività<br />
        di Santa Cecilia<br />
        vergine e martire<br />
        singolar patrona dell'Accademia Filarmonica de i Dissonanti di Fivizzano
    </p>
    <figure>
        <enhanced:img
            src={puttoImg}
            alt="Un putto in volo regge un cartiglio con la scritta «Sonetto», tra una tromba, una palma e rami d'alloro"
            sizes="16rem"
            loading="lazy"
        />
    </figure>
    <p>Sonetto</p>
    <p>
        dedicato al degnissimo principe della medesima, sua eccellenza<br />
        Carlo Emanuelle Malaspina<br />
        marchese di Fosdinovo, Gragnola, Viano &amp;c.
    </p>

    <!-- Le quattro strofe: due quartine e due terzine -->
    <blockquote>
        <p>
            Delle tube nuziali al suon profano<br />
            Echeggiavan di fior sparse le mura,<br />
            Mentre Sposa dolente al guardo umano<br />
            S' ascondeva CECILIA in cella oscura,
        </p>
        <p>
            Ed umil giunta l' una all' altra mano,<br />
            Signor, cantava, mia delizia, e cura,<br />
            Se tua son io, rendi ogn' insulto vano,<br />
            E a Te mi serba immacolata, e pura.
        </p>
        <p>
            Non temèr; pria, che il dì giunga alla meta<br />
            Te, lo Sposo, e il German dal fragil velo<br />
            Sciolti sarete, e all' universo esempio.
        </p>
        <p>
            Un' Angiol disse; e alla Donzella lieta<br />
            Della salvezza altrui, del proprio scempio,<br />
            Volò la palma a preparar nel Cielo.
        </p>
    </blockquote>

    <p>
        In atto di ossequio<br />
        gli Accademici Dissonanti.
    </p>
    <p>In Massa 1789. Per Stefano Frediani stampator ducale con approvazione.</p>
</section>

<section role="doc-endnotes" aria-labelledby="fonti">
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">Sonetto a stampa <i>In occasione della solenne festività di Santa Cecilia</i>, Massa, Stefano Frediani, 1789; l'originale è nella villa dei Fantoni a Noletta, la
            <a href="https://commons.wikimedia.org/wiki/File:Sonetto_Santa_Cecilia_Accademia_dei_Dissonanti_Fivizzano_1789.jpg" target="_blank" rel="noopener noreferrer">scansione</a>
            su Wikimedia Commons. <a role="doc-backlink" href="#rimando-1a">Torna al testo</a></li>
        <li id="fonte-2"><i>Gazzetta Toscana</i>, 1789, «Fivizzano 3 maggio». <a role="doc-backlink" href="#rimando-2a">Torna al testo</a></li>
        <li id="fonte-3"><i>Istituti e società musicali in Italia. Statistica</i>, Roma, Direzione di statistica, 1873, pp. 216-217 (dati del 1871-72). <a role="doc-backlink" href="#rimando-3a">Torna al testo</a></li>
        <li id="fonte-4"><i>Gazzetta musicale di Milano</i>, 1887, supplemento straordinario al n. 23. <a role="doc-backlink" href="#rimando-4a">Torna al testo</a></li>
        <li id="fonte-5">lunigiana.net, <i>Cento anni di Lunigiana</i>, anno 1987. <a role="doc-backlink" href="#rimando-5a">Torna al testo</a></li>
    </ol>
</section>

<p class="rimando"><a href="/articles">Tutti gli articoli</a></p>

<style>
    /*
     * La trascrizione (la sezione con le strofe nel <blockquote>) impaginata come il foglio: frontespizio, dedica e note di stampa in occhiello, il titolo
     * «Sonetto» in Cormorant, le strofe nel <blockquote> più grandi e staccate, con un filetto sopra e sotto a
     * isolarle dal resto.
     */
    section:has(> blockquote) > p:is(:nth-of-type(1), :nth-of-type(3), :nth-of-type(4), :nth-of-type(5)) {
        color: var(--text-muted);
        font-size: var(--fs-eyebrow);
        font-weight: var(--fw-text-strong);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    section:has(> blockquote) > p:nth-of-type(2) {
        font-family: var(--font-display);
        font-size: var(--fs-h3);
        font-weight: var(--fw-heading);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    /*
     * Il fregio (PNG da 768 px ricavato dal tracciato vettoriale, che pesava 470 kB), dentro un <figure> (altrimenti un <img> nudo esce dalla lista degli elementi ammessi
     * in layout.css e la sezione perde il layout a due colonne). Niente margin-inline:auto — il testo
     * della pagina è allineato a sinistra (max-width senza centrare), non al centro di una colonna più
     * larga: centrare l'immagine la sfalsava rispetto al testo. Resta quindi a sinistra, come i paragrafi intorno.
     */
    section:has(> blockquote) > figure :global(img) {
        display: block;
        inline-size: min(100%, 16rem);
        block-size: auto;
    }

    /* Inchiostro chiaro su sfondo scuro: il fregio è tracciato in un colore fisso, non in currentColor */
    @media (prefers-color-scheme: dark) {
        section:has(> blockquote) > figure :global(img) {
            filter: invert(1);
        }
    }

    blockquote {
        margin: var(--space-6) 0;
        padding-block: var(--space-5);
        border-block: var(--border-width) solid var(--border);
    }

    blockquote p {
        font-size: var(--fs-lead);
        font-style: italic;
    }

    blockquote p + p {
        margin-block-start: var(--space-5);
    }
</style>
