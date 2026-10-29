# Proposte di design — 30 ottobre 2026

Tre revisioni in sola lettura, fatte con skill scaricate per l'occasione e controllate prima dell'uso: **frontend-design** (Anthropic), **frontend-design-deslop**, **antislop** e **antislop-ui**, **break-ui**, insieme a **impeccable** già installata. La regola resta `docs/DESIGN.md`: dove una skill la contraddice, è segnalato come conflitto.

- **A.** Il design system stesso: DESIGN.md e i token.
- **B.** Il sito confrontato con i tic del design generato dall'IA.
- **C.** Prove di rottura con dati da caso peggiore.

Le proposte si affrontano una alla volta: spiegate, applicate, giudicate a occhio, tenute o tolte. Nessuna è ancora applicata.


## A. Revisione del design system

Letti per intero `docs/DESIGN.md` (v1.2), `AGENTS.md`, `src/lib/styles/{typography,colors,layout,content,forms}.css`, `Hero.svelte` e `SiteMenu.svelte`. Lenti: **frontend-design** (Anthropic: i cinque cluster di calibrazione, «spendi l'audacia in un punto solo»), **frontend-design-deslop** (`design-md.md`, `slop-checklist.md`, typography, color-oklch, dark-mode, motion, imagery), **antislop** e **antislop-ui** (purpose-gate, «Eyebrow», «Small arrows», «Uniform section rhythm», protocollo R-37 per i tratti voluti dal brand), **impeccable** (typeset). Contrasti ricalcolati dagli hex (WCAG 2.x), colori convertiti in OKLCH.

### Punti di forza

- **Le corde sono un segno vero, che viene dal soggetto**: nascono dalla lira, i pallini sfasati richiamano il simbolo v1.2, scendono «a freccia» sul titolo e salgono «a coppa» nel piè di pagina; scritte una volta sola in `layout.css`. È la «signature move» che frontend-design chiede.
- **Un colore solo, con i ruoli separati dalla tavolozza**; il tema scuro cambia solo i ruoli; il piè di pagina ridefinisce i propri. Architettura dei token pulita.
- **Movimento vincolato davvero**: quattro token, una curva, niente animazioni allo scorrimento, una sola rotazione, movimento ridotto gestito caso per caso.
- **Tipografia pensata**: numeri antichi di Cormorant nei titoli, `lining-nums tabular-nums` sui dati, soglia dei 24 px per Cormorant, misura a 36rem, `text-wrap: balance/pretty`.
- **Schede con il solo filetto in alto**: niente kit di card SaaS.
- **Regole sulle immagini solide**: niente foto generiche, fonte citata, niente testo sopra le foto, anteprima sfocata.
- **I due difetti dell'audit sono già corretti nel codice** (bordo dei campi 5,6:1, focus nel piè di pagina 12,7:1), ma `DESIGN.md` non lo registra: possono tornare.

**Giudizio onesto sulla distintività.** Il sistema cade pienamente nel cluster n. 1 di frontend-design: fondo crema vicino a `#F4F1EA` (la carta è `#F6F1EA`), serif display ad alto contrasto, un solo accento caldo. A questo si sommano tratti del cluster n. 5: occhielli in maiuscolo spaziato ovunque (date, categorie, testate, `dt`, `th`, rimandi, indici, «Menu», «FILARMONICA»), stringhe con il punto a metà altezza («Fivizzano · dal 1777», «ore 21 · Teatro…»), la freccia → sui rimandi, la parola in corsivo come accento nel titolo (per frontend-design «il segno più comune di una pagina generata», per DESIGN.md «il gesto distintivo del marchio»). Presi uno per uno sono vincoli di marca legittimi; è il loro insieme che fa sembrare il sito un template editoriale «elegante». Cormorant Garamond + Plus Jakarta Sans è un abbinamento molto diffuso. Due cose sono già sobrie: il corsivo bordeaux compare una volta sola in tutto il sito (la hero), e la hero ha un solo pulsante pieno. Le sezioni a due colonne sono motivate, ma applicate a tutte le sezioni da leggere rischiano la «Uniform Section Rhythm» di antislop.

### Contraddizioni

1. **Display 64 contro i token, e Display su ogni pagina**: la tabella del §4 dà valori fissi (64/44/30/24), i token sono fluidi; `main > header h1` usa Display ovunque, quindi Titolo 1 (`--fs-h1`) è di fatto un token morto.
2. **Interlinea**: il §4 dice 1,2 per Titolo 2 e 3; il codice usa 1,1 per tutti i titoli.
3. **«Un solo titolo in Cormorant per composizione» / «mai due titoli Cormorant della stessa dimensione affiancati»**: smentite da griglie di schede, colonne del piè di pagina, FAQ, `legend` dei moduli. La regola nasce per la locandina ma non lo dice. Su telefono `h2` 28 e `h3` 24 (rapporto 1,17) sono due livelli quasi uguali: è il problema vero.
4. **Corde del pannello del menu**: il §6 le vuole a tutta altezza senza pallini; il codice le fa finire poco sotto «Sostienici» con i pallini, contro anche «mai vicino a pulsanti e menu». `AGENTS.md` parla ancora di corde «a tutta altezza» ovunque.
5. **«Al massimo una volta per schermata»**: sulle pagine corte i pallini dell'intestazione e del piè di pagina si vedono insieme.
6. **Duotone contro trattamento reale**: §9-10 dicono duotone; `layout.css` fa `grayscale(0.6)` con un velo bordeaux notte→inchiostro; l'archivio ha `contrast(1.1)` non documentato.
7. **Pulsante della hero**: §10 dice «pulsante primario», il codice (giustamente) lo fa secondario.
8. **Proporzione d'uso «accento 3%»**: sul sito il 3% non ha un colore (l'ottone è solo per edizioni speciali); il «bordeaux 12%» non si raggiunge; «un elemento forte per pagina» non è definito per il web.
9. **Tavolozza incompleta**: Sabbia, Nebbia, Bianco e Rosa velluto non sono in tabella; `--bg-raised: #2a2425` del tema scuro è un valore scritto a mano dentro i ruoli.
10. **Data e luogo**: §10 dice «data e luogo in maiuscolo spaziato», la card evento mette il luogo in didascalia; §11 scrive «sabato 14 novembre, ore 21», la card «ore 21 · Teatro…»: due separatori per lo stesso dato.
11. **Regole comuni senza ambito**: «margini 1/12 del lato corto», «massimo tre livelli di testo» sono regole da stampa e social.
12. **Il «filetto»**: il §6 lo definisce bordeaux 2 px tra titolo e firma, ma sul sito non esiste; il §10 chiama allo stesso modo il filo neutro delle schede.
13. **Movimento**: il §8 ammette solo opacità, spostamenti e colori, ma corde e pannello usano `clip-path`; le corde usano `--duration-slow`; la hero le ripete a ogni visita (eccezione solo nel codice).
14. **Riferimenti che non portano a nulla**: un «tokens.css di riferimento» che non c'è; il documento non elenca quasi nessun nome di token.
15. **`--fs-logo-eyebrow` a 10 px** sotto la soglia di 11 px di `slop-checklist.md`: accettabile solo se dichiarato parte del logotipo.
16. **Versione**: «1.2, ottobre 2026» ma molte decisioni successive senza alzare la versione; le note «(Dal …; prima …)» mescolano storico e regole.

