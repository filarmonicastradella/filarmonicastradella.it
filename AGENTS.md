You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Convenzioni del progetto

Elenco aggiornato man mano che vengono richieste nuove indicazioni. Testi dell'interfaccia in italiano, identificatori e nomi dei file in inglese.

### HTML e progressive enhancement
- Il sito deve funzionare come HTML semantico anche senza CSS e senza JS: il JS aggiunge solo miglioramenti.
- Landmark e sezioni con titolo: usare il componente `Section` (`$lib/components/Section.svelte`), che collega `h2` e `aria-labelledby` con `$props.id()`. Un solo `h1` per pagina; gerarchia dei titoli senza salti.
- Elenchi di elementi equivalenti in `<ul><li>`; date in `<time datetime>`; coppie etichetta/valore in `<dl>`; niente `<header>`/`<footer>`/`<address>` dentro i link né `div` usati solo per il layout.
- Pagine non ancora pronte: `<h1>`, una riga di presentazione e "Pagina in costruzione: …"; bozze legali con il commento `<!-- BOZZA … -->` in testa da far verificare prima della pubblicazione.
- Incorporazioni di terze parti (mappe): caricate solo su richiesta con un pulsante (`MapEmbed`), con il link diretto sempre visibile.
- Elenchi datati (eventi, notizie) con il componente `TimelineSections`: sezioni per anno (solo se più di uno) e mese, con indice di navigazione annidato; l'ordine è quello degli elementi passati (eventi dal più vicino, notizie dalla più recente).
- Elenchi in ordine cronologico in `<ol>`; eventi con microdati schema.org (`itemscope itemtype="https://schema.org/Event"`, `itemprop`), aree di stato come `<div role="status">` sempre presenti nella pagina; indici di sezione come `<nav>` con collegamenti interni.
- Ogni pagina ha `<main id="contenuto">` (bersaglio del link "Salta al contenuto"), `<title>` e meta description.

### CSS

