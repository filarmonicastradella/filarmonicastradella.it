<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { page } from "$app/state";
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";
    import { organization } from "$lib/organization";
    import { share } from "$lib/share";

    // Intestazione di ogni articolo: categoria in occhiello, titolo, riassunto e firma; `children` è il resto
    // dell'intestazione (un'introduzione, la foto di copertina) e `style` le proprietà della copertina
    // (--cover-placeholder, --cover-position)
    let { article, children, style }: { article: Article; children?: Snippet; style?: string } = $props();

    // L'ultima modifica, dalla storia di git (articoli/+layout.server.ts), per i motori di ricerca
    const modified = $derived((page.data.articleModified as Record<string, string> | undefined)?.[article.href!]);

    /*
     * Condividi: il menu di condivisione del dispositivo (WhatsApp, Messaggi, mail), dove c'è; altrove copia il link e
     * per tre secondi dice «Link copiato». Solo con JS: senza, il pulsante non comparirebbe a fare niente.
     */
    let canShare = $state(false);
    let copied = $state(false);
    onMount(() => {
        canShare = "share" in navigator || "clipboard" in navigator;
    });

    async function shareArticle() {
        const url = `${organization.url}${article.href}`;
        if ((await share({ title: article.title, url })) === "copied") {
            copied = true;
            setTimeout(() => (copied = false), 3000);
        }
    }
</script>

<header itemscope itemtype="https://schema.org/Article" {style}>
    <!-- Il microdato sul testo, non sul link: su un <a> il valore sarebbe l'indirizzo della categoria -->
    <p><a href="/articoli/{article.category}"><span itemprop="articleSection">{categoryName(article.category)}</span></a></p>
    <link itemprop="mainEntityOfPage" href="{organization.url}{article.href}" />
    <link itemprop="publisher" href="{organization.url}/#ente" />
    <meta itemprop="inLanguage" content="it-IT" />
    {#if modified}
        <meta itemprop="dateModified" content={modified} />
    {/if}
    <!-- Senza una foto di copertina (itemprop="image" nell'intestazione), l'immagine comune del sito -->
    {#if !children}
        <link itemprop="image" href="{organization.url}/anteprima.jpg" />
    {/if}
    <h1 itemprop="headline">{article.title}</h1>
    <p itemprop="description">{article.excerpt}</p>
    {@render children?.()}
    <p>
        {#if article.author}
            di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span
                >{#if organization.authorRoles[article.author]}<meta itemprop="jobTitle" content={organization.authorRoles[article.author]} /><link
                        itemprop="memberOf"
                        href="{organization.url}/#ente"
                    />{/if}</span
            > ·
        {/if}
        <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
    </p>
    {#if canShare}
        <p><button type="button" onclick={shareArticle} aria-live="polite"><span hidden={copied}>Condividi l'articolo</span><span hidden={!copied}>Link copiato</span></button></p>
    {/if}
</header>
