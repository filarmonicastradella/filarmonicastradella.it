<script lang="ts">
    import { onMount } from "svelte";
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { eventDate, eventPlace, eventTime, eventWhen, hasNotEnded } from "$lib/events";
    import { faq } from "$lib/faq";
    import { titleSuffix } from "$lib/organization";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const event = $derived(data.event);

    const date = $derived(eventDate(event));
    const place = $derived(eventPlace(event));
    // Per i motori di ricerca: nome, data, ora e luogo, poi l'inizio della descrizione, entro 160 caratteri
    const metaDescription = $derived.by(() => {
        const when = [date, eventTime(event)].filter(Boolean).join(", ");
        const text = `${event.summary}: ${when}${place ? `, ${place}` : ""}.${event.description ? ` ${event.description.replace(/\s+/g, " ")}` : ""}`;
        return text.length > 160 ? `${text.slice(0, 159).replace(/\s+\S*$/, "")}…` : text;
    });
    // Il resto dell'indirizzo, dopo il nome del luogo
    const address = $derived(event.location.split(",").slice(1).join(",").trim());
    // Le domande servono a chi ci deve ancora andare: per gli eventi passati non si mostrano. La build genera solo
    // eventi in programma; nel browser si ricontrolla dopo il montaggio, così l'HTML del prerender resta valido.
    let now = $state<Date>();
    const upcoming = $derived(!now || hasNotEnded(event, now));
    onMount(() => {
        now = new Date();
    });
    // Titoli lunghi senza il nome della Filarmonica, così il titolo resta entro i 70 caratteri che i motori mostrano
    const pageTitle = $derived(event.summary.length + titleSuffix.length > 70 ? event.summary : event.summary + titleSuffix);
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={metaDescription} />
</svelte:head>

<!--
    Ogni informazione una volta sola (docs/DESIGN.md): la data in occhiello e il titolo nell'intestazione, ora e
    luogo per esteso in "Quando e dove". I microdati dell'evento collegano, con "itemref", la sezione sotto.
-->
<header itemscope itemtype="https://schema.org/Event" itemref="evento-dettagli">
    <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
    {#if event.end}
        <meta itemprop="endDate" content={event.end} />
    {/if}
    {#if event.description}
        <meta itemprop="description" content={event.description} />
    {/if}
    <h1 itemprop="name">{event.summary}</h1>
</header>

<!-- La descrizione del calendario, già pulita alla build (src/lib/server/calendar.ts): paragrafi, elenchi, link -->
{#if event.descriptionHtml}
    <section>
        <h2>L'evento</h2>
        {@html event.descriptionHtml}
    </section>
{/if}

<section id="evento-dettagli">
    <h2>Quando e dove</h2>
    <dl>
        <dt>Quando</dt>
        <dd>{eventWhen(event)}</dd>
        {#if event.location}
            <dt>Dove</dt>
            <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
                <span itemprop="name">{place}</span>
                {#if address}
                    <br />
                    <a
                        itemprop="address"
                        href="https://maps.google.com/?q={encodeURIComponent(event.location)}"
                        target="_blank"
                        rel="noopener noreferrer">{address}</a
                    >
                {/if}
            </dd>
        {/if}
    </dl>
    <p><a href="/events/{event.id}.ics" download>Aggiungi al tuo calendario</a></p>
</section>

{#if upcoming}
    <section>
        <h2>Domande frequenti</h2>
        <details>
            <summary>Si paga l'ingresso?</summary>
            <p>Di norma no: i nostri eventi sono a ingresso libero. Se per un evento è previsto un biglietto, lo trovi scritto qui sopra.</p>
        </details>
        <details>
            <summary>Devo prenotare?</summary>
            <p>
                Non è obbligatorio, ma ci aiuta sapere in quanti verrete, per organizzare la sala e per la sicurezza:
                <a href="/contacts#scrivici">scrivici</a> per segnalare la tua presenza.
            </p>
        </details>
        <details>
            <summary>E se piove?</summary>
            <p>Per i nostri concerti all'aperto prepariamo un posto al chiuso nelle vicinanze; se cambia qualcosa, lo trovi scritto qui sopra.</p>
        </details>
        <FaqItem item={faq.evento} />
    </section>
{/if}

<p class="rimando"><a href="/events">Tutti gli eventi</a></p>
