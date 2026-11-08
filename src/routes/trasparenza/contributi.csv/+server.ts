import { contributions } from "$lib/contributions";
import type { RequestHandler } from "./$types";

/*
 * I contributi pubblici in CSV (dal 8/11/2026), da aprire con un foglio di calcolo: gli stessi dati della tabella,
 * generati alla build. UTF-8 con il BOM, perché Excel riconosca le lettere accentate; importi con il punto decimale.
 */
export const prerender = true;

const cell = (value: string | number) => {
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const GET: RequestHandler = () => {
    const rows = [
        ["Anno", "Ente erogante", "Importo (EUR)", "Causale"],
        ...contributions.map(({ year, grantor, amount, purpose }) => [year, grantor, amount.toFixed(2), purpose])
    ];
    const body = "﻿" + rows.map((row) => row.map(cell).join(",")).join("\r\n") + "\r\n";
    return new Response(body, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
};
