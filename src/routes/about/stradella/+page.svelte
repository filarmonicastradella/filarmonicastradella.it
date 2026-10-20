<!-- Fonti: Dizionario Biografico degli Italiani (A. Garavaglia, 2019), Wikipedia (voce Alessio Stradella), Dizionario Storico Biografico della Tuscia (S. Franchi), locandina del 6 dicembre 1997 -->
<script lang="ts">
    // Copertina: il frontespizio della Serenata a 3, in più misure, e la sua anteprima sfocata
    import serenataImg from "$lib/assets/imgs/serenata-stradella.jpg?enhanced&w=400;640;800;1280;1600";
    import serenataPlaceholder from "$lib/assets/imgs/serenata-stradella.jpg?w=24&blur=2&format=webp&inline";
</script>

<svelte:head>
    <title>Alessandro Stradella — Filarmonica Alessandro Stradella APS</title>
    <meta
        name="description"
        content="Perché la Filarmonica porta il nome di Alessandro Stradella: il compositore del Seicento e la sua famiglia di Fivizzano, dal prozio Alessio, vescovo di Nepi."
    />
</svelte:head>

<!-- Nella fascia si tiene la parte con il titolo e il nome -->
<header style="--cover-placeholder: url({serenataPlaceholder}); --cover-position: center 33%; --cover-archive: 1">
    <h1>Alessandro Stradella</h1>
    <p>Il compositore del Seicento che dà il nome alla Filarmonica, e la sua famiglia di Fivizzano.</p>
    <enhanced:img
        src={serenataImg}
        alt="Frontespizio manoscritto della «Serenata a 3 con stromenti del Sig.r Alessandro Stradella», copia del Settecento"
        sizes="100vw"
        fetchpriority="high"
    />
</header>

<section>
    <h2>Il compositore</h2>
    <p>
        Alessandro Stradella è uno dei compositori più importanti del Seicento italiano: scrisse cantate, oratori, opere e musica strumentale, tra cui
        l'oratorio <i>San Giovanni Battista</i>. Nacque a Bologna il <time datetime="1643-07-03">3 luglio 1643</time>, dove la famiglia, che viveva a
        Nepi, si era rifugiata durante la guerra di Castro<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1a" aria-label="Fonte 1">1</a></sup>. Crebbe a Roma, lavorò per le grandi famiglie romane e poi a Genova, dove morì il
        <time datetime="1682-02-25">25 febbraio 1682</time>, ucciso in un agguato per motivi mai chiariti<sup><a href="#fonte-1" role="doc-noteref" id="rimando-1b" aria-label="Fonte 1">1</a></sup>.
    </p>
    <p>
        La sua vita avventurosa ha ispirato romanzi, melodrammi e perfino un film. Per conoscerla meglio c'è la sua
        <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer"
            >voce nel Dizionario Biografico degli Italiani</a
        >.
    </p>
</section>

<section>
    <h2>Una famiglia di Fivizzano</h2>
    <p>
        Gli Stradella erano una famiglia nobile di Fivizzano. Fu un fivizzanese, Alessio, a portarla lontano: educato nel convento degli agostiniani
        del paese, entrò nell'ordine a Genova e divenne uno dei predicatori più stimati del suo tempo. Partecipò al Concilio di Trento e insegnò teologia
        a Roma, dove tra i suoi allievi ci fu Filippo Neri<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2a" aria-label="Fonte 2">2</a></sup>. Il <time datetime="1575-07-20">20 luglio 1575</time> papa Gregorio XIII lo nominò vescovo di
        Nepi e Sutri, e il fratello Fulvio lo seguì a Nepi, dove si sposò e mise radici<sup><a href="#fonte-3" role="doc-noteref" id="rimando-3a" aria-label="Fonte 3">3</a></sup>.
    </p>
    <p>
        Nel <time datetime="1580">1580</time> Alessio fu nominato nunzio apostolico a Graz. Durante il viaggio si fermò a Fivizzano, dove morì il
        <time datetime="1580-08-27">27 agosto</time>: fu sepolto nella chiesa agostiniana di San Giovanni, oggi scomparsa<sup><a href="#fonte-2" role="doc-noteref" id="rimando-2b" aria-label="Fonte 2">2</a></sup>.
    </p>
    <dl>
        <dt>Alessio</dt>
        <dd>il prozio, nato a Fivizzano, vescovo di Nepi e Sutri</dd>
        <dt>Fulvio</dt>
        <dd>il nonno, fratello di Alessio, trasferito a Nepi</dd>
        <dt>Marc'Antonio</dt>
        <dd>il padre, nato a Nepi nel <time datetime="1579">1579</time>, cavaliere dell'ordine di Santo Stefano</dd>
        <dt>Alessandro</dt>
        <dd>il compositore, nato a Bologna nel <time datetime="1643">1643</time></dd>
    </dl>
