import { organization } from "$lib/organization";
import { vcard } from "$lib/server/vcard";
import type { RequestHandler } from "./$types";

// La scheda contatto della Filarmonica, da Contatti («Salva nei contatti»); il codice è in $lib/server/vcard.ts
export const prerender = true;

export const GET: RequestHandler = () => vcard({ name: organization.name, email: organization.email });
