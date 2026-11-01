<!-- Fonti: Gianturco 1994, Radicchi 1988, Sforza 1874, Gerini 1829, Mingozzi 2018, DBI 2019, locandina e lapide del 6 dicembre 1997 (ricerca in ~/Filarmonica/Ricerca) -->
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
<ArticleHeader {article} style="--cover-placeholder: url({serenataPlaceholder}); --cover-position: center 33%; --cover-archive: 1">
    <p>
        La famiglia di Alessandro Stradella era di Fivizzano. Per più di un secolo gli Stradella furono medici, giuristi, notai e uomini di Chiesa del
        paese, e da qui partì il ramo del compositore, che nacque a Bologna. Per questo la Filarmonica porta il suo nome.
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
        Alessandro Stradella fu uno dei compositori più importanti del Seicento italiano: scrisse cantate, oratori come il <i>San Giovanni Battista</i>,
        opere e musica strumentale. Nacque a Bologna il <time datetime="1643-07-03">3 luglio 1643</time><sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>, crebbe a Roma, lavorò per le grandi
        famiglie romane e poi a Genova, dove morì il <time datetime="1682-02-25">25 febbraio 1682</time>, ucciso in un agguato<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>. A Genova tra i suoi
        protettori c'erano i Doria, che un secolo prima avevano avuto al loro servizio i suoi antenati fivizzanesi<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>. Non lasciò moglie né figli<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3b" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        La sua vita, tra fughe e amori contrastati, ha ispirato romanzi, melodrammi (tra cui l'opera <a href="https://imslp.org/wiki/Alessandro_Stradella_(Flotow,_Friedrich_von)" target="_blank" rel="noopener noreferrer"><i>Alessandro Stradella</i></a> di Friedrich von Flotow, Amburgo 1844) e film: <i>Amanti in fuga</i> di Giacomo Gentilomo (1946)<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2b" aria-label="Fonte 2">2</a></sup> e il musical barocco <i>La corda spezzata</i> di Francesco Leprino (2018)<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup>. Per conoscerla meglio c'è la sua
        <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer"
            >voce nel Dizionario Biografico degli Italiani</a
        >.
    </p>
</section>

<section>
    <h2>Gli Stradella a Fivizzano</h2>
    <p>
        La famiglia arrivò a Fivizzano da Borgo Val di Taro nel Quattrocento. Il medico Matteo, figlio di ser Giovanni di Marco Stradella, partecipò agli
        accordi con cui Fivizzano passò alla Repubblica di Firenze nel <time datetime="1477">1477</time><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3c" aria-label="Fonte 3">3</a></sup> e fu tra i riformatori degli statuti
        del paese, approvati a Firenze il <time datetime="1480-11-17">17 novembre 1480</time><sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>.
    </p>
    <p>
        Suo figlio Pellegrino sposò Alessandra Vugliani. I loro figli portarono il nome della famiglia lontano da Fivizzano<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3d" aria-label="Fonte 3">3</a></sup>:
    </p>
    <dl>
        <dt>Giovanbattista</dt>
        <dd>dottore in legge, governatore di Rieti e di altre città dello Stato della Chiesa; nel 1567 riformò di nuovo gli statuti di Fivizzano<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5b" aria-label="Fonte 5">5</a></sup></dd>
        <dt>Matteo</dt>
        <dd>medico dei Doria, principi di Melfi, per trent'anni</dd>
        <dt>Giannotino</dt>
        <dd>governatore di Melfi e cavaliere dell'Ordine di Santo Stefano</dd>
        <dt>Fulvio</dt>
        <dd>cancelliere del principe di Melfi, poi a Nepi: il nonno del compositore</dd>
        <dt>Ciro</dt>
        <dd>notaio imperiale e fiorentino</dd>
        <dt>Caterina</dt>
        <dd>sposa in seconde nozze di Romulo Malaspina della Verrucola</dd>
        <dt>Alessio</dt>
        <dd>frate agostiniano, vescovo di Nepi e Sutri</dd>
    </dl>
</section>

