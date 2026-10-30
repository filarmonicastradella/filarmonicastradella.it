# Se il sito si rifacesse da zero — 30 ottobre 2026

Seconda revisione di design, in sola lettura, senza i vincoli di `docs/DESIGN.md`. Lente: skill **frontend-design**. Basi: il codice di home, hero e stili, `DESIGN.md`, le osservazioni a vista della parte B di `proposte-design-2026-10-30.md`. Le pagine non sono state riguardate a una a una nel browser e nessuna proposta è stata provata: la tavolozza ha i contrasti calcolati, tutto il resto è da giudicare a occhio.

## Il verdetto

**Il vecchio design è superato nella pelle, non nell'ossatura.** Non è incompetente: la struttura delle pagine, l'HTML, i token, il movimento, l'accessibilità e soprattutto i contenuti sono solidi, e la storia con le note e i documenti è migliore di quasi tutti i siti di bande e filarmoniche. Il difetto è un altro: l'aspetto dice una cosa diversa da quello che la Filarmonica è.

1. **Si veste da museo e dice di non esserlo.** La missione scrive «non siamo un museo»; in due formazioni l'età media è sotto i 18 anni e una è una street band. La prima schermata invece è carta crema, serif sottile, maiuscoletto e un motto in due membri. `DESIGN.md` chiede «un'immagine contemporanea e desiderabile per i giovani»: la prima metà del posizionamento (autorevolezza) è riuscita, la seconda no.
2. **È il template «elegante» di oggi.** Crema vicino a `#F4F1EA`, serif ad alto contrasto, filetti sottili, angoli vivi, occhielli in maiuscolo spaziato, stringhe col punto a metà, frecce sui rimandi, una parola in corsivo nel titolo: sono letteralmente i tratti che frontend-design elenca come impostazioni predefinite del design generato. Presi uno per uno sono scelte motivate; tutti insieme li avrebbe chiunque.
3. **La prima schermata non risponde alla domanda di chi arriva.** Chi apre il sito vuole sapere quando è il prossimo concerto, come si suona con voi, come dare una mano. La hero dice chi siete, due volte (il nome, poi «Fivizzano · dal 1777» che ripete la firma) e offre «Per il tuo evento», un'azione che riguarda poche persone.
4. **Il bordeaux è tenuto al guinzaglio.** «Un segno, non uno sfondo» produce pagine quasi senza colore: su Associazione, Articoli, Contatti e Sostienici compare nel pulsante e nelle corde. Il marchio più riconoscibile che avete è usato al 3%.
5. **Una sola foto attuale, attenuata.** Il problema vero non è il filtro: è che le foto sono poche e di qualità diversa. Nessuna regola fotografica lo risolve finché il sistema chiede foto belle.

## Cosa resta

- **Il bordeaux `#701521`, la lira, il logotipo.** Sono il marchio e vivono anche in stampa.
- **Le corde**, il segno più personale del sito: vengono dalla lira e nessun altro le ha.
- **I contenuti e la loro struttura**: articoli con le fonti, agenda, domande nelle pagine giuste, ipertesto.
- **Il rifiuto del movimento gratuito**: niente animazioni allo scorrimento, niente caroselli.
- **Il fondamento tecnico**: HTML semantico, token, tema scuro per ruoli. Quasi tutto quello che segue si fa in CSS.
- **Il tono**, chiaro e preciso.

## Cosa cade

- Il maiuscolo spaziato come etichetta universale: resta al massimo per le date.
- Il punto a metà («ore 21 · Teatro…») e la freccia su ogni rimando (26 punti del sito).
- La parola singola in corsivo bordeaux nel titolo e le due parole in grassetto del motto.
- Lo schema unico titolo a sinistra, testo a destra.
- Le griglie di schede di solo testo tutte dello stesso peso.
- Il piè di pagina a colonne, che ripete Contatti.
- Le comparse in sequenza della hero: il momento forte diventa uno solo.
- I giochi di parole nelle pagine d'errore.

## La proposta: il cartellone

**L'idea.** Il sito della Filarmonica non è una rivista: è ciò che una filarmonica attacca ai muri del paese da due secoli e mezzo, un cartellone a stampa. Un foglio, poco inchiostro, caratteri grandi, la data che si legge dall'altra parte della piazza. Il riferimento è già in casa: il sonetto stampato a Massa nel 1789, con il suo fregio inciso, e la lapide a puntini appena ridisegnata. Da lì viene anche la scelta più utile: **tutto si stampa in un inchiostro solo**.

### La mossa forte, una sola

**La home si apre con il prossimo concerto, a piena pagina, su bordeaux.** La data è l'immagine. Il dato c'è già nell'HTML (`data.events`) e il sito si ricostruisce ogni 3 ore.

```
┌─────────────────────────────────────────────────┐
│ [lira] Filarmonica Alessandro Stradella    Menu │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│││
│░ sabato                                      │││
│░ 14                                          │││   data enorme,
│░ novembre                                    │││   carattere come
│░                                             │││   immagine
│░ Concerto autunnale: A tempo di vita         │││
│░ ore 21, Teatro degli Impavidi. Ingresso     │││
│░ libero.                  [Tutto il calendario]││
├─────────────────────────────────────────────────┤
│ Foto a un inchiostro, da bordo a bordo          │
├───────────────────────┬─────────────────────────┤
│ Vieni a sentirci      │ Vieni a suonare         │   i due inviti che
│ …                     │ …                       │   contano, pesi diversi
└───────────────────────┴─────────────────────────┘
```

