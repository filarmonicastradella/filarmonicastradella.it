<script lang="ts">
    // Foto della pagina, in più misure: il browser sceglie quella adatta alla colonna di testo (40rem) e allo schermo.
    import altaCappellaImg from "$lib/assets/imgs/alta_cappella.jpg?enhanced&w=400;640;800;1280;1600";
    import ottocentoImg from "$lib/assets/imgs/ottocento.jpg?enhanced&w=400;640;800;1280;1600";
    import anni30Img from "$lib/assets/imgs/anni_30.jpeg?enhanced&w=400;640;800;1280;1600";
    // Anteprima sfocata della copertina, visibile subito mentre la foto si carica
    import anni30Placeholder from "$lib/assets/imgs/anni_30.jpeg?w=24&blur=2&format=webp&inline";
    import anni80Img from "$lib/assets/imgs/anni_80.jpeg?enhanced&w=400;640;800;1280;1600";
    import anni90CorteoImg from "$lib/assets/imgs/anni_90_corteo.jpeg?enhanced&w=400;640;800;1280;1600";
    import oggiImg from "$lib/assets/imgs/oggi.jpg?enhanced&w=400;640;800;1280;1600";

    const sizes = "(min-width: 40rem) 40rem, 100vw";
</script>

<svelte:head>
    <title>La storia — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="La storia della Filarmonica Alessandro Stradella dal 1777 a oggi: l'Accademia dei Filarmonici Dissonanti, i maestri dell'Ottocento, il Novecento, il nome e le formazioni di oggi." />
</svelte:head>

<!-- Nella fascia la foto si taglia dal basso: meglio perdere le gambe di chi è seduto che le teste della fila in alto -->
<header style="--cover-placeholder: url({anni30Placeholder}); --cover-position: top; --cover-archive: 1">
    <h1>La storia</h1>
    <p>Dal 1777 a oggi: quasi due secoli e mezzo di musica a Fivizzano.</p>
    <enhanced:img
        src={anni30Img}
        alt="I musicisti della Filarmonica negli anni Trenta, in posa con i loro strumenti"
        sizes="(min-width: 64rem) calc(40rem + (100vw - 64rem) / 2), 100vw"
        fetchpriority="high"
    />
</header>

<nav aria-label="Indice della pagina">
    <ol>
        <li><a href="#origini">Le origini</a></li>
        <li><a href="#settecento">Il Settecento</a></li>
        <li><a href="#ottocento">L'Ottocento</a></li>
        <li><a href="#novecento">Il Novecento</a></li>
        <li><a href="#nome">Il nome</a></li>
        <li><a href="#oggi">Oggi</a></li>
    </ol>
</nav>

<section id="origini">
    <h2>Le origini</h2>
    <p>
        La tradizione di Fivizzano fa nascere la Filarmonica nel <time datetime="1777">1777</time>, negli anni delle riforme del granduca
        <a href="https://it.wikipedia.org/wiki/Pietro_Leopoldo_d'Asburgo-Lorena" target="_blank" rel="noopener noreferrer">Pietro Leopoldo</a>. Il primo
        documento che la riguarda è del <time datetime="1779-08-03">3 agosto 1779</time>: quel giorno l'Auditore fiscale di Firenze comunicò il «Permesso
        Sovrano» alla società di musica di Fivizzano<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>.
    </p>
    <p>
        Era un'accademia: l'Accademia dei Filarmonici Dissonanti<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>. Secondo la statistica del Regno del 1873 la fondò il conte Odoardo Fantoni,
        flautista, fratello del poeta Giovanni Fantoni (Labindo)<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. L'accademia aveva un «Principe», un segretario e una sua sala, dove si tenevano
        anche cene e balli. Ne facevano parte nobili, religiosi e musicisti del paese e dei dintorni, tra cui alcuni marchesi Malaspina<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2b" aria-label="Fonte 2">2</a></sup>.
    </p>
    <p>
        Il diploma dei soci, disegnato dal pittore fivizzanese Ercole Lemmi, porta due motti: «La soave armonia figlia del cielo» e «Le dissonanze in un
        accordo solo»<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>. Un modulo originale è conservato oggi alla Newberry Library di Chicago.
    </p>
    <figure>
        <enhanced:img src={altaCappellaImg} alt="Musicisti di una formazione di alta cappella" {sizes} />
        <figcaption>Una formazione di alta cappella, tipica del Settecento.</figcaption>
    </figure>
