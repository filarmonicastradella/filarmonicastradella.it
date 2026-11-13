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
    // Il motto dell'Accademia de' Filarmonici Dissonanti, dal diploma settecentesco: nella prima schermata della home e nei materiali per la stampa
    motto: "Le dissonanze in un accordo solo",
    // Il RUNTS non ha un indirizzo diretto per la scheda di un ente, e la ricerca pubblica serve a poco: il numero si copia (CopyValue)
    runts: { name: "Repertorio n. 176207" },
    pec: "filarmonicastradella@pec.it",
    // La donazione online con Stripe (dal 8/11/2026): importo libero, minimo 5 €; dopo il pagamento torna a /sostienici/dona/grazie.
    // Il pulsante «Dona ora» di Sostienici (pieno) e di Erogazione liberale (a contorno)
    donationHref: "https://donate.stripe.com/7sY28q5gW0o84A2fHC04800",
    affiliation: {
        name: "ANBIMA APS",
        href: "https://www.anbima.it/massacarrara/regionetoscana-massacarrara-unita-di-base"
    },
    // Il ruolo nell'associazione di chi firma gli articoli, per i microdati (jobTitle dell'autore)
    authorRoles: { "Leonardo Orietti Del Duca": "Presidente" } as Record<string, string>,
    // Le voci su di noi nelle enciclopedie e nell'elenco degli enti di Cesvot (il centro servizi per il volontariato toscano): tra i "sameAs" dei dati strutturati, come i profili social (dal 9/11/2026)
    references: ["https://it.wikipedia.org/wiki/Filarmonica_Alessandro_Stradella", "https://www.wikidata.org/wiki/Q141869181", "https://my.cesvot.it/151960"],
    // La scheda dell'associazione su Google Maps (profilo dell'attività), con l'indirizzo stabile del suo identificativo
    mapsProfile: "https://maps.google.com/?cid=7810320797399219292",
    // I profili social, anche tra i "sameAs" dei dati strutturati: WhatsApp è il canale della Filarmonica (dal 13/11/2026, al posto della
    // chat, che ora sta nei recapiti di Contatti: `whatsappChat`)
    socials: [
        { name: "Instagram", href: "https://instagram.com/filarmonicastradella" },
        { name: "Facebook", href: "https://facebook.com/filarmonicastradella" },
        { name: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb8pMlHL7UVXycPlHa0A" },
        { name: "YouTube", href: "https://youtube.com/@filarmonicastradella" }
    ],
    // La chat WhatsApp con il numero dell'associazione: un contatto, non un profilo, quindi non va tra i "sameAs"
    whatsappChat: "https://wa.me/393505363110"
};
