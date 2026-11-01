// Menu piatto: ogni voce è un link diretto alla sua pagina hub, che rimanda da sé alle pagine figlie
// (dal 9/10/2026; prima le voci con pagine figlie si aprivano in un <details>).
//
// Dal 3/10/2026: elenco ridotto alle sole voci obbligatorie o più importanti per una prima
// pubblicazione del sito. Pagine disattivate (vedi _page.svelte nelle rispettive cartelle):
// Ensemble, Notizie, Mediateca (restano raggiungibili con link diretti, es. dalla landing),
// Missione, Consiglio direttivo, Sedi, Partner, Fai volontariato, Statuto, Contributi pubblici
// (questi ultimi due senza dati da dichiarare: nessun contributo mai ricevuto). Trasparenza non è
// in menu ma resta raggiungibile (es. dal footer): la pagina ha comunque contenuto reale (dati
// dell'ente, link a privacy/cookie). Da riallargare quando il resto è pronto.
export const navItems = [
    { title: "Associazione", href: "/about" },
    // Dal 1/11/2026: chi vuole suonare passa dalle formazioni, che hanno la sezione «Suona con noi» con il link all'iscrizione
    { title: "Formazioni", href: "/ensembles" },
    { title: "Calendario", href: "/events" },
    { title: "Articoli", href: "/articles" },
    { title: "Contatti", href: "/contacts" }
];
