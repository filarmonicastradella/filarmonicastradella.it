<script lang="ts">
    import { findArticle } from "$lib/articles";
    import ArticleHeader from "../../ArticleHeader.svelte";
    import ArticleFooter from "../../ArticleFooter.svelte";
    // Foto della pagina, in più misure: il browser sceglie quella adatta alla colonna di testo (36rem) e allo schermo.
    import anni30Img from "$lib/assets/imgs/anni_30.jpeg?enhanced&w=400;640;800;1280;1600&quality=40";
    // Anteprima sfocata della copertina, visibile subito mentre la foto si carica
    import anni30Placeholder from "$lib/assets/imgs/anni_30.jpeg?w=24&blur=2&format=webp&inline";
    
    import anni80Img from "$lib/assets/imgs/anni_80.jpeg?enhanced&w=400;640;800;1280;1600&quality=40";
    // SOSPESA finché non ci sono i consensi alle immagini di chi suona oggi (modulo dei consensi):
    // import oggiImg from "$lib/assets/imgs/oggi.jpg?enhanced&w=400;640;800;1280;1600";
    import diplomaImg from "$lib/assets/imgs/diploma_dissonanti.jpg?enhanced&w=400;640;800;1280;1600&quality=40";
    import militeIgnotoImg from "$lib/assets/imgs/milite-ignoto-1921.jpg?enhanced&w=400;640;800;1280;1600&quality=40";

    const sizes = "(min-width: 36rem) 36rem, 100vw";

    const article = findArticle("storia", "filarmonica")!;
</script>

<svelte:head>
    <title>Storia della Filarmonica — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="La storia della Filarmonica Alessandro Stradella di Fivizzano, dall'Accademia dei Filarmonici Dissonanti del Settecento a oggi, raccontata con i documenti." />
</svelte:head>

<ArticleHeader {article} style="--cover-placeholder: url({anni30Placeholder}); --cover-position: top">
    <p>
        La Filarmonica di Fivizzano nacque nel Settecento come accademia di musica. Nell'Ottocento ebbe un'orchestra, una banda e maestri di professione, e nel <time datetime="1872">1872</time> la statistica del Regno la contava tra le quattro accademie filarmoniche italiane nate prima del <time datetime="1800">1800</time> e ancora attive, con quelle di Roma, Bologna e Alba<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>. Questa è la sua storia, raccontata con i documenti.
    </p>
    <enhanced:img
        src={anni30Img}
        alt="I musicisti della Filarmonica negli anni Trenta, in posa con i loro strumenti"
        sizes="100vw"
        fetchpriority="high"
        itemprop="image"
    />
</ArticleHeader>

<nav aria-label="Indice della pagina">
    <ol>
        <li><a href="#prima">Prima dell'Accademia</a></li>
        <li><a href="#accademia">L'Accademia dei Filarmonici Dissonanti</a></li>
        <li><a href="#imperfetti">Il teatro degli Imperfetti</a></li>
        <li><a href="#banda">Dalla Rivoluzione alla banda</a></li>
        <li><a href="#maestri">La Società Filarmonica e i suoi maestri</a></li>
        <li><a href="#societa">Due società musicali</a></li>
        <li><a href="#novecento">Il Novecento</a></li>
        <li><a href="#nome">Il nome di Stradella</a></li>
        <li><a href="#oggi">Oggi</a></li>
    </ol>
</nav>

<section id="prima">
    <h2>Prima dell'Accademia</h2>
    <section>
        <h3>Musica e teatro nel paese</h3>
        <p>
            A Fivizzano si faceva musica da molto tempo. Nel <time datetime="1604">1604</time> il compositore Giacomo Moro dedicò i suoi <i>Concerti ecclesiastici</i> ad Ambrogio Magnanino, rettore della chiesa del paese: mottetti, una messa e «canzoni a quattro per suonare con diversi stromenti»<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>.
        </p>
        <p>
            Un notaio del paese, Nicola Battini, tenne per sessantasei anni un libro di ricordi. Vi annotò le commedie recitate a carnevale dai giovani delle famiglie fivizzanesi: nel <time datetime="1699">1699</time> <i>Il contrasto d'amore e d'onore</i>, nel <time datetime="1702">1702</time> <i>L'Armanda</i>, con «sonetti» fatti stampare. Nel <time datetime="1734">1734</time> «si cantò il Maggio», che fu «troppo bello». Nel carnevale del <time datetime="1746">1746</time> le signore di Fivizzano recitarono il <i>Demetrio</i> di Metastasio<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>.
        </p>
        <p>
            Nel paese c'era anche un'accademia letteraria, gli Imperfetti: nell'archivio dei conti Fantoni un fascicolo porta il titolo «Accademia degli Imperfetti 1739 agosto 15»<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. Gli Imperfetti sono un'altra società, che ritroveremo legata al teatro.
        </p>
        <p>
            Nel <time datetime="1768">1768</time>, per la nascita di un principe, in chiesa si cantò il Te Deum. Nel <time datetime="1775-02">febbraio 1775</time> la <i>Gazzetta Toscana</i> annunciava che «fra pochi giorni si aprirà questo pubblico Teatro», con due opere, la <i>Semiramide</i> e <i>La donna sola</i><sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>.
        </p>
    </section>
    <section>
        <h3>I fratelli Fantoni</h3>
        <p>
            Odoardo Fantoni, il futuro fondatore della Filarmonica, suonava il flauto già da ragazzo. Nel <time datetime="1774">1774</time> un amico ricordava un'accademia a Livorno con Odoardo e una «armonia di flauti, dolci e traversi, di violini, di cembali». Nel <time datetime="1776">1776</time> un parente scriveva da Livorno: «dite ad Odoardino che sfoderi le sue sonate tanto celebri»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>.
        </p>
    </section>
</section>

