<script lang="ts">
    // Foto della pagina, in più misure: il browser sceglie quella adatta alla colonna di testo (40rem) e allo schermo.
    import anni30Img from "$lib/assets/imgs/anni_30.jpeg?enhanced&w=400;640;800;1280;1600";
    // Anteprima sfocata della copertina, visibile subito mentre la foto si carica
    import anni30Placeholder from "$lib/assets/imgs/anni_30.jpeg?w=24&blur=2&format=webp&inline";
    
    import anni90CorteoImg from "$lib/assets/imgs/anni_90_corteo.jpeg?enhanced&w=400;640;800;1280;1600";
    import oggiImg from "$lib/assets/imgs/oggi.jpg?enhanced&w=400;640;800;1280;1600";
    import diplomaImg from "$lib/assets/imgs/diploma_dissonanti.jpg?enhanced&w=400;640;800;1280;1600";

    const sizes = "(min-width: 40rem) 40rem, 100vw";
</script>

<svelte:head>
    <title>La storia — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="La storia della Filarmonica Alessandro Stradella di Fivizzano, dall'Accademia dei Filarmonici Dissonanti del Settecento a oggi, raccontata con i documenti." />
</svelte:head>

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
        <li><a href="#accademia">L'Accademia dei Filarmonici Dissonanti</a></li>
        <li><a href="#banda">Dalla Rivoluzione alla banda</a></li>
        <li><a href="#maestri">La Società Filarmonica e i suoi maestri</a></li>
        <li><a href="#novecento">Il Novecento</a></li>
        <li><a href="#nome">Il nome di Stradella</a></li>
        <li><a href="#oggi">Oggi</a></li>
    </ol>
</nav>

<p>
    La Filarmonica di Fivizzano nacque nel Settecento come accademia di nobili, religiosi e musicisti. Nell'Ottocento ebbe un'orchestra, una banda e
    maestri di professione, e nel 1872 lo Stato la contava tra le quattro accademie filarmoniche italiane più antiche ancora attive, con Santa Cecilia di
    Roma, la Filarmonica di Bologna e l'Accademia di Alba<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Quello che segue viene dai documenti ritrovati finora.
</p>

<section id="accademia">
    <h2>L'Accademia dei Filarmonici Dissonanti</h2>
    <p>
        La tradizione di Fivizzano fa nascere la Filarmonica nel <time datetime="1777">1777</time>. Il primo documento è del
        <time datetime="1779-08-03">3 agosto 1779</time>: quel giorno l'Auditore fiscale di Firenze comunicò il «Permesso Sovrano» del granduca
        <a href="https://it.wikipedia.org/wiki/Pietro_Leopoldo_d'Asburgo-Lorena" target="_blank" rel="noopener noreferrer">Pietro Leopoldo</a> alla società
        di musica del paese<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>.
    </p>
    <p>
        Si chiamava Accademia dei Filarmonici Dissonanti<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. La fondò il conte Odoardo Fantoni<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>, flautista, fratello del poeta Giovanni
        Fantoni, Labindo, che in un'ode lo descrive mentre suona nella valle del Rosaro con Angiolo Battaglia, musicista dal «genio straordinario»<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>.
        A capo dell'accademia c'era un «Principe»: nel 1789 lo era il marchese Carlo Emanuele Malaspina di Fosdinovo, e Giosuè Carducci scrisse che «democraticamente il marchese era principe dell'Accademia filarmonica dei Dissonanti in Fivizzano»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>. Gli accademici avevano una sala
        tutta loro, dove dopo le feste si cenava e si ballava<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>.
    </p>
    <p>
        Il diploma dei soci, disegnato dal pittore fivizzanese Ercole Lemmi, spiega il nome con due motti: «La soave armonia figlia del cielo» e «Le
        dissonanze in un accordo solo»<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>. Un esemplare è arrivato fino alla Newberry Library di Chicago.
    </p>
    <figure>
        <enhanced:img
            src={diplomaImg}
            alt="Diploma inciso dell'Accademia de' Filarmonici Dissonanti: in alto il motto «La soave armonia figlia del cielo» e un genio alato con la lira tra strumenti a fiato e rami d'alloro; al centro il testo dell'elezione ad Accademico, con il nome lasciato in bianco; in basso un liuto e un violino su un cartiglio di musica, una veduta di Fivizzano cinta dalle mura e il motto «Le dissonanze in un accordo solo»"
            {sizes}
            loading="lazy"
        />
        <figcaption>Il diploma dei soci, disegnato da Ercole Lemmi e inciso da Giuseppe Poggiali, anni Ottanta del Settecento.</figcaption>
    </figure>
    <p>
        La patrona era santa Cecilia. La prima festa si tenne il <time datetime="1781-02-04">4 febbraio 1781</time> nella chiesa prepositurale, e la Gazzetta
        Toscana lodò «la maestria dei Professori, e l'abilità dei dilettanti»<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>. Da allora la Gazzetta segue gli accademici per quindici anni: la
        musica per le esequie dell'imperatrice Maria Teresa<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8b" aria-label="Fonte 8">8</a></sup>, il Te Deum per Pietro Leopoldo in visita al paese nel
        <time datetime="1786-07-15">1786</time><sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>, le «superbe Sinfonie» delle sere di festa<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>, la messa di Giuseppe Sarti del
        <time datetime="1789-05-03">3 maggio 1789</time>, per la quale stamparono un <a href="/about/sonnet">sonetto</a> ritrovato oggi nella villa dei Fantoni
        a Noletta<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>. I maestri di cappella furono il sacerdote Antonio Lamberti, «della Scuola Napoletana»<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>, e poi Battaglia, organista e
        compositore<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6b" aria-label="Fonte 6">6</a></sup>.
    </p>
    <p>
        La festa di cui sappiamo di più è quella del <time datetime="1790-12">dicembre 1790</time>, per l'elezione di Leopoldo a imperatore: tre giorni di messe con
        musicisti fatti venire da fuori, una cantata su versi di Odoardo Fantoni e, in piazza, «quattro Orchestre con soprabbondante numero di Suonatori» e
        un globo aerostatico lanciato in cielo<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>.
    </p>
