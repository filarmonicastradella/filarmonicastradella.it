# Lavori in sospeso

Elenco di quello che resta da fare, ricontrollato il 10/10/2026 sullo stato attuale del sito (non sulla cronologia). Si aggiorna togliendo le voci risolte, non accumulando.

## Pagine disattivate da riattivare

Oggi sono `_page.svelte` (SvelteKit le ignora). Per ognuna: rinominare in `+page.svelte`, scrivere il contenuto vero, togliere il commento nel link che la raggiunge.

- `about/mission`, `about/board`, `about/locations`, `about/partners` — associazione: missione, consiglio direttivo, le due sedi operative, enti partner.
- `about/ensembles` — pagina indice delle formazioni (le pagine singole, `about/ensembles/*`, sono già attive).
- `support/volunteer` — **priorità alta**: è la pagina che intercetta chi cerca di suonare con noi come volontario (obiettivo: iscrizioni di musicisti).
- `support/5x1000` — da riattivare solo quando l'associazione sarà ammessa al 5x1000.
- `support/forms` — modulistica per i soci.
- `transparency/statute`, `transparency/budgets`, `transparency/contributions`, `transparency/rules` — documenti dell'associazione (statuto, rendiconti, regolamenti); da unificare come visualizzazione quando si riattivano (tranne lo statuto, speciale).
- `media`, `media/interviews`, `media/press`, `media/kit` — mediateca; `media/press` ha priorità per la SEO (rassegna stampa, credibilità/prestigio).
- `news` — indice delle notizie (i singoli articoli in `src/lib/content/news/` esistono già).
- `faq` — domande frequenti.

## Contenuti segnaposto (SEGNAPOSTO) da sostituire

- Home (`+page.svelte`): testo di presentazione provvisorio (BOZZA, tono coerente col design system ma da confermare).
- `support/donate`: link PayPal con `hosted_button_id=SEGNAPOSTO` — serve l'ID vero del pulsante di donazione.
- `about/history`: didascalia foto anni 80/90 da verificare (il file si chiama `anni_80` ma la didascalia dice "anni Novanta").
- Ensemble (`src/lib/content/ensembles/*.md`): presentazioni e organico ripresi dal vecchio sito, da far rileggere ai gruppi. Mancano i musicisti (tolti i nomi segnaposto): aggiungerli solo con il loro consenso, magari anche i giorni delle prove.
- `legal/privacy`: sede e base giuridica del trasferimento dati per ciascun fornitore esterno; tempi di conservazione (da decidere col consiglio direttivo e il consulente).

## Bozze legali da far verificare da un consulente prima della pubblicazione

- `legal/privacy`
- `legal/cookies`
- `legal/images` (liberatoria foto/voce/esecuzioni)

## Idee SEO emerse in conversazione (10/10/2026)

Obiettivi: essere chiamati a suonare, donazioni, iscrizioni di musicisti volontari, prestigio.

- **Pagina "richiedici per il tuo evento"**: oggi le pagine ensemble sono bio artistiche, non un'offerta di servizio. Manca una pagina con repertorio, tipi di evento (matrimoni, feste patronali, cerimonie) e contatto dedicato, per intercettare chi organizza un evento e cerca una banda/orchestra in Lunigiana.
- **`support/volunteer`** (vedi sopra): leva diretta per le iscrizioni di volontari.
- **`media/press`**: rassegna stampa, utile per prestigio e backlink locali; leva sulla storia dal 1777 (quasi 250 anni).
- **`transparency`**: già attiva ma fuori menu; è un segnale di affidabilità per chi valuta se donare — verificare che sia ben indicizzata.

## Attirare persone e finanziatori (13/10/2026)

Priorità: prima le pagine che rendono l'associazione credibile (consiglio direttivo, rendiconto, partner), poi volontari e ingaggi. Le pagine sono quasi tutte pronte e disattivate: serve soprattutto raccogliere i contenuti veri (foto, nomi, numeri, documenti).

