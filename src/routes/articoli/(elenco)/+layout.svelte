<script lang="ts">
    import type { Snippet } from "svelte";
    import CategoryNav from "./CategoryNav.svelte";

    // L'intestazione e le categorie restano ferme mentre si passa da una categoria all'altra: cambia solo l'elenco
    let { children }: { children: Snippet } = $props();
</script>

<header>
    <h1>Articoli</h1>
    <p>Storia, didattica, teoria musicale, i nostri obiettivi, le notizie e gli articoli dei giornali che parlano di noi.</p>
</header>

<CategoryNav />

{@render children()}
