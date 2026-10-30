# Lista unica dei problemi e delle modifiche

Tutto quello che è emerso dalle analisi, una voce per problema, per affrontarli uno alla volta. Fatta il 30/10/2026 unendo `revisione-2026-10-30.md`, `proposte-design-2026-10-30.md`, `riprogettazione-2026-10-30.md` e `TODO.md`; le voci ripetute in più analisi sono una sola, con tutte le fonti.

**Come si usa.** Si prende una voce, si decide, si fa, e la riga si toglie (il `git log` conserva il resto). Una decisione che chiude una voce senza farne nulla si toglie lo stesso. Le istruzioni passo passo (Instagram, pagine disattivate) restano in `TODO.md`; i dettagli e le frasi proposte stanno nei report citati.

**Tipo.** **D** = serve una tua decisione. **F** = la soluzione è chiara, basta farla.

**Fonti.** R = revisione (R3.6 è la parte 3, punto 6); PA, PB, PC = proposte di design, parti A, B, C (PAc = correzioni, PAm = miglioramenti, PAi = idee); N = riprogettazione; T = `TODO.md`; S = emerso in sessione.

**Stato delle voci.** Ho tolto quelle che i report e i commit danno per risolte, e ho ricontrollato sul codice, con ricerche mirate, soprattutto i testi. Non è una verifica riga per riga: se una voce risulta già fatta, si toglie. La modifica ancora aperta a `layout.css` è indicata in 3.1.

## 0. Prima di tutto: scelte da cui dipendono le altre

- [ ] 0.1 **F** — Revisione libera del design con tutte le skill, guardando le pagine vere. Viene prima di 0.2. (T, S)
- [ ] 0.2 **D** — Il vestito del sito: si tiene `DESIGN.md` con ritocchi, o si cambia (per esempio il cartellone)? Da questa risposta dipendono quasi tutte le voci della parte 3. (N, PB)
- [ ] 0.3 **D** — Se cambia, cambia la marca intera o solo il sito? Locandine e social seguono lo stesso `DESIGN.md`. (N)
- [ ] 0.4 **D** — Quando unire `stili` a `main`: 33 commit non sono online, comprese le correzioni della revisione. La pubblicazione parte solo da `main`. (S)
- [ ] 0.5 **D** — Il motto: «Custodi della tradizione, interpreti del futuro», «Le dissonanze in un accordo solo» o nessuno? Le pagine si contraddicono, e la revisione lo trova la frase più da IA della hero. (R5.3, R5.32, PB3, N, T)
- [ ] 0.6 **D** — Notizie e gallerie non hanno fonti: con la regola «l'articolo ha le fonti» restano articoli per eccezione o diventano pagine? (S, T)

## 1. Fuori dal sito

- [ ] 1.1 **F** — **FormSubmit: finché le caselle non sono attivate i messaggi dei moduli si perdono.** È la voce più urgente della lista. Poi sostituire gli indirizzi con gli alias. (T, R3.23)
- [ ] 1.2 **F** — Certificato per `www`: chi arriva da `https://www.` vede un errore di sicurezza. (R3.1, T)
- [ ] 1.3 **F** — PayPal: manca l'ID vero del pulsante di donazione. (T)
- [ ] 1.4 **F** — Token di Instagram: senza, la galleria resta vuota. (T)
- [ ] 1.5 **F** — Google Calendar, i testi degli eventi: maiuscole nei titoli, «Bandistica», il «voi» di «Aspettate di sentire il bis», la biblioteca scritta in due modi, autori per esteso. (R5, T)
- [ ] 1.6 **D** — Google Calendar: le «feste patronali» nella descrizione della mostra vanno bene? (R5, T)
- [ ] 1.7 **F** — Consulente: consensi dei moduli contro base giuridica dell'informativa. (R5b.13, T)
- [ ] 1.8 **F** — Consulente: la dichiarazione dei minori rimanda a un «orario» mai nominato. (R5b.5, T)
- [ ] 1.9 **F** — Consulente: sede e trasferimento dati dei fornitori, tempi di conservazione, bozze di `legal/`. (T)

## 2. Funzioni del sito

- [ ] 2.1 **D** — Gli eventi passati danno 404 il giorno dopo: l'indirizzo citato dalla stampa muore. Sezione «Eventi passati» o rimando? (R3.6, T)
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