<section id="accademia">
    <h2>L'Accademia dei Filarmonici Dissonanti</h2>
    <section>
        <h3>La nascita</h3>
        <p>
            La tradizione di Fivizzano fa nascere la Filarmonica nel <time datetime="1777">1777</time>. Il primo documento è del <time datetime="1779-08-03">3 agosto 1779</time>: quel giorno l'Auditore fiscale di Firenze comunicò il «Permesso Sovrano» del granduca <a href="https://it.wikipedia.org/wiki/Pietro_Leopoldo_d'Asburgo-Lorena" target="_blank" rel="noopener noreferrer">Pietro Leopoldo</a> alla società di musica del paese<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>. La statistica del <time datetime="1873">1873</time> dà infatti come anno di fondazione il <time datetime="1779">1779</time> e come fondatore il conte Odoardo Fantoni, fratello del poeta Giovanni Fantoni, Labindo<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7b" aria-label="Fonte 7">7</a></sup>. Nei giornali di quegli anni la società non compare prima del <time datetime="1781">1781</time><sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>.
        </p>
        <p>
            Si chiamava Accademia dei Filarmonici Dissonanti. Il nome si legge già in una lettera del <time datetime="1780-05-31">31 maggio 1780</time>: il marchese Azzolino Malaspina di Fosdinovo ringraziava Odoardo per essere stato ammesso nel «rispettabile Ceto dei Dissonanti». Nel <time datetime="1782">1782</time> Carlo Malaspina d'Olivola ricevette la «patente di aggregazione» all'«Accademia dei Filarmonici Dissonanti»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5b" aria-label="Fonte 5">5</a></sup>.
        </p>
    </section>
    <section>
        <h3>Come era fatta</h3>
        <p>
            A capo dell'accademia c'era un «Principe». Il diploma del <time datetime="1787-12-16">16 dicembre 1787</time>, con cui il conte Francesco Fantoni divenne accademico ordinario, porta la firma di Antonio Cortesi, Principe, e del segretario Antonio Pacetti<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>. Nel <time datetime="1789">1789</time> «Capo dell'Accademia» era il marchese Carlo Emanuele Malaspina di Fosdinovo<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>. Giosuè Carducci scrisse che «democraticamente il marchese era principe dell'Accademia filarmonica dei Dissonanti in Fivizzano»<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>.
        </p>
        <p>
            Il diploma fu disegnato dal pittore Ercole Lemmi e inciso da Giuseppe Poggiali. In alto porta il motto «La soave armonia figlia del cielo», in basso «Le dissonanze in un accordo solo». Sul cartiglio c'è anche un breve pentagramma. Un modulo in bianco si conserva alla Newberry Library di Chicago<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>.
        </p>
        <p>
            Ne facevano parte suonatori di professione e dilettanti. Nel <time datetime="1782">1782</time> un frate, don Giuseppe Cortesi, è detto «Accademico Filarmonico di Fivizzano»<sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>. Gli accademici avevano una sala loro, dove dopo le feste si cenava e si ballava<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>.
        </p>
    </section>
    <section>
        <h3>Santa Cecilia e le feste</h3>
        <p>
            La patrona era santa Cecilia. La prima festa si tenne domenica <time datetime="1781-02-04">4 febbraio 1781</time> nella chiesa prepositurale. La <i>Gazzetta Toscana</i> scrisse che l'accademia era stata «recentemente con approvazione Sovrana instituita» e lodò «la maestria dei Professori, e l'abilità dei dilettanti»<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>.
        </p>
        <p>
            Nel <time datetime="1781-03">marzo 1781</time> gli accademici suonarono «gratis» alle esequie dell'imperatrice Maria Teresa. La musica era «composta, e diretta» dal sacerdote Antonio Lamberti, «Maestro di Cappella della Scuola Napoletana» e membro dell'accademia. Nei tre giorni seguenti suonarono ancora per i frati di San Francesco<sup><a href="#fonte-13" role="doc-noteref" id="rimando-13b" aria-label="Fonte 13">13</a></sup>.
        </p>
        <p>
            Il <time datetime="1786-07-15">15 luglio 1786</time> il granduca Pietro Leopoldo visitò Fivizzano. In chiesa ascoltò il Te Deum «accompagnato con scelta, e nuova Musica dagli Accademici Filarmonici concorsi a gara». La sera, in piazza, fu accolto «fra le Sinfonie della numerosa Orchestra»; la festa la organizzavano Odoardo Fantoni e Giovan Battista Agostini Trombetti<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup>.
        </p>
        <p>
            Nell'<time datetime="1787-04">aprile 1787</time>, per tre sere, il proposto Maurizio Solferini fece pregare per il granduca, e gli accademici eseguirono «superbe Sinfonie». In luglio accompagnarono una messa per il nuovo Conservatorio delle monache<sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup>. Nel <time datetime="1788-01">gennaio 1788</time> la <i>Gazzetta</i> notava i «rapidi progressi fatti in breve tempo» dall'accademia, capace ormai dei «più bei scelti pezzi di Musica Vocale, ed Instrumentale»<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17b" aria-label="Fonte 17">17</a></sup>.
        </p>
        <p>
            Il <time datetime="1789-05-03">3 maggio 1789</time> la festa di santa Cecilia ebbe la messa di Giuseppe Sarti, «sotto la direzione del nostro valente, ed egregio Giovane Signor Angiolo Battaglia». Gli accademici fecero stampare un <a href="/articoli/storia/sonetto">sonetto</a>, dedicato al loro capo; una copia è stata ritrovata nella villa dei Fantoni a Noletta<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11b" aria-label="Fonte 11">11</a></sup>. Nel settembre dello stesso anno la Comunità ringraziò il granduca per un aiuto alle mura e alla fonte con una messa e la «scelta Musica eseguita dai nostri Accademici Filarmonici»<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup>.
        </p>
    </section>
    <section>
        <h3>Angiolo Battaglia e il 1790</h3>
        <p>
            Angiolo Battaglia era organista e compositore. Labindo, in un'ode del <time datetime="1790">1790</time>, lo descrive mentre suona nella valle del Rosaro con il fratello Odoardo: Battaglia «possedeva un genio straordinario per la musica»<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>.
        </p>
        <p>
            La festa di cui sappiamo di più è quella del <time datetime="1790-12">dicembre 1790</time>, per l'elezione di Leopoldo a imperatore. Ci furono messe con musicisti venuti da fuori. La sera dell'11, nella sala della marchesa Gargiolli Malaspina, l'accademia offrì «a sue spese» una cantata su versi di Odoardo Fantoni e musica di Lamberti. Il giorno dopo, in piazza, si ballò con «quattro Orchestre con soprabbondante numero di Suonatori»<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>.
        </p>
        <p>
            Nel <time datetime="1791">1791</time> l'accademia suonò il Te Deum per il nuovo granduca Ferdinando III. In luglio si distinse «per un Concerto d'Organo dell'abilissimo suo Direttore il Sig. Angiolo Battaglia»<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19b" aria-label="Fonte 19">19</a></sup>. Il <time datetime="1792-03-30">30 marzo 1792</time>, alle esequie di Leopoldo, cantò la messa da requiem «tutto il corpo degli Accademici Filarmonici»<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>. Nel <time datetime="1793">1793</time> Battaglia mise in musica una cantata in cui si fece applaudire per la prima volta il suo allievo Gaetano Notari<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>. Il <time datetime="1795-02-01">1° febbraio 1795</time>, per la nascita di un arciduca, gli accademici ornarono la messa «con nuova e scelta Musica»<sup><a href="#fonte-23" role="doc-noteref" id="rimando-23a" aria-label="Fonte 23">23</a></sup>.
        </p>
        <p>
            Il proposto Solferini, che tante volte aveva celebrato con gli accademici, morì il <time datetime="1817-06-10">10 giugno 1817</time>. Azzolino Malaspina, accademico dal <time datetime="1780">1780</time>, scrisse per lui un sonetto e chiese a un amico di farlo leggere «ai Sigg. Fantoni»<sup><a href="#fonte-24" role="doc-noteref" id="rimando-24a" aria-label="Fonte 24">24</a></sup>.
        </p>
        <figure>
            <enhanced:img
                src={diplomaImg}
                alt="Diploma inciso dell'Accademia de' Filarmonici Dissonanti: in alto il motto «La soave armonia figlia del cielo» e un genio alato con la lira tra strumenti a fiato e rami d'alloro; al centro il testo dell'elezione ad Accademico, con il nome lasciato in bianco; in basso un liuto e un violino su un cartiglio di musica, una veduta di Fivizzano cinta dalle mura e il motto «Le dissonanze in un accordo solo»"
                {sizes}
                loading="lazy"
            />
            <figcaption>Il modulo di diploma dei Filarmonici Dissonanti (Newberry Library, Chicago).</figcaption>
        </figure>
    </section>
</section>

<section id="imperfetti">
    <h2>Il teatro degli Imperfetti</h2>
    <p>
        Accanto alla Filarmonica c'era un'altra società, l'Accademia degli Imperfetti, nata come accademia letteraria. Nel <time datetime="1782">1782</time> Labindo ne era segretario delle arti e delle belle lettere<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5c" aria-label="Fonte 5">5</a></sup>. Con un atto del <time datetime="1804-07-10">10 luglio 1804</time> gli Imperfetti si costituirono per costruire un teatro nuovo; tra gli azionisti c'era Odoardo Fantoni<sup><a href="#fonte-25" role="doc-noteref" id="rimando-25a" aria-label="Fonte 25">25</a></sup>. Le due accademie erano distinte, ma molte persone stavano in tutte e due.
    </p>
    <p>
        Il diario di Francesco Battaglia, notaio e «dilettante di musica e di drammatica», racconta il <time datetime="1810">1810</time> giorno per giorno. L'11 febbraio una «Società di Dilettanti» aprì il suo teatro con il <i>Demofonte</i>; seguirono commedie e un <i>Amleto</i>. Il 20 maggio fu firmata la scritta per «l'Apertura del Teatro dell'Accademia degl'Imperfetti». Il 26 giugno «arrivarono i Suonatori di Parma»<sup><a href="#fonte-26" role="doc-noteref" id="rimando-26a" aria-label="Fonte 26">26</a></sup>: Odoardo Fantoni li aveva cercati tramite i suoi parenti Ferroni<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5d" aria-label="Fonte 5">5</a></sup>. Il 7 luglio il teatro si aprì con una farsa in musica, <i>Gli sposi riuniti</i>, e con i balli. Il 15 agosto, dopo l'ultima delle trenta recite, in chiesa «Sinfonie, Te Deum, e Tantum ergo» furono «eseguiti dai Musici del Teatro»<sup><a href="#fonte-26" role="doc-noteref" id="rimando-26b" aria-label="Fonte 26">26</a></sup>. Il <i>Tantum ergo</i> era del maestro Giuseppe Allinovi<sup><a href="#fonte-27" role="doc-noteref" id="rimando-27a" aria-label="Fonte 27">27</a></sup>. Nel carnevale del <time datetime="1811">1811</time> il teatro tornò ai dilettanti, con fino a trecento biglietti a sera<sup><a href="#fonte-26" role="doc-noteref" id="rimando-26c" aria-label="Fonte 26">26</a></sup>.
    </p>
    <p>
        Nel <time datetime="1835">1835</time> una guida descriveva a Fivizzano «un'antica Accademia con piccolo Teatro per esercizio della Gioventù»<sup><a href="#fonte-28" role="doc-noteref" id="rimando-28a" aria-label="Fonte 28">28</a></sup>.
    </p>
</section>

