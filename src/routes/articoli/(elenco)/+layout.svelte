<script lang="ts">
    import type { Snippet } from "svelte";
    import { organization } from "$lib/organization";
    import CategoryNav from "./CategoryNav.svelte";

    // L'intestazione e le categorie restano ferme mentre si passa da una categoria all'altra: cambia solo l'elenco
    let { children }: { children: Snippet } = $props();

    /*
     * Il feed degli articoli (articoli.xml): il pulsante copia il link, da incollare nel lettore di notizie, e per tre
     * secondi dice «Link copiato», come «Condividi» negli articoli. Senza JS, o senza appunti, porta al file come d'uso;
     * Ctrl e clic centrale restano quelli del browser.
     */
    const feed = `${organization.url}/articoli.xml`;
    let copied = $state(false);

    async function copyFeed(event: MouseEvent) {
        if (!navigator.clipboard || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        try {
            await navigator.clipboard.writeText(feed);
            copied = true;
            setTimeout(() => (copied = false), 3000);
        } catch {
            location.href = feed;
        }
    }
</script>

<header>
    <h1>Articoli</h1>
    <p>La nostra identità, la storia, la didattica, le notizie e gli articoli dei giornali che parlano di noi.</p>
    <p><a href="/articoli.xml" type="application/atom+xml" onclick={copyFeed} aria-live="polite">{copied ? "Link copiato" : "Segui il feed"}</a></p>
</header>

<CategoryNav />

{@render children()}
