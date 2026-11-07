<!-- Testo rivisto il 7/11/2026 dalla ricerca storica (~/Filarmonica/Ricerca/note/Stradella per il sito - versione rivista.md), con 22 fonti -->
<script lang="ts">
    import { findArticle } from "$lib/articles";
    import ArticleHeader from "../../ArticleHeader.svelte";
    // Copertina: il frontespizio della Serenata a 3, in più misure, e la sua anteprima sfocata
    import serenataImg from "$lib/assets/imgs/serenata-stradella.jpg?enhanced&w=400;640;800;1280;1600&quality=40";
    import serenataPlaceholder from "$lib/assets/imgs/serenata-stradella.jpg?w=24&blur=2&format=webp&inline";
    // La lapide del 1997 ridisegnata a puntini dalla foto, un solo inchiostro su fondo trasparente, con il testo ricomposto riga per riga
    import targaImg from "$lib/assets/imgs/targa-stradella.png?enhanced&w=256;512;768";

    const article = findArticle("storia", "stradella")!;
</script>

<svelte:head>
    <title>Alessandro Stradella — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Perché la Filarmonica porta il nome di Alessandro Stradella: la sua famiglia a Fivizzano dal Quattrocento, il vescovo Alessio, la casa e la lapide del 1997."
    />
</svelte:head>

<!-- Nella fascia si tiene la parte con il titolo e il nome -->
<ArticleHeader {article} style="--cover-placeholder: url({serenataPlaceholder}); --cover-position: center 33%">
    <p>
        La famiglia di Alessandro Stradella era di Fivizzano. Per più di un secolo gli Stradella furono medici, giuristi, notai e uomini di Chiesa del paese. Da qui partì il ramo del compositore, che nacque a Bologna. Per questo la Filarmonica porta il suo nome.
    </p>
    <enhanced:img
        src={serenataImg}
        alt="Frontespizio manoscritto della «Serenata a 3 con stromenti del Sig.r Alessandro Stradella», copia del Settecento"
        sizes="100vw"
        fetchpriority="high"
        itemprop="image"
    />
</ArticleHeader>

<section>
    <h2>Il compositore</h2>
    <p>
        Alessandro Stradella fu uno dei compositori più importanti del Seicento italiano: scrisse cantate, oratori come il <i>San Giovanni Battista</i>, opere e musica strumentale<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Nacque a Bologna il <time datetime="1643-07-03">3 luglio 1643</time> e fu battezzato il 1° agosto con i nomi di Antonio Alessandro Boncompagno; il padrino, per procura, era il duca Ugo Boncompagni<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>. L'atto di battesimo è stato pubblicato da Davide Mingozzi nel <time datetime="2018">2018</time>. Prima si davano altre date: Carolyn Gianturco, nella biografia del <time datetime="1994">1994</time>, lo faceva nascere a Nepi nel <time datetime="1639">1639</time><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>; altri studiosi indicavano il <time datetime="1644">1644</time>, la data scritta anche sulla lapide di Fivizzano<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>.
    </p>
    <p>
        Crebbe a Roma, lavorò per le grandi famiglie romane e poi a Genova, dove morì il <time datetime="1682-02-25">25 febbraio 1682</time>, ucciso in un agguato<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>. Tra i suoi protettori c'erano i Doria. Nel <time datetime="1671">1671</time> scrisse il <i>Lamento del Tebro</i> per le nozze di Giovanni Andrea Doria con Anna Pamphili, e negli ultimi anni a Genova i Doria lo sostennero. Un secolo prima suo nonno Fulvio e due prozii erano stati al servizio di Andrea Doria<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>. Morì senza moglie, figli né testamento: l'eredità andò ai nipoti, figli dei fratelli Giuseppe e Stefano<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3c" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        La sua vita, tra fughe e amori contrastati, ha ispirato romanzi, melodrammi e film: l'opera <i>Alessandro Stradella</i> di Friedrich von Flotow (Amburgo, <time datetime="1844">1844</time>)<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>, <i>Amanti in fuga</i> di Giacomo Gentilomo (<time datetime="1946">1946</time>)<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1c" aria-label="Fonte 1">1</a></sup> e il musical barocco <i>La corda spezzata</i> di Francesco Leprino (<time datetime="2018">2018</time>)<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>. Per conoscerla meglio c'è la sua <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer">voce nel Dizionario Biografico degli Italiani</a>.
    </p>
