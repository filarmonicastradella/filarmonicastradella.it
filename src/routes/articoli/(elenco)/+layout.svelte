<script lang="ts">
    import type { Snippet } from "svelte";
    import CopyLink from "$lib/components/CopyLink.svelte";
    import { organization } from "$lib/organization";
    import CategoryNav from "./CategoryNav.svelte";

    // L'intestazione e le categorie restano ferme mentre si passa da una categoria all'altra: cambia solo l'elenco
    let { children }: { children: Snippet } = $props();
</script>

<header>
    <h1>Articoli</h1>
    <p>La nostra identità, la storia, la didattica, le notizie e gli articoli dei giornali che parlano di noi.</p>
</header>

<CategoryNav />

{@render children()}

<section>
    <h2>Segui gli articoli</h2>
    <p>
        Con un lettore di notizie ricevi i nuovi articoli appena escono, anche quelli dei giornali che parlano di noi: iscriviti a questo indirizzo
        <CopyLink href="{organization.url}/articoli.xml" />
    </p>
</section>