<section id="banda">
    <h2>Dalla Rivoluzione alla banda</h2>
    <section>
        <h3>Gli anni francesi</h3>
        <p>
            Nell'<time datetime="1799-04">aprile 1799</time> il comandante francese chiese che la festa dell'albero della libertà fosse «condecorata col suono di vari strumenti, e con giulivi canti». Il 24 maggio il Comune affidò «le zinfonie e canti» ad Antonio Cortesi e Carlo Contigli, con «tutti gli strumenti sì da fiato che da corda» e i cantori che si potevano trovare<sup><a href="#fonte-27" role="doc-noteref" id="rimando-27b" aria-label="Fonte 27">27</a></sup>.
        </p>
        <p>
            Nell'<time datetime="1802-04">aprile 1802</time>, nella processione del Venerdì santo, «la Banda» suonò dal terrazzo di casa Grilli, «per essere meglio veduti, e ascoltati da tutto il popolo». Il maestro di cappella era l'avvocato Sarteschi, «perché il Cortesi era ammalato»<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5e" aria-label="Fonte 5">5</a></sup>.
        </p>
    </section>
    <section>
        <h3>I Dilettanti Filarmonici e la banda del 1831</h3>
        <p>
            Nel <time datetime="1820">1820</time> un gelo distrusse castagni e ulivi, e il granduca ridusse le tasse. Per ringraziarlo, l'<time datetime="1820-11-08">8 novembre</time>, si fece una festa in chiesa, e «i Dilettanti Filarmonici decorarono la sacra funzione con musica vocale, e strumentale»<sup><a href="#fonte-29" role="doc-noteref" id="rimando-29a" aria-label="Fonte 29">29</a></sup>.
        </p>
        <p>
            Nel <time datetime="1829">1829</time> il Comune usò i fondi del soppresso Monte Pio per un «maestro di Cappella» che insegnasse la musica ai giovani del paese<sup><a href="#fonte-30" role="doc-noteref" id="rimando-30a" aria-label="Fonte 30">30</a></sup>. Il <time datetime="1831-08-24">24 agosto 1831</time> un rescritto del granduca eresse la società «in Banda Musicale» e diede ai suonatori un'uniforme per comparire «in pubblica forma»<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6b" aria-label="Fonte 6">6</a></sup>. Nel <time datetime="1835">1835</time> il <i>Calendario lunese</i> parlava della «Società Filarmonica con un corpo di Banda debitamente autorizzata», «non è molto ristabilita in Fivizzano»<sup><a href="#fonte-31" role="doc-noteref" id="rimando-31a" aria-label="Fonte 31">31</a></sup>.
        </p>
        <p>
            La sera del <time datetime="1832-09-24">24 settembre 1832</time>, all'arrivo di Leopoldo II in visita, la banda «alternò fino a notte avanzata i suoi concerti» in piazza<sup><a href="#fonte-32" role="doc-noteref" id="rimando-32a" aria-label="Fonte 32">32</a></sup>. Un anno dopo, per il compleanno del granduca, «la banda dei Signori Dilettanti del loro uniforme vestiti» suonò «varie, e scelte sinfonie» nella sala dei fratelli Cojari, dove si scopriva un busto di Leopoldo II<sup><a href="#fonte-29" role="doc-noteref" id="rimando-29b" aria-label="Fonte 29">29</a></sup>.
        </p>
        <p>
            Nel prospetto delle bande del <time datetime="1839">1839</time> la società si chiamava «Società Filarmonica di Canto e Suono». Delle tre bande registrate in zona, a Fivizzano, Pontremoli e Bagnone, era la sola con un permesso del sovrano<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6c" aria-label="Fonte 6">6</a></sup>.
        </p>
    </section>
    <section>
        <h3>Verso l'Unità</h3>
        <p>
            Il <time datetime="1847-09-12">12 settembre 1847</time>, nelle feste per le riforme, a Fivizzano «suonava la banda civica»<sup><a href="#fonte-33" role="doc-noteref" id="rimando-33a" aria-label="Fonte 33">33</a></sup>. Nel <time datetime="1857">1857</time> la Società Filarmonica fondò una sua banda, che il Comune sussidiava<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7c" aria-label="Fonte 7">7</a></sup>. L'<time datetime="1860-03-11">11 marzo 1860</time>, al plebiscito per l'unione al Regno, la Filarmonica accompagnò «coi suoi concerti gl'inni di vittoria»: lo ricordava il suo presidente diciotto anni dopo<sup><a href="#fonte-34" role="doc-noteref" id="rimando-34a" aria-label="Fonte 34">34</a></sup>.
        </p>
    </section>
</section>

<section id="maestri">
    <h2>La Società Filarmonica e i suoi maestri</h2>
    <section>
        <h3>Livio Nesti e Cesare Rossi</h3>
        <p>
            Nella seconda metà dell'Ottocento la Società Filarmonica ebbe maestri di professione. Il primo che conosciamo è il pratese Livio Nesti. Nel <time datetime="1844">1844</time> lui e la moglie erano sarti; nel <time datetime="1854">1854</time> dirigeva l'orchestra del teatro di Grosseto; intorno al <time datetime="1860">1860</time> era a Fivizzano e comprava la partitura degli <i>Ugonotti</i> di Meyerbeer<sup><a href="#fonte-35" role="doc-noteref" id="rimando-35a" aria-label="Fonte 35">35</a></sup>.
        </p>
        <p>
            Il maestro di musica lo pagava il Comune. Nel <time datetime="1865-07">luglio 1865</time> ne bandì il posto sui giornali: mille lire l'anno, altre duecentocinquanta come organista, e i candidati dovevano essere «abili suonatori di Violino»<sup><a href="#fonte-36" role="doc-noteref" id="rimando-36a" aria-label="Fonte 36">36</a></sup>. Nel <time datetime="1867">1867</time> il maestro era Cesare Rossi. Era maestro di musica almeno dal <time datetime="1848">1848</time>, quando si sposò a Piancastagnaio<sup><a href="#fonte-37" role="doc-noteref" id="rimando-37a" aria-label="Fonte 37">37</a></sup>, e nel <time datetime="1865">1865</time> dirigeva la banda di Campiglia Marittima<sup><a href="#fonte-38" role="doc-noteref" id="rimando-38a" aria-label="Fonte 38">38</a></sup>. Nel <time datetime="1867-02">febbraio 1867</time> abitava a Fivizzano<sup><a href="#fonte-39" role="doc-noteref" id="rimando-39a" aria-label="Fonte 39">39</a></sup>. Nel <time datetime="1868">1868</time> i giornali musicali di Lipsia e di Bruxelles annunciavano che «il maestro Cesare Rossi di Fivizzano» scriveva un'opera comica, <i>Per amore e non per forza</i><sup><a href="#fonte-40" role="doc-noteref" id="rimando-40a" aria-label="Fonte 40">40</a></sup>; nel <time datetime="1869">1869</time> era detto «Maestro Direttore del Corpo Musicale di Fivizzano»<sup><a href="#fonte-41" role="doc-noteref" id="rimando-41a" aria-label="Fonte 41">41</a></sup>. Nello stesso <time datetime="1867">1867</time> la visita del deputato Giorgini fu «rallegrata dalle gentili armonie della banda cittadina»<sup><a href="#fonte-42" role="doc-noteref" id="rimando-42a" aria-label="Fonte 42">42</a></sup>.
        </p>
        <p>
            Nel 1871-72 il capo era di nuovo Nesti. La Società contava 47 soci esecutori e 25 onorari; la sua banda, nata nel <time datetime="1857">1857</time>, aveva 25 elementi<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7d" aria-label="Fonte 7">7</a></sup>. Dal <time datetime="1873">1873</time> negli atti del paese compare anche il figlio di Livio, Enea, nato a Prato nel <time datetime="1844">1844</time>, come «maestro di musica»<sup><a href="#fonte-39" role="doc-noteref" id="rimando-39b" aria-label="Fonte 39">39</a></sup>.
        </p>
    </section>
    <section>
        <h3>La «Centenaria» e la banda del Comune</h3>
        <p>
            Nel <time datetime="1877-09">settembre 1877</time> un corrispondente chiamava la Filarmonica «la Centenaria Società Filarmonica». La sua banda suonò per tre ore in piazza del Mercato per gli allievi dell'Accademia militare di Modena. Un'altra lettera spiegava che la Società aveva una «sezione Banda» e una «di Orchestra», e che d'estate faceva le «ordinarie sortite della Banda». Il presidente era l'avvocato Alberto Ginesi. Lo scrivente accusava il Comune di preparare una «Banda comunale» con un suo maestro, e proponeva un accordo di sei anni tra Comune e Società<sup><a href="#fonte-43" role="doc-noteref" id="rimando-43a" aria-label="Fonte 43">43</a></sup>.
        </p>
        <p>
            Nel <time datetime="1878">1878</time> a Fivizzano suonavano infatti due formazioni. Alle esequie che il Comune fece per Vittorio Emanuele II, il 31 gennaio, durante la messa suonò «la fanfara del Comune»<sup><a href="#fonte-44" role="doc-noteref" id="rimando-44a" aria-label="Fonte 44">44</a></sup>. In aprile la «Banda della Secolare Società Filarmonica» festeggiò il nuovo sindaco, e il corrispondente criticava chi voleva spendere per «una banda meschina di 7 suonatori, allo scopo di disfarne una composta di oltre 20 membri»<sup><a href="#fonte-44" role="doc-noteref" id="rimando-44b" aria-label="Fonte 44">44</a></sup>. In giugno, alla festa dello Statuto, suonò la «Fanfara del Comune, che fra non molto dovrà fondersi con la Banda della Società Filarmonica», con gli allievi della scuola di musica del maestro Nesti; la sera, in piazza, suonò per più di due ore la banda della Società<sup><a href="#fonte-44" role="doc-noteref" id="rimando-44c" aria-label="Fonte 44">44</a></sup>. Il 24 giugno un coro di bambini cantò un inno «musicato dal maestro signor Enea Nesti, direttore della Banda cittadina»<sup><a href="#fonte-44" role="doc-noteref" id="rimando-44d" aria-label="Fonte 44">44</a></sup>.
        </p>
    </section>
    <section>
        <h3>Le esequie del 1878</h3>
        <p>
            Il <time datetime="1878-02-07">7 febbraio 1878</time> la Società Filarmonica celebrò esequie proprie per Vittorio Emanuele II nella chiesa di San Giovanni, con le sue due sezioni, Orchestra e Banda, e i soci onorari. Un'epigrafe all'ingresso ricordava «l'armonia della Società Filarmonica di Fivizzano». Parlò il presidente Ginesi, che poi telegrafò al nuovo re<sup><a href="#fonte-45" role="doc-noteref" id="rimando-45a" aria-label="Fonte 45">45</a></sup>. La Società ne diede notizia anche alla <i>Gazzetta Ufficiale</i><sup><a href="#fonte-46" role="doc-noteref" id="rimando-46a" aria-label="Fonte 46">46</a></sup>. Nel <time datetime="1879">1879</time> il maestro Nesti concertò l'inno <i>La Carità</i> di Rossini per la premiazione delle scuole, nel teatro<sup><a href="#fonte-47" role="doc-noteref" id="rimando-47a" aria-label="Fonte 47">47</a></sup>.
        </p>
        <p>
            Nel <time datetime="1880-07">luglio 1880</time> un corrispondente la chiamava ancora «Società Filarmonica detta dei Dissonanti», esistente «da più di un secolo». Il 31 maggio i soci avevano nominato presidente onorario il conte Giuseppe Fabbricotti di Carrara, che l'aveva aiutata con le sue donazioni; presidente effettivo restava Ginesi<sup><a href="#fonte-48" role="doc-noteref" id="rimando-48a" aria-label="Fonte 48">48</a></sup>.
        </p>
    </section>
