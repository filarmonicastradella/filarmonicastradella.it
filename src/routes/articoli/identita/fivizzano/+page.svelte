<!-- Testo della sessione di ricerca (~/Filarmonica/Ricerca, 4/11/2026): ogni frase ha la sua fonte, numerata in fondo; tra [parentesi quadre] i dati da completare -->
<script lang="ts">
    import { findArticle } from "$lib/articles";
    import ArticleHeader from "../../ArticleHeader.svelte";
    // Copertina: piazza Medicea con la fontana (la stessa dell'articolo sui luoghi), in più misure, e la sua anteprima sfocata
    import piazza from "$lib/assets/imgs/fivizzano-piazza-medicea.jpg?enhanced&w=2048;1600;1280;960;640";
    import piazzaPlaceholder from "$lib/assets/imgs/fivizzano-piazza-medicea.jpg?w=24&blur=2&format=webp&inline";
    import propositura from "$lib/assets/imgs/fivizzano-propositura.jpg?enhanced&w=400;640;800;1280;1600";
    import sanGiovanni from "$lib/assets/imgs/fivizzano-san-giovanni.jpg?enhanced&w=400;640;800;1280;1600";

    const article = findArticle("identita", "fivizzano")!;
    const sizes = "(min-width: 36rem) 36rem, 100vw";
</script>

<svelte:head>
    <title>{article.title} — Filarmonica Alessandro Stradella</title>
    <meta name="description" content={article.excerpt} />
</svelte:head>

<ArticleHeader {article} style="--cover-placeholder: url({piazzaPlaceholder})">
    <p>
        A Fivizzano la musica si impara, si suona e si ascolta. C'è chi la insegna, chi la porta in piazza, chi la fa arrivare da lontano. Ecco chi la fa
        oggi, e da dove viene.
    </p>
    <enhanced:img src={piazza} alt="Piazza Medicea a Fivizzano con la fontana di Cosimo III" sizes="100vw" fetchpriority="high" itemprop="image" />
</ArticleHeader>

<section>
    <h2>Oggi</h2>
    <h3>La Filarmonica Alessandro Stradella</h3>
    <p>La Filarmonica ha quattro formazioni<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>:</p>
    <ul>
        <li><a href="/formazioni/stradella-facendo">Stradella Facendo</a>, l'orchestra di fiati;</li>
        <li><a href="/formazioni/streetella-band">Streetella Band</a>, la formazione itinerante;</li>
        <li><a href="/formazioni/orchestra-infieri">Orchestra Infieri</a>, l'orchestra dove archi e fiati suonano insieme;</li>
        <li><a href="/formazioni/filarmonici-dissonanti">Filarmonici Dissonanti</a>, per la musica medievale, rinascimentale e barocca.</li>
    </ul>
    <p>
        La sede legale è in via Stretta 5<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>. Le prove si fanno nella sala della Società operaia di mutuo soccorso, in via Radda<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>.
    </p>
    <h3>La scuola media a indirizzo musicale</h3>
    <p>
        La scuola media «G. Fantoni» di Fivizzano fa parte dell'Istituto comprensivo che serve i comuni di Fivizzano, Casola in Lunigiana e
        Fosdinovo<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. L'Istituto ha un percorso a indirizzo musicale, e a Natale i ragazzi suonano in concerto<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>. Gli strumenti insegnati sono flauto,
        clarinetto, sassofono, tromba e percussioni<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>.
    </p>
    <h3>Il Lunigiana International Music Festival</h3>
    <p>
        Ogni luglio Fivizzano ospita il Lunigiana International Music Festival<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>. Arrivano studenti e musicisti da tutto il mondo per lezioni,
        masterclass, musica da camera e concerti<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5b" aria-label="Fonte 5">5</a></sup>. Il festival è nato nel <time datetime="2017">2017</time><sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>. I concerti si tengono nei luoghi storici del paese: nel 2024 il Museo di San
        Giovanni, la chiesa dei Santi Jacopo e Antonio e la pieve di San Paolo<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>.
    </p>
