# Revisione del sito — 30 ottobre 2026

Otto revisioni sul ramo `stili`, fatte con le skill del progetto e con quelle scaricate per l'occasione, tutte in sola lettura. Le correzioni sono venute dopo, in commit separati.

| Parte | Skill | Da correggere | Consigliati | Facoltativi |
|---|---|---|---|---|
| 1. Svelte | svelte-code-writer, svelte-core-bestpractices, svelte-autofixer | 1 | 3 | 6 |
| 2. Accessibilità e semantica | accessibility (Lighthouse 100 su 16 pagine, axe 0 violazioni) | 3 | 6 | 8 |
| 2b. Codice dell'interfaccia | web-design-guidelines (Vercel), fixing-accessibility | 2 | 7 | 10 |
| 3. SEO e prestazioni | seo, performance, core-web-vitals, web-quality-audit, best-practices | 4 | 10 | 11 |
| 3b. Dati strutturati | schema-markup | 4 | 6 | 6 |
| 4. Design | impeccable (critique), design-taste-frontend | 3 | 8 | 9 |
| 5. Testi | humanizer, impeccable/clarify | 11 | 18 | 16 |
| 5b. Testi in italiano e microtesti | scrittura-italiana, ux-copy | 5 | 29 | 14 |

## Che cosa è stato corretto

