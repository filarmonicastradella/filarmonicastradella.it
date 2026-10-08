# Design system — Filarmonica Alessandro Stradella

Riferimento unico per grafiche, stampa, social e sito. Versione 1.1, ottobre 2026.

**È la regola**: il sito è HTML semantico che si veste con questo sistema, non il contrario. Nel codice i token hanno gli stessi nomi di questo documento e del design system pubblicato (`src/lib/styles/colors.css`, `typography.css`, `layout.css`); nelle regole si usano solo i ruoli (`--bg`, `--text`, `--text-brand`, `--accent`...), mai i valori.

## 1. Identità

La Filarmonica Alessandro Stradella APS è un'istituzione musicale fondata nel 1777 a Fivizzano. Riunisce più formazioni (orchestra, orchestra di fiati, musica antica, street band). Questo documento riguarda il marchio generale; le singole formazioni avranno identità proprie.

**Posizionamento.** Autorevolezza istituzionale e accademica, con un'immagine contemporanea e desiderabile per i giovani. Musica fatta sul serio.

**Da evitare sempre.** Tutto ciò che sembra folkloristico o improvvisato: clipart di strumenti, font "festosi", tricolori e coccarde, foto di gruppo davanti al municipio, la parola "banda".

## 2. Denominazione

| Contesto | Forma |
|---|---|
| Logo e titoli | Filarmonica Alessandro Stradella |
| Testi, dopo la prima citazione | la Filarmonica |
| Documenti ufficiali, contratti, piè di pagina | Filarmonica Alessandro Stradella APS, con codice fiscale e iscrizione RUNTS |

"APS" non compare mai nel logo.

## 3. Colori

| Nome | HEX | Uso |
|---|---|---|
| Bordeaux | `#701521` | Colore principale: logo, titoli, pulsanti, un elemento forte per pagina |
| Bordeaux notte | `#480C15` | Fondi pieni scuri, hover |
| Cipria | `#EBD9DA` | Fondi tenui, testo su bordeaux |
| Carta | `#F6F1EA` | Sfondo principale (stampa e sito) |
| Inchiostro | `#1E1A1B` | Testo, fondi scuri |
| Pietra | `#6E6668` | Testo secondario |
| Ottone | `#B08A4E` | Solo edizioni speciali (gala, 250° anniversario) |

**Proporzione d'uso:** carta 60%, inchiostro 25%, bordeaux 12%, accento 3%. Il bordeaux è un segno, non uno sfondo: se riempie tutto perde valore. Eccezioni: story e campagne giovani, dove il fondo bordeaux pieno è ammesso.

**Tema scuro (sito):** segue l'impostazione del dispositivo. Fondo inchiostro, testo carta; al posto del bordeaux, illeggibile sul nero, il rosa velluto `#C98891` per link, date e azioni. Il piè di pagina passa al bordeaux notte.

Contrasti verificati (tutti conformi WCAG AA): bordeaux su carta 10,3:1, bordeaux su bianco 11,5:1, pietra su carta 5:1, cipria su bordeaux 8,5:1, carta su inchiostro 15,3:1.

## 4. Tipografia

- **Cormorant Garamond** (500, 600, corsivo 500): titoli, solo da 24 px in su. Mai Light o Regular.
- **Plus Jakarta Sans** (400, 500, 600): testi, date, luoghi, menu, pulsanti, didascalie.

| Livello | Font | Peso | Dimensione / interlinea |
|---|---|---|---|
| Display | Cormorant | 500 | 64 / 1,0 |
| Titolo 1 | Cormorant | 500 | 44 / 1,1 |
| Titolo 2 | Cormorant | 600 | 30 / 1,2 |
| Titolo 3 | Cormorant | 600 | 24 / 1,2 |
| Occhiello | Jakarta, maiuscolo, spaziatura 0,16 em | 600 | 12 |
| Testo | Jakarta | 400 | 16 / 1,6 |
| Didascalia | Jakarta | 400 | 13 / 1,5 |
| Pulsante | Jakarta | 600 | 14 |

**Regole**
- Un solo titolo in Cormorant per composizione, con al massimo una parola in corsivo o in bordeaux. È il gesto distintivo del marchio.
- Mai due titoli in Cormorant della stessa dimensione affiancati.
- Cormorant ha numeri "antichi" (non allineati): belli nei titoli ("dal 1777"). Per orari, prezzi e tabelle usare Jakarta con numeri tabulari.

## 5. Logo

Il simbolo è una lira sormontata dalla mezzaluna, emblema della Lunigiana e di Fivizzano. Il logotipo usa "FILARMONICA" come occhiello in Jakarta, "Alessandro Stradella" in Cormorant, e la firma "Fivizzano · dal 1777" in Jakarta maiuscolo spaziato.

Il vettoriale di riferimento è `src/lib/assets/favicon.svg` (disegnato a mano, simmetrico); la favicon del sito è `src/lib/assets/icon.svg`, simbolo carta su quadrato bordeaux.

**Versioni**
- Verticale: locandine, copertine, striscioni.
- Orizzontale: intestazione del sito, carta intestata, email, piè di pagina.
- Solo simbolo: avatar social, favicon, timbri.

**Colori ammessi:** bordeaux su carta o bianco; carta su bordeaux; bianco su inchiostro. Ottone solo per edizioni speciali.

