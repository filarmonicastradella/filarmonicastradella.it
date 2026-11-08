<script lang="ts">
    import { formatArticleDate, type Article } from "$lib/articles";
    import type { Snippet } from "svelte";
    import CopyValue from "$lib/components/CopyValue.svelte";
    import { organization } from "$lib/organization";

    /*
     * La fine di ogni nostro articolo: subito dopo il testo, dove chi ha finito di leggere le vede, come citarlo (solo la storia, che ha le fonti)
     * e l'invito a segnalare errori o aggiunte; poi le fonti (si consultano dalle note) e per ultimo il rimando agli Articoli. L'invito a mandarci materiale storico sta solo negli articoli dove
     * serve, scritto lì (Storia della Filarmonica).
     */
    // `children`: le fonti dell'articolo, che vanno dopo queste sezioni brevi e prima del rimando
    let { article, children }: { article: Article; children?: Snippet } = $props();

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
        <!-- Il punto dentro il pulsante: un pulsante non va a capo come il testo, e il punto dopo finiva da solo sulla riga sotto -->
        <p><CopyValue text="{citation}.">{citation}.</CopyValue></p>
    </section>
{/if}

<section>
    <h2>Hai qualcosa da aggiungere?</h2>
    <p>Se in questo articolo hai trovato un errore o sai qualcosa da aggiungere, <a href="/contatti/scrivi?motivo=articoli&articolo={encodeURIComponent(article.href ?? '')}">scrivici</a>.</p>
</section>

{@render children?.()}

<p class="rimando"><a href="/articoli">Articoli</a></p>