Senza concerti in programma, al posto della data ci va **1777** nello stesso corpo, con una riga su cosa sta preparando la Filarmonica. Le corde scendono come oggi sul bordo destro, ma in carta su bordeaux, e proseguono per tutta la pagina.

### Le foto a un inchiostro

Tutte le immagini, foto d'oggi e d'archivio, passano dallo stesso retino e vengono stampate in bordeaux (o in carta sul fondo scuro). Le foto deboli e sgranate smettono di essere un difetto, l'archivio e l'oggi parlano la stessa lingua, e il sito ha un aspetto che non si ottiene scaricando un modello. Lo script della lapide è un primo prototipo: basta generalizzarlo, alla build con sharp come già si fa per Instagram. Limite: sui volti dei ragazzi il retino va provato caso per caso, e il testo alternativo resta obbligatorio.

### Tavolozza

| Nome | Hex | Ruolo |
|---|---|---|
| Bordeaux | `#701521` | fondo pieno delle pagine manifesto, inchiostro di titoli e foto |
| Notte | `#2B0A10` | tema scuro, piè di pagina |
| Foglio | `#FBFAF8` | bianco da stampa, meno giallo della carta attuale |
| Rosa stampa | `#F4B9BF` | testo su bordeaux (6,9:1) e su notte (10,9:1) |
| Minio | `#E4512B` | il secondo inchiostro del cartellone: solo la data e solo su notte o in corpo grande (3,7:1 sul foglio, 4,8:1 su notte) |

Il testo bordeaux sul foglio ha 11,1:1. Il minio è la scelta più rischiosa e la prima da togliere se stona: l'accessorio che Chanel leverebbe.

### Caratteri

- **Titoli: Bodoni Moda**, solo da 40 px in su, molto grandi. Non è una scelta di gusto: Giambattista Bodoni stampava a Parma, al di là della Cisa, negli stessi anni dell'Accademia dei Dissonanti. È il carattere del 1789 in questa parte d'Italia, ed è anche quello dei cartelloni teatrali. Ha un guadagno preciso sui numeri: una data in Bodoni è già un disegno.
- **Testo: Hanken Grotesk**, o tenere Plus Jakarta Sans se il cambio non si nota.

**Il punto debole:** è ancora un serif ad alto contrasto, e il logotipo è in Cormorant, che accanto a Bodoni stona (due caratteri troppo simili per contrastare). Cambiare significa ridisegnare il logotipo, che vive anche in stampa. Per questo è l'ultima prova: Cormorant in corpo molto grande regge benissimo e la proposta funziona anche senza.

### Quattro tipi di pagina invece di uno

| Tipo | Pagine | Com'è |
|---|---|---|
| **Cartellone** | home, singolo evento, singola formazione | bordeaux pieno in testa, carattere enorme, una foto a un inchiostro |
| **Foglio** | articoli | colonna unica centrata e fregi, come il sonetto; note a margine su schermo largo; la linea del tempo sulla corda nella storia |
| **Agenda** | calendario, rassegna stampa, articoli | righe da un bordo all'altro, come oggi: è una delle parti migliori |
| **Sportello** | moduli, contatti, sostegno, iscrizione | niente da guardare: si fa la cosa e si esce |

### Scritture

- Niente motto in apertura: un fatto. «Quattro formazioni, più di quaranta musicisti, ingresso libero.»
- «Vieni a sentirci» e «Vieni a suonare» al posto di «Chi siamo» e «Suona con noi»: l'invito prima dell'autodescrizione.
- «Suoniamo al tuo evento» diventa un link più in basso: non è un'azione da prima schermata.

## La controprova

Se a un altro designer si chiedesse il sito di una filarmonica storica, verrebbe probabilmente fuori quello attuale, o la sua variante scura con la foto a tutto schermo. La parte specifica di questa proposta è la data come immagine, l'inchiostro unico nato dal sonetto e dalla lapide, Bodoni per ragioni di luogo. La parte a rischio di maniera è il «cartellone» preso alla lettera: niente caratteri da legno finti, niente carta invecchiata, niente texture. Deve sembrare stampato oggi, non d'epoca: altrimenti si passa dal museo al folklore, che `DESIGN.md` esclude a ragione.

## Costi e conflitti

- **Stampa e social.** `DESIGN.md` vale anche per locandine e post. Bordeaux, lira e corde non cambiano, ma foglio, minio e Bodoni si propagherebbero al kit di marca. Il cartellone sul web è coerente con le locandine, ma va deciso se la marca cambia o se è solo il sito.
- **Lavoro.** Prova della hero: mezza giornata. Retino alla build: una giornata. Pulizia della cromatura: poche ore. Tipi di pagina: alcuni giorni. Logotipo e kit, se si cambia carattere: lavoro a parte.
- **Foto.** Il retino attenua il problema, non lo toglie: per le formazioni serve almeno una foto per gruppo.

## Come provarlo

Un passo alla volta, su un ramo `prova` da `stili`, giudicando a occhio e tenendo solo ciò che regge. Se il primo passo non convince, il resto non serve.

1. **La hero con il prossimo concerto su bordeaux**, solo in home, con Cormorant. È la prova della tesi.
2. **Via la cromatura**: maiuscolo, punti a metà, frecce. Si può tenere anche se il resto cade.
3. **Foto a un inchiostro** su hero, formazioni e storia.
4. **Tipi di pagina**, partendo da Foglio per gli articoli.
5. **Bodoni e minio**, per ultimi, perché sono i più costosi da cambiare.
