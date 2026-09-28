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
- Ogni pagina ha `<main id="contenuto">` (bersaglio del link "Salta al contenuto"), `<title>` e meta description.
- Contenuti caricati dal browser: finché caricano si mostra solo un messaggio di caricamento (`role="status"`), mai contenuti parziali; un `<noscript>` spiega che serve JS.

### CSS
- Gli stili sono spenti di proposito: i blocchi `<style>` originali sono commentati e le versioni complete stanno in `.old-components/`. Si reintroducono gradualmente, partendo dai token in un file separato, senza valori fissi fuori dai token e senza stili inline.

### Svelte
- Svelte 5 idiomatico: rune (`$state`, `$state.raw` per dati solo riassegnati, `$derived`, `$props`), `{@attach}` per il comportamento sul DOM (in `$lib/attachments.ts`), `<svelte:window>`/`<svelte:document>` per gli eventi globali, `each` con chiave. Niente DOM imperativo, `setInterval` di polling o `$effect` per sincronizzare stato.
- Usare le skill `svelte-code-writer` e `svelte-core-bestpractices` e controllare con `svelte-check` e `html-validate`.

### Struttura dei file
- Componenti usati da una sola pagina accanto a quella pagina (`src/routes/`); componenti condivisi in `src/lib/components/`.
- Logica di accesso ai dati in `src/lib/` (`events.ts`, `gallery.ts`, `news.ts`); contenuti Markdown in `src/lib/content/`.
- Estrazione in componenti fatta per passi, con un commit per passo.

### Dati
- Dati esterni (Google Calendar, Instagram) letti dal browser, non copiati né pre-generati alla build. Le notizie sono file Markdown in `src/lib/content/news/`.
- Pagine dinamiche che leggono i dati dal browser (`/events/[id]`): `prerender = false` e `ssr = false` in `+page.ts`; su GitHub Pages le serve il fallback `404.html`.
- Route in inglese, una sola parola in minuscolo per ogni segmento (`/events`, `/news`, `/about/history`), senza trattini. Le etichette di navigazione restano in italiano. La mappa delle pagine è in `src/lib/navigation.js`.

### Flusso di lavoro
- Sito statico per GitHub Pages: la build deve passare prima del push, perché ogni push su `main` pubblica.
- Commit piccoli e frequenti con il trailer `Co-Authored-By`; push a ogni passo concluso.
- Verifiche con build, `svelte-check`, `html-validate` e `curl`; niente cicli di screenshot con Playwright.
