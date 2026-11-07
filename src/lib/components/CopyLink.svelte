<script lang="ts">
    /*
     * L'indirizzo di un feed (calendario, articoli), da copiare nel programma che lo legge: aprirlo scaricherebbe il
     * file, senza iscrizione. Con JS il link copia sé stesso e la parentesi dice «copiato» per tre secondi; Ctrl e
     * clic centrale restano quelli del browser, e senza JS è un link normale.
     */
    let { href }: { href: string } = $props();

    let copied = $state(false);

    async function copy(event: MouseEvent) {
        if (!("clipboard" in navigator) || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        try {
            await navigator.clipboard.writeText(href);
            copied = true;
            setTimeout(() => (copied = false), 3000);
        } catch {
            copied = false;
        }
    }
</script>

(<span aria-live="polite">{copied ? "copiato" : "un clic lo copia"}</span>): <a {href} onclick={copy}>{href}</a>
