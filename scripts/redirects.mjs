// Rimandi dai vecchi indirizzi (in inglese fino al 1/11/2026, e quelli cambiati dopo) ai nuovi, dal 9/11/2026: Google li aveva
// già indicizzati e chi arrivava dalla ricerca trovava una pagina che non esiste. GitHub Pages non fa rimandi lato server, quindi
// dopo la build si scrive per ogni vecchio indirizzo una pagina minima con il rimando immediato (meta refresh, che Google tratta
// come un rimando permanente), l'indirizzo canonico nuovo e un link per chi ha i rimandi automatici spenti. Non sono pagine del
// sito: non finiscono nella sitemap. Un indirizzo che cambia ancora si aggiunge qui.
import { existsSync, readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const SITE = "https://filarmonicastradella.it";
const BUILD = "build";

const ensembles = ["stradella-facendo", "streetella-band", "orchestra-infieri", "filarmonici-dissonanti"];

const redirects = {
    // Associazione
    "/about": "/associazione",
    "/about/achievements": "/associazione",
    "/about/partners": "/associazione",
    "/about/locations": "/contatti",
    "/about/mission": "/associazione",
    "/associazione/missione": "/associazione",
    "/articoli/obiettivi/missione": "/associazione",
    "/articoli/vita/missione": "/associazione",
    "/articoli/identita/missione": "/associazione",
    "/faq": "/associazione",
    // Iscrizione
    "/about/join": "/associazione/iscrizione",
    "/about/join/thanks": "/associazione/iscrizione/grazie",
    "/join": "/associazione/iscrizione",
    "/join/form": "/associazione/iscrizione",
    "/join/thanks": "/associazione/iscrizione/grazie",
    "/join/form/thanks": "/associazione/iscrizione/grazie",
    "/support/join": "/associazione/iscrizione",
    "/support/join/thanks": "/associazione/iscrizione/grazie",
    "/support/auditions": "/associazione/iscrizione",
    "/legal/consents": "/associazione/iscrizione?modo=variazione",
    "/legal/consents/thanks": "/associazione/iscrizione/grazie",
    // Formazioni
    "/about/ensembles": "/formazioni",
    "/ensembles": "/formazioni",
    "/about/musicians": "/formazioni",
    "/about/director": "/formazioni",
    "/about/ensembles/infieri": "/formazioni/orchestra-infieri",
    "/ensembles/infieri": "/formazioni/orchestra-infieri",
    ...Object.fromEntries(ensembles.flatMap((slug) => [[`/about/ensembles/${slug}`, `/formazioni/${slug}`], [`/ensembles/${slug}`, `/formazioni/${slug}`]])),
    // Calendario
    "/events": "/calendario",
    // Articoli
    "/articles": "/articoli",
    "/articles/history": "/articoli/storia",
    "/articles/teaching": "/articoli",
    "/articles/theory": "/articoli",
    "/articles/life": "/articoli",
    "/articles/news": "/articoli",
    "/articles/press": "/articoli/stampa",
    "/news": "/articoli",
    "/about/press": "/articoli/stampa",
    "/media/press": "/articoli/stampa",
    "/about/history": "/articoli/storia/filarmonica",
    "/articles/history/filarmonica": "/articoli/storia/filarmonica",
    "/about/stradella": "/articoli/storia/stradella",
    "/articles/history/stradella": "/articoli/storia/stradella",
    "/articles/research/stradella": "/articoli/storia/stradella",
    "/about/sonnet": "/articoli/storia/sonetto",
    "/articles/history/sonnet": "/articoli/storia/sonetto",
    "/articles/research/sonnet": "/articoli/storia/sonetto",
    // Contatti
    "/contacts": "/contatti",
    "/contacts/message": "/contatti/scrivi",
    "/contacts/write": "/contatti/scrivi",
    "/contacts/thanks": "/contatti/grazie",
    "/booking": "/contatti/ingaggi",
    "/media/kit": "/contatti/stampa",
    // Foto e video
    "/media": "/associazione/mediateca",
    "/mediateca": "/associazione/mediateca",
    "/media/photos": "/associazione/mediateca",
    "/media/videos": "/associazione/mediateca",
    "/media/interviews": "/articoli",
    // Sostienici
    "/support": "/sostienici",
    "/support/donate": "/sostienici/dona",
    "/support/5x1000": "/sostienici",
    "/support/forms": "/sostienici",
    "/support/rules": "/trasparenza",
    "/support/volunteer": "/sostienici",
    "/support/faq": "/sostienici",
    // Trasparenza e informative
    "/transparency": "/trasparenza",
    "/legal/transparency": "/trasparenza",
    "/legal/budgets": "/trasparenza",
    "/transparency/board": "/trasparenza/consiglio",
    "/about/board": "/trasparenza/consiglio",
    "/transparency/contributions": "/trasparenza/contributi",
    "/legal/contributions": "/trasparenza/contributi",
    "/transparency/statute": "/trasparenza/statuto",
    "/legal/statute": "/trasparenza/statuto",
    "/legal/privacy": "/informative/privacy",
    "/legal/cookies": "/informative/cookie",
    "/legal/images": "/informative/immagini",
    "/legal/accessibility": "/informative/privacy",
    "/legal/terms": "/informative/privacy",
    "/legal/whistleblowing": "/informative/privacy"
};

// Le pagine dei singoli eventi, che prima stavano in /events: quelle che esistono ancora (anche passate)
for (const file of readdirSync(`${BUILD}/calendario`)) {
    if (file.endsWith(".html") && file !== "archivio.html") redirects[`/events/${file.slice(0, -5)}`] = `/calendario/${file.slice(0, -5)}`;
}

const page = (to) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pagina spostata — Filarmonica Alessandro Stradella</title>
<link rel="canonical" href="${SITE}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body>
<p>Questa pagina si è spostata: <a href="${to}">vai al nuovo indirizzo</a>.</p>
</body>
</html>
`;

let written = 0;
for (const [from, to] of Object.entries(redirects)) {
    const target = to.split("?")[0];
    // Solo verso pagine che esistono davvero, e senza mai coprire una pagina del sito
    if (!existsSync(`${BUILD}${target}.html`) && !existsSync(`${BUILD}${target}/index.html`) && target !== "/") throw new Error(`Rimando verso una pagina che non c'è: ${from} → ${to}`);
    if (existsSync(`${BUILD}${from}.html`)) throw new Error(`Il vecchio indirizzo è una pagina del sito: ${from}`);
    await mkdir(dirname(`${BUILD}${from}.html`), { recursive: true });
    await writeFile(`${BUILD}${from}.html`, page(to));
    written++;
}
console.log(`Rimandi dai vecchi indirizzi: ${written}`);