- Il CSS è globale e generale, non per componente: si stila l'HTML semantico con selettori di elementi, ruoli, ARIA e microdati (per esempio `main > header`, `li:has(> article)`, `[role="group"]`, `ol[tabindex="0"]`). Niente classi né id, se non strettamente necessari e con nomi standard e comprensibili. Niente `<style>` nei componenti: ogni particolarità si risolve con le variabili.
- File in `src/lib/styles/`, caricati in `+layout.svelte`: `typography.css` (Cormorant Garamond per i titoli, Montserrat per il testo, scala modulare 1,25), `colors.css` (marchio #701521, neutri caldi, tema chiaro e scuro automatico), `layout.css` (token di spazio e misura, intestazione, contenuto, hero, piè di pagina), `content.css` (testo, elenchi, schede, tabelle, figure, finestre), `forms.css` (moduli e pulsanti). Nel codice usare i token (`var(--...)`), mai valori diretti.
- L'intestazione è `sticky` e ha un'altezza fissa (`--header-height`: 4,5rem su telefono e tablet, 8,25rem da 64rem in su), così la hero è alta `100svh - var(--header-height)` e insieme all'intestazione riempie esattamente lo schermo. Da 64rem ha due righe (logo e voci) e scorrendo resta solo la barra del menu (`top` negativo pari all'altezza della riga del logo). Sotto 64rem è una barra con logo e pulsante a due barre: il menu è un `nav` con l'attributo `popover` (nativo, senza JS), che si apre sotto la barra con una breve animazione mentre l'icona diventa una X e la pagina non scorre; una piccola azione con `afterNavigate` lo chiude dopo la navigazione.
- Le schede sono cliccabili per intero con il link esteso: il markup ha un solo link (sul titolo, o l'ultimo link nelle schede senza link nel titolo) e il CSS lo estende sull'intera scheda con `::before`. Niente `<a>` intorno alla scheda.
- SvelteKit avvolge l'app in un `div` senza aspetto: per questo i selettori di intestazione e piè di pagina sono `body > div > header` e `body > div > footer`.
- Icone: Lucide (`@lucide/svelte`, tratto sottile) per l'interfaccia e `simple-icons` per i marchi dei social, incorporati nella build (nessuna richiesta esterna), sempre con `aria-hidden` e l'etichetta testuale accanto. Phosphor è stato provato e scartato.
- Design: elegante, moderno, pulito e minimale; avorio caldo, granata come unico colore d'accento, titoli in serif, molto spazio bianco. Niente riquadri né angoli arrotondati (`--radius: 0`): la struttura la danno filetti sottili, spazio e tipografia; le schede hanno solo un filetto in alto.
- I vecchi stili per componente (in `.old-components/`) non vanno usati né consultati come modello: il design si costruisce da zero con questo sistema.

- Codice pulito e non ridondante: nessuna regola CSS ripetuta in più punti (se serve in più contesti va scritta una volta sola con un selettore generale), nessun attributo o ruolo ARIA che ripete ciò che l'elemento già è (per esempio `role="list"` su un `ul`), nessun elemento o file superfluo.

### Svelte
- Svelte 5 idiomatico: rune (`$state`, `$state.raw` per dati solo riassegnati, `$derived`, `$props`), `{@attach}` per il comportamento sul DOM (in `$lib/attachments.ts`), `<svelte:window>`/`<svelte:document>` per gli eventi globali, `each` con chiave. Niente DOM imperativo, `setInterval` di polling o `$effect` per sincronizzare stato.
- Usare le skill `svelte-code-writer` e `svelte-core-bestpractices` e controllare con `svelte-check` e `html-validate`.

### Struttura dei file
- Componenti usati da una sola pagina accanto a quella pagina (`src/routes/`); componenti condivisi in `src/lib/components/`.
- Logica di accesso ai dati in `src/lib/` (`events.ts`, `gallery.ts`, `news.ts`); contenuti Markdown in `src/lib/content/`.
- Sviluppo: una funzionalità nuova si scrive tutta in un unico file (pagina o componente) e si estrae in componenti o moduli solo quando il file diventa troppo lungo o complesso, non prima e non per semplice somiglianza tra due punti. Le estrazioni si fanno per passi, con un commit per passo.

### Dati
- Dati esterni (Google Calendar, feed Instagram di Behold) letti alla build da funzioni di caricamento del server (`+page.server.ts`, moduli in `src/lib/server/`), così finiscono già nell'HTML. Il sito si ricostruisce ogni 3 ore con una GitHub Action programmata, e a ogni push.
- Chiavi e segreti mai nel codice: `GOOGLE_CALENDAR_API_KEY` sta in `.env` in locale (fuori dal repository, modello in `.env.example`) e nel segreto del repository su GitHub.
- Se il calendario non risponde la build deve fallire (resta online l'ultima versione); il feed della galleria è accessorio e in caso di errore mostra un avviso.
- Sedi e indirizzi in un solo punto, `src/lib/locations.ts` (sede legale in Via Stretta 5 e due sedi operative, Via Radda 7 a Fivizzano e Circolo Fantoni a Serricciolo): footer e pagina delle sedi (`/about/locations`, con le mappe) li leggono da lì; Contatti rimanda a quella pagina senza ripetere gli indirizzi.
- Le notizie (`src/lib/content/news/`) e gli ensemble (`src/lib/content/ensembles/`) sono file Markdown con intestazione (titolo, riassunto, ordine); ogni file diventa una pagina generata alla build e il nome del file è lo slug dell'indirizzo (gli slug dei contenuti possono avere trattini).
- Struttura del sito: menu piatto, senza tendine, in `src/lib/navigation.js`: ogni voce è una pagina hub che rimanda alle sue pagine figlie (Associazione `/about`, Ensemble `/ensembles`, Eventi, Notizie, Mediateca `/media`, Sostienici `/support`, Trasparenza `/transparency`, Contatti). Documenti di trasparenza in `/transparency`, informative (privacy, cookie) in `/legal` con il link nel footer; domande frequenti in `/faq`.
- Pagine non ancora pronte si disattivano rinominando `+page.svelte` in `_page.svelte` (SvelteKit le ignora) e commentando i link che le raggiungono; per riattivarle si rinomina il file e si toglie il commento. Oggi disattivate: about/achievements, media/interviews, media/press, media/kit, transparency/budgets, transparency/rules, support/forms, support/5x1000.
- I documenti dell'associazione (regolamenti e simili) saranno in Markdown e mostrati tutti allo stesso modo, tranne quelli speciali come lo statuto; da unificare quando si riattivano.
- `sitemap.xml` generato alla build da `src/routes/sitemap.xml/+server.ts` (pagine, ensemble, notizie ed eventi); `static/robots.txt` lo indica.
- Route in inglese, una sola parola in minuscolo per ogni segmento (`/events`, `/news`, `/about/history`), senza trattini. Le etichette di navigazione restano in italiano. La mappa delle pagine è in `src/lib/navigation.js`.

### Flusso di lavoro
- Rami: `main` è quello pubblicato (a ogni push e ogni 3 ore); il lavoro di stile (CSS) e di JS si fa sul ramo `stili` e si unisce a `main` solo dopo aver visto le pagine funzionare.
- Punto fermo: il tag `contenuti-2026-09-28` segna il sito con tutti i contenuti e senza CSS/JS di rifinitura. Per lavorare da lì: `git switch -c prova contenuti-2026-09-28`. Per ripubblicarlo servirebbe riportare `main` a quel punto con dei commit di ripristino (`git revert`): l'ambiente `github-pages` accetta pubblicazioni solo dal ramo `main`, non dai tag. Per rilanciare la pubblicazione di `main`: `gh workflow run deploy.yml --ref main`.
- Sito statico per GitHub Pages: la build deve passare prima del push, perché ogni push su `main` pubblica.
- Commit piccoli e frequenti con il trailer `Co-Authored-By`; push a ogni passo concluso.
- Verifiche con build, `svelte-check`, `html-validate` e `curl`; niente cicli di screenshot con Playwright.

### Contenuti
- L'associazione non dà rilievo a una figura di direttore: i direttori sono più di uno e sono considerati alla pari degli altri musicisti. Niente pagine, titoli o sezioni dedicati a un direttore; eventuali nomi compaiono nelle schede delle formazioni insieme agli altri componenti.
- Ipertestualità: meglio pagine brevi e collegate tra loro (collegamenti nel testo, rimandi a pagine correlate) che pagine lunghe con tutto insieme. Quando una pagina cresce troppo si divide in pagine più piccole con un indice e con la navigazione tra una e l'altra.
- I segnaposto vanno scritti nella forma finale: link veri, dati nel formato definitivo, anche se per ora non puntano a niente o sono valori finti. Il segnaposto si segnala con un commento `SEGNAPOSTO` nell'HTML, non con un testo alternativo diverso dalla forma finale. I testi segnaposto si mostrano in modo visibile tra parentesi quadre (per esempio "[Descrizione da inserire]"), così non si scambiano per contenuti veri.
