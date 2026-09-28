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
- Elenchi in ordine cronologico in `<ol>`; eventi con microdati schema.org (`itemscope itemtype="https://schema.org/Event"`, `itemprop`), aree di stato come `<div role="status">` sempre presenti nella pagina; indici di sezione come `<nav>` con collegamenti interni.
- Ogni pagina ha `<main id="contenuto">` (bersaglio del link "Salta al contenuto"), `<title>` e meta description.

### CSS
- Gli stili sono spenti di proposito: i blocchi `<style>` originali sono commentati e le versioni complete stanno in `.old-components/`. Si reintroducono gradualmente, partendo dai token in un file separato, senza valori fissi fuori dai token e senza stili inline.

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
- Le notizie (`src/lib/content/news/`) e le formazioni (`src/lib/content/ensembles/`) sono file Markdown con intestazione (titolo, riassunto, ordine); ogni file diventa una pagina generata alla build e il nome del file è lo slug dell'indirizzo (gli slug dei contenuti possono avere trattini).
- Route in inglese, una sola parola in minuscolo per ogni segmento (`/events`, `/news`, `/about/history`), senza trattini. Le etichette di navigazione restano in italiano. La mappa delle pagine è in `src/lib/navigation.js`.

### Flusso di lavoro
- Sito statico per GitHub Pages: la build deve passare prima del push, perché ogni push su `main` pubblica.
- Commit piccoli e frequenti con il trailer `Co-Authored-By`; push a ogni passo concluso.
- Verifiche con build, `svelte-check`, `html-validate` e `curl`; niente cicli di screenshot con Playwright.
