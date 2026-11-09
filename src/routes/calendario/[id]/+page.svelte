<script lang="ts">
    import { onMount } from "svelte";
    import EventMicrodata from "$lib/components/EventMicrodata.svelte";
    import FaqItem from "$lib/components/FaqItem.svelte";
    import PostalAddress from "$lib/components/PostalAddress.svelte";
    import { isIos } from "$lib/device";
    import { eventAddress, eventDate, eventPlace, eventTime, eventWhen, googleCalendarHref, hasNotEnded } from "$lib/events";
    import { faq } from "$lib/faq";
    import { organization, titleSuffix, whatsappHref } from "$lib/organization";
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
    const address = $derived(eventAddress(event));
    // Le domande e «Aggiungi al tuo calendario» servono a chi ci deve ancora andare: per gli eventi passati non si mostrano.
    // La build sa quali erano già conclusi; nel browser si ricontrolla dopo il montaggio, per quelli finiti dopo la build.
    let now = $state<Date>();
    const upcoming = $derived(!data.past && (!now || hasNotEnded(event, now)));
    // Aggiungi al tuo calendario: Google Calendar già compilato (Android, computer, senza JS), il file .ics su iPhone e iPad
    const google = $derived(googleCalendarHref(event, `${organization.url}/calendario/${event.id}`));
    let ios = $state(false);

    /*
     * Condividi l'evento, come «Condividi l'articolo»: il menu di condivisione del dispositivo (WhatsApp, Messaggi, mail),
     * con titolo, data e luogo nel testo; altrove copia il link e per tre secondi dice «Link copiato». Solo con JS.
     */
    let canShare = $state(false);
    let copied = $state(false);

    onMount(() => {
        now = new Date();
        ios = isIos();
        canShare = "share" in navigator || "clipboard" in navigator;
    });

    async function share() {
        const url = `${organization.url}/calendario/${event.id}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: event.summary, text: [event.summary, date, place].filter(Boolean).join(" · "), url });
            } else {
                await navigator.clipboard.writeText(url);
                copied = true;
                setTimeout(() => (copied = false), 3000);
            }
        } catch {
            // Condivisione annullata: niente da fare
        }
    }
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
<header itemscope itemtype="https://schema.org/Event" itemid="{organization.url}/calendario/{event.id}#evento" itemref="evento-dettagli">
    <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
    <!-- Per i motori di ricerca: l'indirizzo della pagina e, come nella scheda, stato, organizzatore, chi suona, immagine, ingresso -->
    <link itemprop="url" href="{organization.url}/calendario/{event.id}" />
    <EventMicrodata {event} />
    {#if event.end}
        <meta itemprop="endDate" content={event.end} />
    {/if}
    {#if event.description}
        <meta itemprop="description" content={event.description} />
    {/if}
    <h1 itemprop="name">{event.summary}</h1>
    {#if canShare}
        <p><button type="button" onclick={share} aria-live="polite"><span hidden={copied}>Condividi l'evento</span><span hidden={!copied}>Link copiato</span></button></p>
    {/if}
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
        {#if event.ensembles.length > 0}
            <dt>{event.ensembles.length > 1 ? "Formazioni" : "Formazione"}</dt>
            {#each event.ensembles as { slug, title } (slug)}
                <dd><a href="/formazioni/{slug}">{title}</a></dd>
            {/each}
        {/if}
        <dt>Quando</dt>
        <dd>{eventWhen(event)}</dd>
        {#if event.location}
            <dt>Dove</dt>
            <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
                <span itemprop="name">{place}</span>
                {#if address}
                    <br />
                    <!-- Il microdato sul testo, non sul link: su un <a> il valore sarebbe l'indirizzo di Google Maps -->
                    <a href="https://maps.google.com/?q={encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer"
                        ><PostalAddress {address}>{address}</PostalAddress></a
                    >
                {:else}
                    <!-- Solo il nome del luogo: è anche il suo indirizzo, che per Google è obbligatorio -->
                    <PostalAddress address={event.location} />
                {/if}
            </dd>
        {/if}
    </dl>
    {#if upcoming}
        <p><a href={ios ? `/calendario/${event.id}.ics` : google} download={ios || undefined}>Aggiungi al tuo calendario</a></p>
        <p><a href={whatsappHref(`Ciao, vorrei informazioni su «${event.summary}» (${date}).`)}>Chiedi su WhatsApp</a></p>
    {/if}
</section>

{#if upcoming}
    <section>
        <h2>Domande frequenti</h2>
        <details>
            <summary>Si paga l'ingresso? Devo prenotare?</summary>
            <p>
                Di norma no: i nostri eventi sono a ingresso libero, e se per un evento è previsto un biglietto lo trovi scritto qui sopra. Prenotare
                non è obbligatorio, ma ci aiuta sapere in quanti verrete, per organizzare la sala e per la sicurezza:
                <a href="/contatti/scrivi?riguardo={encodeURIComponent(`Prenotazione per «${event.summary}», ${date}`)}">scrivici</a> per segnalare la tua presenza.
            </p>
        </details>
        <details>
            <summary>E se piove?</summary>
            <p>Per i nostri concerti all'aperto prepariamo un posto al chiuso nelle vicinanze; se cambia qualcosa, lo trovi scritto qui sopra.</p>
        </details>
        <FaqItem item={faq.evento} />
    </section>
{/if}

<!-- Il rimando alla pagina che elenca l'evento: il Calendario o, quando è passato, Eventi passati -->
{#if data.past}
    <p class="rimando"><a href="/calendario/archivio">Eventi passati</a></p>
{:else}
    <p class="rimando"><a href="/calendario">Calendario</a></p>
{/if}