### Lacune

- **Scala tipografica senza rapporto dichiarato** (16→24 ×1,5; 24→30 ×1,25; 30→44 ×1,47; 44→64 ×1,45; su telefono 24→28 ×1,17). Mancano i ruoli che esistono nel CSS (presentazione 18, etichetta 13/600, domanda 16/600).
- **Spaziatura**: nessuna sezione; i token `--space-1…10` e `--gap-grid` sono solo in `layout.css`; le regole «6rem tra blocchi, 1,5rem tra paragrafi» stanno in `AGENTS.md`.
- **Colore in OKLCH e matrice dei contrasti**: bordeaux L 0,36 C 0,124 H 19; rosa velluto 0,695/0,080/10; carta 0,96/0,011/77; inchiostro 0,223/0,007/1; pietra 0,518/0,011/0. Non è scritto che i neutri sono di due famiglie (carta e sabbia gialle, inchiostro/pietra/nebbia rosate) né che il rosa velluto è spostato di 9° rispetto al bordeaux. Contrasti del tema scuro (tutti validi): rosa su inchiostro 6,1; rosa su `#2a2425` 5,4; rosa su bordeaux notte 5,5; nebbia su bordeaux notte 7,4. Coppie vietate non documentate: ottone su carta 2,84; bordeaux su inchiostro 1,49; cipria su carta 1,21; sabbia su carta 1,14; bordeaux su bordeaux notte 1,36.
- **Derivazione del tema scuro**: manca la rampa delle superfici; bordi al 16% nel tema scuro e al 18% nel piè di pagina senza motivo; pulsante primario al buio mai descritto; `::selection` resta cipria al buio.
- **Focus**: il documento non ne parla.
- **Moduli e stati**: token dei campi solo in `forms.css`; mancano disabilitato, invio in corso, conferma, stati vuoti, e la decisione che l'errore usa il colore di marca (va bene solo perché c'è sempre il testo).
- **Tabelle**: solo «numeri tabulari».
- **Grafici** (i bilanci di `/transparency/budgets`): nessuna rampa né regola.
- **Stampa**: nessun `@media print` (si stampano intestazione fissa, menu e corde).
- **Email**: firme, risposte di FormSubmit, newsletter, font di ripiego.
- **Social e anteprime**: corpi sulla tela da 1080, margini della story, contrasto del titolo sopra la foto; nessuno standard per l'immagine OG 1200×630 né un ripiego col marchio.
- **Ottone per il 250° (2027)**: nessuna regola web; su carta non può essere testo (2,84:1), su inchiostro sì (5,4:1).
- **Iconografia**: «una sola variante» senza nominarla (Heroicons 20 solid).
- **Caricamento dei font**: nessun ripiego metrico (`size-adjust`) per Cormorant; interlinea 1,0 rischiosa con le maiuscole accentate.
- **Colori forzati**: le corde spariscono (accettabile, ma va scritto).