</section>

<section id="banda">
    <h2>Dalla Rivoluzione alla banda</h2>
    <p>
        Nel <time datetime="1799">1799</time>, sotto i Francesi, per piantare l'albero della libertà, il Comune affidò «le
        zinfonie e canti» ad Antonio Cortesi e Carlo Contigli, con «tutti gli strumenti sì da fiato che da corda» e i cantori che si potevano
        trovare<sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>. Tre anni dopo, nella processione del Venerdì santo, una banda suonò dal terrazzo di casa
        Grilli<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>. Per aprire il nuovo teatro del paese, nel <time datetime="1810">1810</time>, Odoardo Fantoni chiamò da Parma l'orchestra<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7b" aria-label="Fonte 7">7</a></sup>.
    </p>
    <p>
        Il Comune istituì nel <time datetime="1829">1829</time> un maestro di cappella pagato per insegnare musica ai giovani<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup>. Il
        <time datetime="1831-08-24">24 agosto 1831</time> un rescritto del granduca eresse la società «in Banda Musicale» e diede ai suonatori un'uniforme
        per comparire «in pubblica forma»<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2b" aria-label="Fonte 2">2</a></sup>. L'anno dopo, per la visita di Leopoldo II, la banda «alternò fino a notte avanzata i suoi concerti»
        in piazza<sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup>.
    </p>
</section>

<section id="maestri">
    <h2>La Società Filarmonica e i suoi maestri</h2>
    <p>
        Nella seconda metà dell'Ottocento la Società Filarmonica chiamò maestri di professione. Il primo che conosciamo è il pratese Livio Nesti, figlio di
        sarti, che nel <time datetime="1854">1854</time> dirigeva l'orchestra del teatro di Grosseto ed era a Fivizzano già intorno al 1860<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>. Nel <time datetime="1867">1867</time>, invece, il maestro era Cesare Rossi, che l'anno dopo scriveva un'opera comica, <i>Per amore e non per
        forza</i><sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup><sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>.
    </p>
    <p>
        Nel <time datetime="1871">1871-72</time> il capo era di nuovo Nesti: la Società contava 47 soci esecutori e 25 onorari, la sua banda 25
        elementi<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1c" aria-label="Fonte 1">1</a></sup>. Sette anni dopo aveva due sezioni, Orchestra e Banda, e un presidente, l'avvocato Alberto Ginesi; il 7 febbraio
        celebrò le esequie di Vittorio Emanuele II nella chiesa di San Giovanni, e un'epigrafe all'ingresso ricordava «l'armonia della Società Filarmonica di
        Fivizzano»<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>.
    </p>
    <p>
        Livio Nesti morì a Fivizzano nel <time datetime="1881">1881</time>. Il figlio Enea, nato a Prato nel 1844, fu maestro di musica in paese per circa
        vent'anni e sposò Edoardina Ginesi, la figlia del presidente<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18b" aria-label="Fonte 18">18</a></sup>.
    </p>
    <p>
        Intanto, nel <time datetime="1880">1880</time>, era nata in paese una seconda società musicale, la «8 febbraio 1880». Nel gennaio
        <time datetime="1884-01">1884</time> le «due società musicali, Filarmonica e Otto febbraio» sfilarono a Roma, al Pantheon, e il giornale notò che
        Fivizzano era l'unico comune della provincia ad aver portato «ben quattro stendardi»<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>. Nel <time datetime="1887-05">1887</time> la
        Filarmonica mandò due rappresentanti a Firenze per la traslazione delle spoglie di Rossini in Santa Croce<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>.
    </p>
