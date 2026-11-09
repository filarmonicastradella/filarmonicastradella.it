# Lista unica dei problemi e delle modifiche

Tutto quello che è emerso dalle analisi, una voce per problema, per affrontarli uno alla volta. Fatta il 30/10/2026 unendo `revisione-2026-10-30.md`, `proposte-design-2026-10-30.md`, `riprogettazione-2026-10-30.md` e `TODO.md`; le voci ripetute in più analisi sono una sola, con tutte le fonti.

**Come si usa.** Si prende una voce, si decide, si fa, e la riga si toglie (il `git log` conserva il resto). Una decisione che chiude una voce senza farne nulla si toglie lo stesso. Le istruzioni passo passo (Instagram, pagine disattivate) restano in `TODO.md`; i dettagli e le frasi proposte stanno nei report citati.

**Tipo.** **D** = serve una tua decisione. **F** = la soluzione è chiara, basta farla.

**Fonti.** R = revisione (R3.6 è la parte 3, punto 6); PA, PB, PC = proposte di design, parti A, B, C (PAc = correzioni, PAm = miglioramenti, PAi = idee); N = riprogettazione; T = `TODO.md`; S = emerso in sessione; BR, BA, FE, MC = siti di altre bande presi a modello il 9/11/2026: Rovato (`bandadirovato.it`), Bagnone (`filarmonicabagnone.it`), Felina (`bandafelina.it`), Musica Cittadina Pontremoli (`musicacittadina.it`), Accademia Nazionale di Santa Cecilia (`santacecilia.it`, SC), Wiener Philharmoniker (`wienerphilharmoniker.at`, WP), Berliner Philharmoniker (`berliner-philharmoniker.de`, BP), Philharmonia Orchestra (`philharmonia.co.uk`, PO), Conservatorio Puccini della Spezia (`conssp.it`, CS), Conservatorio Boccherini di Lucca (`boccherini.it`, LB).

**Stato delle voci.** Ho tolto quelle che i report e i commit danno per risolte, e ho ricontrollato sul codice, con ricerche mirate, soprattutto i testi. Non è una verifica riga per riga: se una voce risulta già fatta, si toglie. La modifica ancora aperta a `layout.css` è indicata in 3.1.

## 0. Prima di tutto: scelte da cui dipendono le altre

**Deciso il 4/11/2026:** si tiene `DESIGN.md`, con ritocchi. Il sito resta sobrio, «da conservatorio»; le direzioni più forti (il cartellone, il rapporto stampato con il bordeaux a tutta superficie e il carattere da testata) sono state viste e scartate come esagerate. Le voci della parte 3 restano valide come ritocchi. Il motto è «Le dissonanze in un accordo solo», dal diploma dell'Accademia de' Filarmonici Dissonanti, senza spiegazione accanto (deciso il 4/11/2026, chiude 0.5). La revisione di design (0.1) continua pagina per pagina: `design-home-2026-11-03.md`, `design-associazione-2026-11-04.md`.

- [ ] 0.4 **D** — Quando unire `stili` a `main`: 33 commit non sono online, comprese le correzioni della revisione. La pubblicazione parte solo da `main`. (S)
- [ ] 0.6 **D** — Notizie e gallerie non hanno fonti: con la regola «l'articolo ha le fonti» restano articoli per eccezione o diventano pagine? (S, T)

## 1. Fuori dal sito

- [ ] 1.0 **D** — **Eventi interni in home e in calendario**: «Prove Ensemble Lunilicei — Evento creato automaticamente dal sondaggio» è pubblico, perché il sito legge tutto il calendario Google senza filtri. Calendario pubblico separato, o filtro in `calendar.ts`; e titoli degli eventi con la maiuscola solo all'inizio. Le proposte di design del 7/11 sono in `docs/analisi-design-2026-11-07.md`. (A1, 7/11/2026)
- [ ] 1.1 **F** — **FormSubmit: finché le caselle non sono attivate i messaggi dei moduli si perdono.** È la voce più urgente della lista. Poi sostituire gli indirizzi con gli alias. (T, R3.23)
- [ ] 1.2 **F** — Certificato per `www`: chi arriva da `https://www.` vede un errore di sicurezza. (R3.1, T)
- [ ] 1.3 **F** — PayPal: manca l'ID vero del pulsante di donazione. (T)
- [ ] 1.5 **F** — Google Calendar, i testi degli eventi: maiuscole nei titoli, «Bandistica», il «voi» di «Aspettate di sentire il bis», la biblioteca scritta in due modi, autori per esteso. (R5, T)
- [ ] 1.6 **D** — Google Calendar: le «feste patronali» nella descrizione della mostra vanno bene? (R5, T)
- [ ] 1.7 **F** — Consulente: consensi dei moduli contro base giuridica dell'informativa. (R5b.13, T)
- [ ] 1.8 **F** — Consulente: la dichiarazione dei minori rimanda a un «orario» mai nominato. (R5b.5, T)
- [ ] 1.9 **F** — Consulente: sede e trasferimento dati dei fornitori, tempi di conservazione, bozze di `legal/`. (T)