</section>

<section>
    <h2>La tradizione bandistica</h2>
    <h3>La banda della Società</h3>
    <p>
        Nel <time datetime="1831">1831</time> un rescritto del granduca «erige in Banda Musicale» la Società filarmonica di Fivizzano, con la sua
        uniforme<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>. Nel <time datetime="1832">1832</time>, per la visita di Leopoldo II, la banda alterna i suoi concerti in piazza «fino a notte
        avanzata»<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>. La statistica del 1871-72 conta 47 soci nella Società filarmonica e 25 suonatori nella sua banda, nata nel 1857 e «sussidiata
        dal Municipio»<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>.
    </p>
    <p>
        Nel <time datetime="1878">1878</time> la «banda della Società filarmonica» suona in piazza per più di due ore alla festa dello Statuto<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>. Lo
        stesso anno la Società cura in San Giovanni le esequie solenni per Vittorio Emanuele II<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>. Nel <time datetime="1884">1884</time> a Fivizzano
        le società musicali sono due: la Filarmonica e la «Otto febbraio 1880»<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>. Nel settembre <time datetime="1887-09">1887</time>, quando Giosuè Carducci arriva a Fivizzano
        per studiare le carte di Labindo, la sera «la banda municipale» suona un concerto in suo onore<sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>.
    </p>
    <h3>Le bande delle frazioni</h3>
    <p>
        Anche i paesi intorno hanno avuto le loro bande. Nel <time datetime="1909">1909</time> il deputato Ernesto Artom, in viaggio da Aulla a
        Fivizzano, viene salutato dalle bande di Ceserano, Soliera e Gassano<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup>. Nel <time datetime="1929">1929</time> il Bollettino della SIAE
        registra tra le bande abbonate quelle di Gassano, Moncigoli e Vinca, oltre a una banda con sede a Fivizzano<sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup>.
    </p>
    <dl>
        <dt>Gassano</dt>
        <dd>
            Nel 1963 la Società musicale di Gassano festeggia il 90° anniversario della fondazione, cioè il 1873. Nel 1980 celebra il centenario della
            Società filarmonica «Unione Musicale», con le bande di Caprigliola, Pallerone, Casola e Vinca<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>. Nel 2009 la Filarmonica «G. Verdi» di
            Gassano organizza la sagra del paese<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup>. Oggi non è più attiva<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4b" aria-label="Fonte 4">4</a></sup>.
        </dd>
        <dt>Moncigoli</dt>
        <dd>
            L'8 dicembre 1963 la banda di Moncigoli suona al monumento ai caduti del paese<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>. Nel 1968 suona all'inaugurazione del monumento ai caduti
            di Agnino<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>. Nel 2023 la Banda «Puccini» di Moncigoli apre con il suo corteo «Sapori di Fivizzano»<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>. È ancora attiva, e nel
            <time datetime="2027">2027</time> compie cento anni<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4c" aria-label="Fonte 4">4</a></sup>.
        </dd>
        <dt>Vinca</dt>
        <dd>Nel 1929 è tra le bande abbonate alla SIAE<sup><a href="#fonte-16" role="doc-noteref" id="rimando-16b" aria-label="Fonte 16">16</a></sup>, e nel 1980 suona a Gassano per il centenario<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17b" aria-label="Fonte 17">17</a></sup>. Oggi non è più attiva<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4d" aria-label="Fonte 4">4</a></sup>.</dd>
        <dt>Ceserano e Soliera</dt>
        <dd>Le loro bande sono attestate nel 1909<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15b" aria-label="Fonte 15">15</a></sup>. Oggi non ci sono più<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4e" aria-label="Fonte 4">4</a></sup>.</dd>
    </dl>
    <p>Di tutte queste, oggi resta solo la banda di Moncigoli<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4f" aria-label="Fonte 4">4</a></sup>.</p>
    <p>
        Fivizzano è stata anche un punto d'incontro delle bande della zona. L'<time datetime="1970-01-11">11 gennaio 1970</time> la sala consiliare
        ospita un convegno delle bande della provincia e della Garfagnana. Il <time datetime="1970-07-19">19 luglio</time> dello stesso anno si tiene il
        primo Concorso bandistico «Città di Fivizzano», vinto dalla banda di Pontremoli<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>. Nel <time datetime="1987">1987</time> la Filarmonica
        festeggia i suoi 210 anni<sup><a href="#fonte-23" role="doc-noteref" id="rimando-23a" aria-label="Fonte 23">23</a></sup>.
    </p>
    <h3>La mostra e la raccolta dei ricordi</h3>
    <p>
        Dal <time datetime="2026-12-05">5</time> all'<time datetime="2026-12-08">8 dicembre 2026</time> la Biblioteca civica Abate E. Gerini ospita la
        mostra «La tradizione bandistica in Lunigiana». Intanto raccogliamo foto e ricordi delle bande di Fivizzano e delle frazioni. Se hai qualcosa da
        raccontare o da mostrarci, <a href="/contatti?motivo=storia#scrivici">scrivici</a>.
    </p>