</section>

<section>
    <h2>Gli Stradella a Fivizzano</h2>
    <p>
        La famiglia arrivò a Fivizzano da Borgo Val di Taro nel Quattrocento. Il primo fu il medico Matteo, figlio di ser Giovanni di Marco Stradella. Prese parte agli accordi con cui Fivizzano passò alla Repubblica di Firenze: Gianturco li data al <time datetime="1475">1475</time><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3d" aria-label="Fonte 3">3</a></sup>, mentre i capitoli concessi da Firenze che Giovanni Sforza ricorda sono del <time datetime="1477-03-06">6 marzo 1477</time><sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>. Matteo fu poi uno dei sei riformatori degli statuti del paese, approvati a Firenze il <time datetime="1480-11-17">17 novembre 1480</time>. Gli statuti lo chiamano «magistrum Mattheum q. ser Johannis Marci de Stradella de Burgho Vallis Tare»<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7b" aria-label="Fonte 7">7</a></sup>.
    </p>
    <p>
        Suo figlio Pellegrino sposò Alessandra Vugliani<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3e" aria-label="Fonte 3">3</a></sup>. Dei loro figli lo storico Achille Neri scrisse che quattro «ottennero la laurea dottorale»<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>. Portarono il nome della famiglia lontano da Fivizzano<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3f" aria-label="Fonte 3">3</a></sup>:
    </p>
    <dl>
        <dt>Giovanbattista</dt>
        <dd>dottore in legge, governatore di Rieti e di altre città dello Stato della Chiesa<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3g" aria-label="Fonte 3">3</a></sup>. Nel <time datetime="1567">1567</time> riformò di nuovo gli statuti di Fivizzano, e nel <time datetime="1585-11">novembre 1585</time> se ne fece fare una copia<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7c" aria-label="Fonte 7">7</a></sup>. Nel <time datetime="1572">1572</time> il cardinale Lomellini lo raccomandò al Senato di Genova per un posto di podestà o di vicario<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8b" aria-label="Fonte 8">8</a></sup></dd>
        <dt>Matteo</dt>
        <dd>medico dei Doria, principi di Melfi, per trent'anni</dd>
        <dt>Giannotino</dt>
        <dd>governatore di Melfi e cavaliere dell'Ordine di Santo Stefano</dd>
        <dt>Fulvio</dt>
        <dd>cancelliere del principe di Melfi, poi a Nepi: il nonno del compositore</dd>
        <dt>Ciro</dt>
        <dd>che Gianturco chiama anche Cividonio, notaio imperiale e fiorentino. Nel <time datetime="1591">1591</time> un notaio «ser Ciridonio Stradella», forse lui, rogò l'atto che univa la Badia di Linari al convento di Sant'Agostino di Fivizzano<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7d" aria-label="Fonte 7">7</a></sup></dd>
        <dt>Caterina</dt>
        <dd>seconda moglie di Romulo Malaspina della Verrucola</dd>
        <dt>Alessio</dt>
        <dd>frate agostiniano, vescovo di Nepi e Sutri</dd>
    </dl>
    <p>
        Lo stemma della famiglia è conservato nelle carte dell'Ordine di Santo Stefano, a Pisa: un leone rampante rosso in campo giallo, attraversato da una banda bianca<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3h" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        A Fivizzano gli Stradella restarono a lungo tra le famiglie di cui il paese andava fiero. Nel Settecento un elenco manoscritto degli «Uomini più illustri in scienza o bontà di vita, o dignità nativi alla terra di Fivizzano» si apre con Alessio Stradella<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>. Il naturalista Giovanni Targioni Tozzetti li contava tra le famiglie illustri del paese<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>. Ancora nel <time datetime="1836">1836</time> il <i>Calendario lunese</i>, stampato a Fivizzano, li metteva tra le famiglie più antiche e cospicue, insieme agli Andreani, ai Borni, ai Bosi, ai Bianchi, ai Cavalcani, ai Gargiolli, ai Fantoni, ai Vasoli e ai conti Onorati<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>.
    </p>
</section>