</section>

<section id="settecento">
    <h2>Il Settecento</h2>
    <p>
        La patrona dell'accademia era santa Cecilia. La prima festa si tenne il <time datetime="1781-02-04">4 febbraio 1781</time> nella chiesa
        prepositurale, con messa e vespri; la Gazzetta Toscana lodò «la maestria dei Professori, e l'abilità dei dilettanti»<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>.
    </p>
    <p>
        Per quindici anni la Gazzetta racconta la musica degli accademici nelle chiese e nelle feste del paese: le esequie dell'imperatrice Maria Teresa
        (<time datetime="1781-04">1781</time>)<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6b" aria-label="Fonte 6">6</a></sup>, il Te Deum per la visita di Pietro Leopoldo (<time datetime="1786-07-15">1786</time>)<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>, le «superbe
        Sinfonie» delle sere di festa (<time datetime="1787-04">1787</time>)<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>. Il primo maestro di cappella fu il sacerdote Antonio Lamberti, «della Scuola
        Napoletana»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>; poi venne il fivizzanese Angiolo Battaglia, organista e compositore, che il <time datetime="1789-05-03">3 maggio 1789</time> diresse
        una messa di Giuseppe Sarti. Per quella festa gli accademici fecero stampare un <a href="/about/sonnet">sonetto</a>, di cui una copia è stata
        ritrovata nella villa dei Fantoni a Noletta<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>.
    </p>
    <p>
        Nel <time datetime="1790-12">dicembre 1790</time>, per l'elezione di Leopoldo a imperatore, la Filarmonica offrì una cantata su versi di Odoardo
        Fantoni e in piazza suonarono «quattro Orchestre con soprabbondante numero di Suonatori»<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>.
    </p>
</section>

<section id="ottocento">
    <h2>L'Ottocento</h2>
    <p>
        La musica continuò anche negli anni francesi. Nel <time datetime="1799">1799</time>, per l'albero della libertà, il Comune affidò «le zinfonie e
        canti» ad Antonio Cortesi e Carlo Contigli<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>; nel <time datetime="1810">1810</time> Odoardo Fantoni chiamò da Parma l'orchestra per l'apertura
        del nuovo teatro<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4b" aria-label="Fonte 4">4</a></sup>.
    </p>
    <p>
        Nel <time datetime="1829">1829</time> il Comune destinò i fondi del soppresso Monte Pio a un maestro di cappella che insegnasse musica ai giovani
        del paese<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>. Il <time datetime="1831-08-24">24 agosto 1831</time> un rescritto del granduca eresse la società «in Banda Musicale» e concesse ai
        suonatori un'uniforme per comparire «in pubblica forma»<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>. Nel <time datetime="1832-09-27">1832</time>, durante la visita di Leopoldo II, la
        banda «alternò fino a notte avanzata i suoi concerti»<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>.
    </p>
    <p>
        Dopo l'Unità la Società fu guidata da maestri di professione. Il pratese Livio Nesti, che era stato direttore d'orchestra in teatro, era a
        Fivizzano già intorno al <time datetime="1860">1860</time><sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>; negli anni Sessanta dirigeva il Corpo musicale il maestro Cesare Rossi, che nel
        <time datetime="1868">1868</time> scriveva un'opera comica, <i>Per amore e non per forza</i><sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup><sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup>. Nel <time datetime="1871">1871-72</time>
        la Società, di nuovo con Nesti, contava 47 soci esecutori e 25 onorari, e la sua banda 25 elementi. La statistica ufficiale la metteva tra le sole
        quattro accademie filarmoniche italiane nate prima del 1800 e ancora attive, con Santa Cecilia di Roma, la Filarmonica di Bologna e l'Accademia di
        Alba<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        Nel <time datetime="1878">1878</time> la Società aveva due sezioni, Orchestra e Banda, e un presidente, l'avvocato Alberto Ginesi. Il
        <time datetime="1878-02-07">7 febbraio</time> celebrò le esequie di Vittorio Emanuele II nella chiesa di San Giovanni; un'epigrafe ricordava
        «l'armonia della Società Filarmonica di Fivizzano»<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>. Il figlio di Livio, Enea Nesti, fu maestro di musica a Fivizzano per circa vent'anni<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15b" aria-label="Fonte 15">15</a></sup>.
    </p>
    <p>
        Nel <time datetime="1880">1880</time> nacque in paese una seconda società musicale, la «8 febbraio 1880». Nel <time datetime="1884-01">1884</time> le
        «due società musicali, Filarmonica e Otto febbraio» sfilarono a Roma al Pantheon<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup>, e nel <time datetime="1887-05">1887</time> la Filarmonica
        mandò due rappresentanti a Firenze per la traslazione delle spoglie di Rossini<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>.
    </p>
    <figure>
        <enhanced:img src={ottocentoImg} alt="Musicisti di una banda dell'Ottocento in uniforme" {sizes} loading="lazy" />
        <figcaption>Una formazione di fiati dell'Ottocento.</figcaption>
    </figure>
