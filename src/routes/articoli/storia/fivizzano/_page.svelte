<!-- Testo della sessione di ricerca (~/Filarmonica/Ricerca, 4/11/2026): ogni frase ha la sua fonte, numerata in fondo -->
<script lang="ts">
    import { findArticle } from "$lib/articles";
    import ArticleHeader from "../../ArticleHeader.svelte";
    // Copertina: piazza Medicea con la fontana, in più misure, e la sua anteprima sfocata
    import piazza from "$lib/assets/imgs/fivizzano-piazza-medicea.jpg?enhanced&w=2048;1600;1280;960;640";
    import piazzaPlaceholder from "$lib/assets/imgs/fivizzano-piazza-medicea.jpg?w=24&blur=2&format=webp&inline";
    import propositura from "$lib/assets/imgs/fivizzano-propositura.jpg?enhanced&w=400;640;800;1280;1600";
    import sanGiovanni from "$lib/assets/imgs/fivizzano-san-giovanni.jpg?enhanced&w=400;640;800;1280;1600";

    const article = findArticle("storia", "fivizzano")!;
    const sizes = "(min-width: 36rem) 36rem, 100vw";
</script>

<svelte:head>
    <title>{article.title} — Filarmonica Alessandro Stradella</title>
    <meta name="description" content={article.excerpt} />
</svelte:head>

<ArticleHeader {article} style="--cover-placeholder: url({piazzaPlaceholder})">
    <p>
        Fivizzano è un paese piccolo. Eppure, se lo attraversi con in mano i giornali e le carte d'archivio, quasi ogni piazza e ogni chiesa ha una storia
        di musica da raccontare. Qui ne mettiamo in fila alcune, luogo per luogo, solo con i fatti che risultano dai documenti.
    </p>
    <enhanced:img src={piazza} alt="Piazza Medicea a Fivizzano con la fontana di Cosimo III" sizes="100vw" fetchpriority="high" itemprop="image" />
</ArticleHeader>

<section>
    <h2>La Propositura dei Santi Jacopo e Antonio</h2>
    <p>
        La musica sacra a Fivizzano è più antica di qualunque società musicale. Nel <time datetime="1604">1604</time> il compositore Giacomo Moro da
        Viadana dedica i suoi <i>Concerti ecclesiastici</i> a monsignor Ambrogio Magnanino, rettore della chiesa di Fivizzano<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Nella raccolta ci sono anche
        canzoni «per suonare con diversi stromenti».
    </p>
    <p>Nel <time datetime="1768">1768</time> la nascita del granprincipe si festeggia con una messa solenne e un <i>Te Deum</i> cantato<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>.</p>
    <p>
        Il <time datetime="1781-02-04">4 febbraio 1781</time> un'Accademia Filarmonica «recentemente con approvazione Sovrana instituita» celebra «per la
        prima volta» nella Propositura la festa di santa Cecilia, patrona dei musicisti<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. Il permesso del granduca era arrivato il
        <time datetime="1779-08-03">3 agosto 1779</time><sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>. Da quell'accademia viene la Filarmonica di oggi: la sua <a href="/articoli/storia/filarmonica"
            >storia</a
        > è in un articolo a parte.
    </p>
    <p>
        Da quell'anno la Propositura è il luogo delle grandi occasioni. Il <time datetime="1781-03-31">31 marzo 1781</time> vi si celebrano le esequie
        dell'imperatrice Maria Teresa: gli Accademici Filarmonici suonano «gratis», con musica del maestro di cappella don Antonio Lamberti, e il conte
        Giovanni Fantoni, il poeta Labindo, recita l'orazione<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>. Nel <time datetime="1789">1789</time> la festa di santa Cecilia ha una messa di Giuseppe
        Sarti<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>; per la stessa festa fu stampato il <a href="/articoli/storia/sonetto">sonetto degli Accademici Dissonanti</a>.
    </p>
    <figure>
        <enhanced:img src={propositura} alt="Facciata della chiesa dei Santi Jacopo e Antonio a Fivizzano" {sizes} loading="lazy" />
        <figcaption>La chiesa dei Santi Jacopo e Antonio, la «Propositura». Foto di Sailko, CC BY 3.0, <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_santi_jacopo_e_antonio,_esterno_01.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption>
    </figure>
</section>

