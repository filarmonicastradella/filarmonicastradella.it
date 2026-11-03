<script lang="ts">
    import { organization } from "$lib/organization";
    import { legalSeat } from "$lib/locations";
</script>

<svelte:head>
    <title>Informativa per la raccolta — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Come la Filarmonica Alessandro Stradella APS tratta i dati di chi presta foto, filmati e ricordi per le sue mostre e il suo archivio storico, e delle persone che vi compaiono."
    />
</svelte:head>

<!-- BOZZA da far verificare a un consulente privacy prima della pubblicazione. Dal retro della dichiarazione di consegna su carta,
     corretta il 3/11/2026: trasferimento fuori dall'UE per la pubblicazione online, foto recenti con minori, art. 97 della L. 633/1941. -->
<header>
    <h1>Informativa per la raccolta del materiale</h1>
    <p>
        Come trattiamo i dati di chi ci presta foto, filmati e ricordi per le nostre mostre e il nostro archivio storico, e quelli delle persone
        che vi compaiono.
    </p>
    <p><small>Informativa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR). Ultimo aggiornamento: <time datetime="2026-11">novembre 2026</time>.</small></p>
</header>

<section>
    <h2>Chi è il titolare</h2>
    <dl>
        <dt>Titolare del trattamento</dt>
        <dd>{organization.name}</dd>
        <dt>Sede legale</dt>
        <dd>{legalSeat.address.join(", ")}</dd>
        <dt>Codice fiscale</dt>
        <dd>{organization.taxCode}</dd>
        <dt>Contatto per la privacy</dt>
        <dd><a href="mailto:privacy@filarmonicastradella.it?subject=Privacy">privacy@filarmonicastradella.it</a></dd>
    </dl>
</section>

<section>
    <h2>Perché trattiamo i dati</h2>
    <p>
        Trattiamo i dati che scrivi nel modulo per gestire la raccolta, la custodia e la restituzione del materiale, le mostre,
        l'archivio storico. La base giuridica è l'accordo che accetti con il modulo (art. 6.1.b del Regolamento). Se hai acconsentito, pubblichiamo
        le copie online sulla base del tuo consenso (art. 6.1.a).
    </p>
    <p>
        Chi ritira gli originali in un punto di raccolta verifica la tua identità guardando un documento, senza farne copia né annotarne il numero.
    </p>
    <p>
        Il materiale può contenere dati di altre persone, come volti e nomi di chi è ritratto o citato. Li trattiamo per finalità di documentazione e
        ricerca storica sulla tradizione musicale del territorio, sulla base del nostro legittimo interesse (art. 6.1.f), con le garanzie previste per
        la ricerca storica (art. 89) e, per le immagini riprese durante concerti, feste e cerimonie pubbliche, secondo l'art. 97 della legge sul
        diritto d'autore (L. 633/1941). Chi si riconosce può chiedere la rimozione della propria immagine dalla pubblicazione online. Non pubblichiamo
        online foto degli ultimi vent'anni in cui siano riconoscibili dei minori, salvo il consenso dei loro genitori.
    </p>
</section>

<section>
    <h2>Chi li riceve</h2>
    <p>
        Hanno accesso ai dati i volontari della Filarmonica incaricati della raccolta, i punti di raccolta per la sola consegna, il Comune di Fivizzano
        e la Biblioteca civica per l'allestimento delle mostre, il fornitore che inoltra il modulo via email (formsubmit.co) e i fornitori del sito e
        dei canali social per la pubblicazione online.
    </p>
    <p>
        I tuoi dati non vengono diffusi: il tuo nome compare nelle didascalie solo se lo hai chiesto. Se acconsenti alla pubblicazione online, le
        copie e l'eventuale nome nelle didascalie sono ospitati anche da fornitori con sede negli Stati Uniti (GitHub per il sito, Meta per i canali
        social), sulla base della decisione di adeguatezza UE-USA o delle clausole contrattuali standard della Commissione europea (artt. 45 e 46 del
        Regolamento).
    </p>
</section>

<section>
    <h2>Per quanto tempo</h2>
    <p>Conserviamo il modulo per tutto il tempo in cui conserviamo le copie del materiale, perché documenta i diritti con cui le utilizziamo.</p>
</section>

<section>
    <h2>I tuoi diritti</h2>
    <p>
        I dati del modulo sono necessari per accettare il materiale. Il consenso alla pubblicazione online è facoltativo: se non lo dai, il materiale
        può comunque essere esposto nelle mostre e conservato in archivio.
    </p>
    <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione e opposizione nei limiti previsti dagli artt. 15–22 del Regolamento, e revocare il
        consenso, scrivendo a
        <a href="mailto:privacy@filarmonicastradella.it?subject=Esercizio%20dei%20diritti%20sui%20dati%20personali">privacy@filarmonicastradella.it</a>.
        Puoi inoltre proporre reclamo al
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.
    </p>
</section>
