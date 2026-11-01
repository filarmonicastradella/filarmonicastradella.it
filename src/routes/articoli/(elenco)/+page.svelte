<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articleKey, articles } from "$lib/articles";
</script>

<svelte:head>
    <title>Articoli — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Identità, storia, didattica e notizie della Filarmonica Alessandro Stradella APS di Fivizzano, e gli articoli dei giornali che parlano di noi."
    />
</svelte:head>

<!-- In ordine di data, dal più recente: un elenco ordinato, una scheda sotto l'altra -->
<ol>
    {#each articles as article (articleKey(article))}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ol>