</section>

<section id="novecento">
    <h2>Il Novecento</h2>
    <p>
        All'inizio del secolo lo scrittore Mario Puccini ambientò a Fivizzano una novella: la storia di un giovane maestro arrivato in paese «per dirigere la banda»<sup><a href="#fonte-23" role="doc-noteref" id="rimando-23a" aria-label="Fonte 23">23</a></sup>. Nelle fotografie del <time datetime="1921-11-04">4 novembre 1921</time>, per il Milite
        Ignoto, si vede lo stendardo di una «Società Musicale» di Fivizzano<sup><a href="#fonte-24" role="doc-noteref" id="rimando-24a" aria-label="Fonte 24">24</a></sup>. Secondo la tradizione le due società si unirono intorno agli anni
        Venti<sup><a href="#fonte-25" role="doc-noteref" id="rimando-25a" aria-label="Fonte 25">25</a></sup>; alla fine del <time datetime="1929">1929</time> la banda di Fivizzano risulta in attività<sup><a href="#fonte-26" role="doc-noteref" id="rimando-26a" aria-label="Fonte 26">26</a></sup>. Negli anni Trenta la
        Filarmonica era anche società di mutuo soccorso e dall'<time datetime="1934-11-11">11 novembre 1934</time> passò all'Opera Nazionale
        Dopolavoro<sup><a href="#fonte-27" role="doc-noteref" id="rimando-27a" aria-label="Fonte 27">27</a></sup>.
    </p>
    <p>
        Nel <time datetime="1970">1970</time> Fivizzano ospitò il convegno provinciale delle bande, l'<time datetime="1970-01-11">11 gennaio</time>, e il <time datetime="1970-07-19">19 luglio</time> il primo Concorso bandistico «Città di Fivizzano». Il
        <time datetime="1987-06-27">27 giugno 1987</time> cominciarono i festeggiamenti per i 210 anni<sup><a href="#fonte-27" role="doc-noteref" id="rimando-27b" aria-label="Fonte 27">27</a></sup>.
    </p>
</section>