**Punto di forza da mettere in evidenza: i giovani.** Alcune formazioni hanno età media sotto i 18 anni e mediana sotto i 25. Per bandi, fondazioni ed enti pubblici è un dato forte (aggregazione giovanile, formazione, presidio culturale del territorio): va detto chiaramente in home, nella pagina dei numeri, nella cartella stampa e nelle pagine delle formazioni. Attenzione alle foto con minori: pubblicarle solo con la liberatoria (`legal/images`).

Serietà, finanziatori, enti pubblici:
- `about/board` e `transparency/budgets` (rendiconto annuale, anche solo il modello D): primo controllo di enti e fondazioni.
- Numeri d'impatto (soci, concerti all'anno, giovani formati, età media delle formazioni, ore di volontariato), in home o in una pagina dedicata.
- `about/partners`: Comune, ANBIMA, associazioni partner, patrocini con i loghi.
- `media/press`: articoli dei giornali locali.
- `media/kit`: cartella stampa in PDF di una pagina (chi siamo, cosa facciamo, numeri, contatti, foto in alta risoluzione), da allegare alle domande di contributo.
- Notizie regolari (almeno una al mese, anche il resoconto di un concerto): un sito fermo sembra un'associazione ferma.

Ingaggi:
- Pagina "Ci chiami a suonare": formazioni, occasioni (feste patronali, matrimoni, cerimonie, rassegne), scaletta tipo, numero di musicisti e spazio necessario, modulo con data, luogo e tipo di evento.
- Video brevi delle formazioni dal vivo (30-60 secondi).
- Elenco degli eventi passati ("dove abbiamo suonato").

Nuovi musicisti (`support/volunteer`):
- Strumenti cercati, livello richiesto, giorni delle prove, quota (12 €), prestito degli strumenti, come funziona la prima prova.
- Foto delle prove e dei musicisti, non solo dei concerti.
- Un invito esplicito a chi ha smesso da anni e ai principianti.

## Altri punti aperti

- Storia: le fonti in fondo vengono dal Vault («Storia - fonti.md», da verificare sugli originali). Senza fonte restano l'unione di due bande negli anni Venti (solo bandamusicale.it) e la data del nome Stradella: bandamusicale.it dice 1996, ma la locandina del 6 dicembre 1997 porta ancora «Società Filarmonica Fivizzano», quindi per ora il testo dice «alla fine degli anni Novanta». Trovare la fonte (verbale, statuto, giornale) e precisare.

- Pagina su Alessandro Stradella (`/about/stradella`): creata il 19/10 su Dizionario Biografico degli Italiani (Garavaglia 2019), Wikipedia e Dizionario della Tuscia. Nascita: Bologna, 3 luglio 1643 (atto di battesimo, Mingozzi 2018), non Nepi 1639. Eventuali approfondimenti: Gerini 1829, pp. 136-137 (Alessio); Gianturco 2007.

- Orchestra Infieri: rivedere il testo della pagina dopo la riscrittura del 19/10 («orchestra mista») e le occasioni nella pagina degli ingaggi.

- Pagina degli ingaggi (`/booking`): sostituire i segnaposto di «Cosa serve sapere» (zona, preavviso, esigenze tecniche, costi) e far confermare ai gruppi le occasioni di ogni ensemble (`occasions` nei file Markdown). Più avanti: «Dove abbiamo suonato» con gli eventi passati più importanti, e decidere se mettere «Ingaggi» nel menu (il design system ammette fino a cinque voci).

- Foto delle formazioni (ci sono già, da scegliere): una per ensemble nella sua pagina, in duotone come la hero, e usata anche come anteprima Open Graph della pagina (oggi tutte le pagine condividono `anteprima.jpg`). Poi foto vere per eventi e notizie quando ci sono. Niente copertine sulle pagine di servizio (contatti, moduli, informative).

- Modulo di adesione (`support/join`): non indica come e quando versare la quota associativa (oggi dice solo "l'esito ti verrà comunicato via email") — manca l'istruzione di pagamento.
- Documenti dell'associazione (regolamenti, statuto, rendiconti): decidere una visualizzazione comune (tutti Markdown) tranne i casi speciali come lo statuto.
