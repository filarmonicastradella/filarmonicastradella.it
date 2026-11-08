<script lang="ts">
    import { formatArticleDate, type Article } from "$lib/articles";
    import { organization } from "$lib/organization";

    /*
     * La fine di ogni nostro articolo, prima del rimando agli Articoli: come citarlo (solo la storia, che ha le fonti)
     * e l'invito a segnalare errori o aggiunte. L'invito a mandarci materiale storico sta solo negli articoli dove
     * serve, scritto lì (Storia della Filarmonica).
     */
    let { article }: { article: Article } = $props();

    const history = $derived(article.category === "storia");
    const citation = $derived(
        [article.author, `«${article.title}»`, organization.name, formatArticleDate(article.date), `${organization.url}${article.href}`]
            .filter(Boolean)
            .join(", ")
    );
</script>

{#if history}
    <section>
        <h2>Come citare questo articolo</h2>
        <p>{citation}.</p>
    </section>
{/if}

<section>
    <h2>Hai qualcosa da aggiungere?</h2>
    <p>Se in questo articolo hai trovato un errore o sai qualcosa da aggiungere, <a href="/contatti#scrivici">scrivici</a>.</p>
</section>

<p class="rimando"><a href="/articoli">Articoli</a></p>
