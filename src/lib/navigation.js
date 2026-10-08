// Una voce con "children" si apre nel menu per mostrare le sue pagine figlie (vedi SiteHeader.svelte);
// una voce senza resta un link diretto. I titoli e i link delle pagine figlie ricalcano quelli già
// presenti nella pagina hub corrispondente.
//
// Dal 3/10/2026: elenco ridotto alle sole voci obbligatorie o più importanti per una prima
// pubblicazione del sito. Pagine disattivate (vedi _page.svelte nelle rispettive cartelle):
// Ensemble, Notizie, Mediateca (restano raggiungibili con link diretti, es. dalla landing),
// Missione, Consiglio direttivo, Sedi, Partner, Fai volontariato, Statuto, Contributi pubblici
// (questi ultimi due senza dati da dichiarare: nessun contributo mai ricevuto). Trasparenza non è
// in menu ma resta raggiungibile (es. dal footer): la pagina ha comunque contenuto reale (dati
// dell'ente, link a privacy/cookie). Da riallargare quando il resto è pronto.
export const navItems = [
    {
        title: "Associazione",
        href: "/about",
        children: [{ title: "Storia e origini", href: "/about/history" }]
    },
    {
        title: "Sostienici",
        href: "/support",
        children: [
            { title: "Diventa socio", href: "/support/join" },
            { title: "Erogazioni liberali", href: "/support/donate" }
        ]
    },
    { title: "Eventi", href: "/events" },
    { title: "Contatti", href: "/contacts" }
];