</section>

<section id="societa">
    <h2>Due società musicali</h2>
    <section>
        <h3>L'8 febbraio 1880</h3>
        <p>
            L'inverno 1879-80 fu un inverno di fame. La Società operaia aprì le cucine economiche, che dal 22 febbraio al 26 maggio distribuirono più di ventunomila minestre. Per finanziarle un quartetto di amici (Romeo Varanini, Annibale Bertolini, Vittorio Notari e Alessandro Ercolini) organizzò in teatro un'«accademia strumentale», cioè un concerto, domenica <time datetime="1880-02-08">8 febbraio 1880</time>, ultima domenica di carnevale. Incassò 470,70 lire<sup><a href="#fonte-49" role="doc-noteref" id="rimando-49a" aria-label="Fonte 49">49</a></sup>.
        </p>
        <p>
            Bertolini, Notari ed Ercolini erano soci della Filarmonica, nella sezione Banda. Dopo il concerto furono accusati di aver suonato con estranei. Il 23 febbraio la Filarmonica espulse Bertolini; gli altri due e «molti altri» soci si dimisero. Il 14 marzo quattordici promotori fondarono una nuova società musicale e la chiamarono «Otto Febbraio Milleottocentottanta», in ricordo del concerto. Claudio Contigli fu nominato «Direttore a vita della Banda»<sup><a href="#fonte-49" role="doc-noteref" id="rimando-49b" aria-label="Fonte 49">49</a></sup>. Da allora, per alcuni anni, a Fivizzano le bande furono due. Lo racconta Ercolini, uno dei protagonisti, in un opuscolo del <time datetime="1883">1883</time>: è la versione di una delle due parti. Quella della Filarmonica non la conosciamo.
        </p>
        <p>
            La «8 febbraio» aprì una scuola gratuita di musica e nel <time datetime="1883">1883</time> aveva 77 soci protettori e 25 suonatori<sup><a href="#fonte-49" role="doc-noteref" id="rimando-49c" aria-label="Fonte 49">49</a></sup>. Livio Nesti morì a Fivizzano il <time datetime="1881-10-21">21 ottobre 1881</time><sup><a href="#fonte-39" role="doc-noteref" id="rimando-39c" aria-label="Fonte 39">39</a></sup>. Nell'<time datetime="1883-10">ottobre 1883</time> un corrispondente proponeva di fondere «in una sola le due Società musicali ora esistenti»<sup><a href="#fonte-50" role="doc-noteref" id="rimando-50a" aria-label="Fonte 50">50</a></sup>. Il figlio Enea, intanto, sposò Edoardina Ginesi, la figlia del presidente della Filarmonica<sup><a href="#fonte-39" role="doc-noteref" id="rimando-39d" aria-label="Fonte 39">39</a></sup>.
        </p>
    </section>
    <section>
        <h3>Insieme e separate</h3>
        <p>
            Nel <time datetime="1884-01">gennaio 1884</time> «le due società musicali, Filarmonica e Otto febbraio 1880» sfilarono a Roma, al Pantheon, dietro il Comune. Il giornale notò che Fivizzano era l'unico comune della provincia ad aver portato «ben quattro stendardi»<sup><a href="#fonte-51" role="doc-noteref" id="rimando-51a" aria-label="Fonte 51">51</a></sup>. In agosto, durante il colera, «la banda dell'8 febbraio 1880 e quella Comunale» erano pronte a ricevere il prefetto<sup><a href="#fonte-52" role="doc-noteref" id="rimando-52a" aria-label="Fonte 52">52</a></sup>.
        </p>
        <p>
            Nel <time datetime="1887">1887</time> la Filarmonica mandò due rappresentanti a Firenze per la traslazione delle spoglie di Rossini in Santa Croce<sup><a href="#fonte-53" role="doc-noteref" id="rimando-53a" aria-label="Fonte 53">53</a></sup>. In settembre Giosuè Carducci venne a Fivizzano a cercare le carte di Labindo, e «la banda municipale» suonò un concerto in suo onore<sup><a href="#fonte-54" role="doc-noteref" id="rimando-54a" aria-label="Fonte 54">54</a></sup>. Nel <time datetime="1893">1893</time> il maestro di musica era ancora a carico del Comune<sup><a href="#fonte-30" role="doc-noteref" id="rimando-30b" aria-label="Fonte 30">30</a></sup>.
        </p>
        <p>
            Ai funerali di Umberto I, a Roma nell'<time datetime="1900-08">agosto 1900</time>, tra le associazioni di Fivizzano c'era una sola società musicale: la «Società filarmonica "I Risonanti [cioè Dissonanti] ed 8 febbraio 1880"»<sup><a href="#fonte-55" role="doc-noteref" id="rimando-55a" aria-label="Fonte 55">55</a></sup>. L'avvocato Ginesi morì il <time datetime="1901-04-18">18 aprile 1901</time>; il suo necrologio ricordava, tra le istituzioni che aveva servito, la «Filarmonica»<sup><a href="#fonte-56" role="doc-noteref" id="rimando-56a" aria-label="Fonte 56">56</a></sup>.
        </p>
    </section>
</section>