- **Svelte**: idratazione delle domande negli eventi, `each` con chiave, JSON-LD della home costruito nello script, pagina d'errore senza testo sciolto, date dei moduli nel giorno italiano, suffisso del titolo in un punto solo.
- **Accessibilità**: focus visibile nel piè di pagina, bordi dei campi a 3:1, campi alla stessa altezza, menu che non blocca la pagina allargando la finestra, `aria-controls`, freccia ferma con movimento ridotto, link agli indici più facili da toccare, testo «(si apre in una nuova scheda)» anche su social e foto, `aria-disabled` superfluo tolto, `theme-color`.
- **Moduli**: codice fiscale e CAP con `maxlength` e `pattern`, autocompletamento della data del genitore e del civico, «genitore o tutore», «Documento e richiesta», etichette degli ingaggi («Nome e cognome», «(facoltativo)», «almeno 30 giorni da oggi», «Scegli l'occasione»).
- **SEO e dati strutturati**: indirizzo e dati raccomandati degli eventi, schede evento collegate alla loro pagina, sezione, editore e immagine degli articoli, formazioni collegate all'ente, ente e sito con `@id`, vecchi indirizzi con il canonico della pagina nuova e senza JSON-LD, niente FAQPage negli eventi, link interno al vecchio indirizzo del sonetto, copertina della Storia con `sizes="100vw"`.
- **Design**: titolo Display a 64px, fonti nella colonna di testo, freccia esterna accanto al titolo delle schede, quattro schede due per riga, rimando dell'agenda allineato ai titoli.
- **Testi**: «La Filarmonica al tuo evento» al posto di «Ingaggi», «A cosa serve la mia donazione?», «oboe, fagotto e archi», «quasi 250 anni», «consiglio direttivo», «Orchestra Infieri», «formazioni» invece di «ensemble», congiuntivo nella missione, FAQ religione e partiti, FAQ «Potete suonare al mio evento?» con Lunigiana e 30 giorni, ingresso e pioggia negli eventi, calendario vuoto, introduzione del calendario, testo alternativo con «stendardo della Filarmonica» e «chi dirige», informative aggiornate (modulo per gli eventi, galleria copiata sul sito, frase sul calendario), virgolette del calendario in caporali.
- **Struttura**: la storia della Filarmonica è diventata un articolo (`/articles/history/filarmonica`); in Associazione ci sono le schede della storia e di Alessandro Stradella.

Quello che resta, da decidere o da fare fuori dal sito, è in `TODO.md`. Scartato: usare la parola «banda» per la ricerca locale (linee guida di marca).


## 1. Svelte

Strumenti: skill `svelte-code-writer` e `svelte-core-bestpractices` (con i riferimenti su each, attach, svelte-reactivity), `npx @sveltejs/mcp svelte-autofixer` su tutti i 42 `.svelte` di `src/` (esclusi i `_page.svelte`), lettura del codice con priorità ai file cambiati in `3f35a90~1..HEAD`, controllo dell'HTML in `build/`.

Conteggio: **Da correggere 1 · Consigliato 3 · Facoltativo 6**, più 4 tipi di segnalazioni dell'autofixer scartate come falsi positivi.

### Da correggere

1. **`src/routes/events/[id]/+page.svelte:21` — idratazione non corrispondente per costruzione.** `upcoming = hasNotEnded(event, new Date())` si calcola al prerender (sempre `true`: le pagine si generano solo per eventi in programma, `+page.server.ts:6`) e di nuovo nel browser all'idratazione. Se l'evento finisce nelle ≤3 ore prima della ricostruzione successiva, il blocco `{#if upcoming}` non corrisponde: Svelte butta l'HTML del server e ridisegna, le domande frequenti spariscono con un salto, e il JSON-LD `FAQPage` resta. Correzione: lo schema di `events/+page.svelte` (`let now = $state<Date>()` impostato in `onMount`, `upcoming = $derived(!now || hasNotEnded(event, now))`), oppure togliere il controllo, visto che una pagina esiste solo per un evento in programma.

### Consigliato

2. **`src/lib/components/TimelineSections.svelte:50` — `{#each monthItems as item}` senza chiave** (lo segnala l'autofixer; `AGENTS.md` chiede `each` con chiave). Dopo `onMount` il Calendario filtra la lista: senza chiave le `EventCard` vengono riusate spostando le props. Correzione: `{#each monthItems as item (item)}`.
3. **`src/routes/+page.svelte:54` — JSON-LD della home scritto come `{@html \`<script …>\`}` nel markup.** L'autofixer non riesce a leggere il file, e il `<` non viene sostituito con `<` come in `hooks.server.ts`. Correzione: costruire la stringa nello `<script>` con `JSON.stringify(...).replace(/</g, "\\u003c")`, o generarla in `hooks.server.ts` con gli altri dati strutturati.
4. **`src/routes/+error.svelte:20-22` — `<p><code>{page.error.message}</code></p>` è testo sciolto in `main`**, contro la regola della struttura delle pagine. Correzione: spostarlo nell'`<header>` come nota.

### Facoltativo

5. **`src/routes/events/+page.svelte:12-17`** — la lista si aggiorna solo al montaggio; `UpcomingEvents.svelte:17` ricalcola `now` anche al ritorno sulla scheda (`<svelte:document onvisibilitychange>`): si può fare lo stesso.
6. **`src/routes/booking/+page.svelte:16`, `src/routes/support/join/+page.svelte:5`** — `new Date().toISOString().split("T")[0]` dà la data UTC: tra mezzanotte e l'1–2 in Italia `min`/`max` sono al giorno prima. Correzione: `toLocaleDateString("en-CA", { timeZone: "Europe/Rome" })`, come `dayKey` in `$lib/events.ts`.
7. **`src/routes/events/[id]/+page.svelte:23` e `src/hooks.server.ts:9`** — il suffisso « — Filarmonica Alessandro Stradella» è definito due volte: esportarlo da `$lib/organization`.
8. **`src/hooks.server.ts:63`** — se manca `</section>`, `indexOf` dà `-1` e `slice` prende il resto della pagina: aggiungere un controllo esplicito.
9. **`src/routes/contacts/+page.svelte:20`** — `requested` letto una volta, fuori da una runa: una navigazione da `?motivo=A` a `?motivo=B` senza ricaricare non cambierebbe il motivo. Oggi nessun link lo fa.
10. **`AGENTS.md:31` cita `$lib/components/Section.svelte`, che non esiste più**: le pagine usano `<section><h2>`. Aggiornare la convenzione.

### Segnalazioni dell'autofixer scartate

- «href senza `resolve()`» (75 casi): il sito è alla radice del dominio, senza `paths.base`; molti sono link esterni, `mailto:`, `tel:`.
- «`{@html}` può portare a XSS» in `SiteHeader.svelte:24` (SVG nostro), `FaqItem.svelte:10` (risposte nostre), `events/[id]/+page.svelte:51` (HTML ripulito con `sanitize-html` alla build).
- «Usa `SvelteMap`» in `TimelineSections.svelte:25,28`: `Map` locali dentro `$derived.by`, mai modificate.
- «`bind:this` → attachment» in `SiteHeader.svelte:29`: serve solo a rimettere il focus con Esc.

A posto: nessun `$effect` né sintassi legacy; `onMount` solo per valori del browser; menu con `{@attach}`; eventi globali con `<svelte:window>`/`<svelte:document>`; tutti gli altri `each` con chiave.

## 2. Accessibilità e HTML semantico

Skill `accessibility` (WCAG 2.2), con AGENTS.md e DESIGN.md §7–8, sulla build in anteprima. **Lighthouse 12.8.2** (solo accessibilità, mobile): **100/100 su tutte le 16 pagine**. **axe-core 4.10.3** (wcag2a/aa, 2.1, 2.2, best-practice), tema chiaro e scuro con movimento ridotto: **0 violazioni su 32 esecuzioni**. Script Playwright per tastiera, riflusso a 320px, spaziatura del testo, albero di accessibilità e contrasti calcolati a mano dove axe non arriva (piè di pagina, bordi dei campi). Dati grezzi in `/tmp/claude-1000/-home-leo/32c9c9cf-8541-409a-84ad-8d6f58b320bd/scratchpad/a11y/`.

Conteggio: **Da correggere 3 · Consigliato 6 · Facoltativo 8**. I tre problemi bloccanti sono di quelli che gli strumenti automatici non vedono.

### Da correggere

1. **Contorno del focus invisibile nel piè di pagina, tema chiaro** (`src/lib/styles/colors.css:62-74`): il blocco del footer non ridefinisce `--focus-ring`; bordeaux su inchiostro, **1,49:1**. Tabulando, i 12 link del piè di pagina non mostrano il focus (WCAG 2.4.7, 1.4.11). Chi ne soffre: chi usa la tastiera, chi ipovede. Correzione: `--focus-ring: var(--color-cipria);` (o carta) nel blocco del footer.
2. **Bordi dei campi quasi invisibili, in tutti e due i temi** (`src/lib/styles/forms.css:97`, `--border` in `colors.css:36,50`): bordo sabbia su bianco **1,29:1**, campo su carta 1,12:1; in scuro circa 1,3:1. Minimo 3:1 (WCAG 1.4.11). Pagine: contatti, ingaggi, iscrizione. Correzione: un ruolo per i campi, per esempio `--border-field` pietra in chiaro (5,6:1 sul bianco) e nebbia in scuro; `--border` resta per schede e separatori.
3. **Senza JS, sotto 64rem, il menu non si apre** (`src/routes/SiteMenu.svelte:288-310`, `SiteHeader.svelte:29`): il `nav` resta `visibility: hidden` e il pulsante non fa niente; il piè di pagina non ha link alle sezioni. Viola la regola di AGENTS.md «funziona senza JS». Correzione: nascondere il pannello solo quando il JS ha preso il controllo (attributo messo dall'attachment), o un `<noscript>` che mostra le voci.

### Consigliato

4. **Il messaggio d'errore dei campi è solo testo CSS** (`forms.css:132-136`): non annunciato; il formato atteso di codice fiscale, CAP e telefono (`support/join:66,78,171`) non è scritto prima dell'errore (WCAG 3.3.2, 3.3.3). Correzione: un suggerimento visibile collegato con `aria-describedby`.
5. **Campi facoltativi non segnalati in /booking** (`booking/+page.svelte:91` Note, `:110` Telefono): aggiungere «(facoltativo)» come nell'iscrizione.
6. **Il modulo d'iscrizione cambia forma senza avvisare** (`support/join:133,142-147,170,175`): per i minorenni compaiono i dati del genitore senza annuncio; senza JS il ramo non compare mai. Correzione: dirlo prima del modulo e annunciare il cambio in un `<p role="status">`.
7. **Bersagli piccoli negli indici di sezione** (`content.css:325-331`; indice della Storia, mesi di /events): link alti 15px con 8px tra le righe (WCAG 2.5.8). Correzione: `padding-block: var(--space-1)` ai link dell'indice.
8. **Freccia dei rimandi che si sposta anche con movimento ridotto** (`content.css:75-80`), contro DESIGN §8. Correzione: dentro `@media (prefers-reduced-motion: no-preference)`.
9. **`aria-disabled` su un `<a>` senza `href`** (`support/+page.svelte:29`): non ammesso su un elemento generico e ridondante. Correzione: toglierlo; il CSS usa già `:not([href])`.

### Facoltativo

10. **Social del piè di pagina senza «(si apre in una nuova scheda)»** (`content.css:49-51`): togliere solo la freccia visibile e lasciare il testo alternativo.
11. **Note della Storia e del sonetto**: otto link «Torna al rimando a/b/c» uguali; meglio «Torna al rimando 1a». Apici piccoli: un po' di `padding-inline`.
12. **`nav` «Note legali» nel piè di pagina** (`SiteFooter.svelte:70-71`): `aria-label` che ripete l'`h2`; meglio `aria-labelledby`.
13. **Nome dell'indice dei mesi** (`TimelineSections.svelte:60`): «Vai alla sezione» è un comando; meglio «Mesi».
14. **`<time datetime="1871">1871-72</time>`** (`about/history:115`): un intervallo codificato come un anno.
15. **Numero civico con `autocomplete="address-line2"`** (`support/join:88`): i browser ci mettono interno o scala.
16. **«Salta al contenuto» con il menu aperto** (`+layout.svelte:76`): raggiungibile ma inutile perché `main` è `inert`.
17. **Microdati dell'evento**: corretti (`itemref` collega il `Place`); mancano `url`, `organizer`, `eventStatus` (vedi parte 3).

### Verificato in automatico, senza problemi

Lingua e titoli; landmark; un solo `h1` e nessun salto di livello; nessun testo sciolto in `main`; testi alternativi; nessun link senza nome; etichette dei campi, `fieldset`/`legend`, `autocomplete`; ordine del focus; «Salta al contenuto»; menu mobile con JS (focus, `inert`, Esc); `<details>` nativi; riflusso a 320px e spaziatura del testo (1.4.12); contrasti del testo oltre AA in entrambi i temi; movimento ridotto rispettato da hero, menu, corde e View Transitions; microdati, `<time datetime>`, elenchi, `<dl>`, note con `doc-noteref`.

### Da verificare a mano

- **Screen reader** (NVDA + Firefox, VoiceOver iOS e macOS): lettura delle schede-link lunghe; annuncio di «(si apre in una nuova scheda)» dal testo alternativo del `content`; etichette in maiuscolo da CSS («SAB» non letto lettera per lettera); `role="alert"` sotto i 14 anni; messaggi di validazione nativi.
- **Tastiera vera** su tablet: menu, campi data e file.
- **Contrasto forzato** (Windows): corde del menu, bordi dei campi e più/meno dei `<details>` sono maschere CSS e potrebbero sparire.
- **Zoom 200–400%** e testo ingrandito sul telefono: l'intestazione fissa può coprire molto spazio in orizzontale.

## 2b. Linee guida web e accessibilità del codice

Skill: `web-design-guidelines` (Vercel, con la copia locale delle regole in `command.md`) e `fixing-accessibility`; AGENTS.md e DESIGN.md hanno la precedenza. Verifiche su `build/` e sull'anteprima con Chromium headless (overflow a 320px, menu, anello di focus).

Conteggio: **Da correggere 2 · Consigliato 7 · Facoltativo 10** (comprese le osservazioni; uno già corretto).

### Da correggere

1. **Menu aperto e finestra che si allarga** (`src/routes/+layout.svelte:81`, `SiteMenu.svelte:10`): se il menu è aperto sotto 64rem e la finestra si allarga (tablet ruotato), `menu.open` resta vero: `main` e piè di pagina restano `inert` e il pulsante del menu non si vede più (verificato). Il contenuto non si raggiunge finché non si preme Esc o si cambia pagina. Correzione: chiudere il menu quando `MediaQuery("min-width: 64rem")` (`svelte/reactivity`) diventa vera, o applicare `inert` solo sotto 64rem.
2. **Anello di focus invisibile nel piè di pagina** (`src/lib/styles/colors.css:62`): il footer ridefinisce i ruoli ma non `--focus-ring`; nel tema chiaro l'anello è bordeaux su inchiostro, circa 1,5:1 (serve 3:1). Correzione: `--focus-ring: var(--color-carta);` (o cipria) nel blocco del footer.

### Consigliato

3. **Iscrizione senza JS** (`src/routes/support/join/+page.svelte:130`): il campo nascosto vale sempre «Maggiorenne» e i campi del genitore non compaiono: la domanda di un minore parte come quella di un adulto. Correzione: senza JS mostrare i campi del genitore come facoltativi in un `<fieldset>` «Solo per i minori», che il JS poi nasconde o rende obbligatori.
4. **Codice fiscale** (`join:66`): mancano `maxlength="16"`, `pattern="[A-Za-z0-9]{16}"`, `autocapitalize="characters"`, `spellcheck="false"`; con JS `oninput` riscrive il valore e sposta il cursore in fondo. Correzione: attributi nativi, JS solo per il maiuscolo.
5. **CAP** (`join:78`): mancano `maxlength="5"` e `pattern="[0-9]{5}"`.
6. **Data di nascita del genitore** (`join:60`): `autocomplete="bday"` senza sezione, come quella del minore. Correzione: `section-genitore bday`.
7. **Scheda 5x1000** (`src/routes/support/+page.svelte:29`): `<a aria-disabled="true">` senza `href` è un elemento generico, dove `aria-disabled` non è ammesso (e AGENTS.md vieta l'ARIA superflua). Correzione: togliere l'attributo o usare un `<div>` come le schede stampa solo su carta.
8. **Link che aprono una nuova scheda senza avviso** (`src/lib/styles/content.css:49-51`): con `content: none` sui social del footer e sulle foto della galleria (`Gallery.svelte:37`) sparisce anche il testo «(si apre in una nuova scheda)». Correzione: nascondere solo la freccia e tenere il testo alternativo del `content`.
9. **Freccia del rimando che si sposta anche con movimento ridotto** (`content.css:78`). Correzione: la regola dentro `@media (prefers-reduced-motion: no-preference)`.

### Facoltativo

10. `src/app.html:5`: manca `<meta name="theme-color">` (due, per tema chiaro e scuro).
11. `src/routes/SiteHeader.svelte:29`: il pulsante del menu ha `aria-expanded` ma non `aria-controls`.
12. `src/lib/styles/forms.css:132`: «Controlla questo campo» è testo del CSS, non collegato al campo né annunciato; accettabile perché all'invio interviene la validazione nativa.
13. `join:133-147`: quando la data rende il richiedente minorenne compaiono nuovi campi senza annuncio: una riga `aria-live="polite"` («Compila anche i dati del genitore»).
14. `join:125`: nessun avviso uscendo con il modulo compilato a metà (`beforeNavigate`/`beforeunload` solo se toccato).
15. `src/routes/about/locations/MapEmbed.svelte:23`: dopo «Mostra la mappa» il focus finisce sul `body` (pagina oggi disattivata).
16. `about/mission/+page.svelte:28`, `join:206`: il link allo statuto apre un PDF senza dirlo: «statuto (PDF)».
17. ~~`TimelineSections.svelte:50`: `each` senza chiave~~ — **già corretto** con la revisione Svelte.
18. Apostrofo dritto `'` invece di `’` in tutto il sito (vedi anche parte 5, punto 16).
19. Osservazioni, non difetti: le regole su Title Case e seconda persona non valgono per l'italiano e per il «noi» del tono di voce; le `<section>` senza `aria-labelledby` vanno bene perché non sono landmark (AGENTS.md aggiornato); il pulsante di invio senza indicatore di caricamento è coerente con «funziona senza JS».

## 3. SEO, dati strutturati e prestazioni

Skill: `seo` (con `references/STRUCTURED-DATA.md`), `performance`, `core-web-vitals`, `web-quality-audit`, `best-practices`. Strumenti: Lighthouse 12.8.2 mobile (Moto G, 4G lento simulato); script su tutti i 31 `build/**/*.html` (titoli, description, canonical, og, JSON-LD, link interni, microdati); `curl` sul sito pubblicato (redirect, intestazioni, certificato); Chromium headless per gli errori in console su 12 pagine.

Conteggio: **Da correggere 4 · Consigliato 10 · Facoltativo 11**.

| Pagina | Prestazioni | Accessibilità | Best practices | SEO | FCP | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 94 | 100 | 100 | 100 | 1,8 s | **3,0 s** | 0 ms | 0 | 271 KiB |
| `/about/history` | 97 | 100 | 100 | 100 | 1,6 s | 2,4 s | 0 ms | 0 | 235 KiB |
| `/events` | 98 | 100 | 100 | 100 | 1,7 s | 2,1 s | 0 ms | 0 | 168 KiB |
| `/articles` | 98 | 100 | 100 | 100 | 1,7 s | 2,0 s | 0 ms | 0 | 147 KiB |
| `/contacts` | 99 | 100 | 100 | 100 | 1,6 s | 1,8 s | 0 ms | 0 | 144 KiB |

Già a posto: `lang="it"` ovunque; un solo `h1`, titolo, description e canonical assoluto per pagina; sitemap di 26 URL che coincide con le pagine indicizzabili (404, vecchi indirizzi e pagine «thanks» hanno `noindex`); `robots.txt` corretto; nessun link interno rotto; og/twitter completi; JSON-LD valido ovunque; http → https con 301; niente contenuto misto né sourcemap; nessuna risorsa bloccante; CLS 0; JS 52–64 KB; nessun errore in console.

### Da correggere

1. **Il certificato HTTPS non copre `www.filarmonicastradella.it`.** DNS (Register) e GitHub Pages: `www` è un CNAME verso `filarmonicastradella.it.` e su `https://www.` GitHub presenta il certificato `*.github.io`. Chi arriva da `https://www.…` vede un errore di sicurezza. Correzione: CNAME `www` → `filarmonicastradella.github.io`, poi nelle impostazioni Pages togliere e rimettere il dominio personalizzato perché GitHub emetta il certificato anche per `www`.
2. **Eventi senza risultati arricchiti: `location` non valido.** `src/routes/events/[id]/+page.svelte:66-70`: `itemprop="address"` sta sull'`<a>`, quindi il valore è l'`href` di Google Maps, non l'indirizzo. `src/lib/components/EventCard.svelte:24`: nelle schede `location` è testo, non un `Place`. `location` con `address` è obbligatorio per gli eventi di Google. Correzione: `address` su uno `<span>` dentro il link (o un `<meta itemprop="address">`); nelle schede `location` come `Place` con `name` (e `address`).
3. **`articleSection` vale un URL.** `src/routes/articles/ArticleHeader.svelte:12`: su un `<a>` il valore è l'`href`. Correzione: `itemprop` su uno `<span>` dentro il link (come già in `ArticleCard.svelte:26`).
4. **Link interno al vecchio indirizzo.** `src/lib/content/ensembles/filarmonici-dissonanti.md:27` → `/about/sonnet`. Correzione: `/articles/history/sonnet`.

### Consigliato

5. **Eventi: dati raccomandati mancanti** (`events/[id]/+page.svelte`, `EventCard.svelte`): `eventStatus`, `eventAttendanceMode`, `organizer` (la Filarmonica), `performer` (la formazione), `offers` (prezzo 0, EUR, coerente con «di norma a ingresso libero»), `image`. Utili dopo il punto 2.
6. **Gli eventi passati diventano 404.** `src/routes/events/[id]/+page.server.ts:6`, `src/lib/server/calendar.ts:87` (`timeMin: new Date()`): il giorno dopo il concerto l'indirizzo condiviso o citato dalla stampa non esiste più. Correzione: tenere le pagine degli eventi passati (`timeMin` di qualche anno, sezione «Eventi passati») o almeno una pagina che rimandi a `/events`.
7. **Vecchi indirizzi con il canonical verso sé stessi.** `src/routes/+layout.svelte:64` vale anche per `/about/sonnet` e `/about/stradella`, che hanno anche `og:url` vecchio e un JSON-LD proprio. Correzione: canonical e `og:url` verso l'articolo; niente JSON-LD nelle pagine `noindex`.
8. **`FAQPage` uguale in ogni pagina evento** (`src/hooks.server.ts:101-110`): Google chiede di marcare una domanda in una pagina sola, e dal 2023 i risultati FAQ si mostrano solo per siti governativi e sanitari. Correzione: escludere `/events/` dall'estrazione e le domande di `src/lib/faq.ts`, o togliere `FAQPage` del tutto.
9. **Foto della hero ancora grande sui telefoni.** `src/routes/Hero.svelte:26`: su un 412×823 la fascia è 459×306 ma il browser prende la 1280w (69 KB); stima 44–58 KiB sprecati. Correzione: `(orientation: portrait) 115vw` o simile, e una larghezza intermedia (800).
10. **La comparsa d'apertura nasconde foto e titolo all'LCP** (`Hero.svelte`, `dissolvenza` e `comparsa` da `opacity: 0`): nei dati reali l'LCP della home può arrivare dopo i 700 ms dell'animazione. Correzione: foto e `h1` già visibili, comparsa solo sul testo secondario. Da valutare con DESIGN.md (Movimento).
11. **Un'identità unica per l'ente.** L'`NGO` è solo in home e senza `@id`; non c'è un `WebSite`; i `MusicGroup` della home e delle pagine formazione sono entità separate; `ContactPage` senza `contactPoint`. Correzione: `@id` `https://filarmonicastradella.it/#ente`, `isPartOf` un `WebSite` con `publisher` l'ente, `about`/`mainEntity` in Associazione e Contatti, `@id` delle formazioni (URL della pagina + `#gruppo`).
12. **Articoli senza immagine e `og:type` sempre `website`.** `src/routes/articles/ArticleHeader.svelte:11`: mancano `image`, `publisher`, `dateModified`, `mainEntityOfPage`; la copertina di «Alessandro Stradella» non ha `itemprop="image"`. Correzione: aggiungerli; negli articoli `og:type=article` con `article:published_time`.
13. ~~**Usare la parola «banda»** nelle pagine principali per la ricerca locale.~~ **Scartato:** contrario alle linee guida di marca (mai «banda»).
14. **La 404 è vuota senza JavaScript.** `build/404.html` è il guscio di `adapter({ fallback })`: niente `<title>` né `<h1>`. Correzione: una 404 vera generata alla build al posto del `fallback`.

### Facoltativo

15. **Copertina della Storia con un `sizes` del vecchio layout** (`src/routes/about/history/+page.svelte:31`): su 1920 px si sceglie la 1280w. Correzione: `sizes="100vw"`.
16. **Breadcrumb: «Home» in inglese** (`src/hooks.server.ts:44`) e, per `/articles/history`, nome «Storia — Articoli». Correzione: «Pagina principale» (o il nome dell'ente); nome della categoria per l'ultima voce.
17. **Sitemap senza `lastmod`** (`src/routes/sitemap.xml/+server.ts:30`): aggiungerlo per articoli (data) ed eventi (`updated` del calendario), non la data della build.
18. **Titoli oltre ~60 caratteri**: `/booking` (63), `/legal/images` (66), `/articles/history/sonnet` (66), un evento (70). Valutare « — Filarmonica Stradella» o accettare il taglio.
19. **Description brevi**: `/about/ensembles/infieri` (72), `/contacts` (80), `/support/join` (87): portarle a 120–155 caratteri con luogo e un dato concreto.
20. **Rassegna stampa come `NewsArticle` dell'ente**: descrive articoli di altri. Lasciare, oppure `ItemList` di `CreativeWork`.
21. **Intestazioni di sicurezza** (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) non impostabili su GitHub Pages. Possibile una CSP come `<meta>` con `kit.csp` in modalità `hash` (`style-src 'unsafe-inline'`, `form-action https://formsubmit.co`); il resto richiederebbe un CDN.
22. **Cache di 10 minuti anche sui file con hash** (limite fisso di GitHub Pages): nessuna correzione senza un CDN davanti.
23. **Indirizzi email in chiaro nei moduli** (`formsubmit.co/info@…`, `…/segreteria@…`): dopo l'attivazione usare l'alias casuale di FormSubmit.
24. **Pagine figlie con un solo link interno**: `/about/mission`, `/about/musicians`, `/about/press`. Aggiungere link nel testo dove è naturale.
25. **Indirizzi degli eventi con l'id di Google Calendar**: valutare data e titolo, insieme al punto 6, purché l'indirizzo resti stabile.

## 3b. Dati strutturati (schema-markup)

Skill: `schema-markup` (coreyhaines31/marketingskills, con `references/schema-examples.md`). JSON-LD e microdati estratti da tutti i 31 HTML di `build/` con uno script. Il JSON-LD è valido su tutte le 30 pagine che lo hanno; ogni URL dei BreadcrumbList esiste in `build/`; logo (`/logo.png`, 512×512) e `sameAs` (solo profili veri, senza WhatsApp) a posto. I problemi sono nei microdati di Event e Article, nel collegamento delle entità con `@id` e nell'uso di FAQPage.

Conteggio: **Da correggere 4 · Consigliato 6 · Facoltativo 6** (uno già risolto). Molti punti coincidono con la parte 3: qui ci sono i frammenti di codice.

### Da correggere

1. **Event, pagina di dettaglio: `address` contiene un URL di Google Maps** (`src/routes/events/[id]/+page.svelte:66-70`). Su un `<a>` il microdato prende `href`. Correzione: `<span itemprop="address">{address}</span>` dentro il link, o meglio un `PostalAddress` (`streetAddress`, `postalCode`, `addressLocality`, `addressRegion`, `addressCountry`) se l'indirizzo del calendario si scompone in modo affidabile.
2. **EventCard: Event incompleti in home e in /events** (`src/lib/components/EventCard.svelte:13-24`): `location` in testo, senza Place né indirizzo; Search Console li segnalerebbe come non validi, e duplicano l'evento della pagina di dettaglio. Consigliato: togliere i microdati dalla scheda e lasciare l'Event solo in `/events/{id}`. In alternativa: stesso `itemid` della pagina di dettaglio (`…/events/{id}#evento`) e un Place completo.
3. **Article: `articleSection` vale `/articles/history`** (`src/routes/articles/ArticleHeader.svelte:12`). Correzione: `<a href="/articles/{category}"><span itemprop="articleSection">{nome}</span></a>`.
4. **Article senza `image` e `publisher`** (`ArticleHeader.svelte:11-21`): la copertina di «Alessandro Stradella» c'è già ma non è marcata. Correzione: `<meta itemprop="image">` (copertina o `anteprima.jpg`), `<link itemprop="mainEntityOfPage">`, e un `publisher` NGO con `itemid="https://filarmonicastradella.it/#organizzazione"`, `name` e `logo`.

### Consigliato

5. **FAQPage come entità principale delle pagine evento** (`src/hooks.server.ts:102-111`): `["WebPage","FAQPage"]` con 4 domande generiche uguali su ogni evento, mentre il contenuto principale è l'Event, non collegato. Google non mostra più i risultati FAQ. Correzione: nelle pagine `/events/*` niente FAQPage e `mainEntity: {"@id": "…/events/<id>#evento"}` con lo stesso `itemid` sull'evento. Nelle altre pagine FAQPage è legittimo (i conteggi corrispondono alle `<details>`); basta `"@type": "FAQPage"`, già sottotipo di WebPage.
6. **L'organizzazione non è collegata tra le pagine con `@id`** (`src/routes/+page.svelte:20-43`, `src/hooks.server.ts:104-111`): NGO solo in home e senza `@id`, nessun `WebSite`, WebPage isolati. Correzione: in home un `@graph` con NGO (`@id` `…/#organizzazione`) e WebSite (`@id` `…/#sito`, `name`, `alternateName` «Filarmonica Stradella», `inLanguage` `it-IT`, `publisher` l'ente); in ogni altra pagina `inLanguage`, `isPartOf` il sito e `publisher` l'ente.
7. **Event: proprietà raccomandate mancanti** (`events/[id]/+page.svelte:36-45`): `eventStatus` (`EventScheduled`), `eventAttendanceMode` (`OfflineEventAttendanceMode`), `image`, `organizer` (l'ente per `@id`), `isAccessibleForFree`/`offers` a 0 € solo se il calendario non indica un biglietto, `performer` dai dati del calendario.
8. **MusicGroup delle formazioni scollegati dall'NGO** (`src/routes/about/ensembles/[slug]/+page.svelte:13-23`; home `+page.svelte:32-37`): mancano `url`, `parentOrganization` e un `itemid` coerente con la home. Correzione: `itemid="…/about/ensembles/{slug}#formazione"`, `<link itemprop="url">`, `<link itemprop="parentOrganization" href="…/#organizzazione">`; in home lo stesso `@id` nei `subOrganization`.
9. **Article: `dateModified` e `author.url` mancanti** (`ArticleHeader.svelte:17-20`): `dateModified` quando l'articolo è rivisto; per l'autore un `url` o `sameAs`.
10. **Nome incoerente nel breadcrumb di /articles/history** (`src/hooks.server.ts:105`, `:110`): «Storia — Articoli» invece di «Storia». Correzione: per l'ultima voce `pageNames.get(path) ?? name`.

### Facoltativo

11. **Le pagine di reindirizzamento hanno JSON-LD** (`build/about/sonnet.html`, `build/about/stradella.html`, con canonical verso sé stesse): saltare il JSON-LD con `http-equiv="refresh"` e far puntare il canonical alla destinazione.
12. ~~**La home non fa l'escape di `<` nel JSON-LD**~~ — **già corretto** con la revisione Svelte.
13. **URL della home senza barra finale** in `url` dell'NGO e nel breadcrumb, mentre canonical e `og:url` ce l'hanno: usare `https://filarmonicastradella.it/` ovunque.
14. **Nome dell'ente**: `name` «Filarmonica Alessandro Stradella» e `legalName` «Filarmonica Alessandro Stradella APS»; facoltativi `contactPoint` e `areaServed` come `AdministrativeArea`.
15. **Rassegna stampa** (`ArticleCard.svelte:14-35`): i cinque NewsArticle sono articoli di altri siti (quello del Tirreno senza `url`). Se restano, aggiungere `<link itemprop="about" href="…/#organizzazione">`, o legarli al WebPage come `citation`/`mentions`.
16. **Sottotipi di Event**: `MusicEvent` per i concerti, `ExhibitionEvent` per la mostra. Nota: sulla pagina della mostra le FAQ parlano di «concerti».

## 4. Design

Skill: `impeccable` (flusso *critique*; `impeccable detect` ha dato un solo falso positivo; saltati i passi che scrivono nel progetto) e `design-taste-frontend`. Regola: `docs/DESIGN.md` v1.2 e `AGENTS.md`; dove contrastano con le skill vince DESIGN.md. Copertura: 14 pagine a 1280 e 390 px, tema chiaro e scuro, più il menu aperto; misure dagli stili calcolati. A 390 px nessuna pagina scorre in orizzontale. Schermate in `/tmp/claude-1000/-home-leo/32c9c9cf-8541-409a-84ad-8d6f58b320bd/scratchpad/design/` (`<pagina>-<larghezza>-<tema>.png`).

Conteggio: **Da correggere 3 · Consigliato 8 · Facoltativo 9**, più 6 osservazioni sui contrasti tra skill e DESIGN.md.

### Da correggere

1. **Le corde del pannello del menu hanno i pallini e finiscono a metà schermo** (menu aperto, 390 px, chiaro e scuro; `menu-390-light.png`). Si fermano poco sotto «Sostienici», con i pallini accanto al pulsante pieno. DESIGN §6: «Le corde del pannello del menu restano a tutta altezza, senza pallini», mai pallini vicino a pulsanti e menu. Correzione: `nav::after` fino al fondo del pannello, senza terminali; se la scelta è voluta, aggiornare DESIGN.md.
2. **Titolo Display a 72 px su ogni pagina** (1280 px; `home-`, `contacts-`, `join-1280-light.png`): `--fs-display` arriva a 4,5rem e `main > header h1` lo usa ovunque, quindi Contatti, Sostienici e Iscrizione hanno lo stesso titolo della home. DESIGN §4: Display 64/1,0, Titolo 1 44/1,1. Correzione: massimo 4rem e Display solo nella home e nelle copertine; o aggiornare la tabella di DESIGN.md.
3. **Le «Fonti» a tutta larghezza** (/about/history, /articles/history/sonnet, 1280 px): l'`<ol>` occupa circa 1000 px (circa 140 caratteri per riga) e i numeri a due cifre sporgono a sinistra. DESIGN §10: colonne di testo al massimo 36rem. Correzione: titolo a sinistra e lista nella colonna da 36rem, in corpo Didascalia, numeri dentro il bordo.

### Consigliato

4. **Piè di pagina: tre titoli Cormorant uguali affiancati** («Contatti», «L'associazione», «Note legali», 24/600). DESIGN §4: mai due titoli Cormorant della stessa dimensione affiancati. Correzione: Occhiello Jakarta 12 maiuscolo spaziato, come «INDIRIZZO».
5. **La foto della home e di Stradella Facendo non è un duotone** (`grayscale(0.6)` lascia sedie e parete rosse). DESIGN §9-10: foto a colori in duotone. Correzione: `grayscale(1)` e colore solo dal velo bordeaux notte → inchiostro, eventualmente con `mix-blend-mode`.
6. **A 390 px le corde stringono intestazione e presentazione a circa 30 caratteri per riga** (history, sonnet, press, join, sf): la presentazione della Storia diventa 13 righe, il titolo del sonetto va su tre. Correzione: sotto 40rem ridurre la rientranza delle corde, o limitarla a h1 e occhiello.
7. **Formazioni, scheda orfana** (/about/ensembles, 1280 px): quattro schede in tre colonne lasciano «Filarmonici Dissonanti» da sola. Correzione: 2 × 2 con `auto-fit, minmax(20rem, 1fr)` o una regola `:has()`.
8. **Rassegna stampa: misura diversa da scheda a scheda e freccia ↗ isolata** (1280 e 390 px): le schede con link lasciano spazio a destra e vanno a capo prima; il Tirreno, senza link, va a tutta larghezza. DESIGN §7: icona da 1em accanto al testo. Correzione: freccia in linea alla fine del titolo, nessuna rientranza destra.
9. **Altezze dei campi diverse** (contacts, booking, join): input 52 px, select 49 px, data 54 px; «Data» e «Luogo» sfalsati di 2 px. Correzione: stessa `block-size` in `forms.css`; select con `appearance: none` e chevron Heroicons a 1em.
10. **«Tutti gli eventi» in home allineato diversamente** (1280 px): parte dalla colonna delle date, gli altri rimandi dalla colonna destra. Correzione: allinearlo alla colonna dei titoli.
11. **Foto d'archivio della Storia sgranata a tutta larghezza** (1280 px): retino e contorni sfocati. DESIGN §9: «No: scatti sgranati». Correzione: scansione migliore, o fascia più bassa con `--cover-position` sui volti.

### Facoltativo

12. **Tema scuro, copertine sbiadite**: la foto è il blocco più chiaro della pagina e l'ombra della carta non si vede (`sf-390-dark.png`, `home-1280-dark.png`).
13. **Home, quattro sezioni identiche e quasi vuote**: «Momenti in musica» è solo una frase senza galleria. Schema conforme al §10; limite di contenuto. Nascondere la sezione senza galleria o unire «Suona» e «Sostieni».
14. **Link Instagram in home** come paragrafo a sé, sottolineato, accanto a rimandi in maiuscoletto: metterlo nella frase precedente.
15. **Testi del calendario**: virgolette dritte in «Sala "Tobagi"»; stacco più ampio dopo «Buona la prima?». In `calendar.ts` convertire in «» e comprimere i paragrafi vuoti.
16. **/events, titoli dei mesi** vicini ai titoli degli eventi, e indice che ripete le stesse due parole: indice solo da tre mesi in su, o mese come Occhiello.
17. **Storia su telefono, indice irregolare** (voci una o due per riga): una per riga sotto 40rem.
18. **/booking, consenso staccato** dopo circa 75 px di vuoto, fuori dai fieldset: portarlo in «Chi scrive».
19. **/support/join, «Documento e firma» senza firma**: rinominare o spiegare che la spunta vale come firma.
20. **/contacts, recapiti ripetuti** nella sezione e nel piè di pagina: accettabile.

### Osservazioni: skill contro DESIGN.md (vince DESIGN.md)

- «taste» vieta occhielli e maiuscolo spaziato, filetti, parola colorata in corsivo nel titolo; DESIGN li prescrive.
- «taste» chiede movimento allo scorrimento e almeno 4 foto per pagina; DESIGN §8 e §9 lo escludono (solo foto proprie).
- Le griglie di schede affiancano titoli Cormorant 24 uguali: alla lettera contro il §4, che però prescrive il Cormorant nelle schede. Chiarire nel §4 che la regola vale per i titoli di composizione.

### Cosa funziona

Struttura coerente in tutte le pagine (intestazione, corde allineate tra header, menu e piè di pagina, sezioni a due colonne, schede con il solo filetto, rimandi in fondo); tema scuro curato (rosa velluto, incisione del sonetto invertita, nessun testo illeggibile); su telefono nessuno scorrimento orizzontale.

## 5. Testi — humanizer e impeccable/clarify

Riletti i testi di tutte le pagine di `build/` (esclusi `404.html` e i reindirizzamenti). Skill: **humanizer** (segnali di scrittura da IA, adattati all'italiano) e **impeccable/clarify** (testi dell'interfaccia). Riferimenti: `docs/DESIGN.md` §11 «Tono di voce», `AGENTS.md` (Contenuti), vincoli dei responsabili. Le riscritture usano solo fatti già sul sito; i dati mancanti sono tra [parentesi quadre].

Conteggio: **Da correggere 11 · Consigliato 18 · Facoltativo 16**, più 6 note su Google Calendar.

### Da correggere

1. **Streetella Band, presentazione «petalosa»** (`src/lib/content/ensembles/streetella-band.md:3`, `:22-28`; anche in /about/ensembles e nella meta description). Attuale: «musica in movimento, tra l'energia della festa e l'impatto sonoro di una formazione itinerante… rappresenta l'anima più festosa e dinamica… punto di incontro tra energia collettiva e animazione dal vivo, con un'identità solida e immediatamente riconoscibile». Quattro paragrafi per una cosa sola, linguaggio da brochure. Proposta — riassunto: «La street band della Filarmonica: suona in movimento, per strada e alle feste all'aperto.»; testo: «La Streetella Band suona camminando, vicino al pubblico: animazioni itineranti, eventi all'aperto e feste. In repertorio ci sono musica della tradizione e brani moderni.»
2. **Stradella Facendo, presentazione gonfia** (`stradella-facendo.md:3`, `:27-29`). Attuale: «pensato per l'ascolto in contesti formali… in condizioni acustiche controllate. A differenza delle formazioni itineranti… alto livello artistico… rappresenta il cuore dell'attività concertistica». Contrasto inutile, autopromozione, «ampio e variegato», «dettaglio sonoro» tre volte. Proposta — riassunto: «L'orchestra di fiati della Filarmonica, per il repertorio da concerto.»; testo: «Stradella Facendo è l'orchestra di fiati della Filarmonica. Suona in sala o comunque in spazi adatti all'ascolto, con un organico stabile sul palco: così può curare l'equilibrio tra le sezioni e il dettaglio del suono. In repertorio ci sono trascrizioni di musica classica, composizioni originali per orchestra di fiati, brani contemporanei e arrangiamenti di musica moderna.»
3. **Filarmonici Dissonanti: testo fiorito, riferimento oscuro, motto in conflitto** (`filarmonici-dissonanti.md:3`, `:21-27`). Da togliere: «Un viaggio nel tempo», «dialogando con il movimento», «laboratorio musicale in cui… si intrecciano», «Il nome non è casuale». «Le «dame» del gruppo storico»: manca quale gruppo. «Il suo motto… è anche il nostro» contraddice il motto della home e della missione («Custodi della tradizione, interpreti del futuro.»): decidere quale. Il link va a `/about/sonnet` (reindirizzamento): usare `/articles/history/sonnet`. Proposta — riassunto: «Il gruppo di musica antica della Filarmonica: repertorio medievale, rinascimentale e barocco, secondo i criteri dell'interpretazione storicamente informata.»; testo: «I Filarmonici Dissonanti suonano musica da camera antica, soprattutto medievale, rinascimentale e barocca, secondo i criteri dell'interpretazione storicamente informata. L'organico cambia secondo il programma, con strumenti storici o copie e con voci. Collaborano spesso con gruppi di danza storica e di rievocazione, come le «dame» del gruppo storico di [nome e paese]. Il repertorio va dalle musiche di corte e dalle danze rinascimentali a brani più raccolti. Il nome viene dall'Accademia dei Filarmonici Dissonanti, com'era chiamata la Filarmonica nel Settecento: lo ricordano diplomi e fogli a stampa dell'epoca, tra cui il sonetto per Santa Cecilia del 1789. Il motto dell'Accademia era «Le dissonanze in un accordo solo».»
4. **«Ingaggi» come titolo in Contatti** (`src/routes/contacts/+page.svelte:92`): «ingaggio» fa pensare a una prestazione pagata, e la stessa cosa altrove si chiama «La Filarmonica al tuo evento». Proposta: «La Filarmonica al tuo evento».
5. **«250 anni di storia»** (`src/routes/about/mission/+page.svelte:22`): nel 2026 sono 249 (la storia dice «nel 2027 compie 250 anni»), e la frase ha due contrasti di fila. Proposta: «Portiamo il nome di uno dei grandi compositori del Seicento e quasi 250 anni di storia, ma per noi la tradizione è un punto di partenza.»
6. **Domanda dal punto di vista sbagliato** (`src/routes/support/donate/+page.svelte:14`): «A cosa serve la tua donazione?» → «A cosa serve la mia donazione?»
7. **Home: dove vanno i contributi** (`src/routes/+page.svelte:149`): «ogni contributo va alla musica, agli strumenti e ai giovani che iniziano a suonare» è una terna di comodo e «ai giovani» non c'è nella FAQ delle donazioni. Proposta: «Puoi diventare socio o fare una donazione: i contributi coprono strumenti, spartiti, sala prove e costi dei concerti.»
8. **Informativa privacy senza il modulo per gli eventi** (`src/routes/legal/privacy/+page.svelte:40-42`, `:72`): il modulo di /booking raccoglie anche telefono, data, luogo e occasione. Proposta: «Se ci scrivi per email, con il modulo di contatto o con la richiesta per un evento, usiamo i dati che ci dai (nome, email, eventuale telefono, data e luogo dell'evento, testo del messaggio) solo per risponderti.»; per FormSubmit: «…i dati dei moduli di contatto, di richiesta per un evento e di iscrizione.»
9. **FAQ religione e politica** (`src/routes/booking/+page.svelte:39`): «Suonate a funzioni religiose o eventi politici?» chiede più di quanto la risposta copra (apartitica ≠ apolitica; le ricorrenze civili sono tra le occasioni). Proposta: «Suonate a funzioni religiose o a iniziative di partito?»
10. **Calendario: l'introduzione promette attività che non risultano** (`src/routes/events/+page.svelte:21`, `:26`): «prove aperte» e «saggi» non compaiono altrove; «Scopri» è di repertorio. Proposta, anche per la meta description: «I prossimi concerti e le altre attività pubbliche della Filarmonica.»
11. **Missione: affermazioni gonfie** (`mission:80-81`): «in sale prestigiose. Ogni concerto richiama centinaia di persone». Testo approvato: da decidere con i responsabili. Proposta: «Suoniamo alle feste e alle cerimonie, negli ospedali e nelle RSA. Ai concerti vengono famiglie, amici e vicini, perché sul palco ci sono loro.»

### Consigliato

12. **Missione: molti «non X, ma Y» e chiuse a effetto** (testo approvato, proposte per i responsabili): `:43-45` «La musica non è qualcosa da consumare… è qualcosa che si fa», «il concerto non è il fine ma il frutto» → «Per noi la musica è qualcosa che si fa insieme, qui… il concerto è il punto d'arrivo di un percorso fatto insieme.»; `:54` «Siamo un'associazione, non un'accademia.» → togliere; `:64-66` «…ciò che nessuna quota può comprare…» → «…dallo strumento alla sala prove, così ognuno può pensare a suonare, insieme agli altri.»; `:86-87` «ogni euro e ogni ora investiti restino qui, nelle persone» → «Vorremmo più musicisti, più giovani e una rete di realtà musicali della Lunigiana che collaborano.»; `:50` la terna «semplici, trasparenti e condivise» solo se voluta.
13. **«Formazioni» o «ensemble»**: `src/routes/about/+page.svelte:3` («gli ensemble») e `filarmonici-dissonanti.md:21,23,25` → «formazioni» o «il gruppo». Meta di /about: «Chi è la Filarmonica Alessandro Stradella APS: la missione, la storia, le formazioni e i musicisti.»
14. **«orchestra Infieri» in minuscolo** (`about/ensembles/+page.svelte:37`, `about/history/+page.svelte:190-191`) → «Orchestra Infieri».
15. **«Consiglio Direttivo»** (`mission:70`) contro «consiglio direttivo» altrove: una forma sola, minuscola.
16. **Apostrofi dritti e tipografici mescolati**: i Markdown escono con ’, i `.svelte` con '; in Infieri l'H1 ha «L'orchestra», il corpo «L’Orchestra». Serve una regola unica.
17. **Introduzioni che ripetono titoli o schede**: `about/ensembles:14-16` elenca i quattro nomi già nelle schede → «Ogni formazione ha il suo repertorio e il suo organico; si può far parte anche di più di una.»; `about:9` «associazione di promozione sociale… che promuove… dal 1777» → «…è un'associazione di promozione sociale di Fivizzano, in Lunigiana. Fa musica dal 1777.»; `+page.svelte:64` «una storia lunga quasi due secoli e mezzo» → togliere; /about/musicians «Sono loro a fare la Filarmonica…» → «Chi suona oggi nella Filarmonica, strumento per strumento.»; `support:9` «Suonare costa, e chi suona da solo lo sa bene.» → «Con le quote dei soci e le donazioni la Filarmonica paga strumenti, spartiti e sala prove, che un musicista da solo difficilmente potrebbe sostenere.»; `support/donate:8` «sostenere i nostri progetti» → «Puoi fare una donazione libera con un bonifico: i dati sono qui sotto.»
18. **La richiesta per un evento ha quattro nomi**: «Per il tuo evento» (`Hero.svelte:22`), «La Filarmonica al tuo evento», «Ingaggi», «Potete suonare al mio evento?». Proposta: pulsante della hero «Chiedici di suonare al tuo evento», titoli «La Filarmonica al tuo evento».
19. **FAQ «Potete suonare al mio evento?» senza zona né preavviso** (`src/lib/faq.ts:14`) → «Sì, in tutta la Lunigiana: raccontaci l'occasione almeno 30 giorni prima. Ti rispondiamo con la disponibilità e la formazione adatta.»
20. **Modulo /booking** (`booking/+page.svelte:81-111`): sotto «Data» «Almeno 30 giorni da oggi.»; «Nome» → «Nome e cognome»; «Telefono» → «Telefono (facoltativo)»; aiuto per «Note» («Orario, durata e quello che ci serve sapere.»); dopo l'invio «Richiesta inviata» invece di «Messaggio inviato».
21. **Modulo di iscrizione** (`support/join/+page.svelte`): `:94` dire prima che servono codice fiscale e documento (PDF, JPG o PNG); `:144,170,175,256` «del genitore» → «del genitore o tutore»; `:254` legenda «Documento e firma» senza firma → «Documento e richiesta»; `:114` FAQ «Ci sono limiti di età? No: … Sotto i 14 anni online non si può» → «Si può suonare a qualsiasi età… Sotto i 14 anni l'iscrizione si fa di persona: contattaci.»; `:139` «contatta l'associazione» → «contattaci».
22. **«Chi è il maestro?»** (`about/musicians/+page.svelte:108-111`): ripropone la figura del maestro. Proposta: «Chi dirige?». *Nota: la domanda l'ha scelta l'utente il 29/10; da riconsiderare solo se lo vuole.*
23. **«ce n'è una per ogni livello»** (`about/musicians:95`): da verificare. Se confermato: «Dipende dalla formazione. Si può cominciare anche da zero, senza aver mai suonato uno strumento.»
24. **«E se piove? …abbiamo sempre pronto un posto al chiuso»** (`events/[id]/+page.svelte:95`): «sempre» è un impegno forte. → «Per i nostri concerti all'aperto prepariamo un posto al chiuso nelle vicinanze; se cambia qualcosa, lo trovi scritto qui sopra.»
25. **«lo stendardo della banda»** nel testo alternativo di una foto di oggi (`about/history/+page.svelte:158`) → «lo stendardo della Filarmonica».
26. **Calendario vuoto, due testi**: `events/+page.svelte` «Al momento non ci sono eventi in programma. Torna a trovarci presto!» e `UpcomingEvents.svelte:22` «Nessun evento in programma.» → la seconda in tutti e due.
27. **Meta description degli eventi con doppi due punti** (`events/[id]/+page.svelte:13`): «Mostra Fotografica: La Tradizione…: dom 6 – mar 8 dicembre…» → separare titolo e data con un punto o « · ».
28. **Organico, stesso strumento con nomi diversi**: «Flicorno»/«Flicorni»; «Euphonium»/«Flicorno»; «Cordofoni» con dentro «Archi» → «Corde».
29. **Articoli: l'introduzione elenca categorie vuote** (`articles/+page.svelte:11,17`) → «Ricerche sulla storia della Filarmonica e di Fivizzano.»

### Facoltativo

30. Galleria in home (`Gallery.svelte:13-15`): «Momenti in musica» generico, la frase ripete il link → titolo «Foto dei concerti», frase tolta.
31. «Scopri l'associazione» (`+page.svelte:69`) → «Chi siamo».
32. Lo slogan «Custodi della tradizione, interpreti del futuro.» è un'antitesi: da decidere con il punto 3.
33. «nessuno di noi è pagato per suonare, nemmeno chi dirige» (`mission:56`) sfiora il tema dei compensi → «Tutto si regge sul volontariato, anche la direzione.»
34. «una prova non salta mai perché manca qualcuno» (`mission:72-73`) è un assoluto; «guide» per i capi sezione suona strano.
35. Numeri in due modi: «più di 50 soci» (`mission:23`) e «più di cinquanta soci» (`history:183`).
36. «Perché più formazioni?» (`about/ensembles:36-39`) chiude con l'etimologia, che non risponde alla domanda.
37. Infieri (`infieri.md:30`): «con attenzione a dare a ogni sezione il proprio spazio» è riempitivo.
38. L'Accademia in tre grafie («dei Filarmonici Dissonanti», «de' Filarmonici Dissonanti», «dei Dissonanti» in `lib/articles.ts:5`): uniformare, citazioni escluse.
39. «Dalla Rivoluzione alla banda» (`history:39,92`): termine storico, può restare; alternativa «…alla Banda Musicale del 1831».
40. «Quello che segue viene dai documenti ritrovati finora.» (`history:26`): parla del testo; si può tenere come avvertenza.
41. «Più sotto ne trovi la trascrizione.» (`articles/history/sonnet:25`): si può togliere.
42. Scheda «Storia e origini» (`about/+page.svelte:22`) contro H1 «La storia»: stesso nome.
43. Liberatoria: titolo «…per immagini e voce» (`legal/images:6`) contro H1 «…immagini, voce ed esecuzioni» (`:15`).
44. Musicisti: sottotitolo «Percussioni» dentro la famiglia «Percussioni» (`musicians:40-42`).
45. Testo alternativo della copertina «Museo di San Giovanni degli Agostiniani» contro «Museo di Arte Sacra» nella rassegna stampa.

### Google Calendar (da correggere negli eventi, non nel sito)

- Titoli in maiuscolo all'inglese: «Concerto Autunnale: A Tempo di Vita», «Mostra Fotografica: La Tradizione Bandistica in Lunigiana» → «Concerto autunnale: «A tempo di vita»», «Mostra fotografica: la tradizione bandistica in Lunigiana».
- «Buona la prima? Aspettate di sentire il bis.»: «voi» invece di «tu» e attacco a domanda → «Dopo Fivizzano, Stradella Facendo porta il concerto autunnale ad Aulla.»
- Programma: autori per esteso alla prima citazione e opere in corsivo (DESIGN §11): John Philip Sousa, Nicola Piovani, Dmitrij Šostakovič, Jacques Offenbach.
- «Sala "Tobagi"» con virgolette dritte, che escono anche nella meta description → «Sala Tobagi».
- «Biblioteca civica Abate E. Gerini» nella descrizione, «Biblioteca Civica Abate e Gerini» nel luogo: la seconda è sbagliata.
- La descrizione della mostra cita «feste patronali» tra i temi delle foto: contesto storico, ma da segnalare ai responsabili per la linea laica.

## 5b. Testi — scrittura-italiana e ux-copy

Skill: `scrittura-italiana` (hypnosdesign, editor di lingua italiana) e `ux-copy` (Anthropic, testi dell'interfaccia). Riletti tutti i testi di `build/` risalendo alle sorgenti: correttezza, registro, coesione e testi dei moduli. Le proposte usano solo fatti già sul sito. Molti punti coincidono con la parte 5; qui ci sono quelli in più o con una proposta diversa.

Conteggio: **Da correggere 5 · Consigliato 29 · Facoltativo 14**, più una nota sul calendario.

### Da correggere

1. **Privacy, senso rovesciato** (`src/routes/legal/privacy/+page.svelte:77`): «Il calendario degli eventi viene letto da Google quando il sito viene preparato» fa capire che è Google a leggere. → «Il sito legge il calendario degli eventi da Google mentre viene preparato, non durante la tua visita: Google non riceve i tuoi dati.»
2. **Musicisti, nesso sbagliato** (`about/musicians/+page.svelte:101`): «oboe, fagotto e altri archi» fa credere che oboe e fagotto siano archi. → «Tutti, e in particolare oboe, fagotto e archi.»
3. **Donazione, chi fa la domanda** (`support/donate:14`): «A cosa serve la tua donazione?» → «A cosa serve la mia donazione?»
4. **«Ingaggi» in Contatti** (`contacts:92`) → «La Filarmonica al tuo evento».
5. **Iscrizione di un minore, rinvio a un «orario» mai nominato** (`support/join:224`), in una dichiarazione con valore legale. → «Autorizzo il minore a tornare a casa da solo alla fine delle attività dell'associazione; da quel momento l'associazione non ha più obblighi di vigilanza.»

### Consigliato

6. Etichette diverse per la stessa cosa: «Nome e cognome»/«Indirizzo email» (contatti) contro «Nome»/«Email» (ingaggi) → «Nome e cognome» ed «Email» ovunque.
7. Ingaggi: «Note» e «Telefono» facoltativi senza dirlo → «(facoltativo)».
8. Ingaggi: il preavviso di 30 giorni non compare sotto «Data» → «Almeno 30 giorni da oggi.»
9. Messaggio d'errore generico «Controlla questo campo» (`forms.css:133`) → messaggi per campo dove il motivo è certo («Il CAP ha 5 cifre», «Il codice fiscale ha 16 caratteri», «Scrivi un indirizzo email valido»).
10. Avviso sotto i 14 anni burocratico e diverso dalla FAQ (`join:139`) → «Sotto i 14 anni l'iscrizione online non è possibile: contattaci e completiamo la pratica di persona.»
11. «Dati anagrafici del genitore» (`join:144`) → «… del genitore o tutore».
12. «Documento e firma» senza firma (`join:254`) → «Documento e richiesta».
13. **Le caselle chiedono un consenso che la privacy non usa come base** (`contacts:84`, `booking:118`, `join:198`): la privacy indica come base la richiesta (art. 6.1.b) e il rapporto associativo. Da far verificare al consulente; proposta «Ho letto l'informativa sulla privacy.»
14. Causale ambigua (`support/donate:46`) → «"Erogazione liberale", seguita da nome, cognome e codice fiscale».
15. Promessa più ampia del vero (`support:18`): «puoi suonare nelle nostre formazioni» → «puoi chiedere di entrare nelle nostre formazioni».
16. Pulsante della hero senza verbo («Per il tuo evento») → «Suoniamo al tuo evento» o simile.
17. Due messaggi per «nessun evento» → «Per ora non ci sono eventi in programma.» in tutti e due.
18. Pagine di errore: 404 «…spostata in un altro pentagramma» → «Questa pagina non esiste o è stata spostata.»; 500 → «Qualcosa non ha funzionato. Riprova tra qualche minuto; se il problema resta, scrivici scegliendo "Problemi con il sito".»
19. FAQ condivisa senza Lunigiana e 30 giorni (`src/lib/faq.ts:14`) → «Sì: per un concerto, un convegno, una cerimonia o una festa in Lunigiana, raccontaci l'occasione almeno 30 giorni prima. Ti rispondiamo con la disponibilità e la formazione adatta.»
20. «non svolgiamo servizi religiosi» (`booking:41`, `mission:81`): «servizio» nel gergo è un'uscita pagata → «non suoniamo a funzioni religiose».
21. Missione (`mission:81-83`): nesso implicito tra funzioni religiose e realtà amiche; «perché sul palco ci sono loro» ambiguo → «…perché sul palco suonano persone che conoscono.»
22. Congiuntivo (`mission:86`): «che collaborano e si sostengono» → «che collaborino e si sostengano».
23. «nessuno di noi è pagato per suonare, nemmeno chi dirige» (`mission:56`) → «Tutto si regge sul volontariato, anche la direzione.»
24. «lo stendardo della banda» nel testo alternativo (`history:158`) → «lo stendardo».
25. Numeri e anni: «più di 50 soci» / «più di cinquanta soci»; «250 anni di storia» → «quasi 250 anni di storia».
26. Maiuscole: «consiglio direttivo» minuscolo ovunque; «l'Orchestra Infieri».
27. Apostrofi misti nella stessa pagina (i Markdown escono con ’, gli Svelte con '): uniformare.
28. «vuol dire amica della musica» → «vuol dire «amica della musica»».
29. «ensemble» nella meta di /about → «formazioni».
30. FAQ degli eventi anche sulla mostra: «i nostri concerti sono a ingresso libero» → «i nostri eventi…».
31. Liberatoria (`legal/images:60-61`): «ne prende visione» senza antecedente; «Nelle pubblicazioni del minore» → «Dei minori pubblichiamo al massimo il nome di battesimo, salvo nei programmi di sala».
32. Presentazioni di Stradella Facendo, Streetella Band e Filarmonici Dissonanti in registro astratto (proposte simili alla parte 5).
33. Articolo su Stradella (`articles/history/stradella:43`): sintassi aggrovigliata → «ha ispirato romanzi, melodrammi (tra cui l'opera *Alessandro Stradella* di Friedrich von Flotow, Amburgo 1844) e film».
34. «Chi è il maestro?»: «i direttori sono più di uno e sono prima di tutto musicisti» → «…sono più di uno, e prima di tutto sono musicisti.»

### Facoltativo

35. FAQ «Posso aiutare senza suonare?» ripete la domanda → «Sì: da socio puoi dare una mano con il tuo tempo e le tue competenze.»; «i dati del ragazzo» → «del minore».
36. «Via / Piazza» → «Via o piazza».
37. «informativa sulla privacy» / «informativa privacy»: una forma sola.
38. Galleria: «…sono sul nostro profilo Instagram.» → «…sono su Instagram.»
39. Scheda 5x1000: prima «Non ancora disponibile», poi «Destinarlo non costa nulla.»
40. Introduzione del calendario senza «Scopri».
41. Meta description degli eventi: due punti doppi e giorno abbreviato → data per esteso, separata con un punto.
42. «Siamo un'associazione, non un'accademia.» stride con l'Accademia dei Filarmonici Dissonanti → «non una scuola», se il senso è questo.
43. Articoli: elencare solo le categorie che hanno articoli.
44. Strumenti: «Flicorno»/«Flicorni», «Euphonium».
45. Testo alternativo di Stradella Facendo: «il direttore davanti» → «chi dirige davanti».
46. Storia (`history:68`): «segue» tra passati remoti → «seguì».
47. Oggetti delle email: trattino → lineetta.
48. Prima voce del menu «Occasione»: «Scegli» → «Scegli l'occasione».

### Google Calendar (solo nota)

Titoli in Title Case; «Sala "Tobagi"» con virgolette dritte; «Aspettate di sentire il bis» dà del voi; la biblioteca scritta in due modi; «Bandistica».
