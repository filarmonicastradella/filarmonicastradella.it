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
    <enhanced:img
        src={anni30Img}
        alt="I musicisti della Filarmonica negli anni Trenta, in posa con i loro strumenti"
        sizes="(min-width: 64rem) 45vw, 100vw"
        fetchpriority="high"
    />
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
        dell'Auditore Fiscale di Firenze<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Il <time datetime="1781-02-04">4 febbraio 1781</time> il gruppo tiene un concerto solenne per la festa di Santa
        Cecilia, patrona dei musicisti.
    </p>
    <p>
        In quegli anni la Filarmonica è un'accademia, l'Accademia de' Filarmonici Dissonanti<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>, promossa dal conte Odoardo Fantoni<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>: un circolo di nobili e
        dilettanti guidato da un «principe», carica ricoperta tra gli altri dal marchese Carlo Emanuele Malaspina di Fosdinovo. Il motto inciso sui suoi
        diplomi spiega il nome: «Le dissonanze in un accordo solo»<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>. Gli Accademici suonano e cantano nelle grandi feste del paese, spesso con musiche
        composte e dirette da don Antonio Lamberti, maestro di cappella di scuola napoletana e membro dell'Accademia<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>: nell'aprile
        <time datetime="1781-04">1781</time> la Gazzetta Toscana ricorda la musica «fatta eseguire dagli Accademici Filarmonici» per le esequie
        dell'imperatrice Maria Teresa<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>.
    </p>
    <p>
        Il <time datetime="1786-07-15">15 luglio 1786</time> lo stesso Pietro Leopoldo, in visita a Fivizzano, ascolta nella chiesa parrocchiale il
        Te Deum «accompagnato con scelta, e nuova Musica dagli Accademici Filarmonici»<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>. Il <time datetime="1789-05-03">3 maggio
        1789</time>, per la festa di Santa Cecilia, l'Accademia esegue una Messa di Giuseppe Sarti diretta dal giovane maestro di cappella Angiolo
        Battaglia, e distribuisce il <a href="/about/sonnet">sonetto a stampa</a> che è arrivato fino a noi<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>.
    </p>
    <p>
        Nel <time datetime="1872">1872</time> la statistica ufficiale del Regno d'Italia la conterà tra le quattro accademie filarmoniche più antiche del
        Paese, accanto a Santa Cecilia di Roma, alla Filarmonica di Bologna e all'Accademia di Alba<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>.
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
        concede ai musicisti un'uniforme<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>: da allora rappresentano la città nelle occasioni pubbliche.
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
        sotto l'Opera Nazionale Dopolavoro<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>.
    </p>
    <p>
        Nel dopoguerra Fivizzano torna un punto di riferimento: l'<time datetime="1970-01-11">11 gennaio 1970</time> ospita il convegno delle bande di
        Lunigiana e Garfagnana e il <time datetime="1970-07-19">19 luglio</time> dello stesso anno inaugura il primo Concorso bandistico «Città di
        Fivizzano»<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9b" aria-label="Fonte 9">9</a></sup>. Nel <time datetime="1987-06">giugno 1987</time> la Filarmonica festeggia 210 anni<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9c" aria-label="Fonte 9">9</a></sup>.
    </p>
</section>

