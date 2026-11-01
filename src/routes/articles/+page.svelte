<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articleKey, articles } from "$lib/articles";
    import CategoryNav from "./CategoryNav.svelte";
</script>

<svelte:head>
    <title>Articoli — Filarmonica Alessandro Stradella</title>
    <meta
        name="description"
        content="Storia, didattica, teoria musicale, vita e notizie della Filarmonica Alessandro Stradella APS di Fivizzano, e gli articoli dei giornali che parlano di noi."
    />
</svelte:head>

<header>
    <h1>Articoli</h1>
    <p>Storia, didattica, teoria musicale, vita della Filarmonica, notizie e gli articoli dei giornali che parlano di noi.</p>
</header>

<CategoryNav />

<!-- In ordine di data, dal più recente: un elenco ordinato, una scheda sotto l'altra -->
<ol>
    {#each articles as article (articleKey(article))}
        <li><ArticleCard {article} level={2} /></li>
    {/each}
</ol>