### Proposte

Sforzo: **P** meno di un'ora, **M** mezza giornata, **G** più giorni.

#### Correzioni

1. **Display solo dove c'è una foto** (§4, §10, `layout.css`): Display per hero e copertine, Titolo 1 per pagine di servizio e indici (`main > header:not(:has(> picture)) h1 { font-size: var(--fs-h1) }`); intervalli fluidi in tabella. P.
2. **Interlinee dei titoli**: `--lh-subheading: 1.2` per `h2`/`h3` (o tabella a 1,1); Display a 1,05 per le maiuscole accentate. P.
3. **Le regole su Cormorant con l'ambito**: stampa e social un titolo per composizione; sito un solo Display per pagina, titoli di pari livello in elenco ammessi, livelli diversi con rapporto almeno 1,2 → `--fs-h2` 30→36. P.
4. **Corde del menu senza pallini** (`--dot: none`, `--short: 100%` nel pannello) e `AGENTS.md` aggiornato; oppure cambiare il documento. P.
5. **«Una volta per schermata» → «una per estremità»** (freccia in testa, coppa in fondo, insieme ammesse). P.
6. **Nominare il trattamento delle foto**: «sito: desaturazione al 60% e velo bordeaux notte→inchiostro; archivio: bianco e nero con contrasto +10%; duotone vero solo sui social» (o Idea 5). P.
7. **Hero**: «pulsante secondario; il solo pieno è Sostienici». P.
8. **Tavolozza completa**: Sabbia, Nebbia, Rosa velluto, Bianco in tabella; nome per `#2A2425` (`--color-inchiostro-rialzato`); proporzione «carta 60, inchiostro 25, bordeaux 12, cipria/rosa 3; ottone solo nelle edizioni speciali». P.
9. **Date e luoghi coerenti**: un solo separatore, la virgola («ore 21, Teatro degli Impavidi»); il punto a metà solo nella firma del logotipo. P.
10. **Ambito delle regole comuni**: margini 1/12 e «tre livelli» solo per stampa e social. P.
11. **Due filetti con due nomi**: «filetto di marca» (bordeaux, stampa) e «filo» (neutro, schede). P.
12. **Movimento**: aggiungere la scoperta con `clip-path` per corde e pannello; corde con `--duration-slow`; nella hero ripetute a ogni visita. P.
13. **Riferimenti, versione, logotipo**: togliere o collegare il «tokens.css»; versione 1.3 con un «Registro delle decisioni» in fondo; i 10 px di FILARMONICA parte del logotipo. P–M.

#### Miglioramenti