<section>
    <h2>Il vescovo Alessio</h2>
    <p>
        Non sappiamo con esattezza quando nacque Alessio. Neri scrive «sui primi del secolo XVI»<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8c" aria-label="Fonte 8">8</a></sup>, Saverio Franchi verso il <time datetime="1515">1515</time><sup><a href="#fonte-12" role="doc-noteref" id="rimando-12a" aria-label="Fonte 12">12</a></sup>, la lapide di Fivizzano nel <time datetime="1520">1520</time><sup><a href="#fonte-4" role="doc-noteref" id="rimando-4b" aria-label="Fonte 4">4</a></sup>. Fece la professione nel convento agostiniano di Genova intorno al <time datetime="1530">1530</time><sup><a href="#fonte-8" role="doc-noteref" id="rimando-8d" aria-label="Fonte 8">8</a></sup>. Nel 1555-56 fu processato dall'Inquisizione di Genova: nelle lettere di Michele Ghislieri all'inquisitore si legge che «lo Stradella ne uscì netto»<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8e" aria-label="Fonte 8">8</a></sup>.
    </p>
    <p>
        Divenne uno dei predicatori più ascoltati del suo tempo. Parlò nel duomo di Milano nel <time datetime="1560">1560</time>, al Concilio di Trento nel <time datetime="1562-05">maggio 1562</time> e alla dieta di Augusta nel <time datetime="1566">1566</time>, davanti all'imperatrice Maria d'Austria<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12b" aria-label="Fonte 12">12</a></sup>. Per la predica di Trento le fonti danno due giorni diversi: il 20 maggio secondo Neri, il 30 secondo Franchi e Gianturco<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8f" aria-label="Fonte 8">8</a></sup><sup><a href="#fonte-12" role="doc-noteref" id="rimando-12c" aria-label="Fonte 12">12</a></sup><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3i" aria-label="Fonte 3">3</a></sup>. Una sua predica uscì a Venezia nel <time datetime="1566">1566</time> nella raccolta di Tommaso Porcacchi, <i>Prima parte delle prediche di diversi illustri theologi</i><sup><a href="#fonte-13" role="doc-noteref" id="rimando-13a" aria-label="Fonte 13">13</a></sup>; un volume di <i>Prediche</i> fu stampato a Bologna nel <time datetime="1567">1567</time><sup><a href="#fonte-12" role="doc-noteref" id="rimando-12d" aria-label="Fonte 12">12</a></sup>. Fu procuratore generale del suo ordine e insegnò a Roma, alla Sapienza<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12e" aria-label="Fonte 12">12</a></sup>. Tra i suoi allievi ci fu Filippo Neri<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3j" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        Uno storico dell'Ottocento, Giovanni Pira, racconta che i Doria lo condussero a predicare a Oneglia, loro feudo, per riportare la pace tra gli abitanti e il feudatario. Pira la sapeva di seconda mano: nel <time datetime="1809">1809</time> l'abate Carlo Amoretti gli aveva scritto di averla letta «in un manoscritto del convento degli agostiniani di Fivizzano»<sup><a href="#fonte-14" role="doc-noteref" id="rimando-14a" aria-label="Fonte 14">14</a></sup>. Pira mette la notizia accanto alle convenzioni di Oneglia con Stefano Doria del <time datetime="1528-04-24">24 aprile 1528</time>, ma non dà una data alla predica. Nel <time datetime="1528">1528</time> Alessio, se nacque verso il 1515-1520, era un ragazzo: la data non torna, e il manoscritto letto da Amoretti non è stato ritrovato.
    </p>
    <p>
        Il <time datetime="1575-07-20">20 luglio 1575</time> papa Gregorio XIII lo nominò vescovo di Nepi e Sutri. Prese possesso della diocesi il 5 agosto, per procura, e vi si trasferì a novembre, «ben presto seguito dai fratelli, che lasciarono Fivizzano per Nepi»<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12f" aria-label="Fonte 12">12</a></sup>. A Nepi aprì un seminario con l'aiuto del Comune: otto seminaristi, «ai quali si davano lezioni di grammatica e di musica»<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12g" aria-label="Fonte 12">12</a></sup>. Fece fare un nuovo fonte battesimale con il suo stemma, e nel <time datetime="1580-05">maggio 1580</time> consacrò a Bracciano la chiesa di Santa Maria Novella<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12h" aria-label="Fonte 12">12</a></sup>. Nella storia di Sutri di Francesco Nispi Landi, alla serie dei vescovi, si legge: «1575 Fra Alessio Stradella di Fivizzano, celebre oratore»<sup><a href="#fonte-15" role="doc-noteref" id="rimando-15a" aria-label="Fonte 15">15</a></sup>.
    </p>
    <p>
        Scrisse anche memorie su Fivizzano. Due secoli dopo Targioni Tozzetti le usò per raccontare la visita di Cosimo I alle mura del paese, nel <time datetime="1557">1557</time>, e la storia del convento di Sant'Agostino<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10b" aria-label="Fonte 10">10</a></sup>. Il manoscritto non è stato ritrovato.
    </p>
    <p>
        Nel <time datetime="1580">1580</time> Gregorio XIII lo mandò come nunzio all'arciduca Carlo d'Austria, a Graz<sup><a href="#fonte-12" role="doc-noteref" id="rimando-12i" aria-label="Fonte 12">12</a></sup>. Durante il viaggio si fermò nel suo paese, si ammalò e lì morì, il 27 agosto. Fu sepolto nella chiesa di San Giovanni, accanto al convento degli agostiniani<sup><a href="#fonte-16" role="doc-noteref" id="rimando-16a" aria-label="Fonte 16">16</a></sup><sup><a href="#fonte-12" role="doc-noteref" id="rimando-12j" aria-label="Fonte 12">12</a></sup>. Nel <time datetime="1912">1912</time> la lapide con il suo epitaffio non c'era più<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8g" aria-label="Fonte 8">8</a></sup>. Resta una medaglia di bronzo con il suo ritratto, al Museo civico di Brescia. Intorno al busto si legge «Alexius Stradella Episc. Nep. et Sutr.»; sul rovescio c'è una vigna carica d'uva con il motto «Non sine lachrimis», non senza lacrime<sup><a href="#fonte-17" role="doc-noteref" id="rimando-17a" aria-label="Fonte 17">17</a></sup>.
    </p>