## 2. Funzioni del sito

- [ ] 2.2 **D** — Senza JS, sotto 64rem, il menu non si apre: voci anche nel piè di pagina, o pannello nascosto con `@media (scripting: enabled)`. (R2.3, T)
- [ ] 2.3 **F** — Senza JS la domanda di un minore parte come quella di un adulto. (R2b.3, T)
- [ ] 2.4 **F** — La 404 è vuota senza JS: generarne una vera alla build. (R3.14, T)
- [ ] 2.5 **F** — Modulo di iscrizione: manca come e quando versare la quota. (T)
- [ ] 2.6 **D** — Iscrizione: avviso se si esce dal modulo a metà? (R2b.14, T)
- [ ] 2.7 **D** — Email nei moduli: `type="email"` accetta domini senza punto. Serve un `pattern`? (PC7)
- [ ] 2.8 **D** — Indirizzi degli eventi con l'id di Google Calendar: meglio data e titolo? Va deciso con 2.1. (R3.25)
- [ ] 2.9 **D** — Pagine disattivate, in che ordine riattivarle: `support/volunteer` ha priorità alta; poi associazione, trasparenza, media, `faq`. (T)
- [ ] 2.10 **F** — Documenti dell'associazione: visualizzazione unica in Markdown, tranne lo statuto. (T, AGENTS)
- [ ] 2.11 **F** — Pagine future (interviste, riconoscimenti): nascono come articoli, con le fonti. (T, S)
- [ ] 2.12 **D** — Stampa: oggi si stampano intestazione, menu e corde. Serve un `@media print`? (PAm8)

## 3. Design: ritocchi al sistema attuale

