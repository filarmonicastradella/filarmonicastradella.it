// I dati dell'ente, in un solo punto: li leggono il footer, le pagine legali, la mappa del sito e i dati
// strutturati per i motori di ricerca (home).
// Dopo il titolo di ogni pagina, nel <title>
export const titleSuffix = " — Filarmonica Alessandro Stradella";

export const organization = {
    name: "Filarmonica Alessandro Stradella APS",
    url: "https://filarmonicastradella.it",
    taxCode: "90021290458",
    email: "info@filarmonicastradella.it",
    pressEmail: "stampa@filarmonicastradella.it", // per i giornalisti, in Materiali per la stampa (dal 9/11/2026)
    phone: "+39 350 536 3110",
    foundingYear: "1777",
    // Il RUNTS non ha un indirizzo diretto per la scheda di un ente, e la ricerca pubblica serve a poco: il numero si copia (CopyValue)
    runts: { name: "Repertorio n. 176207" },
    pec: "filarmonicastradella@pec.it",
    // La donazione online con Stripe (dal 8/11/2026): importo libero, minimo 5 €; dopo il pagamento torna a /sostienici/dona/grazie.
    // Il pulsante «Dona ora» di Sostienici e di Fai una donazione
    donationHref: "https://donate.stripe.com/7sY28q5gW0o84A2fHC04800",
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
