// I dati dell'ente, in un solo punto: li leggono il footer, le pagine legali, la mappa del sito e i dati
// strutturati per i motori di ricerca (home).
export const organization = {
    name: "Filarmonica Alessandro Stradella APS",
    url: "https://filarmonicastradella.it",
    taxCode: "90021290458",
    email: "info@filarmonicastradella.it",
    phone: "+39 350 536 3110",
    foundingYear: "1777",
    // Il RUNTS non ha un indirizzo diretto per la scheda di un ente: il link porta alla ricerca pubblica
    runts: {
        name: "Repertorio n. 176207",
        href: "https://servizi.lavoro.gov.it/runts/it-it/Ricerca-enti"
    },
    pec: "filarmonicastradella@pec.it",
    affiliation: {
        name: "ANBIMA APS",
        href: "https://www.anbima.it/massacarrara/regionetoscana-massacarrara-unita-di-base"
    },
    // I profili social; WhatsApp è un contatto, non un profilo, quindi non va tra i "sameAs" dei dati strutturati.
    socials: [
        { name: "Instagram", href: "https://instagram.com/filarmonicastradella", profile: true },
        { name: "Facebook", href: "https://facebook.com/filarmonicastradella", profile: true },
        { name: "WhatsApp", href: "https://wa.me/393505363110", profile: false },
        { name: "YouTube", href: "https://youtube.com/@filarmonicastradella", profile: true }
        // { name: "TikTok", href: "https://tiktok.com/@filarmonicastradella", profile: true } // quando ci sarà il profilo (e l'icona nel footer)
    ]
};
