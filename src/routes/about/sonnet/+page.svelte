<svelte:head>
    <title>Sonetto per Santa Cecilia, 1789 — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Il sonetto a stampa che gli Accademici Dissonanti di Fivizzano dedicarono nel 1789 alla festa di Santa Cecilia, patrona dei musicisti: trascrizione del foglio originale."
    />
</svelte:head>

<header>
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
    <p><em>[Incisione: un putto in volo con un cartiglio, una tromba, una palma e rami d'alloro]</em></p>
    <p>Sonetto</p>
    <p>
        dedicato al degnissimo principe della medesima, sua eccellenza<br />
        Carlo Emanuelle Malaspina<br />
        marchese di Fosdinovo, Gragnola, Viano &amp;c.
    </p>

    <!-- Le quattro strofe: due quartine e due terzine -->
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

    <p>
        In atto di ossequio<br />
        gli Accademici Dissonanti.
    </p>
    <p>In Massa 1789. Per Stefano Frediani stampator ducale con approvazione.</p>
    <p><small>Nell'originale «Emanuelle» è scritto con due l.</small></p>
</section>

<p><a href="/about/history">La storia della Filarmonica</a></p>

<style>
    /*
     * La trascrizione impaginata come il foglio: frontespizio, dedica e note di stampa in occhiello, il titolo
     * «Sonetto» in Cormorant, le strofe in testo più grande con lo spazio tra una strofa e l'altra.
     */
    section:last-of-type > p:is(:nth-of-type(1), :nth-of-type(4), :nth-of-type(9), :nth-of-type(10)) {
        color: var(--text-muted);
        font-size: var(--fs-eyebrow);
        font-weight: var(--fw-text-strong);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    section:last-of-type > p:nth-of-type(3) {
        font-family: var(--font-display);
        font-size: var(--fs-h3);
        font-weight: var(--fw-heading);
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
    }

    section:last-of-type > p:nth-of-type(n + 5):nth-of-type(-n + 8) {
        font-size: var(--fs-lead);
    }
</style>