</section>

<section>
    <h2>Il nome della Filarmonica</h2>
    <p>
        Alla fine degli anni Novanta la Filarmonica ha preso il nome di Alessandro Stradella, il compositore con le radici a Fivizzano.
    </p>
    <p>
        Il <time datetime="1997-12-06">6 dicembre 1997</time> la Società Filarmonica Fivizzano e il Comune, con la Fondazione Cassa di Risparmio di
        Carrara, gli dedicarono una giornata intera: «Alessandro Stradella e la Musica Barocca. Le origini ritrovate». Il pomeriggio, a Palazzo Coiari,
        una conferenza con Carolyn Gianturco, la studiosa che più di tutti ha fatto conoscere Stradella, e Patrizia Radicchi, che su invito della Gianturco aveva ricostruito il ramo
        fivizzanese della famiglia<sup><a href="#fonte-4" role="doc-noteref" id="rimando-4a" aria-label="Fonte 4">4</a></sup> e aveva ideato e diretto il progetto; la sera, nella chiesa prepositurale, un concerto di musica barocca con Valeria Baiano (soprano), Renata Sfrisio (violino
        barocco), Riccardo Martini (violoncello barocco) e Amelia Isabella Bianchi (cembalo)<sup><a href="#fonte-5" role="doc-noteref" id="rimando-5a" aria-label="Fonte 5">5</a></sup>.
    </p>
    <p>
        In paese la Casa degli Stradella, vicino alle mura medicee, lo ricorda con una targa posta nello stesso anno. Il resto della
        nostra storia è nella pagina <a href="/about/history">La storia</a>.
    </p>
</section>

<section role="doc-endnotes" aria-labelledby="fonti">
    <h2 id="fonti">Fonti</h2>
    <ol>
        <li id="fonte-1">
            Andrea Garavaglia,
            <a href="https://www.treccani.it/enciclopedia/alessandro-stradella_(Dizionario-Biografico)/" target="_blank" rel="noopener noreferrer"
                >Stradella, Alessandro</a
            >, Dizionario Biografico degli Italiani, vol. 94, 2019. Torna al testo: <a role="doc-backlink" href="#rimando-1a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-1b" aria-label="Torna al rimando b">b</a>
        </li>
        <li id="fonte-2">
            <a href="https://it.wikipedia.org/wiki/Alessio_Stradella" target="_blank" rel="noopener noreferrer">Alessio Stradella</a>, Wikipedia.
            Torna al testo: <a role="doc-backlink" href="#rimando-2a" aria-label="Torna al rimando a">a</a>, <a role="doc-backlink" href="#rimando-2b" aria-label="Torna al rimando b">b</a>
        </li>
        <li id="fonte-3">
            Saverio Franchi, <a href="https://www.gentedituscia.it/stradella-alessio/" target="_blank" rel="noopener noreferrer">Stradella Alessio</a>
            e <a href="https://www.gentedituscia.it/stradella-alessandro/" target="_blank" rel="noopener noreferrer">Stradella Alessandro</a>,
            Dizionario Storico Biografico della Tuscia. <a role="doc-backlink" href="#rimando-3a">Torna al testo</a>
        </li>
        <li id="fonte-4">
            Carolyn Gianturco, <i>Alessandro Stradella, 1639-1682: his life and music</i>, Oxford, Clarendon Press, 1994, ringraziamenti. <a role="doc-backlink" href="#rimando-4a">Torna al testo</a>
        </li>
        <li id="fonte-5">
            Locandina «Alessandro Stradella e la Musica Barocca. Le origini ritrovate», Fivizzano, 6 dicembre 1997. <a role="doc-backlink" href="#rimando-5a">Torna al testo</a>
        </li>
    </ol>
    <p>
        Immagine di copertina: frontespizio della
        <a href="https://gallica.bnf.fr/ark:/12148/btv1b10886345f/f2.item" target="_blank" rel="noopener noreferrer"
            ><i>Serenata a 3 con stromenti del signor Alessandro Stradella</i></a
        >, copia manoscritta del Settecento, Bibliothèque nationale de France, département de la Musique, RES VS-1397. Pubblico dominio.
    </p>
</section>