<section>
    <h2>Il vescovo Alessio</h2>
    <p>
        Alessio entrò nell'ordine agostiniano e fu predicatore. Partecipò al Concilio di Trento e insegnò teologia a
        Roma, dove tra i suoi allievi ci fu Filippo Neri<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3e" aria-label="Fonte 3">3</a></sup>. Il <time datetime="1575-07-20">20 luglio 1575</time> papa Gregorio XIII lo nominò
        vescovo di Nepi e Sutri<sup><a href="#fonte-6" role="doc-noteref" id="rimando-6a" aria-label="Fonte 6">6</a></sup>; a Nepi chiese al Comune un seminario «con un maestro di grammatica e di musica»<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3f" aria-label="Fonte 3">3</a></sup>. Scrisse anche
        memorie su Fivizzano, che il naturalista Giovanni Targioni Tozzetti citò due secoli dopo<sup><a href="#fonte-7" role="doc-noteref" id="rimando-7a" aria-label="Fonte 7">7</a></sup>.
    </p>
    <p>
        Nel <time datetime="1580">1580</time> fu nominato nunzio apostolico a Graz. Durante il viaggio si fermò nel suo paese e lì morì, il
        <time datetime="1580-08-27">27 agosto</time>; fu sepolto nella chiesa di San Giovanni, accanto al convento degli agostiniani<sup><a href="#fonte-8" role="doc-noteref" id="rimando-8a" aria-label="Fonte 8">8</a></sup>.
    </p>
</section>

<section>
    <h2>Da Fivizzano a Nepi</h2>
    <p>
        Fulvio seguì il fratello a Nepi, si sposò e vi mise radici: lì nel <time datetime="1579">1579</time> nacque suo figlio Marc'Antonio. Giannotino,
        morto senza figli nel <time datetime="1588">1588</time>, aveva lasciato all'Ordine di Santo Stefano le rendite dei suoi beni di Fivizzano, la
        «Commenda Stradella», che passò al nipote Marc'Antonio. Gli Stradella rimasti in paese contestarono l'eredità, e nel
        <time datetime="1611">1611</time> Marc'Antonio vendette i beni fivizzanesi; ancora nel 1638 si diceva titolare della commenda «fondata dal qu.
        Giannotino Stradella di Fivizzano suo zio»<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3g" aria-label="Fonte 3">3</a></sup><sup><a href="#fonte-9" role="doc-noteref" id="rimando-9a" aria-label="Fonte 9">9</a></sup>.
    </p>
    <p>
        Anche Marc'Antonio ebbe a che fare con la musica: nel <time datetime="1609">1609</time> curò a Roma la stampa del primo libro di madrigali di Giovanni Girolamo
        Kapsberger<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3h" aria-label="Fonte 3">3</a></sup>. Suo figlio era Alessandro. Un altro ramo della famiglia restò a Fivizzano: nel <time datetime="1610">1610</time> vi nacque
        Giovanni Battista, figlio di Pellegrino Stradella e di Angelica Rossi<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3i" aria-label="Fonte 3">3</a></sup>.
    </p>
</section>

<section>
    <h2>La casa e il nome della Filarmonica</h2>
    <p>
        La casa degli Stradella sorge vicino alle mura del paese. Fu danneggiata dal terremoto del 1920 e nella ricostruzione perse un piano<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10a" aria-label="Fonte 10">10</a></sup>.
    </p>
    <p>
        Il ramo fivizzanese della famiglia lo ha ricostruito Patrizia Radicchi, su invito della musicologa Carolyn Gianturco, autrice della biografia di riferimento del compositore (1994)<sup><a href="#fonte-9" role="doc-noteref" id="rimando-9b" aria-label="Fonte 9">9</a></sup><sup><a href="#fonte-3" role="doc-noteref" id="rimando-3j" aria-label="Fonte 3">3</a></sup>. Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica, il Comune e la
        Fondazione Cassa di Risparmio di Carrara presentarono queste ricerche in una giornata intera, «Alessandro Stradella e la Musica Barocca. Le origini
        ritrovate»: il pomeriggio la conferenza a Palazzo Coiari, la sera un concerto di musica barocca nella chiesa prepositurale<sup><a href="#fonte-11" role="doc-noteref" id="rimando-11a" aria-label="Fonte 11">11</a></sup>. Lo stesso
        giorno, «auspice la Società Filarmonica», fu murata sulla casa una lapide. Vi si legge che Alessandro nacque nel 1644: era la data accettata allora,
        prima che si trovasse a Bologna l'atto di battesimo del 1643<sup><a href="#fonte-10" role="doc-noteref" id="rimando-10b" aria-label="Fonte 10">10</a></sup><sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>.
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
        Alla fine degli anni Novanta la Filarmonica prese il nome di Alessandro Stradella. Il resto della nostra storia è nell'articolo
        <a href="/articoli/storia/filarmonica">La storia della Filarmonica</a>.
    </p>
</section>

