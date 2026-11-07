import { getUpcomingEvents } from "$lib/server/calendar";
import { icsResponse } from "$lib/server/ics";
import type { RequestHandler } from "./$types";

/*
 * Il calendario intero, a cui iscriversi (dal 8/11/2026): tutti gli eventi pubblici, senza le prove, generato alla
 * build e quindi aggiornato a ogni ricostruzione del sito, ogni 3 ore. I programmi di calendario lo rileggono da soli.
 */
export const prerender = true;

export const GET: RequestHandler = async () =>
    icsResponse(await getUpcomingEvents(), [
        "X-WR-CALNAME:Filarmonica Alessandro Stradella",
        "X-WR-CALDESC:Concerti e attività pubbliche della Filarmonica Alessandro Stradella di Fivizzano",
        "X-WR-TIMEZONE:Europe/Rome",
        "REFRESH-INTERVAL;VALUE=DURATION:PT3H",
        "X-PUBLISHED-TTL:PT3H"
    ]);
