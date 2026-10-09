<script lang="ts">
    import { organization } from "$lib/organization";
    import { legalSeat } from "$lib/locations";
</script>

<svelte:head>
    <title>Informativa privacy — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Quali dati personali tratta la Filarmonica Alessandro Stradella APS, perché, per quanto tempo e come esercitare i tuoi diritti." />
</svelte:head>

<!-- BOZZA da far verificare a un consulente privacy prima della pubblicazione. -->
<header>
    <h1>Informativa privacy</h1>
    <p>Quali dati personali trattiamo quando visiti il sito, ci scrivi o chiedi di iscriverti, e come puoi controllarli.</p>
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
        <dd><a href="mailto:privacy@filarmonicastradella.it">privacy@filarmonicastradella.it</a></dd>
    </dl>
</section>

<section>
    <h2>Quali dati e perché</h2>
    <dl>
        <dt>Visita del sito</dt>
        <dd>
            Il servizio che ospita il sito registra i dati tecnici di ogni richiesta (indirizzo IP, pagina, data e ora, browser), per farlo funzionare e
            proteggerlo. Base giuridica: il nostro legittimo interesse (art. 6.1.f GDPR).
        </dd>
        <dt>Messaggi</dt>
        <dd>
            Se ci scrivi per email o con il modulo di contatto, usiamo nome, indirizzo email, motivo e testo del messaggio solo per risponderti. Base
            giuridica: la tua richiesta (art. 6.1.b).
        </dd>
        <dt>Richiesta di iscrizione</dt>
        <dd>
            Dati anagrafici, residenza e domicilio, recapiti e documento di identità; per i minori anche i dati del genitore o tutore. Servono a valutare la
            domanda e a tenere il libro dei soci. Base giuridica: il rapporto associativo (art. 6.1.b) e gli obblighi di legge (art. 6.1.c).
        </dd>
        <dt>Consensi facoltativi</dt>
        <dd>
            Comunicazioni via email o messaggistica e uso delle immagini, solo se li accetti nel modulo di iscrizione. Base giuridica: il tuo consenso (art.
            6.1.a), che puoi revocare in qualsiasi momento.
        </dd>
    </dl>
    <p>
        I dati segnati come obbligatori nei moduli servono a risponderti o a valutare l'iscrizione: senza, non possiamo farlo. I consensi facoltativi non
        cambiano l'esito della domanda. Non prendiamo decisioni automatizzate e non facciamo profilazione.
    </p>
</section>

<section>
    <h2>Chi li riceve</h2>
    <p>
        All'interno dell'associazione solo le persone incaricate (consiglio direttivo, segreteria, tesoreria). All'esterno, i fornitori dei servizi che il
        sito usa, ciascuno per la sua parte:
    </p>
    <dl>
        <dt>GitHub</dt>
        <dd>ospita il sito.</dd>
        <dt>formsubmit.co</dt>
        <dd>inoltra via email all'associazione i dati dei moduli di contatto e di iscrizione.</dd>
        <dt>Behold e Instagram</dt>
        <dd>forniscono le foto della galleria, che il tuo browser scarica dai loro server.</dd>
    </dl>
    <p>
        Il calendario degli eventi viene letto da Google quando il sito viene preparato, non durante la tua visita: Google non riceve i tuoi dati. I dati
        non vengono venduti né diffusi.
    </p>
    <!-- SEGNAPOSTO: verificare per ciascun fornitore la sede e la base del trasferimento. -->
    <p>
        Alcuni fornitori hanno sede negli Stati Uniti. Il trasferimento avviene sulla base della decisione di adeguatezza UE-USA (Data Privacy Framework)
        o delle clausole contrattuali standard approvate dalla Commissione europea (artt. 45 e 46 GDPR).
    </p>
</section>

<section>
    <h2>Per quanto tempo</h2>
    <!-- SEGNAPOSTO: tempi di conservazione proposti, da decidere con il consiglio direttivo e il consulente. -->
    <dl>
        <dt>Messaggi</dt>
        <dd>il tempo necessario a rispondere, e comunque non oltre 12 mesi.</dd>
        <dt>Domande di iscrizione non accolte</dt>
        <dd>cancellate entro 3 mesi dalla decisione.</dd>
        <dt>Dati dei soci</dt>
        <dd>per tutta la durata dell'iscrizione e per i 10 anni successivi, come richiesto per i libri sociali e la documentazione contabile.</dd>
        <dt>Dati tecnici di navigazione</dt>
        <dd>secondo le regole del servizio che ospita il sito.</dd>
    </dl>
</section>

<section>
    <h2>I tuoi diritti</h2>
    <p>
        Puoi chiederci in qualsiasi momento di vedere i tuoi dati, correggerli, cancellarli, limitarne l'uso o riceverli in un formato leggibile, e puoi
        opporti al trattamento (artt. 15-22 GDPR). Puoi revocare un consenso quando vuoi: vale da quel momento in poi. Scrivi a
        <a href="mailto:privacy@filarmonicastradella.it">privacy@filarmonicastradella.it</a>.
    </p>
    <p>
        Se ritieni che i tuoi dati siano trattati in modo scorretto, puoi presentare reclamo al
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.
    </p>
</section>

<p><small>Informativa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR). Ultimo aggiornamento: <time datetime="2026-10">ottobre 2026</time>.</small></p>
