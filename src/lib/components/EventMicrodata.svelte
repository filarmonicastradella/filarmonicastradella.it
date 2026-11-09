<script lang="ts">
    import type { EventItem } from "$lib/events";
    import { organization } from "$lib/organization";

    /*
     * I microdati di un evento che non si vedono, uguali nella scheda (EventCard) e nella pagina dell'evento: lo stato, la modalità
     * (dal vivo), chi organizza e chi suona (con il nome, come chiede Google), un'immagine e l'ingresso. Dal 9/11/2026, dopo il
     * rapporto «Eventi» di Search Console, che li segnalava come mancanti nelle schede.
     */
    let { event }: { event: EventItem } = $props();

    const pageUrl = $derived(`${organization.url}/calendario/${event.id}`);
    // L'ingresso è libero, di norma: se la descrizione parla di biglietti o di prezzi l'offerta non si scrive, per non dire il falso
    const free = $derived(!/bigliett|€|euro\b|a pagamento|prevendita/i.test(event.description));
</script>

<link itemprop="eventStatus" href="https://schema.org/EventScheduled" />
<link itemprop="eventAttendanceMode" href="https://schema.org/OfflineEventAttendanceMode" />
<!-- Per ora l'immagine del sito: gli eventi non hanno una foto loro -->
<link itemprop="image" href="{organization.url}/anteprima.jpg" />
<span itemprop="organizer" itemscope itemtype="https://schema.org/Organization" itemid="{organization.url}/#ente">
    <meta itemprop="name" content={organization.name} />
    <link itemprop="url" href={organization.url} />
</span>
<!-- Chi suona: le formazioni dagli hashtag della descrizione; senza hashtag, la Filarmonica -->
{#each event.ensembles as { slug, title } (slug)}
    <span itemprop="performer" itemscope itemtype="https://schema.org/MusicGroup" itemid="{organization.url}/formazioni/{slug}#formazione">
        <meta itemprop="name" content={title} />
        <link itemprop="url" href="{organization.url}/formazioni/{slug}" />
    </span>
{:else}
    <span itemprop="performer" itemscope itemtype="https://schema.org/MusicGroup">
        <meta itemprop="name" content={organization.name} />
        <link itemprop="url" href={organization.url} />
    </span>
{/each}
{#if free}
    <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <meta itemprop="price" content="0" />
        <meta itemprop="priceCurrency" content="EUR" />
        <link itemprop="availability" href="https://schema.org/InStock" />
        <link itemprop="url" href={pageUrl} />
    </span>
{/if}
