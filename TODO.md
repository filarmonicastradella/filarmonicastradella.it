# Lavori in sospeso

Elenco di quello che resta da fare, ricontrollato il 30/10/2026 dopo la revisione completa del sito (report in `docs/revisione-2026-10-30.md`). Si aggiorna togliendo le voci risolte, non accumulando.

## Da fare fuori dal sito

- **Certificato per `www`**: `https://www.filarmonicastradella.it` mostra un errore di sicurezza (il certificato copre solo il dominio senza `www`). Su Register: record CNAME `www` → `filarmonicastradella.github.io`. Poi su GitHub, Settings → Pages: togliere e rimettere il dominio personalizzato, così viene emesso il certificato anche per `www`.
- **FormSubmit**: attivare le caselle che ricevono i moduli (info@, segreteria@, safeguarding@, tesoreria@, presidente@, privacy@, webmaster@) mandando un messaggio di prova da ciascun modulo e confermando l'email. Finché non sono attive i messaggi si perdono. Dopo l'attivazione, sostituire negli `action` dei moduli l'indirizzo email con l'alias casuale di FormSubmit (non lascia gli indirizzi nel codice).
- **PayPal**: l'ID vero del pulsante di donazione (`support/donate`, oggi `hosted_button_id=SEGNAPOSTO`).
- **Google Calendar** (i testi arrivano da lì):
  - titoli con la maiuscola solo all'inizio: «Concerto autunnale: A tempo di vita», «Mostra fotografica: la tradizione … in Lunigiana»;
  - «Bandistica» nel titolo della mostra (linee guida: mai «banda»);
  - «Aspettate di sentire il bis» dà del voi, il sito dà del tu;
  - la biblioteca scritta in due modi («Biblioteca civica Abate E. Gerini» / «Biblioteca Civica Abate e Gerini»);
  - autori per esteso alla prima citazione (John Philip Sousa, Nicola Piovani, Dmitrij Šostakovič, Jacques Offenbach);
  - la descrizione della mostra cita le «feste patronali» (contesto storico: decidere se va bene).
  - Le virgolette dritte ("Tobagi") ora il sito le trasforma da sé in «».

## Da far verificare al consulente (testi legali)

- `legal/privacy`, `legal/cookies`, `legal/images` sono bozze. Il 30/10 sono state aggiornate: il modulo per gli eventi è nell'informativa, e la galleria di Instagram ora è copiata sul sito (il browser non si collega più a Instagram).
- **Consensi nei moduli**: le caselle dicono «acconsento al trattamento», ma l'informativa indica come base giuridica la richiesta (art. 6.1.b) e il rapporto associativo, non il consenso. Proposta: «Ho letto l'informativa sulla privacy.», con il consenso solo per le voci facoltative.
- **Iscrizione di un minore** (`support/join`): la dichiarazione «…esonerando l'associazione da ogni obbligo di vigilanza oltre tale orario» rimanda a un orario mai nominato. Proposta: «Autorizzo il minore a tornare a casa da solo alla fine delle attività dell'associazione; da quel momento l'associazione non ha più obblighi di vigilanza.»
- Privacy: sede e base giuridica del trasferimento dati per ogni fornitore esterno; tempi di conservazione.

## Da decidere sui contenuti

