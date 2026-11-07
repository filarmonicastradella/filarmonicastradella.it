import { legalSeat } from "$lib/locations";
import { organization } from "$lib/organization";
import icon from "../../../../static/apple-touch-icon.png?inline";
import type { RequestHandler } from "./$types";

/*
 * La scheda contatto della Filarmonica (vCard 3.0, la versione che leggono tutti i telefoni), per salvarla in rubrica
 * da Contatti (dal 8/11/2026): nome, telefono, email, sito, sede legale, profili social e il simbolo come foto, dentro
 * il file perché i telefoni non scaricano le immagini da fuori. Dati da organization.ts e locations.ts.
 */
export const prerender = true;

const text = (value: string) => value.replace(/[\;,]/g, (c) => `\\${c}`);

// La sede legale come indirizzo: «Via Stretta 5», «54013 Fivizzano (MS)»
const [street, place] = legalSeat.address;
const [, postalCode, city, province] = place.match(/^(\d{5}) (.+) \((\w+)\)$/)!;

// Le righe lunghe vanno spezzate a 75 caratteri, con uno spazio all'inizio della riga che continua
const fold = (line: string) => line.match(/.{1,74}/g)!.join("\r\n ");

export const GET: RequestHandler = () => {
    const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${text(organization.name)}`,
        `N:${text(organization.name)};;;;`,
        `ORG:${text(organization.name)}`,
        "X-ABShowAs:COMPANY",
        `TEL;TYPE=CELL,VOICE:${organization.phone.replace(/ /g, "")}`,
        `EMAIL;TYPE=INTERNET,WORK:${organization.email}`,
        `URL:${organization.url}`,
        `ADR;TYPE=WORK:;;${text(street)};${text(city)};${province};${postalCode};Italia`,
        ...organization.socials.filter(({ profile }) => profile).map(({ name, href }) => `X-SOCIALPROFILE;TYPE=${name.toLowerCase()}:${href}`),
        `PHOTO;ENCODING=b;TYPE=PNG:${icon.replace(/^data:image\/png;base64,/, "")}`,
        "END:VCARD"
    ];
    return new Response(lines.map(fold).join("\r\n") + "\r\n", {
        headers: { "Content-Type": "text/vcard; charset=utf-8" }
    });
};