**Spazio di rispetto:** almeno l'altezza della mezzaluna su ogni lato.
**Dimensione minima:** simbolo alto almeno 10 mm in stampa, 24 px a schermo.

**Vietato:** deformare, ruotare, aggiungere ombre o contorni, ricolorare con colori non previsti, appoggiare il logo su foto senza fondo uniforme, ricomporre la scritta con altri font, usarlo come motivo ripetuto.

## 6. Elementi grafici

- **Le corde** (elemento base): tre linee verticali sottili e parallele, sempre a tutta altezza, su un lato della composizione. Presenti in quasi tutti i formati.
- **La mezzaluna** (eventi importanti): la forma della mezzaluna come finestra per la foto. Solo per inaugurazione di stagione, gala, anniversari.
- **Il filetto**: breve linea bordeaux (spessore 2 px) per separare titolo e firma.

## 7. Iconografia

- **Un solo set:** Heroicons, in una sola variante per tutto il sito. Unica eccezione: Simple Icons, solo per i loghi dei social, sempre monocromatici (mai i colori originali dei marchi).
- **Solo funzionali:** un'icona indica un'azione o una destinazione (aprire il menu, link esterno, freccia di rimando, social). Mai decorative, mai strumenti musicali.
- **Colore:** sempre `currentColor`, cioè quello del testo che accompagnano; nessun colore proprio.
- **Dimensione:** 1 em accanto al testo; 1,25 rem nei pulsanti e nei social; mai oltre 24 px.
- **Accessibilità:** sempre con `aria-hidden` e una parola accanto che dice la stessa cosa; l'icona non è mai l'unica etichetta.
- **Niente emoji**, né al posto delle icone né accanto.

## 8. Fotografia

- **Sì:** luce di scena, fondi scuri, dettagli (mani, ance, archi, respiro), ritratti con sguardo in camera, luoghi storici della Lunigiana.
- **No:** foto di gruppo in fila, flash diretto, transenne e gazebo, scatti mossi o sgranati.
- **Trattamento standard sui social:** duotone inchiostro e bordeaux. Bianco e nero quando la qualità è disomogenea. Colore pieno solo per foto professionali.
- Prevedere un servizio fotografico professionale all'anno.

## 9. Componenti

**Regole comuni**
- Margini pari a 1/12 del lato corto.
- Logo sempre in alto o in basso, mai al centro.
- Data e luogo in Jakarta maiuscolo spaziato.
- Massimo tre livelli di testo per formato.
- Angoli quasi vivi (2 px): editoria, non app.

**Formati**
- Post social 4:5 (1080×1350): foto in duotone a tutta pagina, simbolo in alto a sinistra, data, titolo grande in basso, corde sul bordo destro.
- Story 9:16 (1080×1920): fondo bordeaux, corde che scendono sul simbolo, testo centrato, un pulsante.
- Programma di sala A5: fondo carta, corde sul margine sinistro, titolo dell'opera in Cormorant, crediti in Jakarta.
- Locandina standard: fondo carta, corde sul lato destro, titolo in alto a sinistra, data e luogo in basso.
- Locandina speciale: fondo inchiostro, foto nella mezzaluna, titolo centrato.

**Sito**
- Intestazione: logo orizzontale a sinistra, massimo cinque voci di menu, un solo pulsante pieno bordeaux per l'azione principale.
- Pulsante primario: fondo bordeaux, testo carta. Secondario: contorno inchiostro 1 px.
- Schede (eventi, notizie, rimandi): fondo `--bg-raised`, bordo sottile `--border`, angoli `--radius`, nessuna ombra; il bordo diventa bordeaux al passaggio del mouse.
- Card evento: giorno grande in Cormorant bordeaux, mese in occhiello, titolo in Cormorant 600, orario e luogo in didascalia.
- Apertura della homepage: occhiello, titolo display con una parola in corsivo bordeaux, sottotitolo, pulsante primario a sinistra su carta; foto in duotone a destra; corde sul confine.
- Colonne di testo al massimo 40 rem.

## 10. Tono di voce

**Competenti ma accoglienti.** Come un direttore che presenta il concerto al pubblico.

1. Chiari prima che eleganti: frasi brevi, una idea per frase.
2. Precisi sulla musica: titoli, autori, tonalità e cataloghi sempre corretti.
3. Calorosi, mai folkloristici.
4. Inclusivi verso chi non conosce il repertorio: una riga di contesto.

**Convenzioni**
- Si dà del **tu** al pubblico (sito, social, locandine). Forma impersonale o "voi" solo nei documenti ufficiali e con enti e sponsor.
- **Niente emoji**, in nessun canale.
- Date: "sabato 14 novembre, ore 21".
- Opere in corsivo nei testi; autore per esteso alla prima citazione.
- Nessun rilievo a una figura di direttore: i direttori sono alla pari degli altri musicisti. Niente titoli onorifici.
- Un solo punto esclamativo, e solo se serve. Niente maiuscole per enfasi, niente puntini di sospensione.

**Esempio.** No: "Grande serata di musica con la nostra mitica banda!!! Vi aspettiamo numerosi!!!" Sì: "Sabato 14 novembre il Requiem di Mozart torna a Fivizzano. Orchestra e coro della Filarmonica, ingresso libero."