<section id="novecento">
    <h2>Il Novecento</h2>
    <section>
        <h3>I primi decenni</h3>
        <p>
            Dopo il terremoto del <time datetime="1902-08-04">4 agosto 1902</time> «fu fatta uscire la banda per sollevare l'animo depresso della cittadinanza»<sup><a href="#fonte-57" role="doc-noteref" id="rimando-57a" aria-label="Fonte 57">57</a></sup>. Nello stesso anno il Comune nominò un insegnante di pianoforte per il suo «Istituto Musicale Pacini»<sup><a href="#fonte-58" role="doc-noteref" id="rimando-58a" aria-label="Fonte 58">58</a></sup>. Nel <time datetime="1907-09">settembre 1907</time>, per il centenario della morte di Labindo, un corteo di autorità e associazioni, con «bandiere e musiche», salì alla tomba del poeta<sup><a href="#fonte-59" role="doc-noteref" id="rimando-59a" aria-label="Fonte 59">59</a></sup>. Enea Nesti, che era stato maestro a Fivizzano per circa vent'anni, morì a Firenze nel <time datetime="1918">1918</time><sup><a href="#fonte-60" role="doc-noteref" id="rimando-60a" aria-label="Fonte 60">60</a></sup>.
        </p>
        <p>
            Lo scrittore Mario Puccini ambientò a Fivizzano una novella, pubblicata verso il <time datetime="1913">1913</time>: la storia di un giovane maestro arrivato in paese «per dirigere la banda»<sup><a href="#fonte-61" role="doc-noteref" id="rimando-61a" aria-label="Fonte 61">61</a></sup>. Nelle fotografie del <time datetime="1921-11-04">4 novembre 1921</time>, per il Milite Ignoto, si vede lo stendardo di una «Società Musicale» di Fivizzano<sup><a href="#fonte-62" role="doc-noteref" id="rimando-62a" aria-label="Fonte 62">62</a></sup>. La tradizione colloca l'unione delle due società intorno agli anni Venti<sup><a href="#fonte-63" role="doc-noteref" id="rimando-63a" aria-label="Fonte 63">63</a></sup>. Alla fine del <time datetime="1929">1929</time> una banda di Fivizzano era abbonata alla SIAE<sup><a href="#fonte-64" role="doc-noteref" id="rimando-64a" aria-label="Fonte 64">64</a></sup>.
        </p>
        <figure>
            <enhanced:img
                src={militeIgnotoImg}
                alt="Fotografia del 4 novembre 1921 nel cimitero di Fivizzano: davanti al loggiato ad archi le autorità, i militari e la folla attorno alla messa al campo; al centro, sopra le teste, lo stendardo chiaro della Società Musicale con un emblema tra due rami d'alloro"
                {sizes}
                loading="lazy"
            />
            <figcaption>4 novembre 1921, messa al campo per il Milite Ignoto nel cimitero di Fivizzano: al centro lo stendardo della «Società Musicale» (Museo centrale del Risorgimento, Roma).</figcaption>
        </figure>
    </section>
    <section>
        <h3>Gli anni Trenta</h3>
        <p>
            Negli anni Trenta la Filarmonica era anche società di mutuo soccorso, «Filarmonica M. S.», e dall'<time datetime="1934-11-11">11 novembre 1934</time> passò all'Opera Nazionale Dopolavoro<sup><a href="#fonte-65" role="doc-noteref" id="rimando-65a" aria-label="Fonte 65">65</a></sup>. In una fotografia di quegli anni circa trenta suonatori in uniforme scura, con il berretto rigido ornato da una lira, posano davanti al monumento ai caduti. Lo stendardo porta la scritta «…A DI M.S.»; accanto c'è il gagliardetto del Dopolavoro<sup><a href="#fonte-66" role="doc-noteref" id="rimando-66a" aria-label="Fonte 66">66</a></sup>. Secondo i nomi raccolti dalle famiglie dei suonatori, il maestro era Alfio Mercadini e il presidente l'avvocato Giulio Ghinoi<sup><a href="#fonte-66" role="doc-noteref" id="rimando-66b" aria-label="Fonte 66">66</a></sup>.
        </p>
    </section>
    <section>
        <h3>Il secondo Novecento</h3>
        <p>
            Nel secondo Novecento la diressero, tra gli altri, Alfio Mercadini e poi Antonio Novelli, che era sul podio ancora nel <time datetime="1987">1987</time><sup><a href="#fonte-67" role="doc-noteref" id="rimando-67a" aria-label="Fonte 67">67</a></sup>. Nel <time datetime="1970">1970</time> Fivizzano ospitò l'11 gennaio il convegno delle bande della provincia di Massa Carrara e della Garfagnana, e il 19 luglio il primo Concorso bandistico «Città di Fivizzano»<sup><a href="#fonte-65" role="doc-noteref" id="rimando-65b" aria-label="Fonte 65">65</a></sup>. Nel <time datetime="1972">1972</time> la rivista dell'ANBIMA raccontò una festa delle bande di Fivizzano e di Moncigoli, «manifestazione di fratellanza e di amicizia»<sup><a href="#fonte-68" role="doc-noteref" id="rimando-68a" aria-label="Fonte 68">68</a></sup>. Secondo il ricordo di un ex suonatore, per il Corpus Domini del <time datetime="1975">1975</time> la banda inaugurò una nuova divisa e accolse un gruppo di ragazzi preparati dal maestro Novelli<sup><a href="#fonte-69" role="doc-noteref" id="rimando-69a" aria-label="Fonte 69">69</a></sup>.
        </p>
        <p>
            Il <time datetime="1987-06-27">27 giugno 1987</time> cominciarono i festeggiamenti per i 210 anni<sup><a href="#fonte-65" role="doc-noteref" id="rimando-65c" aria-label="Fonte 65">65</a></sup>. In piazza Medicea, sul palco, uno striscione diceva: «Società Filarmonica Fivizzano 1777-1987, duecento anni e un po'»<sup><a href="#fonte-70" role="doc-noteref" id="rimando-70a" aria-label="Fonte 70">70</a></sup>.
        </p>
        <figure>
            <!-- SEGNAPOSTO: il file si chiama anni_80, ma decennio, luogo e occasione sono da verificare. -->
            <enhanced:img
                src={anni80Img}
                alt="La Filarmonica in concerto di sera su un palco in piazza, con il drappo rosso e le luminarie di una festa: il direttore a sinistra, dietro di lui lo stendardo della Filarmonica, poi clarinetti, sassofoni e ottoni in camicia bianca"
                {sizes}
                loading="lazy"
            />
            <figcaption>La Filarmonica in concerto in piazza, in una sera di festa.</figcaption>
        </figure>
    </section>
</section>

<section id="nome">
    <h2>Il nome di Stradella</h2>
    <p>
        La famiglia Stradella venne a Fivizzano da Borgo Val di Taro nel Quattrocento: il medico Matteo Stradella fu tra i riformatori degli statuti del paese, approvati a Firenze nel 1480<sup><a href="#fonte-71" role="doc-noteref" id="rimando-71a" aria-label="Fonte 71">71</a></sup>. Da un ramo partito da qui discende il compositore <a href="/articoli/storia/stradella">Alessandro Stradella</a>, nato a Bologna nel <time datetime="1643">1643</time><sup><a href="#fonte-72" role="doc-noteref" id="rimando-72a" aria-label="Fonte 72">72</a></sup>.
    </p>
    <p>
        Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica organizzò con il Comune e la Fondazione Cassa di Risparmio di Carrara il convegno «Alessandro Stradella e la Musica Barocca. Le origini ritrovate»<sup><a href="#fonte-73" role="doc-noteref" id="rimando-73a" aria-label="Fonte 73">73</a></sup>. Lo stesso giorno, «auspice la Società Filarmonica», fu posta una lapide sulla casa degli Stradella, vicino alle mura<sup><a href="#fonte-74" role="doc-noteref" id="rimando-74a" aria-label="Fonte 74">74</a></sup>. Secondo i ricordi dei soci in quell'occasione la Filarmonica prese il nome del compositore<sup><a href="#fonte-67" role="doc-noteref" id="rimando-67b" aria-label="Fonte 67">67</a></sup>; nel <time datetime="1997-12">dicembre 1997</time> il bollettino del Santuario della Madonna di Reggio scriveva del concerto di Natale tenuto «da qualche anno dalla Filarmonica Alessandro Stradella»<sup><a href="#fonte-75" role="doc-noteref" id="rimando-75a" aria-label="Fonte 75">75</a></sup>.
    </p>
</section>

