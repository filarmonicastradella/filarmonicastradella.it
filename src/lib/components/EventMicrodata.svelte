<script lang="ts">
    import { ensembles, imageCrops } from "$lib/ensembles";
    import type { EventItem } from "$lib/events";
    import { organization } from "$lib/organization";

    /*
     * I microdati di un evento che non si vedono, uguali nella scheda (EventCard) e nella pagina dell'evento: lo stato, la modalità
     * (dal vivo), chi organizza e chi suona (con il nome, come chiede Google), un'immagine e l'ingresso, sempre libero. Dal 9/11/2026, dopo il
     * rapporto «Eventi» di Search Console, che li segnalava come mancanti nelle schede.
     */
    let { event }: { event: EventItem } = $props();

    const pageUrl = $derived(`${organization.url}/calendario/${event.id}`);
    // L'immagine: la copertina della prima formazione che suona, nell'ordine della pagina Le nostre formazioni; senza, quella del sito.
    // In 16:9, 4:3 e 1:1, le proporzioni che Google consiglia (dal 13/11/2026), più la foto intera
    const cover = $derived(ensembles.find(({ slug, coverImage }) => coverImage && event.ensembles.some((ensemble) => ensemble.slug === slug))?.coverImage);
    const images = $derived(
        (cover ? [cover.picture.img.src, ...cover.crops] : ["/anteprima.jpg", ...imageCrops("/static/anteprima.jpg")]).map((src) => organization.url + src)
    );
    // Lo stato, dal titolo (src/lib/server/calendar.ts)
    const status = $derived({ scheduled: "EventScheduled", cancelled: "EventCancelled", postponed: "EventPostponed" }[event.status]);
</script>

<link itemprop="eventStatus" href="https://schema.org/{status}" />
<link itemprop="eventAttendanceMode" href="https://schema.org/OfflineEventAttendanceMode" />
{#each images as src (src)}
    <link itemprop="image" href={src} />
{/each}
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
<!-- L'ingresso ai nostri eventi è sempre libero -->
<span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <meta itemprop="price" content="0" />
    <meta itemprop="priceCurrency" content="EUR" />
    <link itemprop="availability" href="https://schema.org/InStock" />
    <!-- Da quando si sa dell'ingresso: da quando l'evento è in calendario -->
    {#if event.created}
        <meta itemprop="validFrom" content={event.created} />
    {/if}
    <link itemprop="url" href={pageUrl} />
</span>