</section>

<section>
    <h2>Da Fivizzano a Nepi</h2>
    <p>
        Fulvio seguì il fratello a Nepi. Il <time datetime="1576-07-20">20 luglio 1576</time> vi sposò Lucrezia Tabussi, vedova, figlia di un capitano di Spoleto. Divenne cittadino di Nepi e vi comprò terre. Lì nel <time datetime="1579">1579</time> fu battezzato suo figlio Marc'Antonio, e nel <time datetime="1584">1584</time> la figlia Costanza<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3k" aria-label="Fonte 3">3</a></sup>. Fulvio morì tra la fine del <time datetime="1587">1587</time> e l'inizio del <time datetime="1588">1588</time>. Secondo Gianturco la sua morte è registrata nel libro dei morti della parrocchia di Fivizzano<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3l" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        Giannotino morì senza figli nel <time datetime="1588">1588</time>. Aveva lasciato all'Ordine di Santo Stefano le rendite dei suoi beni di Fivizzano, la «Commenda Stradella», che passò al nipote Marc'Antonio, cavaliere di Santo Stefano dal <time datetime="1592">1592</time>. Gli Stradella rimasti in paese contestarono l'eredità. Nel <time datetime="1611">1611</time> Marc'Antonio vendette i beni di Fivizzano per 3.200 scudi<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3m" aria-label="Fonte 3">3</a></sup><sup><a href="#fonte-18" role="doc-noteref" id="rimando-18a" aria-label="Fonte 18">18</a></sup>. Ancora nel <time datetime="1638">1638</time>, chiedendo la croce di Santo Stefano per il figlio Giuseppe, si diceva titolare della commenda «fondata dal qu. Giannotino Stradella di Fivizzano suo zio»<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3n" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        Anche Marc'Antonio ebbe a che fare con la musica: nel <time datetime="1609">1609</time> curò a Roma la stampa del primo libro di madrigali di Giovanni Girolamo Kapsberger<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3o" aria-label="Fonte 3">3</a></sup>. Si sposò due volte, con Laudomia Vaccari di Anguillara e poi con Vittoria Bartoli. Dal <time datetime="1642">1642</time> fu vicemarchese di Vignola<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2b" aria-label="Fonte 2">2</a></sup>. Suo figlio era Alessandro.
    </p>
</section>