<section id="oggi">
    <h2>Oggi</h2>
    <p>
        La Filarmonica Alessandro Stradella è un'associazione di promozione sociale con più di cinquanta soci e quattro formazioni: l'orchestra di fiati <a href="/formazioni/stradella-facendo">Stradella Facendo</a>, la <a href="/formazioni/streetella-band">Streetella Band</a>, l'<a href="/formazioni/orchestra-infieri">Orchestra Infieri</a> e il gruppo di musica antica dei <a href="/formazioni/filarmonici-dissonanti">Filarmonici Dissonanti</a>, che porta il nome degli accademici del Settecento. Nel <time datetime="2027">2027</time> la Filarmonica compie 250 anni<sup><a href="#fonte-76" role="doc-noteref" id="rimando-76a" aria-label="Fonte 76">76</a></sup>.
    </p>
    <!-- SOSPESA finché non ci sono i consensi alle immagini (vedi l'import):
    <figure>
        <enhanced:img src={oggiImg} alt="L'Orchestra Infieri in concerto" {sizes} loading="lazy" />
        <figcaption>L'Orchestra Infieri della Filarmonica in concerto.</figcaption>
    </figure>
    -->
</section>

<section>
    <h2>Hai materiale sulla nostra storia?</h2>
    <p>
        Fotografie, programmi di sala, documenti, registrazioni: molta della nostra storia è conservata nelle case di chi l'ha vissuta. Se hai
        qualcosa che riguarda la Filarmonica, mandacelo con il <a href="/contatti/scrivi?motivo=storia">modulo per il materiale storico</a>: puoi inviare le
        scansioni o consegnare gli originali in un punto di raccolta, e te li restituiamo appena digitalizzati.
    </p>
</section>

<!-- Le fonti dopo «Come citare» e «Hai qualcosa da aggiungere?», prima del rimando (ArticleFooter) -->
<ArticleFooter {article}>
    <section role="doc-endnotes" aria-labelledby="fonti">
        <h2 id="fonti">Fonti</h2>
        <ol>
            <li id="fonte-1">Giacomo Moro, <i>Concerti ecclesiastici</i>, op. 8, Venezia, 1604, dedica ad Ambrogio Magnanino. <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando 1">Torna al testo</a></li>
            <li id="fonte-2">Nicola Battini, <i>Libro di ricordi di tutto quello che passa alla giornata</i> (1696-1762), manoscritto: Archivio di Stato di Massa, Manoscritti n. 7. <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando 2">Torna al testo</a></li>
            <li id="fonte-3">Archivio di Stato di Massa, Archivio Fantoni, fascicolo «Accademia degli Imperfetti 1739 agosto 15» (dall'inventario dell'Archivio). <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando 3">Torna al testo</a></li>
            <li id="fonte-4"><i>Gazzetta Toscana</i>, 1768, «Fivizzano 3 marzo», e 1775, «Fivizzano 6 febbraio» (<a href="https://babel.hathitrust.org/cgi/pt?id=nyp.33433081589578&seq=263" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando 4">Torna al testo</a></li>
            <li id="fonte-5">Lettere dell'Archivio Fantoni (Archivio di Stato di Massa): di Patrizio Commeno (1774), di Emanuele De Silva (1776), di Azzolino Malaspina (1780), di Carlo Malaspina d'Olivola (1782), di Anna Fantoni (1802), dei Ferroni di Parma (1810); patente di Labindo per gli Imperfetti (1782). Trascritte in Rino Barbieri, <i>Labindo e la Società Civile Settecentesca</i>, academia.edu. Torna al testo: <a role="doc-backlink" href="#rimando-5a" aria-label="Torna al rimando 5a">a</a>, <a role="doc-backlink" href="#rimando-5b" aria-label="Torna al rimando 5b">b</a>, <a role="doc-backlink" href="#rimando-5c" aria-label="Torna al rimando 5c">c</a>, <a role="doc-backlink" href="#rimando-5d" aria-label="Torna al rimando 5d">d</a>, <a role="doc-backlink" href="#rimando-5e" aria-label="Torna al rimando 5e">e</a></li>
            <li id="fonte-6">Prospetto delle società filodrammatiche e bande, 1839: Archivio di Stato di Massa, sezione di Pontremoli, Affari diversi di Governo, 1839, vol. 61, n. 111, citato in Marco Angella, <i>Musica e teatro a Pontremoli nel secondo periodo lorenese</i>, 2012. Torna al testo: <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando 6a">a</a>, <a role="doc-backlink" href="#rimando-6b" aria-label="Torna al rimando 6b">b</a>, <a role="doc-backlink" href="#rimando-6c" aria-label="Torna al rimando 6c">c</a></li>
            <li id="fonte-7"><i>Istituti e società musicali in Italia. Statistica</i>, Roma, Direzione di statistica, 1873, pp. 216-217 (dati del 1871-72) (<a href="https://books.google.it/books?id=OtbfU1jeVN8C&pg=PA216" target="_blank" rel="noopener noreferrer">Google Libri</a>). Torna al testo: <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando 7a">a</a>, <a role="doc-backlink" href="#rimando-7b" aria-label="Torna al rimando 7b">b</a>, <a role="doc-backlink" href="#rimando-7c" aria-label="Torna al rimando 7c">c</a>, <a role="doc-backlink" href="#rimando-7d" aria-label="Torna al rimando 7d">d</a></li>
            <li id="fonte-8"><i>Gazzetta Toscana</i>, annate 1777-1780, lette per intero (HathiTrust). <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando 8">Torna al testo</a></li>
            <li id="fonte-9">Diploma di accademico ordinario per il conte Francesco Fantoni, 16 dicembre 1787: Archivio Fantoni, Archivio di Stato di Massa, trascritto da Rino Barbieri. <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando 9">Torna al testo</a></li>
            <li id="fonte-10">Modulo di diploma dell'Accademia de' Filarmonici Dissonanti: Newberry Library, Chicago, Wing broadside ZP 735 .L45; <a href="https://commons.wikimedia.org/wiki/File:Diploma_Accademia_dei_Filarmonici_Dissonanti_di_Fivizzano,_Newberry_Library.jpg" target="_blank" rel="noopener noreferrer">scansione</a> su Wikimedia Commons. <a role="doc-backlink" href="#rimando-10a" aria-label="Torna al rimando 10">Torna al testo</a></li>
            <li id="fonte-11"><i>Gazzetta Toscana</i>, 1789, «Fivizzano 3 maggio» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536901&seq=98" target="_blank" rel="noopener noreferrer">HathiTrust</a>); sonetto a stampa <i>In occasione della solenne festività di Santa Cecilia</i>, Massa, Stefano Frediani, 1789. Torna al testo: <a role="doc-backlink" href="#rimando-11a" aria-label="Torna al rimando 11a">a</a>, <a role="doc-backlink" href="#rimando-11b" aria-label="Torna al rimando 11b">b</a></li>
            <li id="fonte-12">Giosuè Carducci, <i>Il Parini principiante</i>, 1886, p. 17. <a role="doc-backlink" href="#rimando-12a" aria-label="Torna al rimando 12">Torna al testo</a></li>
            <li id="fonte-13"><i>Gazzetta Toscana</i>, 1781, «Fivizzano 6 febbraio» (<a href="https://babel.hathitrust.org/cgi/pt?id=nyp.33433081589602&seq=277" target="_blank" rel="noopener noreferrer">HathiTrust</a>), e supplemento, «Fivizzano 31 marzo». Torna al testo: <a role="doc-backlink" href="#rimando-13a" aria-label="Torna al rimando 13a">a</a>, <a role="doc-backlink" href="#rimando-13b" aria-label="Torna al rimando 13b">b</a></li>
            <li id="fonte-14"><i>Gazzetta Toscana</i>, 1782, corrispondenza da Pietrasanta (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536851&seq=168" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-14a" aria-label="Torna al rimando 14">Torna al testo</a></li>
            <li id="fonte-15">Supplemento alla <i>Gazzetta Toscana</i>, 1786, «Fivizzano 18 luglio» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536877&seq=137" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-15a" aria-label="Torna al rimando 15">Torna al testo</a></li>
            <li id="fonte-16"><i>Gazzetta Toscana</i>, 1787, «Fivizzano 5 maggio» e luglio (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536885&seq=88" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-16a" aria-label="Torna al rimando 16">Torna al testo</a></li>
            <li id="fonte-17"><i>Gazzetta Toscana</i>, 1788, «Fivizzano 19 gennaio» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536893&seq=50" target="_blank" rel="noopener noreferrer">HathiTrust</a>), e 1791, «Fivizzano 31 luglio». Torna al testo: <a role="doc-backlink" href="#rimando-17a" aria-label="Torna al rimando 17a">a</a>, <a role="doc-backlink" href="#rimando-17b" aria-label="Torna al rimando 17b">b</a></li>
            <li id="fonte-18"><i>Gazzetta Toscana</i>, 1789, «Fivizzano 29 settembre» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536901&seq=187" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-18a" aria-label="Torna al rimando 18">Torna al testo</a></li>
            <li id="fonte-19"><i>Gazzetta Toscana</i>, 1791, corrispondenze da Fivizzano su dicembre 1790, marzo e luglio 1791 (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536919&seq=21" target="_blank" rel="noopener noreferrer">HathiTrust</a>); Supplemento alla <i>Gazzetta Toscana</i>, n. 2, 8 gennaio 1791, «Fivizzano 13 dicembre». Torna al testo: <a role="doc-backlink" href="#rimando-19a" aria-label="Torna al rimando 19a">a</a>, <a role="doc-backlink" href="#rimando-19b" aria-label="Torna al rimando 19b">b</a></li>
            <li id="fonte-20">Giovanni Fantoni, <i>Poesie</i>, 1823, ode XXIII, <i>Baccanale</i>, nota, p. 308. <a role="doc-backlink" href="#rimando-20a" aria-label="Torna al rimando 20">Torna al testo</a></li>
            <li id="fonte-21"><i>Gazzetta Toscana</i>, 1792, p. 63, «Fivizzano 31 marzo» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101076536927&seq=77" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-21a" aria-label="Torna al rimando 21">Torna al testo</a></li>
            <li id="fonte-22"><i>Gazzetta Toscana</i>, 1793, «Fivizzano 7 ottobre» (<a href="https://babel.hathitrust.org/cgi/pt?id=njp.32101080458241&seq=168" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-22a" aria-label="Torna al rimando 22">Torna al testo</a></li>
            <li id="fonte-23">Supplemento alla <i>Gazzetta Toscana</i>, n. 11, 1795, «Fivizzano 4 febbraio» (Internet Culturale). <a role="doc-backlink" href="#rimando-23a" aria-label="Torna al rimando 23">Torna al testo</a></li>
            <li id="fonte-24">Registro dei morti di Fivizzano, 1817, n. 571: Archivio di Stato di Firenze, Stato civile toscano, Portale Antenati; lettera di Azzolino Malaspina del 14 giugno 1817 con il sonetto <i>In morte… del Sig. D. Maurizio Solferini</i>: Archivio di Stato di Massa, Manoscritti n. 55, c. 46. <a role="doc-backlink" href="#rimando-24a" aria-label="Torna al rimando 24">Torna al testo</a></li>
            <li id="fonte-25">Rino Barbieri, <i>Il Teatro-Cinema di Fivizzano. Note per una rinascita</i>, pp. 9, 13 (atto del notaio Antonio Falchi, 10 luglio 1804). <a role="doc-backlink" href="#rimando-25a" aria-label="Torna al rimando 25">Torna al testo</a></li>
            <li id="fonte-26">Francesco Battaglia, <i>Giornale</i> del 1810 e 1811, manoscritto: Archivio di Stato di Massa, Manoscritti n. 6. Torna al testo: <a role="doc-backlink" href="#rimando-26a" aria-label="Torna al rimando 26a">a</a>, <a role="doc-backlink" href="#rimando-26b" aria-label="Torna al rimando 26b">b</a>, <a role="doc-backlink" href="#rimando-26c" aria-label="Torna al rimando 26c">c</a></li>
            <li id="fonte-27">Silvio Andreani, <i>I Francesi a Fivizzano</i>, Fivizzano, 1911 (deliberazioni del Magistrato comunitativo del 1799 e spese del 1810). Torna al testo: <a role="doc-backlink" href="#rimando-27a" aria-label="Torna al rimando 27a">a</a>, <a role="doc-backlink" href="#rimando-27b" aria-label="Torna al rimando 27b">b</a></li>
            <li id="fonte-28">Michele Angeli, <i>Aronte lunese illustrato</i>, 1835. <a role="doc-backlink" href="#rimando-28a" aria-label="Torna al rimando 28">Torna al testo</a></li>
            <li id="fonte-29"><i>Gazzetta di Firenze</i>, 1820, «Fivizzano 13 novembre» (<a href="https://babel.hathitrust.org/cgi/pt?id=hvd.hxkbmg&seq=616" target="_blank" rel="noopener noreferrer">HathiTrust</a>), e 1833, «Fivizzano 4 ottobre» (<a href="https://babel.hathitrust.org/cgi/pt?id=hvd.hxpmcd&seq=564" target="_blank" rel="noopener noreferrer">HathiTrust</a>). Torna al testo: <a role="doc-backlink" href="#rimando-29a" aria-label="Torna al rimando 29a">a</a>, <a role="doc-backlink" href="#rimando-29b" aria-label="Torna al rimando 29b">b</a></li>
            <li id="fonte-30"><i>Bollettino ufficiale del Ministero dell'istruzione pubblica</i>, 1893, p. 1620 (<a href="https://books.google.it/books?id=Mf--FXswxqYC&pg=PA1620" target="_blank" rel="noopener noreferrer">Google Libri</a>). Torna al testo: <a role="doc-backlink" href="#rimando-30a" aria-label="Torna al rimando 30a">a</a>, <a role="doc-backlink" href="#rimando-30b" aria-label="Torna al rimando 30b">b</a></li>
            <li id="fonte-31"><i>Calendario lunese per l'anno 1835</i>, pp. 253-254. <a role="doc-backlink" href="#rimando-31a" aria-label="Torna al rimando 31">Torna al testo</a></li>
            <li id="fonte-32"><i>Gazzetta di Firenze</i>, 11 ottobre 1832, «Fivizzano 27 settembre». <a role="doc-backlink" href="#rimando-32a" aria-label="Torna al rimando 32">Torna al testo</a></li>
            <li id="fonte-33"><i>L'Alba</i>, Firenze, a. I, n. 45, 24 settembre 1847, p. 1, lettera «Fivizzano, 22 settembre». <a role="doc-backlink" href="#rimando-33a" aria-label="Torna al rimando 33">Torna al testo</a></li>
            <li id="fonte-34"><i>In memoria del lutto, onde furono colpiti per la morte del Re Galantuomo i cittadini fivizzanesi</i>, Firenze, Carnesecchi, 1878, discorso del presidente Alberto Ginesi. <a role="doc-backlink" href="#rimando-34a" aria-label="Torna al rimando 34">Torna al testo</a></li>
            <li id="fonte-35">Atto di nascita di Enea Nesti, Prato, 1° ottobre 1844 (Portale Antenati); <i>Il buon gusto</i>, Firenze, 1854, p. 143; G. Meyerbeer, <i>Gli Ugonotti</i>, edizione economica fiorentina, c. 1860, elenco degli associati. <a role="doc-backlink" href="#rimando-35a" aria-label="Torna al rimando 35">Torna al testo</a></li>
            <li id="fonte-36">Avviso del Comune di Fivizzano, <i>La Nazione</i>, Firenze, 5 luglio 1865, p. 3. <a role="doc-backlink" href="#rimando-36a" aria-label="Torna al rimando 36">Torna al testo</a></li>
            <li id="fonte-37">Atto di matrimonio di Cesare Rossi e Maria Fumasoli, Piancastagnaio, 15 giugno 1848: Archivio di Stato di Firenze, Stato civile toscano, Matrimoni 1848 (Portale Antenati). <a role="doc-backlink" href="#rimando-37a" aria-label="Torna al rimando 37">Torna al testo</a></li>
            <li id="fonte-38">Lettera da Campiglia Marittima del 21 aprile 1865, <i>La Nazione</i>, 27 aprile 1865, p. 3. <a role="doc-backlink" href="#rimando-38a" aria-label="Torna al rimando 38">Torna al testo</a></li>
            <li id="fonte-39">Atti dello stato civile di Fivizzano (Archivio di Stato di Massa; FamilySearch): nascite 1867, n. 86; pubblicazioni 1873, n. 306, e 1883, n. 132; morti 1881, n. 196 (Livio Nesti). Torna al testo: <a role="doc-backlink" href="#rimando-39a" aria-label="Torna al rimando 39a">a</a>, <a role="doc-backlink" href="#rimando-39b" aria-label="Torna al rimando 39b">b</a>, <a role="doc-backlink" href="#rimando-39c" aria-label="Torna al rimando 39c">c</a>, <a role="doc-backlink" href="#rimando-39d" aria-label="Torna al rimando 39d">d</a></li>
            <li id="fonte-40"><i>Signale für die musikalische Welt</i>, Lipsia, 1868, p. 875; <i>Le Guide musical</i>, Bruxelles, 1868. <a role="doc-backlink" href="#rimando-40a" aria-label="Torna al rimando 40">Torna al testo</a></li>
            <li id="fonte-41">G. Vanzolini, <i>Pompe funebri in onore di Gioachino Rossini</i>, Pesaro, 1869, pp. 62-63. <a role="doc-backlink" href="#rimando-41a" aria-label="Torna al rimando 41">Torna al testo</a></li>
            <li id="fonte-42"><i>L'Opinione</i>, 1867, n. 334, «Ci scrivono da Fivizzano, in data 30 novembre». <a role="doc-backlink" href="#rimando-42a" aria-label="Torna al rimando 42">Torna al testo</a></li>
            <li id="fonte-43">Corrispondenza da Fivizzano del 12 settembre 1877, <i>La Nazione</i>, 15 settembre 1877; lettera da Fivizzano del 25 settembre 1877, <i>La Nazione</i>, 4 ottobre 1877. <a role="doc-backlink" href="#rimando-43a" aria-label="Torna al rimando 43">Torna al testo</a></li>
            <li id="fonte-44">Corrispondenze da Fivizzano, <i>La Nazione</i>, 6 febbraio, aprile, 20 giugno (p. 2, «Fivizzano, 8») e 2 luglio 1878 (pp. 2-3). Torna al testo: <a role="doc-backlink" href="#rimando-44a" aria-label="Torna al rimando 44a">a</a>, <a role="doc-backlink" href="#rimando-44b" aria-label="Torna al rimando 44b">b</a>, <a role="doc-backlink" href="#rimando-44c" aria-label="Torna al rimando 44c">c</a>, <a role="doc-backlink" href="#rimando-44d" aria-label="Torna al rimando 44d">d</a></li>
            <li id="fonte-45"><i>Il 9 gennaio 1878, ossia Il mondo civile ed in particolare l'Italia in morte di Vittorio Emanuele II</i>, vol. 2, pp. 37-38 (<a href="https://books.google.it/books?id=78YRayT7KRgC&pg=PA37" target="_blank" rel="noopener noreferrer">Google Libri</a>); <i>In memoria del lutto</i>, 1878. <a role="doc-backlink" href="#rimando-45a" aria-label="Torna al rimando 45">Torna al testo</a></li>
            <li id="fonte-46"><i>Gazzetta Ufficiale del Regno</i>, 11 febbraio 1878, n. 34, p. 544. <a role="doc-backlink" href="#rimando-46a" aria-label="Torna al rimando 46">Torna al testo</a></li>
            <li id="fonte-47"><i>L'Opinione</i>, 4 giugno 1879, n. 152. <a role="doc-backlink" href="#rimando-47a" aria-label="Torna al rimando 47">Torna al testo</a></li>
            <li id="fonte-48">Corrispondenza da Fivizzano del 14 luglio 1880, <i>La Nazione</i>, 18 luglio 1880, p. 2. <a role="doc-backlink" href="#rimando-48a" aria-label="Torna al rimando 48">Torna al testo</a></li>
            <li id="fonte-49">Alessandro Ercolini, <i>Brevi cenni intorno all'origine della società musicale 8 febbraio 1880 costituitasi in Fivizzano il dì 14 marzo 1880</i>, Sarzana, Ravani, [1883] (Reggio Emilia, Biblioteca «Città di Reggio»). Torna al testo: <a role="doc-backlink" href="#rimando-49a" aria-label="Torna al rimando 49a">a</a>, <a role="doc-backlink" href="#rimando-49b" aria-label="Torna al rimando 49b">b</a>, <a role="doc-backlink" href="#rimando-49c" aria-label="Torna al rimando 49c">c</a></li>
            <li id="fonte-50">Corrispondenza «Fivizzano, 28», <i>La Nazione</i>, 30 ottobre 1883. <a role="doc-backlink" href="#rimando-50a" aria-label="Torna al rimando 50">Torna al testo</a></li>
            <li id="fonte-51"><i>Fanfulla</i>, Roma, 18 gennaio 1884. <a role="doc-backlink" href="#rimando-51a" aria-label="Torna al rimando 51">Torna al testo</a></li>
            <li id="fonte-52">Corrispondenza da Fivizzano del 5 agosto 1884, <i>La Nazione</i>, 8 agosto 1884. <a role="doc-backlink" href="#rimando-52a" aria-label="Torna al rimando 52">Torna al testo</a></li>
            <li id="fonte-53"><i>Gazzetta musicale di Milano</i>, 1887, supplemento straordinario al n. 23 (<a href="https://babel.hathitrust.org/cgi/pt?id=iau.31858034367783&seq=210" target="_blank" rel="noopener noreferrer">HathiTrust</a>). <a role="doc-backlink" href="#rimando-53a" aria-label="Torna al rimando 53">Torna al testo</a></li>
            <li id="fonte-54">Dispaccio «Fivizzano, 3», <i>La Nazione</i>, 5 settembre 1887, p. 3. <a role="doc-backlink" href="#rimando-54a" aria-label="Torna al rimando 54">Torna al testo</a></li>
            <li id="fonte-55"><i>Per la morte del re Umberto I</i>, 1901, p. 83. <a role="doc-backlink" href="#rimando-55a" aria-label="Torna al rimando 55">Torna al testo</a></li>
            <li id="fonte-56">Atto di morte di Alberto Ginesi, Fivizzano, 1901, n. 69 (FamilySearch); necrologio, <i>La Nazione</i>, 1° maggio 1901, p. 2. <a role="doc-backlink" href="#rimando-56a" aria-label="Torna al rimando 56">Torna al testo</a></li>
            <li id="fonte-57">Rino Barbieri, <i>La Madonna di Reggio a Fivizzano</i>, 2022 (con testi riprodotti, tra cui Silvio Andreani, <i>La chiesa di S. Antonio in Fivizzano</i>, Roma, 1922). <a role="doc-backlink" href="#rimando-57a" aria-label="Torna al rimando 57">Torna al testo</a></li>
            <li id="fonte-58">Corrispondenza «Fivizzano, 16», <i>La Nazione</i>, 17 dicembre 1902, p. 3. <a role="doc-backlink" href="#rimando-58a" aria-label="Torna al rimando 58">Torna al testo</a></li>
            <li id="fonte-59"><i>La Nazione</i>, 1° ottobre 1907, p. 1. <a role="doc-backlink" href="#rimando-59a" aria-label="Torna al rimando 59">Torna al testo</a></li>
            <li id="fonte-60">Atti di morte di Edoardina Ginesi (1912, n. 1544) e di Enea Nesti (1918, n. 404): Comune di Firenze, Stato civile; atti dello stato civile di Fivizzano, 1873-1892. <a role="doc-backlink" href="#rimando-60a" aria-label="Torna al rimando 60">Torna al testo</a></li>
            <li id="fonte-61"><i>Il Marzocco</i>, 1913, recensione di Mario Puccini, <i>Viottola</i>, Ancona, Puccini. <a role="doc-backlink" href="#rimando-61a" aria-label="Torna al rimando 61">Torna al testo</a></li>
            <li id="fonte-62">Museo centrale del Risorgimento, Roma, album <i>Onoranze al Milite Ignoto</i>, MCRR 1000, foto di Fivizzano. <a role="doc-backlink" href="#rimando-62a" aria-label="Torna al rimando 62">Torna al testo</a></li>
            <li id="fonte-63">bandamusicale.it, scheda di Fivizzano (copie del 2003 e del 2004 nella Wayback Machine). <a role="doc-backlink" href="#rimando-63a" aria-label="Torna al rimando 63">Torna al testo</a></li>
            <li id="fonte-64"><i>Bollettino della Società italiana degli autori ed editori</i>, 1930, pp. 329, 374-375. <a role="doc-backlink" href="#rimando-64a" aria-label="Torna al rimando 64">Torna al testo</a></li>
            <li id="fonte-65"><i>Annuario toscano</i>, anni Trenta, voce Fivizzano; lunigiana.net, <i>Cento anni di Lunigiana</i>, anni 1934, 1970, 1987. Torna al testo: <a role="doc-backlink" href="#rimando-65a" aria-label="Torna al rimando 65a">a</a>, <a role="doc-backlink" href="#rimando-65b" aria-label="Torna al rimando 65b">b</a>, <a role="doc-backlink" href="#rimando-65c" aria-label="Torna al rimando 65c">c</a></li>
            <li id="fonte-66">Fotografia della banda negli anni Trenta (riproduzione a stampa; pubblicazione d'origine da trovare); nomi dei presenti raccolti dalle famiglie dei suonatori (2011, 2025). Torna al testo: <a role="doc-backlink" href="#rimando-66a" aria-label="Torna al rimando 66a">a</a>, <a role="doc-backlink" href="#rimando-66b" aria-label="Torna al rimando 66b">b</a></li>
            <li id="fonte-67">Ricordi dei soci e dei suonatori della Filarmonica, raccolti nel 2026; fotografia della Filarmonica in concerto, 1987. Torna al testo: <a role="doc-backlink" href="#rimando-67a" aria-label="Torna al rimando 67a">a</a>, <a role="doc-backlink" href="#rimando-67b" aria-label="Torna al rimando 67b">b</a></li>
            <li id="fonte-68"><i>Il Risveglio bandistico</i> (ANBIMA), 1972, pp. 16-20. <a role="doc-backlink" href="#rimando-68a" aria-label="Torna al rimando 68">Torna al testo</a></li>
            <li id="fonte-69">Ricordo di un ex suonatore, pubblicato in rete nel 2025, con fotografia. <a role="doc-backlink" href="#rimando-69a" aria-label="Torna al rimando 69">Torna al testo</a></li>
            <li id="fonte-70">Fotografia del concerto in piazza Medicea, 1987. <a role="doc-backlink" href="#rimando-70a" aria-label="Torna al rimando 70">Torna al testo</a></li>
            <li id="fonte-71">Carolyn Gianturco, <i>Alessandro Stradella, 1639-1682: his life and music</i>, Oxford, Clarendon Press, 1994, pp. 3-7; Giovanni Sforza, <i>Saggio d'una bibliografia storica della Lunigiana</i>, I, 1874, pp. 22-24. <a role="doc-backlink" href="#rimando-71a" aria-label="Torna al rimando 71">Torna al testo</a></li>
            <li id="fonte-72">Davide Mingozzi, «Alessandro Stradella "Bononiensis Dominus"», <i>Il Saggiatore musicale</i>, XXV (2018), pp. 299-307. <a role="doc-backlink" href="#rimando-72a" aria-label="Torna al rimando 72">Torna al testo</a></li>
            <li id="fonte-73">Locandina del convegno, Fivizzano, 6 dicembre 1997. <a role="doc-backlink" href="#rimando-73a" aria-label="Torna al rimando 73">Torna al testo</a></li>
            <li id="fonte-74">Iscrizione della lapide sulla casa degli Stradella, Fivizzano, 6 dicembre 1997. <a role="doc-backlink" href="#rimando-74a" aria-label="Torna al rimando 74">Torna al testo</a></li>
            <li id="fonte-75"><i>Parliamo insieme</i>, bollettino del Santuario della Madonna di Reggio, a. XXXIX, n. 12, dicembre 1997. <a role="doc-backlink" href="#rimando-75a" aria-label="Torna al rimando 75">Torna al testo</a></li>
            <li id="fonte-76">Statuto e documenti della Filarmonica Alessandro Stradella APS, 2026. <a role="doc-backlink" href="#rimando-76a" aria-label="Torna al rimando 76">Torna al testo</a></li>
        </ol>
        <p>
            Diploma dell'Accademia: Newberry Library, Chicago, Wing broadside ZP 735 .L45,
            <a href="https://collections.newberry.org/asset-management/2KXJ8Z9X0DEI" target="_blank" rel="noopener noreferrer">scheda della collezione</a>;
            <a
                href="https://commons.wikimedia.org/wiki/File:Diploma_Accademia_dei_Filarmonici_Dissonanti_di_Fivizzano,_Newberry_Library.jpg"
                target="_blank"
                rel="noopener noreferrer">scansione</a
            > su Wikimedia Commons. Pubblico dominio.
        </p>
        <p>
            Fotografia del 1921: Museo centrale del
            Risorgimento, Roma, album <i>Onoranze al Milite Ignoto</i>, MCRR 1000, foto 0009; pubblico dominio.
        </p>
        <p>
            Per approfondire: Duino Ceschi, <i>Giovanni Fantoni e l'Accademia di Belle Arti di Carrara […] e le Accademie Letteraria Lunense e dei
            Filarmonici Dissonanti di Fivizzano</i>, in <i>Atti e Memorie dell'Accademia Aruntica di Carrara</i>, vol. I, 1995, pp. 35-67.
        </p>
    </section>
</ArticleFooter>