<section>
    <h2>San Francesco e San Giovanni</h2>
    <p>
        Dopo le esequie del 1781, nella chiesa di San Francesco dei Minori Osservanti si fa un triduo, e tutte e tre le sere c'è «musica fatta eseguire
        dagli Accademici Filarmonici»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5b" aria-label="Fonte 5">5</a></sup>.
    </p>
    <p>
        San Giovanni era la chiesa del convento degli Agostiniani. Secondo gli storici della Lunigiana vi fu sepolto il vescovo Alessio Stradella, morto a
        Fivizzano il <time datetime="1580-08-27">27 agosto 1580</time><sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>. Nel luglio <time datetime="1787-07">1787</time>, per l'arrivo delle monache del
        nuovo Conservatorio, vi si canta una messa solenne «coll'intervento de' Signori Accademici Filarmonici»<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>.
    </p>
    <p>
        Il <time datetime="1878-02-07">7 febbraio 1878</time> è la Società Filarmonica stessa a curare in San Giovanni le esequie solenni di Vittorio
        Emanuele II<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>. Oggi l'antica chiesa ospita il Museo di San Giovanni.
    </p>
    <figure>
        <enhanced:img src={sanGiovanni} alt="L'ex chiesa di San Giovanni a Fivizzano, oggi museo" {sizes} loading="lazy" />
        <figcaption>L'ex chiesa di San Giovanni, oggi Museo di San Giovanni. Foto di Sailko, CC BY 3.0, <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_museo_di_san_giovanni,_00,_ex-chiesa_di_san_giovanni.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption>
    </figure>
</section>

<section>
    <h2>La piazza</h2>
    <p>La piazza principale, con la fontana del 1683, è da sempre il posto della musica all'aperto<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>.</p>
    <p>
        Il <time datetime="1790-12-12">12 dicembre 1790</time>, per l'elezione imperiale di Leopoldo, in piazza si balla con «quattro orchestre, con
        soprabbondante numero di suonatori»<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>. La sera prima, nella sala della marchesa Gargiolli Malaspina, l'Accademia aveva offerto «una superba
        accademia di suono e canto», con una cantata su versi del conte Odoardo Fantoni<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11b" aria-label="Fonte 11">11</a></sup>.
    </p>
    <p>
        Il <time datetime="1802-04-22">22 aprile 1802</time>, nella processione del Venerdì Santo, i suonatori salgono sul terrazzo di casa Grilli «per essere
        meglio veduti, e ascoltati da tutto il popolo»<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>. Lo racconta la contessa Anna Fantoni in una lettera allo zio Labindo.
    </p>
    <p>
        Nel settembre <time datetime="1832-09">1832</time>, durante la visita del granduca Leopoldo II, i musicisti di Fivizzano alternano i loro concerti in
        piazza «fino a notte avanzata»<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>.
    </p>
    <p>
        Nel <time datetime="1878">1878</time> la «Secolare Società Filarmonica» suona in piazza del Mercato per il nuovo sindaco, e per la festa dello
        Statuto tiene un concerto di più di due ore<sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>.
    </p>
</section>

<section>
    <h2>Il Teatro degli Imperfetti</h2>
    <p>
        Il <time datetime="1804-07-10">10 luglio 1804</time>, con un atto del notaio Antonio Falchi, un gruppo di famiglie fivizzanesi fonda l'Accademia degli
        Imperfetti per costruire un teatro<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup>. Tra gli azionisti c'è il conte Odoardo Fantoni.
    </p>
    <p>
        Il sipario lo dipinge Saverio Salvioni di Massa, e la prima recita si fa nel luglio <time datetime="1810-07">1810</time><sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup>. Per l'orchestra Odoardo
        Fantoni chiama suonatori da Parma. Nella lettera del <time datetime="1810-08-03">3 agosto 1810</time> il cugino Andrea Ferroni racconta che i
        musicisti «sono stati poi contentissimi di Fivizzano»<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>.
    </p>
    <p>
        Nel catasto del <time datetime="1826">1826</time> il teatro ha cinquanta palchi, divisi tra la società degli Accademici e diciannove famiglie del
        paese<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup>. Nel <time datetime="1841">1841</time> è descritto come «un bel teatro a tre ordini di palchi», dietro la casa del Comune<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10b" aria-label="Fonte 10">10</a></sup>. Gli elenchi
        ufficiali del <time datetime="1872">1872</time> gli danno una capienza di 600 persone<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>.
    </p>
    <p>
        Nel <time datetime="1907">1907</time>, per il centenario della morte di Labindo, il teatro degli Accademici Imperfetti ospita la serata di gala. Nel
        comitato delle feste siedono i presidenti delle società del paese, Filarmonica compresa<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>.
    </p>
</section>