## 3. Design: resta valida solo se 0.2 tiene il sistema attuale, o va riformulata

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
- [ ] 3.11 **D** — Piè di pagina: tre titoli Cormorant affiancati, colonne da modello, recapiti ripetuti. (R4.4, R4.20, PB7, N, T)
- [ ] 3.12 **D** — Hero: una sola comparsa invece del testo che sale in sequenza; foto e titolo visibili subito (aiuta anche l'LCP). (PAm6, R3.10, T)
- [ ] 3.13 **D** — Pulsante della hero: nome con un verbo, e se deve stare nella prima schermata. (R5.18, R5b.16, PB7, N, T)
- [ ] 3.14 **F** — Pagine d'errore: togliere i giochi di parole («pentagramma», «Silenzio improvviso»), aggiungere prossimo concerto e link. (PB8, PB9, R5b.18, T)
- [ ] 3.15 **D** — Storia: linea del tempo sulla corda, nella colonna vuota. (PB, N)
- [ ] 3.16 **D** — Il 1777 come immagine per il 250°, con l'ottone. (PAi3, PAm7)
- [ ] 3.17 **F** — Storia: foto degli anni Trenta sgranata; scansione migliore o fascia più bassa. (R4.11, T)
- [ ] 3.18 **D** — A 390 px le corde stringono le intestazioni a circa 30 caratteri per riga. (R4.6, T)
- [ ] 3.19 **D** — Tema scuro: le copertine sembrano velate, la foto è il blocco più chiaro. (R4.12, T)
- [ ] 3.20 **F** — Link a Instagram in home come paragrafo a sé: portarlo nella frase. (R4.14, T)
- [ ] 3.21 **F** — Rassegna stampa: freccia isolata e misura diversa tra schede con e senza link (da ricontrollare, parte già corretta). (R4.8)
- [ ] 3.22 **F** — «+» delle domande: allinearlo alla prima riga nelle domande lunghe. (PC6)
- [ ] 3.23 **F** — Storia su telefono: indice irregolare, una voce per riga sotto 40rem. (R4.17)
- [ ] 3.24 **F** — Ingaggi: il consenso resta staccato dal gruppo «Chi scrive». (R4.18)
- [ ] 3.25 **F** — «STORIA» ripetuta su ogni riga degli articoli e lo stesso autore tre volte: togliere quando sono tutti uguali. (PB11, PB10)
- [ ] 3.26 **D** — «5x1000»: in Cormorant sembra «5x1ooo». «5 per mille» o «5×1000»? (PB12)
- [ ] 3.27 **D** — Carattere dei titoli: Cormorant, o Bodoni con il ridisegno del logotipo. (N)
- [ ] 3.28 **D** — Carta `#F6F1EA`: tenerla, o un bianco meno giallo. (PAi4, N)

## 4. Il documento DESIGN.md

- [ ] 4.1 **F** — Interlinee dei titoli: tabella 1,2 contro codice 1,1. (PA2, PAc2)
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
- [ ] 5.29 **D** — La lineetta `—` nei titoli di tutte le pagine: antislop la vieta. Tenerla o sostituirla? (S)

## 6. SEO e dati strutturati

- [ ] 6.1 **D** — Foto della hero su telefono: `sizes` a 160vw, da misurare su telefoni veri. (R3.9, T)
- [ ] 6.2 **F** — Pagine figlie con un solo link interno: missione, musicisti, rassegna stampa. (R3.24)
- [ ] 6.3 **D** — Articoli: `dateModified` e `url` dell'autore. (R3b.9)
- [ ] 6.4 **D** — Sottotipi di evento: `MusicEvent`, `ExhibitionEvent`. (R3b.16)
- [ ] 6.5 **D** — Titoli oltre 60 caratteri rimasti, da ricontrollare. (R3.18)
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
- [ ] 9.3 **D** — Numeri d'impatto. (T)
- [ ] 9.4 **F** — Partner e patrocini con i loghi. (T)
- [ ] 9.5 **D** — Notizie regolari, almeno una al mese. (T)
- [ ] 9.6 **D** — Ingaggi: video brevi, «Dove abbiamo suonato». (T)
- [ ] 9.7 **F** — Musicisti: manca la sezione Archi. (T)
- [ ] 9.8 **D** — Articolo sui luoghi della musica a Fivizzano. (S)
