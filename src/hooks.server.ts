import type { Handle } from "@sveltejs/kit";

// Anteprime dei link (Open Graph): titolo e descrizione sono quelli che ogni pagina ha già (<title> e meta description),
// copiati alla build nei tag og:, così non vanno scritti due volte in ogni pagina.
const escapeAttribute = (text: string) => text.trim().replace(/"/g, "&quot;");

export const handle: Handle = ({ event, resolve }) =>
    resolve(event, {
        transformPageChunk: ({ html }) => {
            if (!html.includes("</head>")) return html;
            const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
            const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
            const tags = [
                title && `<meta property="og:title" content="${escapeAttribute(title)}">`,
                description && `<meta property="og:description" content="${description}">`
            ].filter(Boolean);
            return html.replace("</head>", `${tags.join("\n\t\t")}\n\t</head>`);
        }
    });
