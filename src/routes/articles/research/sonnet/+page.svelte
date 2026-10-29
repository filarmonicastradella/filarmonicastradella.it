<script lang="ts">
    import { categoryName, findArticle, formatArticleDate } from "$lib/articles";
    // Il fregio inciso del foglio, ripassato a vettori da una scansione: un solo tratto, nessuna fotografia.
    import puttoImg from "$lib/assets/imgs/putto-sonetto.png?enhanced&w=256;512;768";

    const article = findArticle("research", "sonnet")!;
</script>

<svelte:head>
    <title>Sonetto per Santa Cecilia, 1789 — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Il sonetto a stampa che gli Accademici Dissonanti di Fivizzano dedicarono nel 1789 alla festa di Santa Cecilia, patrona dei musicisti: trascrizione del foglio originale."
    />
</svelte:head>

<header>
    <p>
        <time datetime={article.date}>{formatArticleDate(article.date)}</time> ·
        <a href="/articles/{article.category}">{categoryName(article.category)}</a>
        {#if article.author}
            · di {article.author}
        {/if}
    </p>
    <h1>Sonetto per Santa Cecilia, 1789</h1>
    <p>Un foglio a stampa degli Accademici Dissonanti di Fivizzano, per la festa della patrona dei musicisti.</p>
</header>

<section>
    <h2>Il foglio</h2>
    <p>
        Per la festa di Santa Cecilia l'Accademia Filarmonica «de i Dissonanti» di Fivizzano fece stampare un sonetto, dedicato al suo principe, Carlo
        Emanuele Malaspina, marchese di Fosdinovo, Gragnola e Viano. Il foglio uscì a Massa nel <time datetime="1789">1789</time>, dalla stamperia ducale
        di Stefano Frediani.
    </p>
    <p>
        La festa si tenne il <time datetime="1789-05-03">3 maggio 1789</time> nella chiesa prepositurale di Fivizzano. La Gazzetta Toscana racconta che
        l'Accademia eseguì «la Messa composta dal celebre Sig. Sarti», cioè Giuseppe Sarti, e i Vespri «di scelta Musica», sotto la direzione del
        giovane maestro di cappella Angiolo Battaglia, e che durante la festa «vennero dispensati dei Sonetti analoghi», dedicati al marchese di
        Fosdinovo, «attual degnissimo Capo dell'Accademia». Il nostro foglio è uno di quei sonetti.
    </p>
    <p>
        I Dissonanti sono la Filarmonica stessa, nella sua forma settecentesca di accademia. Lo confermano le fonti dell'Ottocento: nel
        <time datetime="1872">1872</time> la statistica ufficiale del Regno d'Italia ricorda l'Accademia filarmonica di Fivizzano, «fondata nel 1779 dal
        Cav. Odoardo Fantoni», e nel <time datetime="1887">1887</time> la Gazzetta musicale di Milano la chiama ancora «Società Filarmonica dei Dissonanti
        di Fivizzano, fondata nel 1779». Le fonti ottocentesche datano la fondazione al 1779, l'anno del riconoscimento ufficiale; la tradizione della
        Filarmonica, già celebrata nel <time datetime="1987">1987</time> con i 210 anni, la fa risalire al <time datetime="1777">1777</time>.
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
    <p><small>Nell'originale «Emanuelle» è scritto con due l.</small></p>
</section>

<p><a href="/documents/sonetto.jpg" type="image/jpeg">La scansione del foglio originale</a> (JPEG), stampato a Massa nel 1789.</p>

<p class="rimando"><a href="/articles">Tutti gli articoli</a></p>

<style>
    /*
     * La trascrizione impaginata come il foglio: frontespizio, dedica e note di stampa in occhiello, il titolo
     * «Sonetto» in Cormorant, le strofe nel <blockquote> più grandi e staccate, con un filetto sopra e sotto a
     * isolarle dal resto.
     */
    section:last-of-type > p:is(:nth-of-type(1), :nth-of-type(3), :nth-of-type(4), :nth-of-type(5)) {
        color: var(--text-muted);
        font-size: var(--fs-eyebrow);
        font-weight: var(--fw-text-strong);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    section:last-of-type > p:nth-of-type(2) {
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
    section:last-of-type > figure :global(img) {
        display: block;
        inline-size: min(100%, 16rem);
        block-size: auto;
    }

    /* Inchiostro chiaro su sfondo scuro: il fregio è tracciato in un colore fisso, non in currentColor */
    @media (prefers-color-scheme: dark) {
        section:last-of-type > figure :global(img) {
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
