<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { categoryName, formatArticleDate, type Article } from "$lib/articles";
    import { organization } from "$lib/organization";

    // Intestazione di ogni articolo: categoria in occhiello, titolo, riassunto e firma; `children` è il resto
    // dell'intestazione (un'introduzione, la foto di copertina) e `style` le proprietà della copertina
    // (--cover-placeholder, --cover-position)
    let { article, children, style }: { article: Article; children?: Snippet; style?: string } = $props();

    /*
     * Condividi: il menu di condivisione del dispositivo (WhatsApp, Messaggi, mail), dove c'è; altrove copia il link e
     * per tre secondi dice «Link copiato». Solo con JS: senza, il pulsante non comparirebbe a fare niente.
     */
    let canShare = $state(false);
    let copied = $state(false);
    onMount(() => {
        canShare = "share" in navigator || "clipboard" in navigator;
    });

    async function share() {
        const url = `${organization.url}${article.href}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: article.title, url });
            } else {
                await navigator.clipboard.writeText(url);
                copied = true;
                setTimeout(() => (copied = false), 3000);
            }
        } catch {
            // Condivisione annullata: niente da fare
        }
    }
</script>

<header itemscope itemtype="https://schema.org/Article" {style}>
    <!-- Il microdato sul testo, non sul link: su un <a> il valore sarebbe l'indirizzo della categoria -->
    <p><a href="/articoli/{article.category}"><span itemprop="articleSection">{categoryName(article.category)}</span></a></p>
    <link itemprop="mainEntityOfPage" href="{organization.url}{article.href}" />
    <link itemprop="publisher" href="{organization.url}/#ente" />
    <h1 itemprop="headline">{article.title}</h1>
    <p itemprop="description">{article.excerpt}</p>
    {@render children?.()}
    <p>
        {#if article.author}
            di <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">{article.author}</span></span> ·
        {/if}
        <time itemprop="datePublished" datetime={article.date}>{formatArticleDate(article.date)}</time>
    </p>
    {#if canShare}
        <p><button type="button" onclick={share} aria-live="polite"><span hidden={copied}>Condividi l'articolo</span><span hidden={!copied}>Link copiato</span></button></p>
    {/if}
</header>
