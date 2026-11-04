// Il servizio che riceve i moduli del sito e li manda per email con Brevo, al posto di FormSubmit (dal 4/11/2026).
// Accetta gli stessi campi tecnici di FormSubmit, così nei moduli cambia solo l'indirizzo d'invio:
//   action="https://<worker>/<casella>"   per esempio /info, /segreteria
//   _subject  oggetto dell'email
//   _next     pagina di ringraziamento, solo del nostro sito
//   _honey    campo trappola: se è pieno l'invio è di un programma, e si scarta in silenzio
// Gli allegati sono i campi file, qualsiasi nome abbiano. La chiave di Brevo è un segreto di Cloudflare (BREVO_API_KEY).
import { Buffer } from "node:buffer";

// Le caselle a cui si può scrivere: solo queste, così nessuno può usare il servizio per mandare email ad altri
const MAILBOXES = ["info", "segreteria", "tesoreria", "presidente", "safeguarding", "privacy", "webmaster"];
const DOMAIN = "filarmonicastradella.it";

// Limiti degli allegati: Brevo accetta messaggi fino a circa 20 MB, e i file in base64 crescono di un terzo
const MAX_FILE = 5 * 1024 * 1024;
const MAX_TOTAL = 12 * 1024 * 1024;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const origin = request.headers.get("Origin") ?? "";
        const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());

        if (request.method !== "POST") return page(405, "Questo indirizzo riceve solo i moduli del sito.", env.SITE);
        if (!allowed.includes(origin)) return page(403, "Il modulo può essere inviato solo dal sito della Filarmonica.", env.SITE);

        const mailbox = url.pathname.replace(/^\/|\/$/g, "");
        if (!MAILBOXES.includes(mailbox)) return page(404, "Casella sconosciuta.", origin);

        let form;
        try {
            form = await request.formData();
        } catch {
            return page(400, "Il modulo non è arrivato completo. Riprova.", origin);
        }

        // Dove tornare: solo pagine dello stesso sito da cui arriva il modulo
        const next = new URL(form.get("_next") || "/", origin);
        const back = allowed.includes(next.origin) ? new URL(next.pathname + next.search + next.hash, origin).href : origin;

        if (form.get("_honey")) return Response.redirect(back, 303);

        const fields = [];
        const attachments = [];
        let total = 0;
        for (const [name, value] of form) {
            if (name.startsWith("_")) continue;
            if (typeof value === "string") {
                if (value.trim()) fields.push([name, value.trim()]);
                continue;
            }
            if (!value.size) continue;
            if (value.size > MAX_FILE) return page(413, `Il file «${value.name}» è più grande di 5 MB. Riducilo o mandane una foto più leggera.`, origin);
            total += value.size;
            if (total > MAX_TOTAL) return page(413, "Gli allegati insieme superano 12 MB. Mandane una parte con il modulo e il resto in un secondo invio.", origin);
            attachments.push({ name: value.name, content: Buffer.from(await value.arrayBuffer()).toString("base64") });
        }

        const email = form.get("email");
        const name = [form.get("nome"), form.get("cognome")].filter(Boolean).join(" ") || form.get("nome_e_cognome") || undefined;

        const message = {
            sender: { name: "Sito della Filarmonica", email: env.SENDER },
            to: [{ email: `${mailbox}@${DOMAIN}` }],
            subject: String(form.get("_subject") || "Nuovo messaggio dal sito – Filarmonica Stradella").slice(0, 200),
            htmlContent: table(fields, attachments),
            textContent: fields.map(([k, v]) => `${label(k)}: ${v}`).join("\n"),
            ...(typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { replyTo: { email, ...(name ? { name } : {}) } } : {}),
            ...(attachments.length ? { attachment: attachments } : {})
        };

        const sent = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: { "api-key": env.BREVO_API_KEY, "content-type": "application/json", accept: "application/json" },
            body: JSON.stringify(message)
        });

        if (!sent.ok) {
            console.error("Brevo", sent.status, await sent.text());
            return page(502, `Il messaggio non è partito per un problema del servizio di posta. Riprova tra qualche minuto, o scrivici a ${mailbox}@${DOMAIN}.`, origin);
        }
        return Response.redirect(back, 303);
    }
};

// "ricordo_1_descrizione" diventa "Ricordo 1 descrizione"
const label = (name) => name.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

const escape = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const table = (fields, attachments) =>
    `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 sans-serif">${fields
        .map(([k, v]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${escape(label(k))}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escape(v)}</td></tr>`)
        .join("")}${attachments.length ? `<tr><th align="left">Allegati</th><td>${attachments.map((a) => escape(a.name)).join("<br>")}</td></tr>` : ""}</table>`;

// Una pagina semplice per gli errori, con il link per tornare al sito
const page = (status, text, home) =>
    new Response(
        `<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Modulo non inviato — Filarmonica Alessandro Stradella</title>` +
            `<body style="font:17px/1.6 sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem"><h1>Modulo non inviato</h1><p>${escape(text)}</p>` +
            `<p>Torna indietro con il browser per ritrovare quello che hai scritto, oppure vai al <a href="${escape(home)}">sito della Filarmonica</a>.</p></body></html>`,
        { status, headers: { "content-type": "text/html; charset=utf-8" } }
    );