</section>

<section>
    <h2>Da dove viene</h2>
    <h3>Libri di musica e di stampa</h3>
    <p>
        Fivizzano è anche una città del libro. Tra il 1471 e il 1474 Jacopo da Fivizzano vi stampa a caratteri mobili, tra i primi in Italia; nel
        <time datetime="1472">1472</time> esce l'opera di Virgilio<sup><a href="#fonte-24" role="doc-noteref" id="rimando-24a" aria-label="Fonte 24">24</a></sup>. Oggi il Museo della stampa «Jacopo da Fivizzano», in Palazzo Fantoni Bononi,
        ne custodisce la memoria<sup><a href="#fonte-25" role="doc-noteref" id="rimando-25a" aria-label="Fonte 25">25</a></sup>.
    </p>
    <p>
        La Biblioteca civica, nell'ex convento degli Agostiniani, conserva antichi libri di musica scritti su tetragramma, il rigo di quattro linee del
        canto gregoriano. Il più antico è un antifonario agostiniano miniato di 226 carte, di ambito fiorentino, tra il 1390 e il 1410. Viene dalla
        chiesa di San Giovanni Battista, e la prima iniziale raffigura proprio il Battista<sup><a href="#fonte-26" role="doc-noteref" id="rimando-26a" aria-label="Fonte 26">26</a></sup>. C'è anche un graduale stampato a Roma nel
        <time datetime="1614">1614</time><sup><a href="#fonte-27" role="doc-noteref" id="rimando-27a" aria-label="Fonte 27">27</a></sup>.
    </p>
    <p>
        Un altro antifonario, di 280 carte, fu donato alla chiesa dei Santi Jacopo e Antonio dal suo rettore, il fivizzanese Paolo Sarti, il
        <time datetime="1487-02-09">9 febbraio 1487</time><sup><a href="#fonte-28" role="doc-noteref" id="rimando-28a" aria-label="Fonte 28">28</a></sup>.
    </p>
    <h3>L'Accademia Filarmonica</h3>
    <p>
        Il <time datetime="1779-08-03">3 agosto 1779</time> il granduca autorizza a Fivizzano una «Società Filarmonica di Canto e Suono»<sup><a href="#fonte-29" role="doc-noteref" id="rimando-29a" aria-label="Fonte 29">29</a></sup>. Il
        <time datetime="1781-02-04">4 febbraio 1781</time> l'Accademia Filarmonica celebra «per la prima volta» la festa di santa Cecilia nella
        Propositura dei Santi Jacopo e Antonio<sup><a href="#fonte-30" role="doc-noteref" id="rimando-30a" aria-label="Fonte 30">30</a></sup>. Il resto è nella <a href="/articoli/storia/filarmonica">storia della Filarmonica</a>.
    </p>
    <figure>
        <enhanced:img src={propositura} alt="Facciata della chiesa dei Santi Jacopo e Antonio a Fivizzano" {sizes} loading="lazy" />
        <figcaption>La chiesa dei Santi Jacopo e Antonio, la «Propositura». Foto di Sailko, CC BY 3.0, <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_santi_jacopo_e_antonio,_esterno_01.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption>
    </figure>
    <h3>Quattro orchestre in piazza</h3>
    <p>
        Il <time datetime="1790-12-12">12 dicembre 1790</time>, per l'elezione imperiale di Leopoldo, in piazza si balla con «quattro orchestre, con
        soprabbondante numero di suonatori»<sup><a href="#fonte-31" role="doc-noteref" id="rimando-31a" aria-label="Fonte 31">31</a></sup>.
    </p>
    <p>
        Quello stesso anno il poeta Giovanni Fantoni, Labindo, scrive l'ode «Baccanale». In una nota spiega chi c'è dietro i nomi dei pastori: Angiolo
        Battaglia, «che possedeva un genio straordinario per la musica», e Odoardo Fantoni, che amavano «andare a suonare il flauto sopra certe balze
        della Valle del Rosaro»<sup><a href="#fonte-32" role="doc-noteref" id="rimando-32a" aria-label="Fonte 32">32</a></sup>.
    </p>
    <h3>Il Teatro degli Imperfetti</h3>
    <p>
        Nel <time datetime="1804">1804</time> un gruppo di famiglie fonda l'Accademia degli Imperfetti per costruire il teatro<sup><a href="#fonte-33" role="doc-noteref" id="rimando-33a" aria-label="Fonte 33">33</a></sup>. La prima recita è
        del luglio <time datetime="1810-07">1810</time>, con suonatori chiamati da Parma<sup><a href="#fonte-34" role="doc-noteref" id="rimando-34a" aria-label="Fonte 34">34</a></sup>.
    </p>
    <p>
        Il terremoto del <time datetime="1920">1920</time> danneggia gravemente il teatro. Negli anni Cinquanta l'edificio viene trasformato e ospita un
        cinema, chiuso nei primi anni Ottanta. Il <time datetime="2026-07-21">21 luglio 2026</time> il Comune ha deciso di acquistarlo, con l'obiettivo di
        «far rinascere l'antico Teatro degli Imperfetti» come spazio per la cultura, anche per concerti e associazioni musicali<sup><a href="#fonte-35" role="doc-noteref" id="rimando-35a" aria-label="Fonte 35">35</a></sup>.
    </p>
    <h3>La famiglia Stradella</h3>
    <p>
        Dalla famiglia Stradella di Fivizzano vengono il vescovo Alessio, sepolto nella chiesa di San Giovanni nel 1580<sup><a href="#fonte-36" role="doc-noteref" id="rimando-36a" aria-label="Fonte 36">36</a></sup>, e il compositore
        <a href="/articoli/storia/stradella">Alessandro Stradella</a>. Il <time datetime="1997-12-06">6 dicembre 1997</time> il Comune ha posto una
        lapide sulla loro casa, «auspice la Società Filarmonica»<sup><a href="#fonte-37" role="doc-noteref" id="rimando-37a" aria-label="Fonte 37">37</a></sup>. Quell'anno la Filarmonica ha preso il nome di Alessandro Stradella.
    </p>
    <figure>
        <enhanced:img src={sanGiovanni} alt="L'ex chiesa di San Giovanni a Fivizzano, oggi museo" {sizes} loading="lazy" />
        <figcaption>L'ex chiesa di San Giovanni, oggi Museo di San Giovanni. Foto di Sailko, CC BY 3.0, <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_museo_di_san_giovanni,_00,_ex-chiesa_di_san_giovanni.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption>
    </figure>
    <p>La storia luogo per luogo è in <a href="/articoli/storia/fivizzano">Fivizzano, i luoghi della musica</a>.</p>