</section>

<section id="novecento">
    <h2>Il Novecento</h2>
    <p>
        All'inizio del secolo la banda di Fivizzano era conosciuta anche fuori: lo scrittore Mario Puccini vi ambientò una novella, la storia di un
        giovane maestro venuto in paese «per dirigere la banda»<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>. Nelle fotografie del <time datetime="1921-11-04">4 novembre 1921</time>, per il Milite
        Ignoto, compare lo stendardo di una «Società Musicale» di Fivizzano<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>. Secondo la tradizione le due società si unirono intorno agli anni
        Venti<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>; nel <time datetime="1929">1929</time> la banda di Fivizzano risulta in attività<sup><a href="#fonte-23" role="doc-noteref" id="rimando-23a" aria-label="Fonte 23">23</a></sup>. Negli anni Trenta la Filarmonica era anche
        società di mutuo soccorso e dall'<time datetime="1934-11-11">11 novembre 1934</time> passò all'Opera Nazionale Dopolavoro<sup><a href="#fonte-24" role="doc-noteref" id="rimando-24a" aria-label="Fonte 24">24</a></sup>.
    </p>
    <p>
        Nel dopoguerra Fivizzano tornò un punto di riferimento: l'<time datetime="1970-01-11">11 gennaio 1970</time> ospitò il convegno delle bande della
        provincia e della Garfagnana e il <time datetime="1970-07-19">19 luglio</time> dello stesso anno il primo Concorso bandistico «Città di
        Fivizzano». Il <time datetime="1987-06-27">27 giugno 1987</time> cominciarono i festeggiamenti per i 210 anni<sup><a href="#fonte-24" role="doc-noteref" id="rimando-24b" aria-label="Fonte 24">24</a></sup>.
    </p>
</section>