<section>
    <h2>La casa</h2>
    <p>
        A Fivizzano, vicino alle mura, c'è la casa che il paese chiama «Casa degli Stradella». Non sappiamo ancora quando la famiglia la lasciò. Nel catasto leopoldino, verso il <time datetime="1826">1826</time>, non era più degli Stradella: il fabbricato principale era dei Lambruschi<sup><a href="#fonte-19" role="doc-noteref" id="rimando-19a" aria-label="Fonte 19">19</a></sup>. La casa fu danneggiata dal terremoto del <time datetime="1920">1920</time> e nella ricostruzione perse un piano<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4c" aria-label="Fonte 4">4</a></sup>.
    </p>
</section>

<section>
    <h2>Il nome della Filarmonica</h2>
    <p>
        Il ramo fivizzanese della famiglia lo ha ricostruito Patrizia Radicchi, su invito di Carolyn Gianturco<sup><a href="#fonte-18" role="doc-noteref" id="rimando-18b" aria-label="Fonte 18">18</a></sup><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3p" aria-label="Fonte 3">3</a></sup>. Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica, il Comune e la Fondazione Cassa di Risparmio di Carrara presentarono queste ricerche in una giornata intera, «Alessandro Stradella e la Musica Barocca. Le origini ritrovate». Il pomeriggio, a Palazzo Coiari, parlarono Gianturco e Radicchi; la sera ci fu un concerto di musica barocca nella chiesa prepositurale<sup><a href="#fonte-20" role="doc-noteref" id="rimando-20a" aria-label="Fonte 20">20</a></sup>. Lo stesso giorno, «auspice la Società Filarmonica», il Comune murò sulla casa una lapide<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4d" aria-label="Fonte 4">4</a></sup>. Vi si legge che Alessandro nacque nel <time datetime="1644">1644</time>: era la data accettata allora, prima che si trovasse a Bologna l'atto di battesimo del <time datetime="1643">1643</time><sup><a href="#fonte-4" role="doc-noteref" id="rimando-4e" aria-label="Fonte 4">4</a></sup><sup><a href="#fonte-2" role="doc-noteref" id="rimando-2c" aria-label="Fonte 2">2</a></sup>.
    </p>
    <figure class="inchiostro">
        <enhanced:img
            src={targaImg}
            alt="Lapide con quattro borchie e la scritta: Casa degli Stradella, dalla cui famiglia uscirono Alessio, 1520-1580, agostiniano, procuratore generale dell'Ordine, vescovo di Nepi e Sotri (sic), nunzio apostolico in Germania; Alessandro, 1644-1682, compositore e cantante. L'Amministrazione comunale, auspice la Società Filarmonica, 6 dicembre 1997"
            sizes="24rem"
            loading="lazy"
        />
        <figcaption>La lapide sulla casa degli Stradella, ridisegnata da una fotografia.</figcaption>
    </figure>
    <p>
        Secondo i ricordi dei soci, in quell'occasione la Filarmonica prese il nome di Alessandro Stradella<sup><a href="#fonte-21" role="doc-noteref" id="rimando-21a" aria-label="Fonte 21">21</a></sup>.
    </p>
    <p>
        Il <time datetime="2022-07-30">30 luglio 2022</time>, nel Museo degli Agostiniani di Fivizzano, un convegno durante il Lunigiana International Music Festival è stato dedicato alla vita e alle opere di Stradella; il Comune ha detto di volerne fare «uno dei suoi personaggi simbolo»<sup><a href="#fonte-22" role="doc-noteref" id="rimando-22a" aria-label="Fonte 22">22</a></sup>. Il resto della nostra storia è nell'articolo <a href="/articoli/storia/filarmonica">Storia della Filarmonica</a>.
    </p>
</section>

