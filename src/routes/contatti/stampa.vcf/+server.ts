import { organization } from "$lib/organization";
import { vcard } from "$lib/server/vcard";
import type { RequestHandler } from "./$types";

// La scheda contatto per la stampa, da Materiali per la stampa: stessi dati, con l'indirizzo stampa@
export const prerender = true;

export const GET: RequestHandler = () => vcard({ name: `${organization.name} – Stampa`, email: organization.pressEmail });