<section id="nome">
    <h2>Il nome</h2>
    <p>
        Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica organizzò con il Comune il convegno «Alessandro Stradella e la Musica
        Barocca. Le origini ritrovate». Lo stesso giorno, «auspice la Società Filarmonica», fu posta una lapide sulla Casa degli Stradella, vicino alle
        mura<sup><a href="#fonte-25" role="doc-noteref" id="rimando-25a" aria-label="Fonte 25">25</a></sup>. Alla fine degli anni Novanta la Filarmonica prese il nome del compositore <a href="/about/stradella">Alessandro Stradella</a>
        (1643-1682), la cui famiglia era di Fivizzano: un suo antenato, Matteo Stradella, aveva riformato gli statuti del paese nel Quattrocento.
    </p>
    <figure>
        <!-- SEGNAPOSTO: il file si chiama anni_80 ma la didascalia dice anni Novanta: verificare il decennio. -->
        <enhanced:img src={anni80Img} alt="Foto di gruppo dei musicisti della Filarmonica" {sizes} loading="lazy" />
        <figcaption>I musicisti della Filarmonica negli anni Novanta.</figcaption>
    </figure>
    <figure>
        <!-- SEGNAPOSTO: luogo, occasione e anno da verificare (stessa serie d'archivio della foto sopra). -->
        <enhanced:img
            src={anni90CorteoImg}
            alt="La Filarmonica in corteo in una via stretta del paese, in camicia bianca e pantaloni neri: clarinetti e flauto davanti, poi sassofoni e ottoni, dietro un corteo di bambine vestite di bianco e di persone"
            {sizes}
            loading="lazy"
        />
        <figcaption>La Filarmonica in corteo per le vie del paese, anni Novanta.</figcaption>
    </figure>
</section>

<section id="oggi">
    <h2>Oggi</h2>
    <p>
        Oggi la Filarmonica Alessandro Stradella è un'associazione di promozione sociale con più di cinquanta soci e quattro formazioni: l'orchestra di
        fiati <a href="/about/ensembles/stradella-facendo">Stradella Facendo</a>, la <a href="/about/ensembles/streetella-band">Streetella Band</a>,
        l'<a href="/about/ensembles/infieri">Orchestra Infieri</a> e il gruppo di musica antica dei
        <a href="/about/ensembles/filarmonici-dissonanti">Filarmonici Dissonanti</a>, che riprende il nome degli accademici del Settecento. Nel
        <time datetime="2027">2027</time> festeggerà i 250 anni.
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
        <li id="fonte-1">Prospetto delle società filodrammatiche e bande, 1839: Archivio di Stato di Massa, sezione di Pontremoli, <i>Affari diversi di Governo</i>, 1839, vol. 61, n. 111, citato in Marco Angella, <i>Musica e teatro a Pontremoli nel secondo periodo lorenese</i>, 2012. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-2">Lettere di Azzolino Malaspina di Fosdinovo (31 maggio 1780) e di Carlo Malaspina d'Olivola (31 gennaio 1782) a Odoardo Fantoni, Archivio Fantoni, Archivio di Stato di Massa, trascritte in Rino Barbieri, <i>Labindo e la Società Civile Settecentesca</i>; <i>Gazzetta Toscana</i>, 1788, «Fivizzano 19 gennaio». Torna al testo: <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-2b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-3"><i>Istituti e società musicali in Italia. Statistica</i>, Roma, Direzione di statistica, 1873, pp. 216-217 (dati del 1871-72). Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-4">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano. Note per una rinascita</i>, pp. 9, 13, 63-64. Torna al testo: <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-4b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-5"><i>Cronaca di Fivizzano dal 1799 al 1833</i> e <i>Contributo alla vita di Giovanni Fantoni</i>. <a role="doc-backlink" href="#rimando-5a">Torna al testo</a></li>
        <li id="fonte-6"><i>Gazzetta Toscana</i>, 1781, «Fivizzano 6 febbraio», e supplemento, «Fivizzano 31 marzo». Torna al testo: <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-6b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-7"><i>Gazzetta Toscana</i>, 1786, «Fivizzano 18 luglio». <a role="doc-backlink" href="#rimando-7a">Torna al testo</a></li>
        <li id="fonte-8"><i>Gazzetta Toscana</i>, 1787, «Fivizzano 5 maggio». <a role="doc-backlink" href="#rimando-8a">Torna al testo</a></li>
        <li id="fonte-9"><i>Gazzetta Toscana</i>, 1789, «Fivizzano 3 maggio»; sonetto a stampa <i>In occasione della solenne festività di Santa Cecilia</i>, Massa, Stefano Frediani, 1789. <a role="doc-backlink" href="#rimando-9a">Torna al testo</a></li>
        <li id="fonte-10"><i>Supplemento alla Gazzetta Toscana</i>, n. 2, 8 gennaio 1791, «Fivizzano 13 dicembre». <a role="doc-backlink" href="#rimando-10a">Torna al testo</a></li>
        <li id="fonte-11">S. Andreani, <i>I Francesi a Fivizzano</i>, Fivizzano, 1911 (deliberazione del Magistrato comunitativo, 24 maggio 1799). <a role="doc-backlink" href="#rimando-11a">Torna al testo</a></li>
        <li id="fonte-12"><i>Bollettino ufficiale del Ministero dell'istruzione pubblica</i>, 1893, p. 1620. <a role="doc-backlink" href="#rimando-12a">Torna al testo</a></li>
        <li id="fonte-13"><i>Gazzetta di Firenze</i>, 11 ottobre 1832, «Fivizzano 27 settembre». <a role="doc-backlink" href="#rimando-13a">Torna al testo</a></li>
        <li id="fonte-14"><i>Il buon gusto</i>, Firenze, 1854, p. 143 (teatro di Grosseto); G. Meyerbeer, <i>Gli Ugonotti</i>, edizione economica fiorentina, c. 1860, elenco degli associati. <a role="doc-backlink" href="#rimando-14a">Torna al testo</a></li>
        <li id="fonte-15">Atti dello stato civile di Fivizzano, 1867-1893 (Archivio di Stato di Massa). Torna al testo: <a role="doc-backlink" href="#rimando-15a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-15b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-16"><i>Signale für die musikalische Welt</i>, Lipsia, 1868, p. 875; <i>Le Guide musical</i>, Bruxelles, 1868. <a role="doc-backlink" href="#rimando-16a">Torna al testo</a></li>
        <li id="fonte-17"><i>In memoria del lutto, onde furono colpiti per la morte del Re Galantuomo i cittadini fivizzanesi</i>, Firenze, Carnesecchi, 1878. <a role="doc-backlink" href="#rimando-17a">Torna al testo</a></li>
        <li id="fonte-18"><i>Fanfulla</i>, Roma, 18 gennaio 1884. <a role="doc-backlink" href="#rimando-18a">Torna al testo</a></li>
        <li id="fonte-19"><i>Gazzetta musicale di Milano</i>, 1887, supplemento straordinario al n. 23. <a role="doc-backlink" href="#rimando-19a">Torna al testo</a></li>
        <li id="fonte-20"><i>Il Marzocco</i>, 1913, recensione di Mario Puccini, <i>Viottola</i>, Ancona, Puccini. <a role="doc-backlink" href="#rimando-20a">Torna al testo</a></li>
        <li id="fonte-21">Museo centrale del Risorgimento, Roma, album <i>Onoranze al Milite Ignoto</i>, MCRR 1000, foto di Fivizzano. <a role="doc-backlink" href="#rimando-21a">Torna al testo</a></li>
        <li id="fonte-22">bandamusicale.it, scheda di Fivizzano (copie del 2003 e 2004 nella Wayback Machine). <a role="doc-backlink" href="#rimando-22a">Torna al testo</a></li>
        <li id="fonte-23"><i>Bollettino della Società italiana degli autori ed editori</i>, 1930, pp. 329, 374-375 (bande abbonate fino al 31 dicembre 1929). <a role="doc-backlink" href="#rimando-23a">Torna al testo</a></li>
        <li id="fonte-24"><i>Annuario toscano</i>, anni Trenta, voce Fivizzano; lunigiana.net, <i>Cento anni di Lunigiana</i>, anni 1934, 1970, 1987. Torna al testo: <a role="doc-backlink" href="#rimando-24a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-24b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-25">Locandina del convegno, Fivizzano, 6 dicembre 1997; iscrizione della lapide sulla Casa degli Stradella. <a role="doc-backlink" href="#rimando-25a">Torna al testo</a></li>
    </ol>
    <p>
        Per approfondire: Duino Ceschi, <i>Giovanni Fantoni e l'Accademia di Belle Arti di Carrara […] e le Accademie Letteraria Lunense e dei
        Filarmonici Dissonanti di Fivizzano</i>, in <i>Atti e Memorie dell'Accademia Aruntica di Carrara</i>, vol. I, 1995, pp. 35-67.
    </p>
</section>