<section>
    <h2>Sant'Antonio</h2>
    <p>
        Nel <time datetime="1885">1885</time> la Società operaia di mutuo soccorso ha la sua sala «nel locale di Sant'Antonio»<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>. Era la chiesa segnata
        con la lettera H nella pianta settecentesca della fortezza<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>.
    </p>
</section>

<section>
    <h2>La casa degli Stradella</h2>
    <p>
        Dalla famiglia Stradella di Fivizzano vengono il vescovo Alessio e il compositore <a href="/articoli/storia/stradella">Alessandro Stradella</a>. Sulla
        loro casa l'Amministrazione comunale ha posto una lapide il <time datetime="1997-12-06">6 dicembre 1997</time>, «auspice la Società Filarmonica»<sup><a href="#fonte-23" role="doc-noteref" id="rimando-23a" aria-label="Fonte 23">23</a></sup>.
        Quell'anno la Società prese il nome di Alessandro Stradella.
    </p>
    <p>
        La lapide dà per Alessandro la data di nascita allora accettata, il 1644. L'atto di battesimo trovato poi a Bologna la sposta al
        <time datetime="1643-07-03">3 luglio 1643</time><sup><a href="#fonte-24" role="doc-noteref" id="rimando-24a" aria-label="Fonte 24">24</a></sup>.
    </p>
</section>