<section id="nome">
    <h2>Il nome di Stradella</h2>
    <p>
        La famiglia Stradella venne a Fivizzano da Borgo Val di Taro nel Quattrocento: il medico Matteo Stradella fu tra i riformatori degli statuti del
        paese, approvati a Firenze nel <time datetime="1480">1480</time><sup><a href="#fonte-28" role="doc-noteref" id="rimando-28a" aria-label="Fonte 28">28</a></sup>. Da un ramo partito da qui discende il compositore
        <a href="/about/stradella">Alessandro Stradella</a>, nato a Bologna nel 1643<sup><a href="#fonte-29" role="doc-noteref" id="rimando-29a" aria-label="Fonte 29">29</a></sup>.
    </p>
    <p>
        Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica organizzò con il Comune il convegno «Alessandro Stradella e la Musica
        Barocca. Le origini ritrovate», e lo stesso giorno, «auspice la Società Filarmonica», fu posta una lapide sulla casa degli Stradella, vicino alle
        mura<sup><a href="#fonte-30" role="doc-noteref" id="rimando-30a" aria-label="Fonte 30">30</a></sup>. Alla fine degli anni Novanta la Filarmonica prese il nome del compositore.
    </p>
    
    <figure>
        <!-- SEGNAPOSTO: luogo, occasione e anno da verificare. -->
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
        La Filarmonica Alessandro Stradella è un'associazione di promozione sociale con più di cinquanta soci e quattro formazioni: l'orchestra di fiati
        <a href="/about/ensembles/stradella-facendo">Stradella Facendo</a>, la <a href="/about/ensembles/streetella-band">Streetella Band</a>,
        l'<a href="/about/ensembles/infieri">Orchestra Infieri</a> e il gruppo di musica antica dei
        <a href="/about/ensembles/filarmonici-dissonanti">Filarmonici Dissonanti</a>, che porta il nome degli accademici del Settecento. Nel
        <time datetime="2027">2027</time> la Filarmonica compie 250 anni.
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
        <li id="fonte-1"><i>Istituti e società musicali in Italia. Statistica</i>, Roma, Direzione di statistica, 1873, pp. 216-217 (dati del 1871-72). Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando b">b</a>, <a role="doc-backlink" href="#rimando-1c" aria-label="Torna al rimando c">c</a></li>
        <li id="fonte-2">Prospetto delle società filodrammatiche e bande, 1839: Archivio di Stato di Massa, sezione di Pontremoli, <i>Affari diversi di Governo</i>, 1839, vol. 61, n. 111, citato in Marco Angella, <i>Musica e teatro a Pontremoli nel secondo periodo lorenese</i>, 2012. Torna al testo: <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-2b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-3">Lettere di Azzolino Malaspina (1780) e di Carlo Malaspina d'Olivola (1782) a Odoardo Fantoni e di Anna Fantoni (1802), Archivio Fantoni, Archivio di Stato di Massa, trascritte in Rino Barbieri, <i>Labindo e la Società Civile Settecentesca</i>. Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-4">Giovanni Fantoni, <i>Poesie</i>, 1823, ode XXIII, <i>Baccanale</i>, nota, p. 308. <a role="doc-backlink" href="#rimando-4a">Torna al testo</a></li>
        <li id="fonte-5">Giosuè Carducci, <i>Il Parini principiante</i>, 1886, p. 17. <a role="doc-backlink" href="#rimando-5a">Torna al testo</a></li>
        <li id="fonte-6"><i>Gazzetta Toscana</i>, 1788, «Fivizzano 19 gennaio», e 1791, «Fivizzano 31 luglio». Torna al testo: <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-6b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-7">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano. Note per una rinascita</i>, pp. 9, 13, 63-64. Torna al testo: <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-7b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-8"><i>Gazzetta Toscana</i>, 1781, «Fivizzano 6 febbraio», e supplemento, «Fivizzano 31 marzo». Torna al testo: <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-8b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-9"><i>Gazzetta Toscana</i>, 1786, «Fivizzano 18 luglio». <a role="doc-backlink" href="#rimando-9a">Torna al testo</a></li>
        <li id="fonte-10"><i>Gazzetta Toscana</i>, 1787, «Fivizzano 5 maggio». <a role="doc-backlink" href="#rimando-10a">Torna al testo</a></li>
        <li id="fonte-11"><i>Gazzetta Toscana</i>, 1789, «Fivizzano 3 maggio»; sonetto a stampa <i>In occasione della solenne festività di Santa Cecilia</i>, Massa, Stefano Frediani, 1789. <a role="doc-backlink" href="#rimando-11a">Torna al testo</a></li>
        <li id="fonte-12"><i>Cronaca di Fivizzano dal 1799 al 1833</i> e <i>Contributo alla vita di Giovanni Fantoni</i>. <a role="doc-backlink" href="#rimando-12a">Torna al testo</a></li>
        <li id="fonte-13"><i>Supplemento alla Gazzetta Toscana</i>, n. 2, 8 gennaio 1791, «Fivizzano 13 dicembre». <a role="doc-backlink" href="#rimando-13a">Torna al testo</a></li>
        <li id="fonte-14">S. Andreani, <i>I Francesi a Fivizzano</i>, Fivizzano, 1911 (deliberazione del Magistrato comunitativo, 24 maggio 1799). <a role="doc-backlink" href="#rimando-14a">Torna al testo</a></li>
        <li id="fonte-15"><i>Bollettino ufficiale del Ministero dell'istruzione pubblica</i>, 1893, p. 1620. <a role="doc-backlink" href="#rimando-15a">Torna al testo</a></li>
        <li id="fonte-16"><i>Gazzetta di Firenze</i>, 11 ottobre 1832, «Fivizzano 27 settembre». <a role="doc-backlink" href="#rimando-16a">Torna al testo</a></li>
        <li id="fonte-17">Atto di nascita di Enea Nesti, Prato, 1° ottobre 1844; <i>Il buon gusto</i>, Firenze, 1854, p. 143 (teatro di Grosseto); G. Meyerbeer, <i>Gli Ugonotti</i>, edizione economica fiorentina, c. 1860, elenco degli associati. <a role="doc-backlink" href="#rimando-17a">Torna al testo</a></li>
        <li id="fonte-18">Atti dello stato civile di Fivizzano, 1867-1893 (Archivio di Stato di Massa). Torna al testo: <a role="doc-backlink" href="#rimando-18a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-18b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-19"><i>Signale für die musikalische Welt</i>, Lipsia, 1868, p. 875; <i>Le Guide musical</i>, Bruxelles, 1868. <a role="doc-backlink" href="#rimando-19a">Torna al testo</a></li>
        <li id="fonte-20"><i>In memoria del lutto, onde furono colpiti per la morte del Re Galantuomo i cittadini fivizzanesi</i>, Firenze, Carnesecchi, 1878. <a role="doc-backlink" href="#rimando-20a">Torna al testo</a></li>
        <li id="fonte-21">Alessandro Ercolini, <i>Brevi cenni intorno all'origine della società musicale 8 febbraio 1880</i>, Sarzana, Ravani; <i>Fanfulla</i>, Roma, 18 gennaio 1884. <a role="doc-backlink" href="#rimando-21a">Torna al testo</a></li>
        <li id="fonte-22"><i>Gazzetta musicale di Milano</i>, 1887, supplemento straordinario al n. 23. <a role="doc-backlink" href="#rimando-22a">Torna al testo</a></li>
        <li id="fonte-23"><i>Il Marzocco</i>, 1913, recensione di Mario Puccini, <i>Viottola</i>, Ancona, Puccini. <a role="doc-backlink" href="#rimando-23a">Torna al testo</a></li>
        <li id="fonte-24">Museo centrale del Risorgimento, Roma, album <i>Onoranze al Milite Ignoto</i>, MCRR 1000, foto di Fivizzano. <a role="doc-backlink" href="#rimando-24a">Torna al testo</a></li>
        <li id="fonte-25">bandamusicale.it, scheda di Fivizzano (copie del 2003 e del 2004 nella Wayback Machine). <a role="doc-backlink" href="#rimando-25a">Torna al testo</a></li>
        <li id="fonte-26"><i>Bollettino della Società italiana degli autori ed editori</i>, 1930, pp. 329, 374-375 (bande abbonate fino al 31 dicembre 1929). <a role="doc-backlink" href="#rimando-26a">Torna al testo</a></li>
        <li id="fonte-27"><i>Annuario toscano</i>, anni Trenta, voce Fivizzano; lunigiana.net, <i>Cento anni di Lunigiana</i>, anni 1934, 1970, 1987. Torna al testo: <a role="doc-backlink" href="#rimando-27a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-27b" aria-label="Torna al rimando b">b</a></li>
        <li id="fonte-28">Carolyn Gianturco, <i>Alessandro Stradella, 1639-1682: his life and music</i>, Oxford, Clarendon Press, 1994, pp. 3-7. <a role="doc-backlink" href="#rimando-28a">Torna al testo</a></li>
        <li id="fonte-29">Davide Mingozzi, «Alessandro Stradella “Bononiensis Dominus”», <i>Il Saggiatore musicale</i>, XXV (2018), pp. 299-307. <a role="doc-backlink" href="#rimando-29a">Torna al testo</a></li>
        <li id="fonte-30">Locandina del convegno, Fivizzano, 6 dicembre 1997; iscrizione della lapide sulla casa degli Stradella. <a role="doc-backlink" href="#rimando-30a">Torna al testo</a></li>
    </ol>
    <p>
        Diploma dell'Accademia: Newberry Library, Chicago, Wing broadside ZP 735 .L45,
        <a href="https://collections.newberry.org/asset-management/2KXJ8Z9X0DEI" target="_blank" rel="noopener noreferrer">scheda della collezione</a>.
        Pubblico dominio.
    </p>
    <p>
        Per approfondire: Duino Ceschi, <i>Giovanni Fantoni e l'Accademia di Belle Arti di Carrara […] e le Accademie Letteraria Lunense e dei
        Filarmonici Dissonanti di Fivizzano</i>, in <i>Atti e Memorie dell'Accademia Aruntica di Carrara</i>, vol. I, 1995, pp. 35-67.
    </p>
</section>