1. **Sezione «Token» nel documento**: nome → valore → ruolo (colore con hex e OKLCH, tipografia, spaziatura, forma, corde, movimento). M.
2. **Scala tipografica dichiarata**: base 16; desktop 24/32/44/64; telefono 24/28–30/36/48; ruoli presentazione, etichetta, domanda, rimando. P + P.
3. **Contrasti e tema scuro**: matrice completa con le coppie vietate; rampa inchiostro (L 0,22) → rialzato (0,27) → pannelli (0,30); una sola percentuale per i bordi; rosa velluto dichiarato (o `oklch(0.70 0.085 19)` ≈ `#CE8989` per la stessa tinta del bordeaux, da verificare a occhio). M.
4. **Sezione «Accessibilità e stati»**: focus per superficie; bordo dei campi almeno 3:1 con `--text-muted`; disabilitato; «Invio in corso» senza spinner; errore = bordeaux + bordo doppio + frase; stato vuoto con frase e rimando. M.
5. **Meno maiuscolo spaziato**: tenerlo dove è un dato (data, categoria, testata, `th`); il rimando diventa Jakarta 500 in tondo con la freccia; valutare gli indici; nella hero «Fivizzano · dal 1777» ripete la firma del logotipo e il titolo il nome: tre ripetizioni nella prima schermata (meglio un dato, come il prossimo concerto, o niente). P.
6. **Una sola comparsa nella hero**: tenere la dissolvenza della foto e le corde; togliere il «sale e sfuma» in sequenza del testo (per frontend-design è il «default generico»). P.
7. **Ottone per il 250°**: testo solo su inchiostro o bordeaux notte; tema «edizione 250°» come ridefinizione dei ruoli. P + M.
8. **Stampa**: `@media print` senza intestazione, menu, corde e rimandi, carta bianca, indirizzi dei link esterni. M.
9. **Anteprime social e OG**: modello 1200×630 (foto trattata, fascia carta con titolo, corde, simbolo); ripiego col marchio; margini della story; velo almeno al 55% sotto il titolo del post. M.
10. **Grafici**: rampa monocroma bordeaux in OKLCH (L 0,36/0,50/0,65/0,80), rosa al buio, etichette dirette, pietra per i riferimenti. P.
11. **Email**: HTML semplice con il simbolo PNG, Georgia al posto di Cormorant, Arial/Helvetica per Jakarta, bordeaux solo nei link. P.
12. **Ripiego metrico dei font**: `@font-face` «Cormorant fallback» su Times New Roman con `size-adjust` e `ascent-override`. P.

#### Idee da discutere