<section>
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">Giacomo Moro da Viadana, <i>Concerti ecclesiastici… Opera ottava</i>, Venezia, Ricciardo Amadino, 1604, dedica. Museo internazionale e biblioteca della musica di Bologna, T.197. <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando 1">Torna al testo</a></li>
        <li id="fonte-2"><i>Gazzetta Toscana</i>, 1768, corrispondenza da Fivizzano del 3 marzo. <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando 2">Torna al testo</a></li>
        <li id="fonte-3"><i>Gazzetta Toscana</i>, 1781, p. 39, «Fivizzano 6. Febbrajo». <a href="https://babel.hathitrust.org/cgi/pt?id=nyp.33433081589602&amp;seq=277" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando 3">Torna al testo</a></li>
        <li id="fonte-4">Prospetto delle società filodrammatiche e bande del 1839, Archivio di Stato di Massa, sezione di Pontremoli, <i>Affari diversi di Governo</i>, 1839, vol. 61, n. 111; citato da Mauro Angella, «La nascita della Banda musicale pontremolese», <i>Archivio storico per le province parmensi</i>, IV serie, LXII (2010), pp. 41-53. <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando 4">Torna al testo</a></li>
        <li id="fonte-5"><i>Gazzetta Toscana</i>, 1781, supplemento, «Fivizzano 31. Marzo 1781». Internet Culturale, TO00184817_41249. Torna al testo: <a role="doc-backlink" href="#rimando-5a" aria-label="Torna al rimando 5a">a</a>, <a role="doc-backlink" href="#rimando-5b" aria-label="Torna al rimando 5b">b</a></li>
        <li id="fonte-6"><i>Gazzetta Toscana</i>, 1789, festa di santa Cecilia del 3 maggio. <a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536901&amp;seq=98" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando 6">Torna al testo</a></li>
        <li id="fonte-7">Emanuele Gerini, <i>Memorie storiche d'illustri scrittori e di uomini insigni dell'antica e moderna Lunigiana</i>, II, Massa, 1829, pp. 136-138. <a href="https://books.google.it/books?id=a0gssshrWAsC&amp;pg=PA137" target="_blank" rel="noopener noreferrer">Google Libri</a>. <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando 7">Torna al testo</a></li>
        <li id="fonte-8"><i>Gazzetta Toscana</i>, 1787, corrispondenza da Fivizzano sul Conservatorio di Santa Monica. <a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536885&amp;seq=140" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando 8">Torna al testo</a></li>
        <li id="fonte-9"><i>Il 9 gennaio 1878, ossia Il mondo civile ed in particolare l'Italia in morte di Vittorio Emanuele II</i>, vol. 2, pp. 37-38. <a href="https://books.google.it/books?id=78YRayT7KRgC&amp;pg=PA37" target="_blank" rel="noopener noreferrer">Google Libri</a>. <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando 9">Torna al testo</a></li>
        <li id="fonte-10">Attilio Zuccagni-Orlandini, <i>Corografia fisica, storica e statistica dell'Italia e delle sue isole</i>, Firenze, 1841, pp. 757-758. <a href="https://archive.org/details/bub_gb_GMWBv_a6cuMC" target="_blank" rel="noopener noreferrer">Internet Archive</a>. Torna al testo: <a role="doc-backlink" href="#rimando-10a" aria-label="Torna al rimando 10a">a</a>, <a role="doc-backlink" href="#rimando-10b" aria-label="Torna al rimando 10b">b</a></li>
        <li id="fonte-11"><i>Gazzetta Toscana</i>, 1791, feste del 10-12 dicembre 1790. <a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536919&amp;seq=21" target="_blank" rel="noopener noreferrer">HathiTrust</a>. Torna al testo: <a role="doc-backlink" href="#rimando-11a" aria-label="Torna al rimando 11a">a</a>, <a role="doc-backlink" href="#rimando-11b" aria-label="Torna al rimando 11b">b</a></li>
        <li id="fonte-12">Lettera di Anna Fantoni a Giovanni Fantoni, 22 aprile 1802, Archivio di Stato di Massa, Archivio Fantoni; trascrizione di Rino Barbieri, <i>Labindo e la Società Civile Settecentesca</i>. <a role="doc-backlink" href="#rimando-12a" aria-label="Torna al rimando 12">Torna al testo</a></li>
        <li id="fonte-13"><i>Gazzetta di Firenze</i>, 1832, visita di Leopoldo II a Fivizzano. <a role="doc-backlink" href="#rimando-13a" aria-label="Torna al rimando 13">Torna al testo</a></li>
        <li id="fonte-14"><i>La Nazione</i>, aprile e giugno 1878, corrispondenze da Fivizzano. Biblioteca Digitale Toscana. <a role="doc-backlink" href="#rimando-14a" aria-label="Torna al rimando 14">Torna al testo</a></li>
        <li id="fonte-15">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano</i>, p. 13. <a role="doc-backlink" href="#rimando-15a" aria-label="Torna al rimando 15">Torna al testo</a></li>
        <li id="fonte-16">Lettera di Saverio Salvioni a Odoardo Fantoni, Massa, 4 luglio 1810, Archivio di Stato di Massa, Archivio Fantoni, b. 283; trascrizione di Rino Barbieri. <a role="doc-backlink" href="#rimando-16a" aria-label="Torna al rimando 16">Torna al testo</a></li>
        <li id="fonte-17">Lettera di Andrea Ferroni a Odoardo Fantoni, Parma, 3 agosto 1810, Archivio Fantoni; trascrizione di Rino Barbieri. <a role="doc-backlink" href="#rimando-17a" aria-label="Torna al rimando 17">Torna al testo</a></li>
        <li id="fonte-18">Catasto generale toscano (catasto leopoldino), Fivizzano, sezione L, particella 368, 1826. <a role="doc-backlink" href="#rimando-18a" aria-label="Torna al rimando 18">Torna al testo</a></li>
        <li id="fonte-19"><i>La legislazione e la giurisprudenza dei teatri</i>, 1872; <i>Opere dello ingegno</i>, prontuario, 1873. <a role="doc-backlink" href="#rimando-19a" aria-label="Torna al rimando 19">Torna al testo</a></li>
        <li id="fonte-20"><i>La Nazione</i>, 27 e 28 settembre 1907. Biblioteca Digitale Toscana. <a role="doc-backlink" href="#rimando-20a" aria-label="Torna al rimando 20">Torna al testo</a></li>
        <li id="fonte-21"><i>Gazzetta Ufficiale del Regno d'Italia</i>, 1885, p. 940. <a role="doc-backlink" href="#rimando-21a" aria-label="Torna al rimando 21">Torna al testo</a></li>
        <li id="fonte-22">«Pianta della Fortezza di Fivizzano» [1749-1765], Archivio di Stato di Firenze, Cartografia storica regionale della Regione Toscana. <a role="doc-backlink" href="#rimando-22a" aria-label="Torna al rimando 22">Torna al testo</a></li>
        <li id="fonte-23">Lapide sulla casa degli Stradella, Fivizzano, 6 dicembre 1997: «L'Amministrazione comunale / auspice / la Società Filarmonica». <a role="doc-backlink" href="#rimando-23a" aria-label="Torna al rimando 23">Torna al testo</a></li>
        <li id="fonte-24">Davide Mingozzi, «Alessandro Stradella “Bononiensis Dominus”», <i>Il Saggiatore musicale</i>, XXV (2018), pp. 299-307. <a role="doc-backlink" href="#rimando-24a" aria-label="Torna al rimando 24">Torna al testo</a></li>
    </ol>
    <p>
        Immagine di copertina: piazza Medicea e la fontana di Cosimo III de' Medici. Foto di Sailko, CC BY 3.0,
        <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_piazza_medicea,_Fontana_di_Cosimo_III_de%27_Medici_01.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.
    </p>
</section>

<p class="rimando"><a href="/articoli">Articoli</a></p>