- [ ] 3.1 **F** — Display solo con la foto, Titolo 1 altrove: è la tua modifica aperta in `layout.css`, da giudicare e committare. (PAc1, T)
- [ ] 3.2 **D** — Foto: un duotone vero, o si dichiara il trattamento attuale (`grayscale(.6)`)? (R4.5, PAc6, PAi5, PB2, T)
- [ ] 3.3 **D** — Una sola foto attuale, usata in hero e in Stradella Facendo: servono foto vere o un trattamento che regga le deboli (retino a un inchiostro). (PB2, N)
- [ ] 3.4 **D** — Lo stesso scheletro su tutte le pagine (titolo a sinistra, testo a destra), ripetuto quattro volte in home. (PB1, PAi6, N)
- [ ] 3.5 **D** — Home: unire «Chi siamo» e «Momenti in musica»; cosa si vede senza galleria. (R4.13, PB3, T)
- [ ] 3.6 **D** — Prima schermata: aprire con il prossimo concerto invece che con il nome ripetuto. (N, PAm5)
- [ ] 3.7 **D** — Bordeaux quasi assente in molte pagine: un elemento forte per pagina. (PB, PAi2, N)
- [ ] 3.8 **D** — Maiuscolo spaziato ovunque, freccia su ogni rimando (26 punti), punto a metà: dove tenerli. (PAm5, PB6, PAc9, N)
- [ ] 3.9 **D** — Parola singola in corsivo nel titolo: tenerla, darle un significato (PAi1) o toglierla. (PB, N)
- [ ] 3.10 **D** — Schede di solo testo tutte dello stesso peso (Associazione, Formazioni, Sostienici). (PB5, PB4)
- [ ] 3.11 **D** — Piè di pagina: alto quasi quanto le pagine corte, colonne da modello, recapiti ripetuti (i titoli Cormorant sono già diventati occhielli il 4/11/2026). (R4.4, R4.20, PB7, N, T)
- [ ] 3.12 **D** — Hero: una sola comparsa invece del testo che sale in sequenza; foto e titolo visibili subito (aiuta anche l'LCP). (PAm6, R3.10, T)
- [ ] 3.13 **D** — Pulsante della hero: nome con un verbo, e se deve stare nella prima schermata. (R5.18, R5b.16, PB7, N, T)
- [ ] 3.14 **F** — Pagine d'errore: togliere i giochi di parole («pentagramma», «Silenzio improvviso»), aggiungere prossimo concerto e link. (PB8, PB9, R5b.18, T)
- [ ] 3.15 **D** — Storia: linea del tempo sulla corda, nella colonna vuota. (PB, N)
- [ ] 3.16 **D** — Il 1777 come immagine per il 250°, con l'ottone. (PAi3, PAm7)
- [ ] 3.17 **F** — Storia: foto degli anni Trenta sgranata; scansione migliore o fascia più bassa. (R4.11, T)
- [ ] 3.18 **D** — A 390 px le corde stringono le intestazioni a circa 30 caratteri per riga. (R4.6, T)
- [ ] 3.21 **F** — Rassegna stampa: freccia isolata e misura diversa tra schede con e senza link (da ricontrollare, parte già corretta). (R4.8)
- [ ] 3.22 **F** — «+» delle domande: allinearlo alla prima riga nelle domande lunghe. (PC6)
- [ ] 3.23 **F** — Storia su telefono: indice irregolare, una voce per riga sotto 40rem. (R4.17)
- [ ] 3.24 **F** — Ingaggi: il consenso resta staccato dal gruppo «Chi scrive». (R4.18)
- [ ] 3.25 **F** — «STORIA» ripetuta su ogni riga degli articoli e lo stesso autore tre volte: togliere quando sono tutti uguali. (PB11, PB10)
- [ ] 3.26 **D** — «5x1000»: in Cormorant sembra «5x1ooo». «5 per mille» o «5×1000»? (PB12)
- [ ] 3.28 **D** — Carta `#F6F1EA`: tenerla, o un bianco meno giallo. (PAi4, N)

- [ ] 3.29 **D** — Corde solo nella hero della home e nel piè di pagina, via dalle intestazioni di tutte le altre pagine: ripetute in 13 pagine su 13 sono diventate carta da parati. Prova sul ramo `prova-design`. (A5, 7/11/2026)
- [ ] 3.30 **D** — Piè di pagina in bordeaux notte invece che inchiostro: oggi il blocco più scuro e pesante del sito è il meno importante. Prova sul ramo `prova-design`. (A4)
- [ ] 3.31 **D** — Una superficie bordeaux per pagina (in home la fascia «Sostieni la Filarmonica», negli indici l'intestazione). Prova in home sul ramo `prova-design`. (A4)
- [ ] 3.32 **D** — Descrizioni di schede e presentazioni in inchiostro invece che in grigio: il grigio solo per date e didascalie. Prova sul ramo `prova-design`. (A4)
- [ ] 3.33 **D** — Scala dei titoli: h2 32–36, h3 22 (oggi 28–30 e 24, salto di 1,2 sotto la soglia di 1,5); Cormorant 600 fino all'h2. Prova sul ramo `prova-design`. (A6; con 4.2)
- [ ] 3.34 **D** — Maiuscolo spaziato solo per le date; categorie, testate, etichette del piè di pagina in tondo; rimandi come link per esteso senza maiuscoletto. Prova sul ramo `prova-design`. (A6; con 3.8)
- [ ] 3.35 **D** — Quattro tipi di pagina (indice con immagini, lettura lunga in una colonna centrata con note a margine, scheda, modulo) al posto dello scheletro unico. (A3; con 3.4, 3.10)
- [ ] 3.36 **D** — Copertine più alte (almeno metà schermo anche su computer) e una foto per scheda nelle pagine indice; velo più leggero sulle foto a colori. (A7)
- [ ] 3.37 **F** — Associazione quasi vuota: titolo, due righe e tre schede di solo testo; servono immagini, numeri, persone. (A, Associazione)
- [ ] 3.38 **D** — Storia: le note a margine su schermo largo invece del titolo di sezione a sinistra con il 40% della larghezza vuoto. (A, Storia; con 3.15)
- [ ] 3.39 **D** — Formazioni: otto sezioni per pagina; tenere presentazione, prossimi appuntamenti e suona con noi, il resto in un blocco o nelle domande. (A8; con 5.1)
- [ ] 3.40 **D** — Articoli: i nostri articoli (storia, Stradella, sonetto) hanno lo stesso peso delle uscite di giornale, ma sono i contenuti migliori del sito. (A, Articoli)
- [ ] 3.41 **D** — Contatti: la sezione «Recapiti» ripete telefono, email e PEC del piè di pagina; tenerli in un posto solo. (A8; con 3.11)

## 4. Il documento DESIGN.md

- [ ] 4.15 **F** — Logotipo: nel sito dal 4/11/2026 FILARMONICA è in maiuscole di Cormorant appena spaziate, sopra il nome e nello stesso colore, senza l'occhiello in Jakarta maiuscolo. Da rifare uguale nel kit di marca (versioni verticale e orizzontale), su locandine, carta intestata e social. (S)
- [ ] 4.14 **D** — Proposta del 4/11/2026: scala tipografica modulare, un solo rapporto (1,25, terza maggiore) dal testo a 16 px: piccoli 12,8 (didascalie, occhielli e pulsanti a una sola misura), presentazione 20, Titolo 3 25, Titolo 2 31,3, Titolo 1 39,1, Display 61 sul largo e 48,8 sul telefono (un gradino sotto). Quasi tutta fissa; risolve il punto 8 della home (Titolo 2 e 3 troppo vicini sul telefono) e assorbe 4.2. Campione confrontato con la scala di oggi in sessione; da riprendere più avanti. (S)
- [ ] 4.2 **D** — Regola «un solo titolo Cormorant»: darle un ambito, e `--fs-h2` da 28 a 36 su telefono. (PA3, PAc3, R4)
- [ ] 4.3 **F** — «Una volta per schermata» diventa «una per estremità». (PA5, PAc5)
- [ ] 4.4 **F** — Hero: scrivere «pulsante secondario, il solo pieno è Sostienici». (PA7, PAc7)
- [ ] 4.5 **F** — Tavolozza completa: Sabbia, Nebbia, Rosa velluto, Bianco, il `#2A2425`; proporzione d'uso. (PA8, PA9, PAc8)
- [ ] 4.6 **F** — Ambito delle regole comuni: margini 1/12 e tre livelli solo per stampa e social. (PA11, PAc10)
- [ ] 4.7 **F** — Due filetti, due nomi. (PA12, PAc11)
- [ ] 4.8 **F** — Movimento: scrivere `clip-path` per corde e pannello. (PA13, PAc12)
- [ ] 4.9 **F** — Riferimenti morti, versione 1.3, registro delle decisioni. (PA14, PA15, PA16, PAc13)
- [ ] 4.10 **D** — Sezioni nuove: token, scala tipografica, spaziatura. (PAm1, PAm2)
- [ ] 4.11 **D** — Sezioni nuove: contrasti e tema scuro, accessibilità e stati. (PAm3, PAm4)
- [ ] 4.12 **D** — Sezioni nuove: anteprime social, grafici, email, ottone. (PAm7, PAm9, PAm10, PAm11)
- [ ] 4.13 **F** — Ripiego metrico per Cormorant. (PAm12)

## 5. Testi

- [ ] 5.1 **F** — Presentazioni di Stradella Facendo, Streetella Band e Filarmonici Dissonanti: riscrivere con fatti precisi; proposte pronte. (R5.1-3, R5b.32, PB4, PB5, T)
- [ ] 5.2 **F** — Dissonanti: manca il nome del gruppo storico delle «dame». (R5.3, T)
- [ ] 5.3 **D** — Missione: «sale prestigiose», «centinaia di persone». Testo approvato, da decidere con i responsabili. (R5.11, T)
- [ ] 5.4 **D** — Missione: i molti «non X, ma Y», «ogni euro e ogni ora». (R5.12, T)
- [ ] 5.5 **D** — Missione: «Siamo un'associazione, non un'accademia» stride con l'Accademia. (R5.12, R5b.42, T)
- [ ] 5.6 **D** — Missione: «nessuno di noi è pagato», tema compensi. (R5.33, R5b.23, T)
- [ ] 5.7 **F** — Missione: «una prova non salta mai», «guide», il nesso tra funzioni religiose e realtà amiche. (R5.34, R5b.21)
- [ ] 5.8 **F** — «Non svolgiamo servizi religiosi» nella missione: «servizio» è gergo per uscita pagata. (R5b.20)
- [ ] 5.10 **D** — Home: «ogni contributo va… ai giovani» non c'è nella FAQ delle donazioni. (R5.7, T)
- [ ] 5.11 **F** — Introduzioni che ripetono titoli o schede, compreso «Suonare costa» in Sostienici. (R5.17)
- [ ] 5.12 **D** — «Chi è il maestro?» o «Chi dirige?»: l'avevi scelta tu. (R5.22, R5b.34, T)
- [ ] 5.13 **F** — «Che livello serve?»: «ce n'è una per ogni livello» va verificato. (R5.23, T)
- [ ] 5.14 **D** — Apostrofo dritto o tipografico ovunque. (R5.16, R5b.27, R2b.18, T)
- [ ] 5.15 **D** — Numeri in cifre o lettere; «Flicorno», «Flicorni», «Euphonium». (R5.28, R5.35, R5b.25, R5b.44, T)
- [ ] 5.16 **F** — Organico: «Cordofoni» con dentro «Archi»; «Percussioni» dentro «Percussioni». (R5.28, R5.44, T)
- [ ] 5.17 **F** — Accademia scritta in tre modi, citazioni escluse. (R5.38, T)
- [ ] 5.18 **F** — «informativa sulla privacy» o «informativa privacy»: una forma. (R5b.37, T)
- [ ] 5.19 **F** — «Perché più formazioni?» chiude con l'etimologia; Infieri, «dare a ogni sezione il proprio spazio». (R5.36, R5.37, T)
- [ ] 5.20 **F** — Stradella Facendo: «Museo di San Giovanni degli Agostiniani» o «Museo di Arte Sacra». (R5.45, T)
- [ ] 5.21 **F** — Articoli: l'introduzione elenca categorie ancora vuote. (R5.29, R5b.43, T)
- [ ] 5.22 **F** — «Scopri l'associazione» e «Momenti in musica», titoli generici. (R5.30, R5.31)
- [ ] 5.23 **F** — Causale della donazione ambigua. (R5b.14)
- [ ] 5.24 **F** — Piccoli: «profilo Instagram», «Più sotto ne trovi la trascrizione», «Quello che segue viene…», «statuto (PDF)». (R5b.38, R5.40, R5.41, R2b.16)
- [ ] 5.25 **F** — Storia: senza fonte l'unione di due bande e la data del nome Stradella; didascalia della foto anni 80/90. (T)
- [ ] 5.26 **F** — Liberatoria: «ne prende visione» senza antecedente. (R5b.31)
- [ ] 5.27 **F** — Domande degli eventi anche sulla mostra: «concerti» o «eventi». (R5b.30, R3b.16)
- [ ] 5.28 **F** — Controllo antislop dei testi con `antislop-copywriting`, da installare nel progetto: non è mai stato fatto. La skill è pensata per l'inglese, quindi per l'italiano vale come seconda lente dopo `scrittura-italiana`. Comprende i testi scritti dopo la revisione (`alt` e didascalia della lapide). (S)
- [ ] 5.30 **D** — Nomi delle pagine contro menu e rimandi (4/11/2026): titolo «L'associazione» e «Le nostre formazioni» contro le voci «Associazione» e «Formazioni»; i rimandi delle formazioni dicono «Le nostre formazioni»; i tre ringraziamenti dopo i moduli dicono «Torna alla pagina principale» invece del nome della pagina del modulo. (S)
- [ ] 5.29 **D** — La lineetta `—` nei titoli di tutte le pagine: antislop la vieta. Tenerla o sostituirla? (S)

## 6. SEO e dati strutturati

- [ ] 6.1 **D** — Foto della hero su telefono: `sizes` a 160vw, da misurare su telefoni veri. (R3.9, T)
- [ ] 6.2 **F** — Pagine figlie con un solo link interno: missione, musicisti, rassegna stampa. (R3.24)
- [ ] 6.3 **D** — Articoli: `dateModified` e `url` dell'autore. (R3b.9)
- [ ] 6.4 **D** — Sottotipi di evento: `MusicEvent`, `ExhibitionEvent`. (R3b.16)
- [ ] 6.5 **D** — Titoli oltre 60 caratteri, ricontrollati il 7/11/2026: `articoli/storia/sonetto` 66, `contatti/ingaggi` 63, `trasparenza` 62, `trasparenza/contributi` 63, `informative/materiale` 62, due eventi 68 e 70. (R3.18, A)
- [ ] 6.9 **F** — Description fuori misura (7/11/2026): corte `articoli/stampa` 70, `formazioni/orchestra-infieri` 72, `informative/cookie` 94, `trasparenza` 104, `sostienici/dona` 106, `formazioni/stradella-facendo` 108; lunghe `associazione/iscrizione` 208, `informative/materiale` 175, `contatti/ingaggi` 172 (Google taglia oltre circa 155). (A)
- [ ] 6.6 **D** — Rassegna stampa come `NewsArticle` di testi altrui. (R3.20, R3b.15)
- [ ] 6.7 **F** — Dettagli dell'ente: URL della home con la barra, `contactPoint`, `areaServed`; breadcrumb «Home» da ricontrollare. (R3b.13, R3b.14, R3.16)
- [ ] 6.8 **D** — Sicurezza: CSP come `<meta>`; il resto richiederebbe un CDN, come la cache. (R3.21, R3.22)

## 7. Da verificare a mano

- [ ] 7.1 **F** — Screen reader: NVDA con Firefox, VoiceOver su iPhone e Mac. (R2, T)
- [ ] 7.2 **F** — Tastiera vera su tablet, Windows ad alto contrasto, zoom 200-400%. (R2, PA, T)

## 8. Codice minore

- [ ] 8.1 **F** — `hooks.server.ts`: controllo esplicito se manca `</section>`. (R1.8)
- [ ] 8.2 **F** — Calendario: aggiornare anche al ritorno sulla scheda, come `UpcomingEvents`. (R1.5)
- [ ] 8.3 **D** — Contatti: `requested` letto una volta sola. Oggi nessun link lo fa pesare. (R1.9)
- [ ] 8.4 **F** — Controlli di accessibilità rimasti: `<time>` per un intervallo, `aria-labelledby` per «Note legali», focus dopo `MapEmbed`. (R2.12, R2.14, R2b.15)

## 9. Idee per attirare persone e finanziatori

- [ ] 9.1 **D** — Mettere in evidenza i giovani: l'età media sotto i 18 anni è un dato forte, con le liberatorie. (T)
- [ ] 9.2 **F** — Consiglio direttivo e rendiconto online. (T)
- [ ] 9.3 **D** — Numeri d'impatto. Modello: la home della banda di Rovato, sotto la storia, ha tre numeri fermi («64 musicanti, 50 allievi, 35 membri Junior Band») che dicono subito quanto è grande la realtà. Per noi: musicisti, formazioni (quattro), anno di fondazione (1777), magari i concerti dell'anno; in evidenza in home; i valori in un punto solo (`organization.ts`). (T, BR)
- [ ] 9.4 **F** — Partner e patrocini con i loghi. (T)
- [ ] 9.5 **D** — Notizie regolari, almeno una al mese. (T)
- [ ] 9.6 **D** — Ingaggi: video brevi, «Dove abbiamo suonato». (T)
- [ ] 9.7 **F** — Musicisti: manca la sezione Archi. (T)
- [ ] 9.8 **D** — Articolo sui luoghi della musica a Fivizzano. (S)
- [ ] 9.9 **D** — **Pagina dei 250 anni, «1777 | 2027»**, da preparare prima che cominci il 2027. Modello: Rovato ha una pagina per i suoi 200 anni («1824 | 2024», `bandadirovato.it/eventi200.html`) con tutti gli appuntamenti dei festeggiamenti, e in home un richiamo «Rivedi tutti gli appuntamenti». Per noi: gli eventi dell'anniversario (dal calendario, per esempio con un hashtag `#250anni` come per le formazioni), un rimando alla storia, i materiali per la stampa; richiamo in home per tutto il 2027, poi la pagina resta come archivio. Da decidere: indirizzo (sotto Associazione o Calendario), nome, se ha un logo celebrativo. (BR)
- [ ] 9.10 **D** — **Locandina scaricabile degli eventi** («Scarica il flyer» a Rovato): la locandina come file, comoda da girare su WhatsApp. Per noi: l'immagine allegata all'evento di Google Calendar, letta alla build e pubblicata con la pagina dell'evento, con un link a contorno «Scarica la locandina» (come i link ai file con il tipo); senza allegato, niente link. Il Boccherini mostra la locandina anche nel calendario del mese, sotto il giorno. Da verificare: come l'API di Calendar espone gli allegati di Drive e se sono pubblici. (BR)
- [ ] 9.11 **D** — **La scuola in home**, se un giorno ci sarà una scuola organizzata: Rovato ha in home una sezione con un blocco per tipo di corso (strumenti, corsi collettivi e Junior Band, propedeutica Gordon per la I e II elementare, adulti, progetto nelle scuole primarie) e una pagina Scuola con insegnanti e metodi. Oggi per noi non serve: l'iscrizione è in Associazione. (BR)

- [ ] 9.12 **D** — **Occhiello di luogo e anno in cima alla home**, come Felina («Felina · Appennino reggiano · Dal 1870») e Bagnone («dal 1831»): per noi «Fivizzano · Lunigiana · Dal 1777». (FE, BA)
- [ ] 9.13 **D** — **Foto d'archivio in home con la didascalia** «Dal nostro archivio, la formazione nel 2006» (Felina): una foto storica della Filarmonica con anno e occasione, che lega la storia a oggi. (FE)
- [ ] 9.14 **D** — **«Il primo passo? Iniziare a suonare.»** (Felina): l'invito a suonare in home con l'elenco degli strumenti che si possono imparare o che cerchiamo, e un contatto diretto. Da unire alla sezione «Suona con noi» della home. (FE)
- [ ] 9.15 **D** — **Contatto con una persona per argomento**, come Felina («Scuola di musica · Sandra», con il telefono): chi vuole iniziare a suonare scrive o telefona a qualcuno con un nome. (FE)
- [ ] 9.16 **D** — **Progetti finanziati raccontati in home**, come «L'Appennino che RiSuona» di Felina (progetto regionale con le scuole, cofinanziato dal FSE+, con i loghi degli enti e il riferimento della delibera): dà credibilità con i finanziatori. Per noi: i progetti con contributi pubblici, collegati a `/trasparenza/contributi`. Da unire a 9.4. (FE)
- [ ] 9.17 **D** — **Progetti con le scuole**: Felina (percorsi gratuiti di 60 ore nelle primarie e medie, con due istituti comprensivi) e Rovato («Fare musica», avvicinamento alla banda nella primaria). Idea di attività, prima che di sito. (FE, BR)
- [ ] 9.18 **D** — **Raccolta fondi per un obiettivo preciso**, come Bagnone per le divise nuove: un traguardo concreto convince più della donazione generica. Pagina o sezione in Sostienici con obiettivo, cifra e a che punto siamo. (BA)
- [ ] 9.19 **D** — **Open day**: Bagnone apre la sede un pomeriggio per provare fiati e percussioni («cercasi nuovi talenti»). Evento in calendario e notizia, con il link all'iscrizione. Lo fa anche Pontremoli, in piazza, e i giornali ne hanno parlato due volte: è anche un'occasione per la stampa. (BA, MC)
- [ ] 9.20 **D** — **Paragrafo per Google in fondo alla home**, come Bagnone («banda musicale e scuola di musica in Lunigiana»): testo con le parole che si cercano (Filarmonica, Fivizzano, Lunigiana, orchestra, banda di altri enti esclusa) e i link interni alle pagine principali. (BA)
- [ ] 9.21 **D** — **Storia per direttori e premi**, come Rovato: i maestri in ordine con gli anni, e i premi ai concorsi. Da vedere con la regola sui direttori (nessun rilievo a un direttore di oggi; i maestri storici sono un'altra cosa). (BR)
- [ ] 9.22 **D** — **5×1000 in primo piano in home** (Pontremoli: «una scelta che non costa nulla»), con il codice fiscale da copiare; serve riattivare `support/5x1000`, e va messo in evidenza nella stagione delle dichiarazioni (primavera). (MC)
- [ ] 9.23 **D** — **Gli strumenti che si possono suonare**, una pagina o una sezione (Pontremoli: «Scegli il tuo strumento e vieni a provarlo con noi»; un corso per strumento): per noi gli strumenti delle formazioni, quelli che cerchiamo e quelli che prestiamo (non tutti). Da unire a 9.14. (MC, FE)
- [ ] 9.24 **D** — **Interviste**: Pontremoli ha in home le interviste al presidente e al maestro e un racconto storico («Quando i musicanti suonarono tra i primi l'Inno di Mameli»). Per noi la pagina `mediateca/interviste`, oggi disattivata: musicisti, soci storici, famiglie, senza dare rilievo a un direttore. (MC)
- [ ] 9.25 **D** — **Ascoltarci dal sito**: Pontremoli ha in fondo alla home il player con una marcia dedicata alla città («Pontremoli» di Abele Tozzi). Per noi una registrazione nostra (un brano per formazione, o un pezzo legato a Fivizzano), con il player del browser, che non parte da solo. (MC)
- [ ] 9.26 **D** — **Galleria storica** «per non dimenticare chi ha fatto parte della nostra famiglia» (Pontremoli): le foto d'archivio, anche quelle arrivate con la raccolta del materiale storico, in Foto e video o in una pagina loro. Va con 9.13. (MC)
- [ ] 9.27 **D** — **«Cerchiamo» con gli strumenti e i posti**, come i «Concorsi e audizioni» di Santa Cecilia («Primo Oboe (1 posto) / Viola di fila (2 posti)…»): per noi un elenco in home e in Iscrizione di chi ci manca, formazione per formazione («Stradella Facendo: 2 clarinetti, 1 tuba»), con il link alla domanda di iscrizione. Più concreto di un invito generico; i dati in un punto solo, da aggiornare quando cambiano. Va con 9.14 e 9.23. (SC)
- [ ] 9.28 **D** — **Etichetta breve sulle schede degli eventi**, come Santa Cecilia («Ingresso libero previa prenotazione», «prima del concerto»): una riga in maiuscoletto sopra il titolo per quello che conta (ingresso libero, su prenotazione, all'aperto, rassegna). Da ricavare dalla descrizione del calendario, come gli hashtag delle formazioni. (SC)
- [ ] 9.29 **D** — **Calendario del mese in home**, una griglia con i giorni dei concerti (Santa Cecilia): si sceglie il giorno e si vede che cosa c'è. Per noi forse troppo per pochi eventi al mese: da valutare quando il calendario sarà più pieno. Anche Berlino e Philharmonia: il mese con i giorni dei concerti cliccabili, in home. (SC, BP, PO)
- [ ] 9.30 **D** — **Newsletter**: Santa Cecilia invita a registrarsi in fondo agli appuntamenti. Per noi in alternativa al feed, un'email ogni tanto con i concerti del mese (Brevo, lo stesso servizio previsto per i moduli). Serve il consenso e l'informativa. Anche il Boccherini, in fondo alla home. (SC, LB)
- [ ] 9.31 **D** — **Programma della stagione da sfogliare o scaricare** («Sfoglia il calendario», Santa Cecilia): un PDF con i concerti dell'anno, da stampare e lasciare nei negozi, e lo stesso file sul sito. La Spezia lo pubblica come libretto da sfogliare («Programma completo»). (SC, CS)
- [ ] 9.32 **D** — **Regala la musica**, come la gift card di Santa Cecilia: per noi una donazione o una quota associativa a nome di qualcuno, con un biglietto da stampare. (SC)
- [ ] 9.33 **D** — **Per i giovani**: Santa Cecilia ha la carta per chi ha meno di 26 anni. Per noi una quota ridotta per i ragazzi, se il consiglio la decide, messa in evidenza in Iscrizione. Va con 9.1. Anche Berlino (ClassicCard, sotto i 30 anni). (SC, BP)
- [ ] 9.34 **D** — **Archivio e mostre**: Santa Cecilia ha in home la mostra in corso nella sua Bibliomediateca, con gli orari, e il museo degli strumenti. Per noi una pagina dell'archivio storico della Filarmonica (che cosa conserviamo, la raccolta del materiale, le mostre fatte e in corso), collegata alla storia. Va con 9.26. (SC)
- [ ] 9.35 **D** — **Video in copertina della home**, come Vienna e Philharmonia: pochi secondi di concerto, senza audio, con il pulsante per fermarlo. Oggi `DESIGN.md` esclude l'autoplay: da decidere se fare un'eccezione per un video muto e fermabile, o se il video parte solo toccandolo. (WP, PO)
- [ ] 9.36 **D** — **Gli appuntamenti importanti dell'anno in evidenza** («Season highlights» a Vienna, Berlino e Philharmonia): tre o quattro eventi grandi (Santa Cecilia, Natale, l'estate) con foto, separati dal calendario completo. Si potrebbe scegliere con un hashtag nella descrizione dell'evento (`#inevidenza`). (WP, BP, PO)
- [ ] 9.37 **D** — **Filtri del calendario**, come Berlino (per genere, rassegna, «Children and Family», «On tour»): per noi per formazione, già ricavata dagli hashtag, e magari per tipo (concerto, sfilata, messa). (BP)
- [ ] 9.38 **D** — **Rassegne e serie**, come «Beethoven 200» di Philharmonia o i festival di Berlino: eventi raggruppati sotto un nome, con la loro pagina. Per noi i 250 anni (9.9) e le rassegne a cui partecipiamo. (PO, BP)
- [ ] 9.39 **D** — **Guida alla prima volta**, come il «60 second beginner's guide» di Philharmonia: che cosa aspettarsi a un nostro concerto (durata, ingresso libero, si può applaudire, bambini benvenuti, dove parcheggiare). Una pagina breve o una sezione delle domande nella pagina degli eventi. (PO)
- [ ] 9.40 **D** — **Amici della Filarmonica**, come i «Friends» di Philharmonia (prove aperte, incontri con i musicisti, prelazione): per noi un modo di sostenerci senza suonare, con qualcosa in cambio, come assistere a una prova. Da vedere con lo statuto (soci sostenitori?) e con Sostienici. (PO)
- [ ] 9.41 **D** — **Prove aperte**: Philharmonia le offre agli amici, Berlino fa le visite guidate della sala. Per noi una prova aperta al pubblico ogni tanto, in calendario: costa poco e porta gente. Va con 9.19. (PO, BP)
- [ ] 9.42 **D** — **Storie dietro le quinte**: Berlino ha la serie «The unanswered question» (le domande che tutti si fanno: «come portano il pianoforte sul palco?») e «Behind the music» (un musicista racconta da dove viene); Philharmonia «Backstage Pass». Per noi articoli brevi o video: come si prepara una sfilata, chi porta le percussioni, un musicista racconta come ha cominciato. Va con 9.24. (BP, PO)
- [ ] 9.43 **D** — **Concerti registrati da vedere gratis**, come il concerto per famiglie di Berlino: un nostro concerto intero su YouTube, segnalato in home e nella pagina della formazione. Va con 9.25. (BP)
- [ ] 9.44 **D** — **Soci onorari** e il ricordo di chi non c'è più (Vienna: «In memory of honorary member»): una pagina o una sezione per i soci onorari e un breve ricordo per i musicisti storici scomparsi, come notizia. (WP)
- [ ] 9.45 **D** — **Le nostre registrazioni e oggetti**, come il negozio di Vienna (CD, DVD dei concerti): per noi forse un CD o una maglietta dei 250 anni, venduti ai concerti e segnalati sul sito (niente vendite con Stripe: va visto con la tesoreria). (WP)
- [ ] 9.46 **F** — **Didascalie e crediti delle foto**, come Berlino: ogni foto con chi o che cosa mostra e il fotografo («She'Koyokh | Picture: Alex Harvey-Brown»), e un testo alternativo che descrive davvero la scena. Da applicare a Foto e video e alle copertine. (BP)
- [ ] 9.47 **D** — **Visita virtuale della sede**, come il panorama a 360° del Conservatorio della Spezia: la sala prove o il teatro in una foto a 360°, caricata solo su richiesta come le mappe (`MapEmbed`). Va con le sedi in Contatti. (CS)
- [ ] 9.48 **D** — **Avvisi pratici separati dalle notizie** (La Spezia: «Avvisi», per esempio la sospensione per allerta meteo): per noi concerto rinviato per pioggia, cambio di luogo, prove sospese che interessano il pubblico. Una riga in evidenza in home e nella pagina dell'evento, che sparisce da sola dopo la data. (CS)
- [ ] 9.49 **D** — **Foto e video donati, con il nome di chi li ha fatti** (La Spezia: «Foto realizzate e donate da…»): ringraziare nel sito chi ci regala foto e video dei concerti, con il credito. Va con il motivo «Foto e video» del modulo e con 9.46. (CS)
- [ ] 9.50 **D** — **Gemellaggi e scambi** con altre bande e orchestre, anche fuori dall'Italia (La Spezia ha Erasmus, l'orchestra Erasmus e le coproduzioni con l'Opera greca): una sezione con le collaborazioni fatte e cercate. (CS)
- [ ] 9.51 **D** — **La nostra sala per voi**, come «Prenota l'auditorium» del Boccherini (modulo per affittare la sala per eventi o registrazioni, con le foto): se la sala prove lo permette, darla ad altri gruppi, una fonte di entrate. Da decidere con il consiglio e con chi gestisce la sede. (LB)
- [ ] 9.52 **D** — **I numeri dell'anno come notizia**, come il Boccherini («283 domande di ammissione e 145 nuovi studenti»): a inizio anno una notizia con nuovi soci, concerti fatti, ragazzi che hanno cominciato. Utile ai giornali e ai finanziatori. Va con 9.3. (LB)
- [ ] 9.53 **D** — **Borse di studio per i giovani musicisti**, finanziate da associazioni del territorio (il Boccherini con Soroptimist e l'Associazione Musicale Lucchese, con un concerto dei vincitori): per noi un contributo alle lezioni o allo strumento per un ragazzo, con un concerto e il nome del sostenitore. Va con 9.1 e con i finanziatori. (LB)
