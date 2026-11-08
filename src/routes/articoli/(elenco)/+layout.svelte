<script lang="ts">
    import type { Snippet } from "svelte";
    import { organization } from "$lib/organization";
    import CategoryNav from "./CategoryNav.svelte";

    // L'intestazione e le categorie restano ferme mentre si passa da una categoria all'altra: cambia solo l'elenco
    let { children }: { children: Snippet } = $props();

    /*
     * Il feed degli articoli (articoli.xml): il pulsante copia il link, da incollare nel lettore di notizie, e per tre
     * secondi dice «Link copiato», come «Condividi l'articolo» negli articoli. Senza JS, o senza appunti, porta al file come d'uso;
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
    <p><a href="/articoli.xml" type="application/atom+xml" onclick={copyFeed} aria-live="polite"><span hidden={copied}>Segui il feed</span><span hidden={!copied}>Link copiato</span></a></p>
</header>

<CategoryNav />

{@render children()}

<!-- In fondo all'archivio, sotto l'elenco di ogni categoria: per chi scrive di noi, i materiali per la stampa (come in Contatti) -->
<section>
    <h2>Per la stampa</h2>
    <p>Presentazione, dati, simbolo e contatti per chi scrive di noi: <a href="/contatti/stampa">materiali per la stampa</a>.</p>
</section>