1. **Il corsivo con un significato**: la parola in corsivo nel titolo marca il titolo di un'opera o il nome che dà senso al titolo («Il *Requiem* torna a Fivizzano», «Alessandro *Stradella*»), come già il tono di voce per le opere. Da tratto generico a convenzione solo vostra. P.
2. **Un elemento forte bordeaux per pagina, sul serio**: una sola fascia piena bordeaux con testo e corde cipria (l'invito «Sostienici» prima del piè di pagina, o data e luogo nella pagina evento). Spezza il «crema editoriale» senza aggiungere colori. M.
3. **Il 1777 come immagine**: per il 250° la prima schermata con «1777–2027» in Cormorant Display con i numeri antichi, legato all'ottone. Una volta sola. M.
4. **La carta**: motivarla come carta da programma di sala; valutare croma 0,008 (più grigia, da musica) dopo una prova di stampa. Decisione di marca. P.
5. **Duotone vero per le copertine**: filtro SVG (`feColorMatrix` + `feComponentTransfer`) con ombre bordeaux notte e luci carta; volti da valutare caso per caso. M.
6. **Varietà delle sezioni**: una seconda composizione documentata (citazione o immagine a tutta larghezza, senza titolo a sinistra, al massimo una per pagina) per le pagine lunghe. M.

## B. Il sito e i tic del design da IA

Skill: **frontend-design**, **frontend-design-deslop** (slop-checklist, divergence, aesthetics-library e riferimenti), **antislop** e **antislop-ui**, confrontate con `docs/DESIGN.md`, che resta la regola. Pagine a 1280 e 390 px, chiaro e scuro: home, Associazione, Formazioni, Stradella Facendo, Articoli, storia della Filarmonica, Rassegna stampa, Calendario, un evento, Sostienici, Contatti, Ingaggi, menu aperto. Schermate in `/tmp/claude-1000/-home-leo/32c9c9cf-8541-409a-84ad-8d6f58b320bd/scratchpad/slop/`.

### Cosa è già distintivo

- **Le corde con i pallini**: a freccia nelle intestazioni, a coppa nel piè di pagina. Vengono dalla lira e non si trovano su nessun altro sito.
- **Il pulsante del menu fatto di corde**, che ruota e diventa la cima delle corde del pannello.
- **La pagina della storia è la più riuscita**: copertina d'archivio, note numerate, didascalie con la fonte, il diploma dei Dissonanti. Il 1777 mostrato con i documenti, non detto con un aggettivo.
- **Eventi e rassegna stampa come un'agenda**: righe da un bordo all'altro, data o testata a sinistra, titolo in Cormorant a destra. Editoria, non il solito kit di card.
- **Schede con il solo filetto in alto**: niente angoli arrotondati, ombre, fondi.
- **Tema scuro disegnato, non invertito**: inchiostro caldo, rosa velluto, piè di pagina bordeaux notte.
- **Contenuti concreti**: il programma con gli autori, «Sala Tobagi», le virgolette basse, la FAQ su funzioni religiose e partiti.
- **Niente tic di superficie**: nessuna animazione allo scorrimento, gradiente, icona decorativa, emoji.

### Tic da IA trovati (dal più grave)

1. **Lo stesso scheletro su tutte le pagine** (titolo a sinistra, contenuto a destra, filetti sottili): tolti colore e font, ogni pagina è la stessa colonna; in home lo stesso modulo si ripete quattro volte di fila (Chi siamo, Suona con noi, Momenti in musica, Sostienici); sotto gli `h2` la colonna sinistra resta vuota per centinaia di pixel. Tratto 3 di frontend-design, «Uniform Section Rhythm» di antislop-ui. **Conflitto con DESIGN.md §10**, che lo prescrive: da tenere come regola e variare in home e nella storia.
2. **Una sola foto attuale, riciclata**: la stessa foto fa da hero della home e da copertina di Stradella Facendo; il trattamento `grayscale(.6)` + velo dà un rosa grigio spento, che si legge come il velo scuro delle hero da modello, non come il duotone del DESIGN; al buio diventa ancora più fangoso. Le foto d'archivio compaiono solo nella storia.
3. **Lo slogan della hero** «Custodi della tradizione, interpreti del futuro», con due parole in grassetto: antitesi in due membri tipica della prosa generata. Il corsivo bordeaux su «Stradella» invece lo prescrive DESIGN §4: tenere il corsivo, togliere lo slogan.
4. **Descrizioni delle formazioni con la prosa tipica dell'IA** («Un viaggio nel tempo…», «l'impatto sonoro di una formazione itinerante», «ampio e variegato», «alto livello artistico», «il cuore dell'attività concertistica»).
5. **Griglie di schede uguali, solo testo, senza gerarchia**: Associazione 3×2, Formazioni 2×2, Sostienici 3×1; la storia e le formazioni pesano quanto «Rassegna stampa».
6. **Maiuscolo spaziato ovunque e freccia → su ogni rimando** (occhielli, date, categorie, etichette del piè di pagina, indice dei mesi, «CHIUDI», ogni «TUTTI GLI EVENTI →»). Tratto 5 di frontend-design, «Small Arrows on Every Button». Per date, luoghi e occhielli c'è **conflitto con DESIGN.md §4 e §10** (tenere il DESIGN); rimandi ed etichette del piè di pagina non sono prescritti.
7. **Piè di pagina a colonne da modello** («4-Column Template Footer»), che ripete i recapiti della pagina Contatti subito sopra. Le corde a coppa invece sono belle.
8. **Pagine d'errore con giochi di parole** («Spartito non trovato… in un altro pentagramma», «Silenzio improvviso»): la battuta a tema che un modello mette sempre nel 404.
9. **Due pulsanti nella prima schermata della home** («Sostienici» e «Per il tuo evento»): DESIGN §10 chiede un solo pulsante pieno. *(Nota: nel codice il pulsante della hero è già secondario, a contorno; da verificare a occhio.)*
10. **Pallini sulle corde del pannello del menu**: violazione di DESIGN §6 (a tutta altezza, senza pallini).
11. **Struttura vuota o ridondante**: «Momenti in musica» è un titolo con una riga e un link; l'indice dei mesi per due mesi con un evento ciascuno; «STORIA» ripetuta su tutte le righe degli articoli e lo stesso autore tre volte.
12. **«5x1000» in Cormorant**: con i numeri antichi sembra «5x1ooo», e c'è la «x» al posto di ×.

Nota sulla tavolozza: carta `#F6F1EA` più serif ad alto contrasto è il tratto 1 di frontend-design (**conflitto con DESIGN §3**, ma è il colore del marchio anche in stampa: da tenere). Su Associazione, Articoli, Contatti e Sostienici il bordeaux compare solo nel pulsante e nelle corde: manca «l'elemento forte per pagina» previsto dal §3.

### Proposte

1. **Storia con la linea del tempo sulla corda**: la colonna sinistra vuota diventa una corda con i pallini sulle date (1777, 1779, 1789, 1831, 1872, 1921, 1997, 2027) e l'anno in Cormorant accanto alla sezione. È l'eccezione ammessa dal §6. Medio. Conflitto: no.
2. **Duotone vero e una foto per ogni pagina**: filtro SVG `feComponentTransfer` (ombre inchiostro, luci cipria o carta) al posto di `grayscale(.6)` + velo; una foto diversa per home e Stradella Facendo (nel frattempo in home una foto d'archivio). Medio, serve almeno una seconda foto vera. Conflitto: no, il §9 chiede già il duotone.
3. **Home meno uniforme e più «1777»**: fondere «Chi siamo» e «Momenti in musica» in una sezione con due o tre foto d'archivio e la galleria Instagram quando c'è; sostituire lo slogan con una frase di fatto («Dal 1777 a Fivizzano: quattro formazioni, oltre cinquanta soci»), senza grassetto. Basso per il testo, medio per la sezione. Conflitto: no.
4. **Associazione e Formazioni con schede di peso diverso**: storia, Stradella e formazioni con una foto propria in bianco e nero sopra il filetto; missione, musicisti e rassegna stampa come elenco semplice. Medio. Conflitto: in parte (§10 vuole schede «senza fondo» ma non vieta immagini; servono foto vere).
5. **Riscrivere le descrizioni delle formazioni** con fatti precisi (organico, dove provano, cosa hanno suonato di recente). Basso. Conflitto: no.
6. **Rimandi ed etichette del piè di pagina in tondo**: rimandi in Jakarta 600 sottolineati, freccia solo dove indica davvero un'altra pagina; etichette del piè di pagina in pietra minuscolo, o un piè di pagina «colophon» (una riga di dati legali sotto il logotipo). Maiuscolo spaziato solo per date, luoghi e occhielli. Basso. Conflitto: no.
7. **Un solo pulsante pieno nella prima schermata**: «Per il tuo evento» secondario o link nel testo. Basso. Conflitto: no.
8. **Corde del pannello del menu senza pallini**, a tutta altezza (`layout.css` righe 163–188). Basso. Conflitto: no, è un ritorno al DESIGN.
9. **Pagine d'errore chiare e utili**: «Pagina non trovata», una riga, il prossimo concerto, i link alle pagine principali. Basso. Conflitto: no.
10. **Pulizia di dettaglio**: niente categoria ripetuta negli articoli quando sono tutti della stessa; indice dei mesi solo da tre mesi in su; «5 per mille» o «5×1000». Basso. Conflitto: no (per l'indice va aggiornata la regola di AGENTS.md su `TimelineSections`).

Da verificare: alla prima cattura una pagina evento ha mostrato il 404 del sito; alla seconda si è aperta e `curl` risponde 200. Probabilmente la build era in sostituzione in quel momento.

## C. Prove di rottura (break-ui)

Skill **break-ui**. Dati da caso peggiore sostituiti nelle pagine vive con il protocollo DevTools (il progetto non è stato toccato), a 320, 390, 820–1100 e 1280 px, chiaro e scuro, con i caratteri del browser al 150% e al 200% (le soglie in `rem` cambiano come per chi usa caratteri grandi). Schermate in `/tmp/claude-1000/-home-leo/32c9c9cf-8541-409a-84ad-8d6f58b320bd/scratchpad/break/`. Emoji, cinese e cirillico non verificabili a vista (mancano i font nell'ambiente).

### Si rompe

1. **Grave — nelle schede larghe occhiello e didascalia si sovrappongono, già con i dati veri** (`EventCard.svelte`, `ArticleCard.svelte`, blocco `@container (min-width: 48rem)`). «DOM 6 – MAR 8 DICEMBRE» tra 850 e 880 px di finestra, «La Gazzetta di Massa e Carrara» tra 900 e 960 px: l'occhiello va su due righe e la seconda si scrive sopra «ore 10 · Biblioteca…» o sopra la firma. Con testate lunghe anche a 1280 px; con una data a cavallo di due mesi a 870 px (`ev-real-870.png`, `press-real-930.png`, `press-worst-1280.png`, `ev-multiday-870.png`). Causa: la didascalia sta nella stessa cella dell'occhiello, spostata di un margine calcolato su un occhiello di una riga sola. Correzione: tre righe di griglia invece del margine calcolato, scritte una volta sola in `content.css` (oggi le regole sono copiate uguali nei due componenti).
2. **Grave — con il testo grande il pulsante del menu esce dallo schermo e la home scorre di lato.** A 390 px al 150% le corde del pulsante sono tagliate, al 200% esce tutto «Menu» (e a menu aperto «Chiudi», che non si può più premere). Causa: il nome del logotipo `nowrap`, nessuna regola di restringimento. Correzione in `SiteHeader.svelte`: `flex-shrink: 0` sul pulsante, `min-inline-size: 0` sul logo, parola «Menu» nascosta solo a vista sotto 24rem. Hero: «Filarmonica» in Display è più largo della colonna e la pagina diventa larga 449 px al 150%, 591 px al 200%: `grid-template-columns: minmax(0, 1fr)` e la sillabazione del punto 5.
3. **Grave — un indirizzo email o un URL lunghi nel testo allargano tutta la pagina su telefono** (descrizione di un evento, risposte delle FAQ, piè di pagina al 200%). Correzione in `content.css`: `a { overflow-wrap: anywhere; }`.
4. **Media — nei titoli troncati delle schede evento spunta la terza riga** (`EventCard.svelte`, `padding-block-end` sotto il `line-clamp`). Correzione: togliere il padding e un token `--lh-snug: 1.25` per i titoli troncati.
5. **Media — i titoli grandi si spezzano a metà parola senza trattino** («Precisazion/i», «Ricostituzio/ne»; con il testo al 150% anche «Calendari/o»). Correzione: `hyphens: auto` su `h1…h6` (`lang="it"` c'è già).
6. **Rischio — il menu in linea non ha margine per altre voci**: con tre voci in più, a 1024 px le etichette vanno su due righe e «Sostienici» esce. Correzione: `white-space: nowrap` sulle voci e soglia rivista quando si aggiungono.
7. **Rischio, dal CSS — galleria con una o due foto**: con `auto-fit` una foto sola si allargherebbe a circa 1024 px (1280 di altezza in 4:5). Correzione: `auto-fill`.
8. **Minore — il «+» delle FAQ centrato su domande di cinque righe**: allinearlo alla prima riga.

### Regge bene

Schede evento in colonna singola con titoli, descrizioni e luoghi lunghissimi, URL, parole senza spazi; eventi con campi mancanti (nessun «·» orfano) e 30 eventi; «Quando e dove» con date di più giorni e indirizzi lunghi, anche al buio; intestazioni (il testo non arriva mai sulle corde); rassegna stampa senza link, senza autore, con titoli lunghi; organico con 7 gruppi da 7 strumenti; moduli con etichette lunghe, errori, nomi di file lunghissimi, due file, tema scuro, 320 px; menu a pannello a 320 px e al 150%; piè di pagina a 320 px e al 150%; casi vuoti (home senza eventi, calendario vuoto, galleria assente, notizie nascoste); desktop al 200% (il menu passa da solo al pannello).

### Proposte, in ordine di priorità

1. **Griglia delle schede larghe** (punto 1), l'unico difetto visibile già oggi: (a) tre righe di griglia, consigliata; (b) soglia del contenitore a circa 56rem; (c) occhiello troncato con i puntini (sconsigliata).
2. **`a { overflow-wrap: anywhere }`** in `content.css`.
3. **Header e hero con testo grande** (punto 2).
4. **`hyphens: auto` sui titoli.**
5. **Titoli troncati delle schede evento** con `--lh-snug`.
6. **Preventivi**: `auto-fill` nella galleria, `nowrap` sulle voci del menu, «+» delle FAQ alla prima riga.
7. **Email nei moduli**: `type="email"` accetta anche indirizzi senza punto nel dominio; se serve, un `pattern`.