- **Presentazioni delle formazioni** (`src/lib/content/ensembles/*.md`): Streetella Band, Stradella Facendo e Filarmonici Dissonanti hanno testi da brochure, ripetitivi. Ci sono proposte più asciutte nel report (parte 5, punti 1–3). Per i Dissonanti manca il nome del gruppo storico delle «dame».
- **Il motto**: la pagina dei Dissonanti dice che «Le dissonanze in un accordo solo» «è anche il nostro», mentre home e missione usano «Custodi della tradizione, interpreti del futuro». Sceglierne uno.
- **Missione**: «sale prestigiose», «ogni concerto richiama centinaia di persone», i molti «non X, ma Y», «Siamo un'associazione, non un'accademia» (stride con l'Accademia dei Filarmonici Dissonanti), «nessuno di noi è pagato» (tema compensi). Proposte nel report (parte 5, punti 11–12 e 33–34; parte 5b, punti 21 e 42).
- **Home, sostegno**: «ogni contributo va… ai giovani che iniziano a suonare» non compare nella FAQ delle donazioni. Confermare o allineare.
- **Pulsante della hero** «Per il tuo evento»: senza verbo. Proposte: «Suoniamo al tuo evento», «Chiedici di suonare al tuo evento».
- **Pagina 404**: «spostata in un altro pentagramma» (battuta voluta?). Proposta: «Questa pagina non esiste o è stata spostata.»
- **«Chi è il maestro?»** (Musicisti): due revisioni suggeriscono «Chi dirige?», che non ripropone la figura del maestro. L'avevi scelta tu: decidi se tenerla.
- **«Che livello serve?»**: «ce n'è una per ogni livello» va verificato (in quale formazione si comincia da zero?).
- **Tipografia**: apostrofo dritto (') o tipografico (’) ovunque (oggi i Markdown escono con ’, le pagine con '); numeri in cifre o lettere («più di 50 soci» / «più di cinquanta soci»); «Flicorno» / «Flicorni» / «Euphonium».
- **Storia**: la foto di copertina (anni Trenta) a tutta larghezza è sgranata: serve una scansione migliore, oppure una fascia più bassa. La didascalia della foto anni 80/90 è da verificare. Senza fonte: l'unione di due bande negli anni Venti e la data del nome Stradella (oggi «alla fine degli anni Novanta»).

## Da decidere sul design (scostamenti da docs/DESIGN.md)

- **Corde nel menu aperto**: finiscono a metà schermo con i pallini vicino a «Sostienici»; DESIGN.md le vuole a tutta altezza e senza pallini. Correggere il menu o aggiornare DESIGN.md.
- **Titoli di pagina**: ora sono a 64px come da DESIGN.md (prima 72), ma tutte le pagine usano ancora il corpo Display; DESIGN.md lo riserva alla home e alle copertine, con Titolo 1 (44px) per le altre.
- **Duotone**: la foto della home e di Stradella Facendo è «a colori spenti» (grigio al 60%), non in duotone come chiede DESIGN.md.
- **Piè di pagina**: tre titoli Cormorant uguali affiancati (DESIGN.md §4 lo vieta). Proposta: titoli come occhielli; ma diventerebbero uguali alle etichette INDIRIZZO, TELEFONO.
- **Corde su telefono**: a 390px lo spazio riservato alle corde stringe intestazioni e presentazioni a circa 30 caratteri per riga (Storia, Sonetto, Rassegna stampa, Iscrizione).
- **Home**: la sezione «Momenti in musica» senza galleria è solo una frase; nasconderla quando le foto non ci sono?
- **Apertura della home**: foto e titolo partono trasparenti (comparsa), e questo ritarda l'LCP misurato da Google. Si potrebbe lasciare la comparsa solo al testo secondario.

## Da decidere su funzioni del sito

- **Menu su telefono senza JS**: sotto 64rem, senza JS, il menu non si apre. Proposta: le voci del menu anche nel piè di pagina (utile pure ai motori di ricerca), oppure il pannello nascosto solo con `@media (scripting: enabled)`.
- **Eventi passati**: oggi la pagina di un evento sparisce dopo la data e il suo indirizzo (condiviso, citato dalla stampa) dà 404. Proposta: tenere le pagine degli eventi passati, con una sezione «Eventi passati».
- **Iscrizione senza JS**: la domanda di un minore parte come quella di un adulto (i campi del genitore compaiono solo con il JS). Proposta: senza JS mostrare i campi del genitore come facoltativi.
- **404 vera**: `build/404.html` è vuota senza JS (solo il guscio di SvelteKit).
- **Pagine future come articoli**: interviste (`media/interviews`), riconoscimenti e traguardi (`about/achievements`) e gallerie dei concerti conviene farle nascere come articoli.

## Da verificare a mano

- Screen reader (NVDA con Firefox, VoiceOver su iPhone e Mac): schede lunghe, «(si apre in una nuova scheda)», date in maiuscolo («SAB»), avviso sotto i 14 anni, messaggi di errore dei moduli.
- Tastiera vera su tablet (menu, campi data e file); Windows con contrasto elevato (corde del menu, bordi dei campi, più/meno delle domande); zoom al 200–400%.

## Pagine disattivate da riattivare

Oggi sono `_page.svelte` (SvelteKit le ignora): per ognuna rinominare in `+page.svelte`, scrivere il contenuto vero, togliere il commento nel link che la raggiunge.

- `about/board`, `about/locations`, `about/partners`, `about/achievements`.
- `support/volunteer` (priorità alta: intercetta chi vuole dare una mano), `support/5x1000` (quando l'associazione sarà ammessa), `support/forms`.
- `transparency` e sottopagine (statuto, rendiconti, contributi, regolamenti): da unificare come visualizzazione, tranne lo statuto.
- `media`, `media/interviews`, `media/kit` (cartella stampa in PDF di una pagina).
- `faq`.

## Idee per attirare persone e finanziatori

- **I giovani**: alcune formazioni hanno età media sotto i 18 anni. Per bandi, fondazioni ed enti è un dato forte: dirlo in home, nelle formazioni e nella cartella stampa. Foto con minori solo con la liberatoria.
- Consiglio direttivo e rendiconto (anche solo il modello D): primo controllo di enti e fondazioni.
- Numeri d'impatto (soci, concerti all'anno, età media, ore di volontariato).
- Partner e patrocini con i loghi.
- Notizie regolari (almeno una al mese): un sito fermo sembra un'associazione ferma.
- Ingaggi: video brevi delle formazioni dal vivo; «Dove abbiamo suonato».
- Musicisti: mancano gli archi in `/about/musicians` (sezione «Archi» quando ci sono i nomi).
- Modulo di iscrizione: manca come e quando versare la quota.
