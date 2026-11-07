import { articles, categoryName } from "$lib/articles";
import { organization } from "$lib/organization";
import type { RequestHandler } from "./$types";

/*
 * Gli articoli in formato Atom, per i lettori di notizie (dal 8/11/2026): i nostri e quelli dei giornali, dal più
 * recente, come nell'archivio. Dei giornali solo titolo, sommario e link alla testata (diritto d'autore). Generato
 * alla build, quindi aggiornato a ogni ricostruzione del sito.
 */
export const prerender = true;

const feed = `${organization.url}/articoli.xml`;

const xml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Gli articoli hanno solo il giorno: mezzanotte UTC basta ai lettori per l'ordine
const time = (date: string) => `${date}T00:00:00Z`;

// I nostri articoli hanno un indirizzo relativo, quelli dei giornali il loro; le uscite solo su carta rimandano alla Stampa
const link = (href: string | undefined) => (href ? new URL(href, organization.url).href : `${organization.url}/articoli/stampa`);

export const GET: RequestHandler = () => {
    const entries = articles.map((article) => {
        const href = link(article.href);
        // Le uscite solo su carta non hanno un indirizzo proprio: l'identificativo lo fanno testata, data e titolo
        const id = article.href ? href : `tag:filarmonicastradella.it,${article.date}:stampa/${encodeURIComponent(`${article.publisher} ${article.title}`)}`;
        const author = article.author ?? article.publisher ?? organization.name;
        return `    <entry>
        <title>${xml(article.title)}</title>
        <link rel="alternate" href="${xml(href)}"/>
        <id>${xml(id)}</id>
        <published>${time(article.date)}</published>
        <updated>${time(article.date)}</updated>
        <author><name>${xml(author)}</name></author>
        <category term="${article.category}" label="${xml(categoryName(article.category))}"/>
        <summary>${xml(article.publisher ? `${article.publisher}: ${article.excerpt}` : article.excerpt)}</summary>
    </entry>`;
    });

    const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="it">
    <title>Articoli — Filarmonica Alessandro Stradella</title>
    <subtitle>La nostra identità, la storia, la didattica, le notizie e gli articoli dei giornali che parlano di noi.</subtitle>
    <link rel="self" href="${feed}"/>
    <link rel="alternate" href="${organization.url}/articoli"/>
    <id>${feed}</id>
    <updated>${time(articles[0].date)}</updated>
    <author><name>${xml(organization.name)}</name></author>
    <icon>${organization.url}/apple-touch-icon.png</icon>
${entries.join("\n")}
</feed>
`;

    return new Response(body, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });
};