<section role="doc-endnotes" aria-labelledby="fonti">
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">Andrea Garavaglia, <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer">«Stradella, Alessandro»</a>, <i>Dizionario Biografico degli Italiani</i>, vol. 94, Roma, Istituto della Enciclopedia Italiana, 2019. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando 1a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando 1b">b</a>, <a role="doc-backlink" href="#rimando-1c" aria-label="Torna al rimando 1c">c</a></li>
        <li id="fonte-2">Davide Mingozzi, «Alessandro Stradella “Bononiensis Dominus”», <i>Il Saggiatore musicale</i>, XXV (2018), n. 2, pp. 299-307. Torna al testo: <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando 2a">a</a>, <a role="doc-backlink" href="#rimando-2b" aria-label="Torna al rimando 2b">b</a>, <a role="doc-backlink" href="#rimando-2c" aria-label="Torna al rimando 2c">c</a></li>
        <li id="fonte-3">Carolyn Gianturco, <i>Alessandro Stradella, 1639-1682: his life and music</i>, Oxford, Clarendon Press, 1994, cap. 1 (pp. 3-11) e tavv. 1-2 (documenti dell'Archivio di Stato di Pisa, Ordine di Santo Stefano). Il titolo riflette la data di nascita allora creduta, oggi superata. Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando 3a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando 3b">b</a>, <a role="doc-backlink" href="#rimando-3c" aria-label="Torna al rimando 3c">c</a>, <a role="doc-backlink" href="#rimando-3d" aria-label="Torna al rimando 3d">d</a>, <a role="doc-backlink" href="#rimando-3e" aria-label="Torna al rimando 3e">e</a>, <a role="doc-backlink" href="#rimando-3f" aria-label="Torna al rimando 3f">f</a>, <a role="doc-backlink" href="#rimando-3g" aria-label="Torna al rimando 3g">g</a>, <a role="doc-backlink" href="#rimando-3h" aria-label="Torna al rimando 3h">h</a>, <a role="doc-backlink" href="#rimando-3i" aria-label="Torna al rimando 3i">i</a>, <a role="doc-backlink" href="#rimando-3j" aria-label="Torna al rimando 3j">j</a>, <a role="doc-backlink" href="#rimando-3k" aria-label="Torna al rimando 3k">k</a>, <a role="doc-backlink" href="#rimando-3l" aria-label="Torna al rimando 3l">l</a>, <a role="doc-backlink" href="#rimando-3m" aria-label="Torna al rimando 3m">m</a>, <a role="doc-backlink" href="#rimando-3n" aria-label="Torna al rimando 3n">n</a>, <a role="doc-backlink" href="#rimando-3o" aria-label="Torna al rimando 3o">o</a>, <a role="doc-backlink" href="#rimando-3p" aria-label="Torna al rimando 3p">p</a></li>
        <li id="fonte-4">Iscrizione della lapide sulla casa degli Stradella, Fivizzano, 6 dicembre 1997; Nicolò Colliva, <a href="https://www.studiocolliva.it/archivi/casa-degli-stradella-fivizzano-ms/" target="_blank" rel="noopener noreferrer">«Casa degli Stradella – Fivizzano (MS)»</a>, Studio Colliva, 2025. Torna al testo: <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando 4a">a</a>, <a role="doc-backlink" href="#rimando-4b" aria-label="Torna al rimando 4b">b</a>, <a role="doc-backlink" href="#rimando-4c" aria-label="Torna al rimando 4c">c</a>, <a role="doc-backlink" href="#rimando-4d" aria-label="Torna al rimando 4d">d</a>, <a role="doc-backlink" href="#rimando-4e" aria-label="Torna al rimando 4e">e</a></li>
        <li id="fonte-5">IMSLP, <a href="https://imslp.org/wiki/Alessandro_Stradella_(Flotow,_Friedrich_von)" target="_blank" rel="noopener noreferrer"><i>Alessandro Stradella</i> (Flotow, Friedrich von)</a>, scheda dell'opera (prima rappresentazione: Amburgo, Stadttheater, 30 dicembre 1844). <a role="doc-backlink" href="#rimando-5a" aria-label="Torna al rimando 5">Torna al testo</a></li>
        <li id="fonte-6">MYmovies, <a href="https://www.mymovies.it/film/2018/la-corda-spezzata/" target="_blank" rel="noopener noreferrer"><i>La corda spezzata</i></a> (2018), scheda del film. <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando 6">Torna al testo</a></li>
        <li id="fonte-7">Giovanni Sforza, <a href="https://books.google.it/books?id=Tfx5Y0GvsugC&pg=PA23" target="_blank" rel="noopener noreferrer"><i>Saggio d'una bibliografia storica della Lunigiana</i></a>, I, 1874, pp. 22-24 e 143. Torna al testo: <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando 7a">a</a>, <a role="doc-backlink" href="#rimando-7b" aria-label="Torna al rimando 7b">b</a>, <a role="doc-backlink" href="#rimando-7c" aria-label="Torna al rimando 7c">c</a>, <a role="doc-backlink" href="#rimando-7d" aria-label="Torna al rimando 7d">d</a></li>
        <li id="fonte-8">Achille Neri, «Scrittori di Lunigiana. Alessio Stradella», <i>Giornale storico della Lunigiana</i>, IV (1912-13), pp. 22-30, con documenti dell'Archivio di Stato di Genova e della Biblioteca universitaria di Genova. Torna al testo: <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando 8a">a</a>, <a role="doc-backlink" href="#rimando-8b" aria-label="Torna al rimando 8b">b</a>, <a role="doc-backlink" href="#rimando-8c" aria-label="Torna al rimando 8c">c</a>, <a role="doc-backlink" href="#rimando-8d" aria-label="Torna al rimando 8d">d</a>, <a role="doc-backlink" href="#rimando-8e" aria-label="Torna al rimando 8e">e</a>, <a role="doc-backlink" href="#rimando-8f" aria-label="Torna al rimando 8f">f</a>, <a role="doc-backlink" href="#rimando-8g" aria-label="Torna al rimando 8g">g</a></li>
        <li id="fonte-9">«Uomini più illustri in scienza o bontà di vita, o dignità nativi alla terra di Fivizzano», manoscritto del Settecento, Città della Pieve, Biblioteca comunale, Misc. 2, cc. 224-241 (Alessio Stradella a c. 226r); scheda in <a href="https://manus.iccu.sbn.it/risultati-ricerca-manoscritti/-/manus-search/detail/647794" target="_blank" rel="noopener noreferrer">Manus online</a>. <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando 9">Torna al testo</a></li>
        <li id="fonte-10">Giovanni Targioni Tozzetti, <a href="https://babel.hathitrust.org/cgi/pt?id=hvd.32044107242364&seq=452" target="_blank" rel="noopener noreferrer"><i>Relazioni d'alcuni viaggi fatti in diverse parti della Toscana</i></a>, 2ª ed., XI, pp. 428-449. Torna al testo: <a role="doc-backlink" href="#rimando-10a" aria-label="Torna al rimando 10a">a</a>, <a role="doc-backlink" href="#rimando-10b" aria-label="Torna al rimando 10b">b</a></li>
        <li id="fonte-11"><a href="https://babel.hathitrust.org/cgi/pt?id=nyp.33433081589396&seq=60" target="_blank" rel="noopener noreferrer"><i>Calendario lunese per l'anno 1836</i></a>, Fivizzano, p. 36. <a role="doc-backlink" href="#rimando-11a" aria-label="Torna al rimando 11">Torna al testo</a></li>
        <li id="fonte-12">Saverio Franchi, <a href="https://www.gentedituscia.it/stradella-alessio/" target="_blank" rel="noopener noreferrer">«Stradella Alessio»</a>, <i>Dizionario Storico Biografico della Tuscia</i> (con rimando a <i>Hierarchia catholica</i>, III, p. 326, per la nomina del 20 luglio 1575). Torna al testo: <a role="doc-backlink" href="#rimando-12a" aria-label="Torna al rimando 12a">a</a>, <a role="doc-backlink" href="#rimando-12b" aria-label="Torna al rimando 12b">b</a>, <a role="doc-backlink" href="#rimando-12c" aria-label="Torna al rimando 12c">c</a>, <a role="doc-backlink" href="#rimando-12d" aria-label="Torna al rimando 12d">d</a>, <a role="doc-backlink" href="#rimando-12e" aria-label="Torna al rimando 12e">e</a>, <a role="doc-backlink" href="#rimando-12f" aria-label="Torna al rimando 12f">f</a>, <a role="doc-backlink" href="#rimando-12g" aria-label="Torna al rimando 12g">g</a>, <a role="doc-backlink" href="#rimando-12h" aria-label="Torna al rimando 12h">h</a>, <a role="doc-backlink" href="#rimando-12i" aria-label="Torna al rimando 12i">i</a>, <a role="doc-backlink" href="#rimando-12j" aria-label="Torna al rimando 12j">j</a></li>
        <li id="fonte-13">[Tommaso Porcacchi (a cura di)], <a href="https://archive.org/details/ARes785151" target="_blank" rel="noopener noreferrer"><i>Prima parte delle prediche di diversi illustri theologi</i></a>, Venezia, 1566, p. 371 (predica di Alessio Stradella). <a role="doc-backlink" href="#rimando-13a" aria-label="Torna al rimando 13">Torna al testo</a></li>
        <li id="fonte-14">Giovanni Pira, <a href="https://archive.org/details/storiadellacitta00pira" target="_blank" rel="noopener noreferrer"><i>Storia della città e principato di Oneglia</i></a>, I, Genova, 1847, p. 238 e nota 1 (lettera di Carlo Amoretti, Milano, 30 agosto 1809). <a role="doc-backlink" href="#rimando-14a" aria-label="Torna al rimando 14">Torna al testo</a></li>
        <li id="fonte-15">Francesco Nispi Landi, <a href="https://archive.org/details/storiadellantich00nisp" target="_blank" rel="noopener noreferrer"><i>Storia dell'antichissima città di Sutri</i></a>, Roma, 1887, pp. 319-320. <a role="doc-backlink" href="#rimando-15a" aria-label="Torna al rimando 15">Torna al testo</a></li>
        <li id="fonte-16">Emanuele Gerini, <a href="https://books.google.it/books?id=a0gssshrWAsC&pg=PA137" target="_blank" rel="noopener noreferrer"><i>Memorie storiche d'illustri scrittori e di uomini insigni dell'antica e moderna Lunigiana</i></a>, II, Massa, 1829, pp. 136-138. <a role="doc-backlink" href="#rimando-16a" aria-label="Torna al rimando 16">Torna al testo</a></li>
        <li id="fonte-17">Prospero Rizzini, <a href="https://archive.org/details/illustrazionede00rizzgoog" target="_blank" rel="noopener noreferrer"><i>Illustrazione dei civici musei di Brescia. Medaglie</i></a>, Brescia, 1892, n. 726 (bronzo, 41 mm, legato Brozzoni). <a role="doc-backlink" href="#rimando-17a" aria-label="Torna al rimando 17">Torna al testo</a></li>
        <li id="fonte-18">Patrizia Radicchi, «La famiglia Stradella e i suoi rapporti con la Toscana», <i>Chigiana</i>, XXXIX, n.s. 19 (1988), pp. 17-33. Torna al testo: <a role="doc-backlink" href="#rimando-18a" aria-label="Torna al rimando 18a">a</a>, <a role="doc-backlink" href="#rimando-18b" aria-label="Torna al rimando 18b">b</a></li>
        <li id="fonte-19">Catasto generale toscano (leopoldino), Fivizzano, sezione L, tavola indicativa, tomo 4, p. 84, particelle 143-145, <a href="https://www502.regione.toscana.it/searcherlite/castore_scheda_dettaglio.jsp?id=142_Tomo4_0084" target="_blank" rel="noopener noreferrer">CASTORE, Regione Toscana</a>. <a role="doc-backlink" href="#rimando-19a" aria-label="Torna al rimando 19">Torna al testo</a></li>
        <li id="fonte-20">Locandina «Alessandro Stradella e la Musica Barocca. Le origini ritrovate», Fivizzano, 6 dicembre 1997. <a role="doc-backlink" href="#rimando-20a" aria-label="Torna al rimando 20">Torna al testo</a></li>
        <li id="fonte-21">Ricordi dei soci della Filarmonica, raccolti nel 2026. <a role="doc-backlink" href="#rimando-21a" aria-label="Torna al rimando 21">Torna al testo</a></li>
        <li id="fonte-22"><a href="https://www.ilcorriereapuano.it/2022/08/il-musicista-alessandro-stradella-con-origini-nobiliari-fivizzanesi/" target="_blank" rel="noopener noreferrer">«Il musicista Alessandro Stradella con origini nobiliari fivizzanesi»</a>, <i>Il Corriere Apuano</i>, 4-5 agosto 2022. <a role="doc-backlink" href="#rimando-22a" aria-label="Torna al rimando 22">Torna al testo</a></li>
    </ol>
    <p>
        Immagine di copertina: frontespizio della
        <a href="https://gallica.bnf.fr/ark:/12148/btv1b10886345f/f2.item" target="_blank" rel="noopener noreferrer"
            ><i>Serenata a 3 con stromenti del signor Alessandro Stradella</i></a
        >, copia manoscritta del Settecento, Bibliothèque nationale de France, département de la Musique, RES VS-1397. Pubblico dominio.
    </p>
</section>

<p class="rimando"><a href="/articoli">Articoli</a></p>

<style>
    figure :global(img) {
        display: block;
        inline-size: min(100%, calc(var(--container-text) * 2 / 3));
        block-size: auto;
    }
</style>