</section>

<section>
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">Filarmonica Alessandro Stradella, <a href="/formazioni">Le nostre formazioni</a> e dati dell'ente nel piè di pagina di questo sito. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando 1a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando 1b">b</a></li>
        <li id="fonte-2"><!-- SEGNAPOSTO: fonte pubblicabile per la sede di via Radda -->[Fonte pubblicabile per la sede di via Radda da completare.] <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando 2">Torna al testo</a></li>
        <li id="fonte-3">Istituto comprensivo «Moratti-Bonomi» di Fivizzano, sito ufficiale, sezione <a href="https://www.icmoratti.edu.it/category/indirizzo-musicale/" target="_blank" rel="noopener noreferrer">Indirizzo musicale</a> (concerti di Natale 2022 e 2023); plessi: <a href="https://www.tuttitalia.it/toscana/36-fivizzano/86-scuole/" target="_blank" rel="noopener noreferrer">Tuttitalia, scuole di Fivizzano</a>. Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando 3a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando 3b">b</a></li>
        <li id="fonte-4">Testimonianza di Leonardo Orietti Del Duca, presidente della Filarmonica, 4 novembre 2026 (bande delle frazioni; strumenti della scuola). Torna al testo: <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando 4a">a</a>, <a role="doc-backlink" href="#rimando-4b" aria-label="Torna al rimando 4b">b</a>, <a role="doc-backlink" href="#rimando-4c" aria-label="Torna al rimando 4c">c</a>, <a role="doc-backlink" href="#rimando-4d" aria-label="Torna al rimando 4d">d</a>, <a role="doc-backlink" href="#rimando-4e" aria-label="Torna al rimando 4e">e</a>, <a role="doc-backlink" href="#rimando-4f" aria-label="Torna al rimando 4f">f</a></li>
        <li id="fonte-5">Lunigiana International Music Festival, <a href="https://www.lunigianamusicfestival.com/" target="_blank" rel="noopener noreferrer">sito ufficiale</a>. Torna al testo: <a role="doc-backlink" href="#rimando-5a" aria-label="Torna al rimando 5a">a</a>, <a role="doc-backlink" href="#rimando-5b" aria-label="Torna al rimando 5b">b</a></li>
        <li id="fonte-6">«VC Interview: Chantal Balestri, Lunigiana International Music Festival Artistic Director», <a href="https://theviolinchannel.com/vc-interview-chantal-balestri-lunigiana-international-music-festival-artistic-director/" target="_blank" rel="noopener noreferrer"><i>The Violin Channel</i></a>. <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando 6">Torna al testo</a></li>
        <li id="fonte-7">«Giovani talenti sotto i riflettori, apre l'International Music Festival», <i>La Nazione</i>, ed. Massa-Carrara, 18 luglio 2024: <a href="https://www.lanazione.it/massa-carrara/cronaca/giovani-talenti-sotto-i-riflettori-apre-linternational-music-festival-f93b29ba" target="_blank" rel="noopener noreferrer">lanazione.it</a>. <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando 7">Torna al testo</a></li>
        <li id="fonte-8">Prospetto delle società filodrammatiche e bande del 1839 (vedi la fonte 29); <i>Calendario lunese</i> per il 1835, pp. 253-254. <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando 8">Torna al testo</a></li>
        <li id="fonte-9"><i>Gazzetta di Firenze</i>, 1832, visita di Leopoldo II a Fivizzano. <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando 9">Torna al testo</a></li>
        <li id="fonte-10"><i>Istituti e società musicali in Italia. Statistica</i>, Roma, 1873, pp. 216-217. <a href="https://books.google.it/books?id=OtbfU1jeVN8C&amp;pg=PA216" target="_blank" rel="noopener noreferrer">Google Libri</a>. <a role="doc-backlink" href="#rimando-10a" aria-label="Torna al rimando 10">Torna al testo</a></li>
        <li id="fonte-11"><i>La Nazione</i>, 20 giugno 1878, corrispondenza da Fivizzano. Biblioteca Digitale Toscana. <a role="doc-backlink" href="#rimando-11a" aria-label="Torna al rimando 11">Torna al testo</a></li>
        <li id="fonte-12"><i>Il 9 gennaio 1878, ossia Il mondo civile ed in particolare l'Italia in morte di Vittorio Emanuele II</i>, vol. 2, pp. 37-38. <a href="https://books.google.it/books?id=78YRayT7KRgC&amp;pg=PA37" target="_blank" rel="noopener noreferrer">Google Libri</a>. <a role="doc-backlink" href="#rimando-12a" aria-label="Torna al rimando 12">Torna al testo</a></li>
        <li id="fonte-13"><i>Fanfulla</i>, Roma, 18 gennaio 1884, «Cronaca del pellegrinaggio». <a href="https://archive.org/details/fanfulla-1884-01-images" target="_blank" rel="noopener noreferrer">Internet Archive</a>. <a role="doc-backlink" href="#rimando-13a" aria-label="Torna al rimando 13">Torna al testo</a></li>
        <li id="fonte-14"><i>La Nazione</i>, 5 settembre 1887, dispaccio «Fivizzano, 3». Biblioteca Digitale Toscana. <a role="doc-backlink" href="#rimando-14a" aria-label="Torna al rimando 14">Torna al testo</a></li>
        <li id="fonte-15">Maurizio Bardi, «Cronaca di un secolo in Lunigiana», lunigiana.net: <a href="http://www.lunigiana.net/XXsecolo/centoanni/1909.htm" target="_blank" rel="noopener noreferrer">Il 1909</a>. Torna al testo: <a role="doc-backlink" href="#rimando-15a" aria-label="Torna al rimando 15a">a</a>, <a role="doc-backlink" href="#rimando-15b" aria-label="Torna al rimando 15b">b</a></li>
        <li id="fonte-16"><i>Bollettino della Società italiana degli autori ed editori</i>, 1930, pp. 329 e 374-375, «Elenco delle bande musicali abbonate fino al 31 dicembre 1929». Torna al testo: <a role="doc-backlink" href="#rimando-16a" aria-label="Torna al rimando 16a">a</a>, <a role="doc-backlink" href="#rimando-16b" aria-label="Torna al rimando 16b">b</a></li>
        <li id="fonte-17">Maurizio Bardi, «Cronaca di un secolo in Lunigiana», lunigiana.net: <a href="http://www.lunigiana.net/XXsecolo/centoanni/1963.htm" target="_blank" rel="noopener noreferrer">Il 1963</a> e <a href="http://www.lunigiana.net/XXsecolo/centoanni/1980.htm" target="_blank" rel="noopener noreferrer">Il 1980</a>. Torna al testo: <a role="doc-backlink" href="#rimando-17a" aria-label="Torna al rimando 17a">a</a>, <a role="doc-backlink" href="#rimando-17b" aria-label="Torna al rimando 17b">b</a></li>
        <li id="fonte-18">Comune di Fivizzano, Pro Loco, «Manifestazioni» dell'estate 2009 (copia del 28 luglio 2009): <a href="http://web.archive.org/web/20090728123930/http://www.comune.fivizzano.ms.it:80/siti/proloco/ita/manifestazioni.htm" target="_blank" rel="noopener noreferrer">Wayback Machine</a>. <a role="doc-backlink" href="#rimando-18a" aria-label="Torna al rimando 18">Torna al testo</a></li>
        <li id="fonte-19">Due fotografie «Moncigoli 8 dicembre 1963», pubblicate da Carlo Francini in un gruppo Facebook, 26 novembre 2023. <a role="doc-backlink" href="#rimando-19a" aria-label="Torna al rimando 19">Torna al testo</a></li>
        <li id="fonte-20">Rino Barbieri, <i>Il paese dai 18 campanili</i> (Agnino), da un articolo di Ezio Pandiani nella <i>Gazzetta di Parma</i>, 3 dicembre 1968. <a role="doc-backlink" href="#rimando-20a" aria-label="Torna al rimando 20">Torna al testo</a></li>
        <li id="fonte-21"><i>La Nazione</i>, ed. Massa-Carrara, 3 giugno 2023, «Al via ’Sapori di Fivizzano’». <a href="https://arquivo.pt/wayback/20230603192658/https://lanazione.it/massa-carrara/cronaca" target="_blank" rel="noopener noreferrer">Arquivo.pt</a>. <a role="doc-backlink" href="#rimando-21a" aria-label="Torna al rimando 21">Torna al testo</a></li>
        <li id="fonte-22">Maurizio Bardi, «Cronaca di un secolo in Lunigiana», lunigiana.net: <a href="http://www.lunigiana.net/XXsecolo/centoanni/1970.htm" target="_blank" rel="noopener noreferrer">Il 1970</a>. <a role="doc-backlink" href="#rimando-22a" aria-label="Torna al rimando 22">Torna al testo</a></li>
        <li id="fonte-23">Maurizio Bardi, «Cronaca di un secolo in Lunigiana», lunigiana.net: <a href="http://www.lunigiana.net/XXsecolo/centoanni/1987.htm" target="_blank" rel="noopener noreferrer">Il 1987</a>. <a role="doc-backlink" href="#rimando-23a" aria-label="Torna al rimando 23">Torna al testo</a></li>
        <li id="fonte-24">Serena Veneziani, «Jacopo da Fivizzano», <i>Dizionario Biografico degli Italiani</i>, vol. 62, Roma, 2004; Amedeo Benedetti, <i>Jacopo da Fivizzano</i>, Genova, 2014, p. 32. Sintesi in <a href="https://it.wikipedia.org/wiki/Jacopo_da_Fivizzano" target="_blank" rel="noopener noreferrer">Wikipedia</a>. <a role="doc-backlink" href="#rimando-24a" aria-label="Torna al rimando 24">Torna al testo</a></li>
        <li id="fonte-25">Musei di Massa-Carrara, <a href="https://www.museimassacarrara.it/museo-della-stampa-jacopo-da-fivizzano/" target="_blank" rel="noopener noreferrer">Museo della stampa «Jacopo da Fivizzano»</a>. <a role="doc-backlink" href="#rimando-25a" aria-label="Torna al rimando 25">Torna al testo</a></li>
        <li id="fonte-26">Catalogo generale dei beni culturali (ICCD), <a href="https://sigecweb.beniculturali.it/sigec/item/print/ICCD2582652" target="_blank" rel="noopener noreferrer">scheda ICCD2582652</a>, antifonario, Biblioteca civica di Fivizzano. Bibliografia: F. M. Pizzi, in <i>Memorie di un convento. Opere d'arte dal convento agostiniano alla biblioteca comunale</i>, catalogo della mostra, Fivizzano, 1996, p. 53. <a role="doc-backlink" href="#rimando-26a" aria-label="Torna al rimando 26">Torna al testo</a></li>
        <li id="fonte-27">Catalogo generale dei beni culturali (ICCD), <a href="https://sigecweb.beniculturali.it/sigec/item/print/ICCD2582323" target="_blank" rel="noopener noreferrer">scheda ICCD2582323</a>, graduale, Biblioteca civica di Fivizzano. <a role="doc-backlink" href="#rimando-27a" aria-label="Torna al rimando 27">Torna al testo</a></li>
        <li id="fonte-28">Catalogo generale dei beni culturali (ICCD), <a href="https://sigecweb.beniculturali.it/sigec/item/print/ICCD2582281" target="_blank" rel="noopener noreferrer">scheda ICCD2582281</a>, antifonario del 1487 con l'iscrizione di dono del rettore Paolo Sarti. <a role="doc-backlink" href="#rimando-28a" aria-label="Torna al rimando 28">Torna al testo</a></li>
        <li id="fonte-29">Prospetto delle società filodrammatiche e bande del 1839, Archivio di Stato di Massa, sezione di Pontremoli, <i>Affari diversi di Governo</i>, 1839, vol. 61, n. 111; citato da Mauro Angella, «La nascita della Banda musicale pontremolese», <i>Archivio storico per le province parmensi</i>, IV serie, LXII (2010), pp. 41-53. <a role="doc-backlink" href="#rimando-29a" aria-label="Torna al rimando 29">Torna al testo</a></li>
        <li id="fonte-30"><i>Gazzetta Toscana</i>, 1781, p. 39, «Fivizzano 6. Febbrajo». <a href="https://babel.hathitrust.org/cgi/pt?id=nyp.33433081589602&amp;seq=277" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-30a" aria-label="Torna al rimando 30">Torna al testo</a></li>
        <li id="fonte-31"><i>Gazzetta Toscana</i>, 1791, feste del 10-12 dicembre 1790. <a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536919&amp;seq=21" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-31a" aria-label="Torna al rimando 31">Torna al testo</a></li>
        <li id="fonte-32">Giovanni Fantoni (Labindo), <i>Poesie</i>, [Firenze], 1823, libro I, ode XXIII «Baccanale», pp. 57-58, e nota a p. 308. <a href="https://babel.hathitrust.org/cgi/pt?id=chi.097946158&amp;seq=320" target="_blank" rel="noopener noreferrer">HathiTrust</a>. <a role="doc-backlink" href="#rimando-32a" aria-label="Torna al rimando 32">Torna al testo</a></li>
        <li id="fonte-33">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano</i>, p. 13 (atto del notaio Antonio Falchi, 10 luglio 1804). <a role="doc-backlink" href="#rimando-33a" aria-label="Torna al rimando 33">Torna al testo</a></li>
        <li id="fonte-34">Lettere di Saverio Salvioni (4 luglio 1810) e Andrea Ferroni (3 agosto 1810) a Odoardo Fantoni, Archivio di Stato di Massa, Archivio Fantoni; trascrizioni di Rino Barbieri, <i>Labindo e la Società Civile Settecentesca</i>. <a role="doc-backlink" href="#rimando-34a" aria-label="Torna al rimando 34">Torna al testo</a></li>
        <li id="fonte-35">«’Imperfetti’ alla ribalta. Il Comune lo compra: “Qui un polo culturale”», <i>La Nazione</i>, ed. Massa-Carrara, 25 luglio 2026: <a href="https://www.lanazione.it/massa-carrara/cronaca/imperfetti-alla-ribalta-il-comune-c607f25b" target="_blank" rel="noopener noreferrer">lanazione.it</a>. <a role="doc-backlink" href="#rimando-35a" aria-label="Torna al rimando 35">Torna al testo</a></li>
        <li id="fonte-36">Emanuele Gerini, <i>Memorie storiche d'illustri scrittori e di uomini insigni dell'antica e moderna Lunigiana</i>, II, Massa, 1829, pp. 136-138. <a href="https://books.google.it/books?id=a0gssshrWAsC&amp;pg=PA137" target="_blank" rel="noopener noreferrer">Google Libri</a>. <a role="doc-backlink" href="#rimando-36a" aria-label="Torna al rimando 36">Torna al testo</a></li>
        <li id="fonte-37">Lapide sulla casa degli Stradella, Fivizzano, 6 dicembre 1997: «L'Amministrazione comunale / auspice / la Società Filarmonica». <a role="doc-backlink" href="#rimando-37a" aria-label="Torna al rimando 37">Torna al testo</a></li>
    </ol>
    <p>
        Immagine di copertina: piazza Medicea e la fontana di Cosimo III de' Medici. Foto di Sailko, CC BY 3.0,
        <a href="https://commons.wikimedia.org/wiki/File:Fivizzano,_piazza_medicea,_Fontana_di_Cosimo_III_de%27_Medici_01.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.
    </p>
</section>

<p class="rimando"><a href="/articoli">Articoli</a></p>
