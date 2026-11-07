# Analisi di design — 7 novembre 2026

Voce 0.1 della lista unica: l'analisi «vera», sulle pagine reali, senza adattarsi a `docs/DESIGN.md`. La richiesta era esplicita: criticare il modello attuale e proporre modifiche a faccia aperta, anche radicali. Le scelte fatte finora qui sono materiale da discutere, non vincoli; dove una proposta contraddice `DESIGN.md` è scritto.

**Come.** Anteprima locale del ramo `stili` (con la modifica non salvata di `layout.css`: il Display solo nelle pagine con la foto), pagine intere a 1280 e 390 px, tema chiaro: home, Associazione, Le nostre formazioni, Stradella Facendo, Calendario, un evento, Articoli, Storia della Filarmonica, Contatti, La Filarmonica al tuo evento, Sostienici, Iscrizione, Amministrazione trasparente. Skill: critique-visual-hierarchy (punto d'ingresso, percorso dell'occhio, peso, enfasi), better-layout (raggruppamento, allineamenti, ordine), review-web-design (gerarchia, tipografia, colore, spaziatura, marca), con i principi di frontend-design. Non riguardati qui: tema scuro e menu aperto (visti il 30/10), prove di rottura (fatte il 30/10).

## Il verdetto

**Il sito è corretto, ordinato e accessibile, ma è anonimo.** Si legge come un documento ben impaginato, non come un'istituzione musicale di 250 anni che suona in piazza. Tutto è al suo posto e niente resta in mente. Non è un problema di ritocchi: il modello stesso produce pagine uguali, piatte e silenziose, e la prima schermata non dice perché uno dovrebbe restare.

Tre cause, che spiegano quasi tutto il resto:

1. **Uno scheletro solo per ogni cosa.** Titolo a sinistra, testo a destra; righe separate da un filetto; 6rem tra un blocco e l'altro. Home, formazioni, calendario, articoli, contatti e trasparenza hanno la stessa forma. Quando tutto ha la stessa forma niente ha importanza: la gerarchia si appiattisce, e l'occhio scorre senza fermarsi.
2. **Il colore e le immagini non lavorano.** Il bordeaux sta in occhielli da 12 px e in un pulsante: a occhio è il 2–3% della pagina, non il 12% che `DESIGN.md` stesso chiede. Il resto è carta e grigio. Le foto, quando ci sono, sono fasce basse e velate.
3. **Un segno ripetuto fino a diventare un tic.** Le corde compaiono in ogni intestazione, nel menu e nel piè di pagina, sempre uguali, sempre nello stesso punto. Ripetute ovunque non dicono più niente: occupano una colonna vuota a destra e sul telefono tolgono larghezza al titolo.

## Cosa funziona, e va tenuto

- L'ossatura: HTML semantico, un `h1` per pagina, moduli chiari con etichette vere, accessibilità, funzionamento senza JS. È rara in siti di questo tipo e non va toccata.
- I contenuti: la storia con le note e i documenti, il sonetto, Stradella, le informative scritte bene. Il tono di voce è asciutto e giusto.
- I moduli: Contatti e Iscrizione sono i pezzi meglio riusciti. Gruppi chiari, una colonna, campi grandi, un solo pulsante.
- Gli elenchi a righe d'agenda (eventi e articoli) si leggono bene su computer.
- Il piè di pagina con i dati dell'ente è completo e serio.
- La sobrietà generale: niente effetti, niente caroselli, niente contatori. È la base giusta, il problema è che si è fermata lì.

## Pagina per pagina

**Home.** Punto d'ingresso sbagliato (critique-visual-hierarchy: *major issue*). La prima schermata ripete il nome, già scritto nell'intestazione, a 64 px; sotto c'è un motto e un solo pulsante, «Per il tuo evento»: l'azione principale della home di un'associazione di volontari è vendere un ingaggio. Chi arriva per un concerto, per suonare o per curiosità non trova la sua strada nella prima schermata. La foto del 1987 è bella ma, a 1280 px, è una fascia di 400 px velata: si vede una massa grigio-rosa, non dei musicisti. Poi cinque sezioni con lo stesso peso (prossimi eventi, chi siamo, suona con noi, ultimi articoli, sostieni), ognuna con titolo a sinistra, due righe a destra e un rimando in maiuscoletto con la freccia: cinque «CALENDARIO →», «ASSOCIAZIONE →»… in fila. Nessuna sezione prevale, nessuna immagine dopo la prima.

