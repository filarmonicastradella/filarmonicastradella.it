<script lang="ts">
    import { onMount } from "svelte";

    let { title, src, href }: { title: string; src: string; href: string } = $props();

    // La mappa di Google si carica solo su richiesta; senza JS resta il link a Google Maps.
    let enhanced = $state(false);
    let loaded = $state(false);

    onMount(() => {
        enhanced = true;
    });
</script>

<figure>
    {#if loaded}
        <iframe {title} {src} width="100%" height="280" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    {:else}
        <p>
            La mappa è fornita da Google Maps: caricandola, Google riceve il tuo indirizzo IP e può impostare cookie. Vedi l'<a href="/legal/privacy">informativa sulla privacy</a>.
        </p>
        {#if enhanced}
            <button type="button" onclick={() => (loaded = true)}>Mostra la mappa</button>
        {/if}
    {/if}

    <figcaption>
        <a {href} target="_blank" rel="noopener noreferrer">Apri la mappa su Google Maps</a>
    </figcaption>
</figure>