<section id="nome">
    <h2>Il nome</h2>
    <p>
        Alla fine degli anni Novanta la Filarmonica prende il nome di
        <a href="/about/stradella">Alessandro Stradella</a>, il compositore
        barocco la cui famiglia era originaria di Fivizzano. Il <time datetime="1997-12-06">6 dicembre 1997</time> la Filarmonica e il Comune dedicano
        a Stradella una giornata di studio e di musica, «Le origini ritrovate». In paese la Casa degli Stradella, vicino alle mura medicee, lo ricorda
        con una targa posta nello stesso anno.
    </p>
    <p>
        Dalla fine degli anni Novanta l'attività si interrompe e per quasi trent'anni la Filarmonica resta in silenzio. Nel
        <time datetime="2026">2026</time> viene rifondata, per offrire a ragazzi e adulti del territorio un luogo dove continuare a suonare insieme.
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
        Oggi la Filarmonica riunisce quattro formazioni: Stradella Facendo, la nostra orchestra di fiati; la Streetella Band; l'Orchestra Infieri; i
        Filarmonici Dissonanti. Dal
        repertorio barocco alle marce per la strada, porta la musica nelle sale e nelle piazze della Lunigiana.
    </p>
    <p>
        <a href="/about/ensembles/stradella-facendo">Stradella Facendo</a>, <a href="/about/ensembles/streetella-band">Streetella Band</a>,
        <a href="/about/ensembles/infieri">Orchestra Infieri</a>, <a href="/about/ensembles/filarmonici-dissonanti">Filarmonici Dissonanti</a>.
    </p>
    <figure>
        <enhanced:img src={oggiImg} alt="L'orchestra Infieri in concerto" {sizes} loading="lazy" />
        <figcaption>L'orchestra Infieri della Filarmonica in concerto.</figcaption>
    </figure>
</section>

<section>
    <h2>Hai materiale sulla nostra storia?</h2>
    <p>
        Fotografie, programmi di sala, documenti, registrazioni: molta della nostra storia è conservata nelle case di chi l'ha vissuta. Se hai
        qualcosa che riguarda la Filarmonica, scrivici dal <a href="/contacts/message">modulo di contatto</a> scegliendo «Materiale storico»: ci
        accordiamo per l'invio o per farne una copia.
    </p>
</section>

<section role="doc-endnotes" aria-labelledby="fonti">
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">
            Prospetto della Società Filarmonica, 1839: Archivio di Stato di Massa, sezione di Pontremoli, <i>Affari diversi di Governo</i>, 1839,
            vol. 61, citato in Marco Angella, <i>Musica e teatro a Pontremoli nel secondo periodo lorenese</i>. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando b">b</a>
        </li>
        <li id="fonte-2"><i>Gazzetta musicale di Milano</i>, 1887. <a role="doc-backlink" href="#rimando-2a">Torna al testo</a></li>
        <li id="fonte-3"><i>Istituti e società musicali in Italia</i>, Statistica del Regno d'Italia, dati del 1871-72. Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-4">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano. Note per una rinascita</i>. <a role="doc-backlink" href="#rimando-4a">Torna al testo</a></li>
        <li id="fonte-5"><i>Cronaca di Fivizzano dal 1799 al 1833</i> e <i>Contributo alla vita di Giovanni Fantoni</i>. <a role="doc-backlink" href="#rimando-5a">Torna al testo</a></li>
        <li id="fonte-6"><i>Gazzetta Toscana</i>, tomo XVI, 1781. <a role="doc-backlink" href="#rimando-6a">Torna al testo</a></li>
        <li id="fonte-7"><i>Gazzetta Toscana</i>, tomo XXI, 1786, corrispondenza «Fivizzano 18 luglio». <a role="doc-backlink" href="#rimando-7a">Torna al testo</a></li>
        <li id="fonte-8"><i>Gazzetta Toscana</i>, tomo XXIV, 1789, corrispondenza «Fivizzano 3 maggio». <a role="doc-backlink" href="#rimando-8a">Torna al testo</a></li>
        <li id="fonte-9">lunigiana.net, <i>Cento anni in Lunigiana</i>. Torna al testo: <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-9b" aria-label="Torna al rimando b">b</a>, <a role="doc-backlink" href="#rimando-9c" aria-label="Torna al rimando c">c</a></li>
    </ol>
    <p>
        Per approfondire: Duino Ceschi, <i>Giovanni Fantoni e l'Accademia di Belle Arti di Carrara […] e le Accademie Letteraria Lunense e dei
        Filarmonici Dissonanti di Fivizzano</i>, in <i>Atti e Memorie dell'Accademia Aruntica di Carrara</i>, vol. I, 1995, pp. 35-67.
    </p>
</section>
