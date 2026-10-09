<script lang="ts">
    // Foto della pagina, in più misure: il browser sceglie quella adatta alla colonna di testo (40rem) e allo schermo.
    import altaCappellaImg from "$lib/assets/imgs/alta_cappella.jpg?enhanced&w=400;640;800;1280;1600";
    import ottocentoImg from "$lib/assets/imgs/ottocento.jpg?enhanced&w=400;640;800;1280;1600";
    import anni30Img from "$lib/assets/imgs/anni_30.jpeg?enhanced&w=400;640;800;1280;1600";
    import anni80Img from "$lib/assets/imgs/anni_80.jpeg?enhanced&w=400;640;800;1280;1600";
    import oggiImg from "$lib/assets/imgs/oggi.jpg?enhanced&w=400;640;800;1280;1600";

    const sizes = "(min-width: 40rem) 40rem, 100vw";
</script>

<svelte:head>
    <title>La storia — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="La storia della Filarmonica Alessandro Stradella dal 1777 a oggi: le origini, l'Ottocento, il Novecento, il nome e le formazioni di oggi." />
</svelte:head>

<header>
    <h1>La storia</h1>
    <p>Dal 1777 a oggi: quasi due secoli e mezzo di musica a Fivizzano.</p>
</header>

<nav aria-label="Indice della pagina">
    <ol>
        <li><a href="#origini">Le origini</a></li>
        <li><a href="#ottocento">L'Ottocento</a></li>
        <li><a href="#novecento">Il Novecento</a></li>
        <li><a href="#nome">Il nome</a></li>
        <li><a href="#oggi">Oggi</a></li>
    </ol>
</nav>

<section id="origini">
    <h2>Le origini</h2>
    <p>
        La Filarmonica nasce a Fivizzano nel <time datetime="1777">1777</time>, negli anni dell'Illuminismo. Sono anche gli anni delle riforme del granduca
        <a href="https://it.wikipedia.org/wiki/Pietro_Leopoldo_d'Asburgo-Lorena" target="_blank" rel="noopener noreferrer">Pietro Leopoldo</a>, che
        sciolgono le antiche corporazioni e chiedono a ogni associazione un riconoscimento formale.
    </p>
    <p>
        Per la «Filarmonica di Canto e Suono» il riconoscimento arriva il <time datetime="1779-08-03">3 agosto 1779</time>, con l'approvazione
        dell'Auditore Fiscale di Firenze. Nel <time datetime="1780-11">novembre 1780</time> il gruppo tiene un concerto solenne per la festa di Santa
        Cecilia, patrona dei musicisti, che nel <time datetime="1789">1789</time> gli Accademici Dissonanti celebrano con un
        <a href="/about/sonnet">sonetto a stampa</a>.
    </p>
    <figure>
        <enhanced:img src={altaCappellaImg} alt="Musicisti di una formazione di alta cappella" {sizes} />
        <figcaption>Una formazione di alta cappella, tipica del Settecento.</figcaption>
    </figure>
</section>

<section id="ottocento">
    <h2>L'Ottocento</h2>
    <p>
        Nell'Ottocento la musica esce dalle sale: le orchestre da camera lasciano spazio ai complessi di fiati, adatti alle cerimonie pubbliche e ai
        concerti all'aperto.
    </p>
    <p>
        Il <time datetime="1831-08-24">24 agosto 1831</time> il granduca di Toscana riconosce la Filarmonica come banda musicale ufficiale di Fivizzano e
        concede ai musicisti un'uniforme: da allora rappresentano la città nelle occasioni pubbliche.
    </p>
    <figure>
        <enhanced:img src={ottocentoImg} alt="Musicisti di una banda dell'Ottocento in uniforme" {sizes} loading="lazy" />
        <figcaption>Una formazione di fiati dell'Ottocento.</figcaption>
    </figure>
</section>

<section id="novecento">
    <h2>Il Novecento</h2>
    <p>
        Intorno agli anni Venti due bande attive in paese si uniscono e danno alla Filarmonica la sua forma moderna. L'attività continua anche dopo il
        terremoto del <time datetime="1934-06">giugno 1934</time> e negli anni della guerra, dall'<time datetime="1934-11-11">11 novembre 1934</time>
        sotto l'Opera Nazionale Dopolavoro.
    </p>
    <p>
        Nel dopoguerra Fivizzano torna un punto di riferimento: l'<time datetime="1970-01-11">11 gennaio 1970</time> ospita il convegno delle bande di
        Lunigiana e Garfagnana e il <time datetime="1970-07-19">19 luglio</time> dello stesso anno inaugura il primo Concorso bandistico «Città di
        Fivizzano». Nel <time datetime="1987-06">giugno 1987</time> la Filarmonica festeggia 210 anni.
    </p>
    <figure>
        <enhanced:img src={anni30Img} alt="Foto di gruppo dei musicisti della Filarmonica con i loro strumenti" {sizes} loading="lazy" />
        <figcaption>I musicisti della Filarmonica negli anni Trenta.</figcaption>
    </figure>
</section>

<section id="nome">
    <h2>Il nome</h2>
    <p>
        Nel <time datetime="1996">1996</time> la Filarmonica prende il nome di
        <a href="https://it.wikipedia.org/wiki/Alessandro_Stradella" target="_blank" rel="noopener noreferrer">Alessandro Stradella</a>, il compositore
        barocco la cui famiglia era originaria di Fivizzano. In paese la Casa degli Stradella, vicino alle mura medicee, lo ricorda con una targa posta nel
        <time datetime="1997">1997</time>.
    </p>
    <figure>
        <!-- SEGNAPOSTO: il file si chiama anni_80 ma la didascalia dice anni Novanta: verificare il decennio. -->
        <enhanced:img src={anni80Img} alt="Foto di gruppo dei musicisti della Filarmonica" {sizes} loading="lazy" />
        <figcaption>I musicisti della Filarmonica negli anni Novanta.</figcaption>
    </figure>
</section>

<section id="oggi">
    <h2>Oggi</h2>
    <p>
        Oggi la Filarmonica riunisce quattro formazioni: un'orchestra d'archi, una concert band, un ensemble di musica antica e una street band. Dal
        repertorio barocco alle marce per la strada, porta la musica nelle sale e nelle piazze della Lunigiana.
    </p>
    <!-- Da riattivare insieme alle pagine delle formazioni (/about/ensembles): i nomi diventano link.
    <p>
        <a href="/about/ensembles/infieri">Orchestra d'archi</a>, <a href="/about/ensembles/stradella-facendo">Concert band</a>,
        <a href="/about/ensembles/filarmonici-dissonanti">Ensemble di musica antica</a>, <a href="/about/ensembles/streetella-band">Street band</a>.
    </p>
    -->
    <figure>
        <enhanced:img src={oggiImg} alt="L'orchestra Infieri in concerto" {sizes} loading="lazy" />
        <figcaption>L'orchestra Infieri della Filarmonica in concerto.</figcaption>
    </figure>
</section>