<section role="doc-endnotes" aria-labelledby="fonti">
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">Davide Mingozzi, «Alessandro Stradella “Bononiensis Dominus”», <i>Il Saggiatore musicale</i>, XXV (2018), pp. 299-307. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando 1a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando 1b">b</a></li>
        <li id="fonte-2">Andrea Garavaglia, <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer">Stradella, Alessandro</a>, Dizionario Biografico degli Italiani, vol. 94, 2019. Torna al testo: <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando 2a">a</a>, <a role="doc-backlink" href="#rimando-2b" aria-label="Torna al rimando 2b">b</a></li>
        <li id="fonte-3">Carolyn Gianturco, <i>Alessandro Stradella, 1639-1682: his life and music</i>, Oxford, Clarendon Press, 1994, pp. 3-7 e 55. Torna al testo: <a role="doc-backlink" href="#rimando-3a" aria-label="Torna al rimando 3a">a</a>, <a role="doc-backlink" href="#rimando-3b" aria-label="Torna al rimando 3b">b</a>, <a role="doc-backlink" href="#rimando-3c" aria-label="Torna al rimando 3c">c</a>, <a role="doc-backlink" href="#rimando-3d" aria-label="Torna al rimando 3d">d</a>, <a role="doc-backlink" href="#rimando-3e" aria-label="Torna al rimando 3e">e</a>, <a role="doc-backlink" href="#rimando-3f" aria-label="Torna al rimando 3f">f</a>, <a role="doc-backlink" href="#rimando-3g" aria-label="Torna al rimando 3g">g</a>, <a role="doc-backlink" href="#rimando-3h" aria-label="Torna al rimando 3h">h</a>, <a role="doc-backlink" href="#rimando-3i" aria-label="Torna al rimando 3i">i</a>, <a role="doc-backlink" href="#rimando-3j" aria-label="Torna al rimando 3j">j</a></li>
        <li id="fonte-4">MYmovies, <a href="https://www.mymovies.it/film/2018/la-corda-spezzata/" target="_blank" rel="noopener noreferrer">La corda spezzata</a> (2018), scheda del film. <a role="doc-backlink" href="#rimando-4a" aria-label="Torna al rimando 4">Torna al testo</a></li>
        <li id="fonte-5">Giovanni Sforza, <i>Saggio d'una bibliografia storica della Lunigiana</i>, I, 1874, pp. 22-24 e 143. Torna al testo: <a role="doc-backlink" href="#rimando-5a" aria-label="Torna al rimando 5a">a</a>, <a role="doc-backlink" href="#rimando-5b" aria-label="Torna al rimando 5b">b</a></li>
        <li id="fonte-6">Saverio Franchi, <a href="https://www.gentedituscia.it/stradella-alessio/" target="_blank" rel="noopener noreferrer">Stradella Alessio</a>, Dizionario Storico Biografico della Tuscia. <a role="doc-backlink" href="#rimando-6a" aria-label="Torna al rimando 6">Torna al testo</a></li>
        <li id="fonte-7">Giovanni Targioni Tozzetti, <i>Relazioni d'alcuni viaggi fatti in diverse parti della Toscana</i>, 2ª ed., XI, pp. 428-448. <a role="doc-backlink" href="#rimando-7a" aria-label="Torna al rimando 7">Torna al testo</a></li>
        <li id="fonte-8">Emanuele Gerini, <i>Memorie storiche d'illustri scrittori e di uomini insigni dell'antica e moderna Lunigiana</i>, II, Massa, 1829, pp. 136-138. <a role="doc-backlink" href="#rimando-8a" aria-label="Torna al rimando 8">Torna al testo</a></li>
        <li id="fonte-9">Patrizia Radicchi, «La famiglia Stradella e i suoi rapporti con la Toscana», <i>Chigiana</i>, XXXIX, n.s. 19 (1988), pp. 17-33. Torna al testo: <a role="doc-backlink" href="#rimando-9a" aria-label="Torna al rimando 9a">a</a>, <a role="doc-backlink" href="#rimando-9b" aria-label="Torna al rimando 9b">b</a></li>
        <li id="fonte-10">Iscrizione della lapide sulla casa degli Stradella, Fivizzano, 6 dicembre 1997; Nicolò Colliva, <a href="https://www.studiocolliva.it/archivi/casa-degli-stradella-fivizzano-ms/" target="_blank" rel="noopener noreferrer">Casa degli Stradella – Fivizzano (MS)</a>, Studio Colliva, 2025. Torna al testo: <a role="doc-backlink" href="#rimando-10a" aria-label="Torna al rimando 10a">a</a>, <a role="doc-backlink" href="#rimando-10b" aria-label="Torna al rimando 10b">b</a></li>
        <li id="fonte-11">Locandina «Alessandro Stradella e la Musica Barocca. Le origini ritrovate», Fivizzano, 6 dicembre 1997. <a role="doc-backlink" href="#rimando-11a" aria-label="Torna al rimando 11">Torna al testo</a></li>
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
