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
- Ensemble (`src/lib/content/ensembles/*.md`, 4 file): dati segnaposto da confermare con i gruppi.
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

## Altri punti aperti

- Modulo di adesione (`support/join`): non indica come e quando versare la quota associativa (oggi dice solo "l'esito ti verrà comunicato via email") — manca l'istruzione di pagamento.
- Documenti dell'associazione (regolamenti, statuto, rendiconti): decidere una visualizzazione comune (tutti Markdown) tranne i casi speciali come lo statuto.
