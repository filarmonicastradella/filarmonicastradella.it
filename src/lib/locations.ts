export interface Location {
    id: string;
    name: string;
    address: string[];
    description: string;
    mapsHref: string;
    mapEmbed?: string;
}

// L'unica fonte degli indirizzi: la usano footer, contatti e pagina delle sedi.
export const legalSeat: Location = {
    id: "sede-legale",
    name: "Sede legale",
    address: ["Via Stretta 5", "54013 Fivizzano (MS)"],
    description: "Sede legale dell'associazione.",
    mapsHref: "https://maps.google.com/?q=Via+Stretta+5+54013+Fivizzano+MS"
};

export const operationalSeats: Location[] = [
    {
        id: "sede-fivizzano",
        name: "Sede operativa di Fivizzano",
        address: ["Via Radda 7", "54013 Fivizzano (MS)"],
        description:
            "Storicamente nota in gergo come \"Sala Operaia\", aperta in occasione di prove, eventi pubblici e sportelli informativi dedicati.",
        mapsHref: "https://maps.google.com/?q=Via+Radda+7,+54013+Fivizzano+MS",
        mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.784404098921!2d10.1278!3d44.2375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d515364166299b%3A0x6b772421371cb14b!2sVia%20Radda%2C%207%2C%2054013%20Fivizzano%20MS!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit"
    },
    {
        id: "sede-serricciolo",
        name: "Sede operativa di Serricciolo",
        address: ["Circolo Culturale \"Giovanni Fantoni\"", "Via la Spezia 7", "54013 Serricciolo, Fivizzano (MS)"],
        description: "Presso il Circolo Fantoni, attiva per le iniziative e gli incontri sul territorio.",
        mapsHref: "https://maps.app.goo.gl/FYszuhGgyCZdf5zm6",
        mapEmbed: "https://maps.google.com/maps?q=Via+la+Spezia+7,+Serricciolo,+Fivizzano+MS&output=embed"
    }
];