**Calendario e home, un errore di contenuto (urgente).** Il primo evento pubblico è «Prove Ensemble Lunilicei — Evento creato automaticamente dal sondaggio.» Un evento interno, generato da uno strumento di sondaggi, finisce in home e in calendario. Il sito legge tutto il calendario Google senza filtri (`src/lib/server/calendar.ts`). In più i titoli sono in maiuscole all'inglese («Concerto Autunnale: A Tempo di Vita», «Mostra Fotografica: La Tradizione Bandistica in Lunigiana») e le descrizioni sono troncate a metà frase con i puntini.

**Associazione.** Una pagina quasi vuota: titolo, due righe, tre schede di solo testo. La colonna delle corde e lo spazio sopra le schede occupano più della metà della prima schermata. Per la pagina che dovrebbe dire chi siamo è troppo poco: nessuna immagine, nessun numero, nessuna persona.

**Formazione (Stradella Facendo).** La copertina a colori funziona meglio di tutte le altre: si vedono facce e strumenti. Poi otto sezioni nello stesso scheletro (presentazione, organico, suona con noi, per il tuo evento, prossimi appuntamenti, se ne parla, domande, rimando). La presentazione è il testo più generico del sito («rappresenta il cuore dell'attività concertistica»); l'organico è un elenco di strumenti in due colonne che dice poco. Mancano proprio le cose che rendono viva una formazione: un brano da ascoltare, il repertorio, le facce (con i consensi), dove ha suonato.

**Articoli.** Leggibile, ma dieci righe identiche: occhiello maiuscolo, titolo, riassunto grigio. Gli articoli nostri (storia, Stradella, sonetto) hanno lo stesso peso delle uscite di giornale, e sono i contenuti migliori del sito.

**Storia della Filarmonica.** Il contenuto è eccellente, l'impaginazione lo penalizza: per un testo lungo con note, il titolo di sezione a sinistra lascia una colonna vuota del 40% della larghezza per schermate intere, mentre le note stanno in fondo. È il caso tipico per le note a margine.

**Contatti.** Buono il modulo. Ma la sezione «Recapiti» ripete esattamente telefono, email e PEC che sono già nel piè di pagina, una schermata più sotto.

**Tutte le pagine.** L'intestazione di pagina è sempre: titolo, una riga grigia, le corde a destra, molto spazio. Sette pagine su tredici aprono con lo stesso vuoto.

## I problemi del sistema, uno per uno

### Gerarchia piatta

- Scala dei titoli: `--fs-h2` 28–30 px, `--fs-h3` 24 px. Il salto è di 1,2 volte: sotto la soglia di 1,5 che rende distinguibili due livelli. Titoli di sezione e titoli delle schede quasi si confondono.
- Cormorant 500 a 28–30 px su schermo è sottile e chiaro; accanto al Jakarta grigio dà un insieme elegante ma senza peso.
- Il testo delle descrizioni (schede, riassunti, presentazioni) è grigio pietra ovunque: tutto quello che non è un titolo passa in secondo piano allo stesso modo.
- Il maiuscolo spaziato è dappertutto: occhielli, date, categorie, filtri, rimandi, etichette del piè di pagina. Usato su tutto non distingue più niente, ed è il segno più riconoscibile dei siti fatti con i modelli.

### Ritmo monotono

- 6rem tra tutti i blocchi, sempre: niente si avvicina per stare insieme, niente si stacca per farsi notare. better-layout lo dice chiaro: lo spazio raggruppa solo se varia.
- Filetto su ogni riga *e* grande spazio: le due cose fanno lo stesso lavoro.

### Colore

- Il bordeaux non ha mai una superficie: niente fasce, niente blocchi, niente titoli. La pagina tipo è carta, inchiostro, grigio.
- Il piè di pagina è inchiostro quasi nero: il blocco più scuro e più pesante del sito è quello meno importante.

### Immagini

- Una sola foto per pagina, quando c'è, sempre in alto, sempre come fascia bassa e velata. A computer le persone diventano piccole.
- Le pagine indice (Associazione, Formazioni, Sostienici, Articoli) non hanno nessuna immagine.

### Corde

- Stessa forma in 13 pagine su 13, nel menu e nel piè di pagina. In `DESIGN.md` sono «l'elemento base, in quasi tutti i formati»: sulla carta stampata, dove ogni formato è diverso, funzionano; su un sito dove ogni pagina è uguale diventano carta da parati.
- Sul telefono si prendono una colonna di circa 40 px accanto al titolo.

## Proposte

Ordinate per peso. Ognuna dice cosa cambia rispetto a `DESIGN.md`.

### 1. Urgente: tenere fuori dal sito gli eventi interni *(nessun conflitto)*

Le prove e gli eventi del sondaggio non devono uscire. Due modi: un calendario Google solo pubblico, separato da quello interno (il più pulito); oppure un filtro in `calendar.ts` (per esempio solo gli eventi con l'hashtag di una formazione, o senza la parola «Prove»). Nello stesso passaggio: titoli degli eventi con la maiuscola solo all'inizio, come in italiano.

### 2. Home: aprire con la musica, non con il nome *(conflitto con §10, apertura della homepage)*

La prima schermata è il **prossimo concerto**: data grande, titolo, luogo, una foto viva, «Tutto il calendario». Il nome sta già nell'intestazione e non va ripetuto a 64 px. Sotto, tre strade chiare e con lo stesso peso, una per chi arriva: **ascoltare** (calendario), **suonare** (iscrizione, formazioni), **sostenere** (donazioni). L'ingaggio scende a un link, perché non è la ragione d'essere dell'associazione. Il motto, se resta, in piccolo. Senza concerti in programma, la prima schermata torna alla foto e al nome.

### 3. Quattro tipi di pagina invece di uno *(conflitto con §10, sezioni da leggere)*

- **Indice** (Associazione, Formazioni, Sostienici): griglia di schede *con immagine*, senza intestazione vuota; due righe di presentazione e subito le schede.
- **Lettura lunga** (articoli, storia, informative): una colonna centrata di 36rem con i titoli di sezione dentro la colonna; note a margine su schermo largo, in fondo sul telefono.
- **Scheda** (formazione, evento): foto alta, i fatti essenziali in un blocco compatto (chi, cosa, dove, quando), poi il resto.
- **Modulo** (Contatti, Iscrizione): così com'è, il modello migliore del sito.

Il titolo a sinistra e il testo a destra resta solo dove c'è davvero un'etichetta corta accanto a un contenuto corto (l'organico, i dati dell'ente).

### 4. Dare al bordeaux delle superfici *(precisa §3; non contraddice la proporzione)*

Una superficie bordeaux per pagina, non di più: il blocco del prossimo concerto in home, la fascia «Sostienici», l'intestazione delle pagine indice. Il piè di pagina passa al bordeaux notte (oggi lo è solo nel tema scuro). Le descrizioni in inchiostro, non in grigio: il grigio solo per date e note. Così il 12% di `DESIGN.md` si raggiunge davvero.

### 5. Le corde: da carta da parati a segno *(conflitto con §6, le corde)*

Tenerle in due soli posti: la prima schermata della home e il piè di pagina. Toglierle dalle intestazioni di tutte le altre pagine. In più un uso che le giustifica: la linea del tempo nella storia, dove i pallini sono le date (l'eccezione è già scritta in `DESIGN.md`). Un segno che compare di rado si riconosce; uno che c'è sempre si smette di vederlo.

### 6. Tipografia con più contrasto *(conflitto con §4, scala e pesi)*

- Scala: h1 48–64, h2 36, h3 22–24 (salto h2/h3 di almeno 1,5).
- Cormorant 600 per tutti i titoli fino all'h2; il 500 solo nei display.
- Maiuscolo spaziato solo per date e luoghi (come chiede §10, «data e luogo in Jakarta maiuscolo spaziato»): via da categorie, filtri, rimandi ed etichette del piè di pagina.
- Rimandi come link scritti per esteso, senza maiuscoletto: «Tutto il calendario», «Leggi la storia».

### 7. Foto più grandi, più persone *(precisa §9 e §10)*

- Copertine più alte: almeno metà dello schermo anche su computer; la fascia di 400 px a 1280 di larghezza schiaccia le persone.
- Una foto anche nelle pagine indice (una per scheda: una formazione, un articolo).
- Un servizio fotografico vero, già previsto in `DESIGN.md` («uno all'anno»), con i consensi raccolti dal modulo di iscrizione: è l'investimento che cambia il sito più di qualsiasi CSS.
- Il velo resta (deciso il 3/11), ma più leggero sulle foto a colori: oggi le spegne.

### 8. Togliere le ripetizioni

- Contatti: via la sezione «Recapiti» (è il piè di pagina), oppure via i recapiti dal piè di pagina e restano solo in Contatti.
- Formazioni: tagliare le sezioni a quelle che servono (presentazione, prossimi appuntamenti, suona con noi; il resto in un blocco solo o nelle domande).
- Una presentazione scritta di nuovo per ogni formazione, con fatti (quando è nata, quanti sono, cosa suona, dove ha suonato), al posto delle frasi generiche.

## Cosa non proporrei

- Cambiare caratteri: Cormorant e Jakarta vanno bene, il problema è come sono usati (pesi, scala, maiuscolo).
- Cambiare tavolozza: carta, inchiostro e bordeaux sono giusti; manca la quantità di bordeaux, non un colore nuovo.
- Il «cartellone» del 30/10 per intero: la mossa forte resta valida (una sola cosa memorabile per pagina), ma le proposte qui arrivano allo stesso risultato senza rifare la marca.

## In ordine di lavoro

| | Proposta | Chi decide | Peso del lavoro |
|---|---|---|---|
| 1 | Eventi interni fuori dal sito, titoli in maiuscola italiana | Leonardo (calendario separato o filtro) | Piccolo |
| 2 | Tipografia: scala, pesi, meno maiuscolo, rimandi per esteso | Leonardo, poi `DESIGN.md` | Piccolo |
| 3 | Bordeaux in superficie, piè di pagina bordeaux notte, descrizioni in inchiostro | Leonardo, poi `DESIGN.md` | Piccolo |
| 4 | Corde solo in home e piè di pagina | Leonardo, poi `DESIGN.md` | Piccolo |
| 5 | Home che apre con il prossimo concerto e tre strade | Leonardo e consiglio | Medio |
| 6 | Quattro tipi di pagina | Leonardo | Medio, una pagina alla volta |
| 7 | Foto più alte e foto nelle pagine indice | Leonardo | Medio, dipende dalle foto |
| 8 | Ripetizioni e testi delle formazioni | Leonardo e chi suona | Testi |
| 9 | Servizio fotografico con i consensi | Consiglio | Fuori dal sito |

Le voci 2, 3 e 4 si possono provare in un pomeriggio su un ramo a parte e guardare affiancate al sito di oggi prima di decidere.

## Rispetto ai controlli del 30 ottobre

Il 30/10 erano state fatte otto revisioni tecniche (`docs/revisione-2026-10-30.md`: Svelte, accessibilità, codice dell'interfaccia, SEO e prestazioni, dati strutturati, design, testi) e tre di design (`docs/proposte-design-2026-10-30.md`: il design system, i tic da IA, le prove di rottura). Le correzioni chiare sono state fatte allora; il resto è nella lista unica. Oggi, sulle pagine vere:

### Le osservazioni di design di allora, confermate

Le voci aperte della parte 3 della lista unica non erano dettagli: guardate insieme sono lo stesso problema di fondo descritto qui sopra. Le proposte di questo report le chiudono tutte insieme, invece che una per una.

| Voce della lista | Confermata oggi | Proposta che la risolve |
|---|---|---|
| 3.4 Stesso scheletro su tutte le pagine | Sì, è la causa principale | 3. Quattro tipi di pagina |
| 3.6 Aprire la home con il prossimo concerto | Sì | 2. Home |
| 3.7 Bordeaux quasi assente | Sì, circa 2–3% della pagina | 4. Bordeaux in superficie |
| 3.8 Maiuscolo spaziato e frecce ovunque | Sì, cinque rimandi uguali in home | 6. Tipografia |
| 3.10 Schede di solo testo tutte dello stesso peso | Sì (Associazione, Formazioni, Sostienici) | 3 e 7: indici con immagini |
| 3.11 Piè di pagina pesante e recapiti ripetuti | Sì, anche in Contatti | 4 e 8 |
| 3.13 Pulsante della hero | Sì: «Per il tuo evento» come unica azione della home | 2. Home |
| 3.15 Linea del tempo sulla corda nella storia | Sì, la colonna vuota c'è ancora | 5. Corde |
| 3.18 Corde che stringono i titoli sul telefono | Sì | 5. Corde, tolte dalle intestazioni |
| 3.17 Foto degli anni Trenta sgranata | Sì, ancora più visibile col velo | 7. Foto |

Non più valide: la hero con la foto di Stradella Facendo (ora c'è quella del 1987), il trattamento delle foto (deciso il 3/11: il velo su tutte le copertine), le corde del menu (decise il 29/10).

### SEO, controllato di nuovo oggi sulla build

Script su tutte le 35 pagine generate: titolo, description, `h1`, canonical, JSON-LD, sitemap.

- **Già a posto**: un `h1` per pagina, canonical ovunque, JSON-LD valido, sitemap di 31 indirizzi che coincide con le pagine da indicizzare, nessuna pagina `noindex` nella sitemap. Le pagine di ringraziamento non hanno description, ma sono fuori dalla ricerca.
- **Ancora aperto dal 30/10**:
  - **la 404 è vuota senza JavaScript** (niente titolo né `h1`: lista 2.4);
  - **gli eventi passati diventano 404 il giorno dopo** (`timeMin` è sempre «adesso» in `calendar.ts`; lista 2.1): l'indirizzo citato dai giornali muore. Con il calendario che cresce conviene decidere ora: una sezione «Eventi passati» è anche il «Dove abbiamo suonato» che serve agli ingaggi;
  - **titoli lunghi** (lista 6.5): `articoli/storia/sonetto` 66 caratteri, `contatti/ingaggi` 63, `trasparenza` 62, `trasparenza/contributi` 63, `informative/materiale` 62, due eventi 68 e 70;
  - **description troppo brevi**: `articoli/stampa` 70, `formazioni/orchestra-infieri` 72, `informative/cookie` 94, `trasparenza` 104, `sostienici/dona` 106, `formazioni/stradella-facendo` 108; **troppo lunghe**: `associazione/iscrizione` 208, `informative/materiale` 175, `contatti/ingaggi` 172. Google le taglia oltre circa 155 caratteri.
- **Nuovo**: oltre agli eventi interni (proposta 1), i titoli degli eventi in maiuscole all'inglese finiscono così anche nei risultati di Google e nei file `.ics`.

### Accessibilità e prestazioni

Il 30/10: Lighthouse 100 in accessibilità su 16 pagine, axe senza violazioni, prestazioni 94–99. Da allora nessuna modifica di struttura le ha toccate. Le proposte di questo report non le peggiorano se si rispetta una regola: più foto e foto più alte solo con le misure giuste (`sizes`) e il caricamento differito sotto la prima schermata, altrimenti l'LCP della home, già il valore più debole (3,0 s), peggiora. La proposta 2 aiuta: una prima schermata con data e titolo del concerto in testo appare subito, senza aspettare la foto.
