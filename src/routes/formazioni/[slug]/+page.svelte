<script lang="ts">
    import { onMount } from "svelte";
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import FaqItem from "$lib/components/FaqItem.svelte";
    import PostalAddress from "$lib/components/PostalAddress.svelte";
    import { faq } from "$lib/faq";
    import { articleKey, articles } from "$lib/articles";
    import { hasNotEnded } from "$lib/events";
    import { operationalSeats } from "$lib/locations";
    import { organization, whatsappHref } from "$lib/organization";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const ensemble = $derived(data.ensemble);
    // La sede dove prova (per i microdati): quella indicata nel Markdown, di base Fivizzano
    const seat = $derived(operationalSeats.find(({ id }) => id === (ensemble.seat ?? "sede-fivizzano"))!);
    // Gli articoli, nostri o dei giornali, che hanno la formazione tra i tag (l'hashtag senza il cancelletto)
    const related = $derived(articles.filter((article) => article.ensembles?.some((tag) => `#${tag}` === ensemble.hashtag)));

    // Con JS si nascondono gli eventi già conclusi dalla build, come nel calendario.
    let now = $state<Date>();
    const events = $derived(now ? data.events.filter((event) => hasNotEnded(event, now!)) : data.events);

    onMount(() => {
        now = new Date();
    });
</script>

<svelte:head>
    <title>{ensemble.title} — Filarmonica Alessandro Stradella</title>
    <meta name="description" content={ensemble.summary} />
</svelte:head>

<header
    itemscope
    itemtype="https://schema.org/MusicGroup"
    itemid="{organization.url}/formazioni/{ensemble.slug}#formazione"
    style:--cover-placeholder={ensemble.coverImage && ensemble.cover && `url(${ensemble.coverImage.placeholder})`}
    style:--cover-position={ensemble.cover?.position}
>
    <h1 itemprop="name">{ensemble.title}</h1>
    <p itemprop="description">{ensemble.summary}</p>
    <!-- L'azione della pagina: chi cerca una formazione spesso la vuole al suo evento. Il modulo ha già scelto la formazione. -->
    <p><a href="/contatti/scrivi?motivo=ingaggio&formazione={ensemble.slug}">Chiedi un ingaggio</a></p>
    <link itemprop="url" href="{organization.url}/formazioni/{ensemble.slug}" />
    <link itemprop="parentOrganization" href="{organization.url}/#ente" />
    <!-- Per i motori di ricerca: l'anno di nascita, i generi e la sede dove la formazione prova -->
    {#if ensemble.founded}
        <meta itemprop="foundingDate" content={String(ensemble.founded)} />
    {/if}
    {#each ensemble.genre ?? [] as genre (genre)}
        <meta itemprop="genre" content={genre} />
    {/each}
    <span itemprop="location" itemscope itemtype="https://schema.org/Place"
        ><meta itemprop="name" content={seat.name} /><PostalAddress address={seat.address.join(", ").replace(/ \((\w+)\)$/, " $1")} /></span
    >
    {#if ensemble.coverImage && ensemble.cover}
        <enhanced:img src={ensemble.coverImage.picture} alt={ensemble.cover.alt} sizes="100vw" fetchpriority="high" itemprop="image" />
    {:else}
        <link itemprop="image" href="{organization.url}/anteprima.jpg" />
    {/if}
</header>

<section>
    <h2>Presentazione</h2>
    <ensemble.component />
</section>

<section>
    <h2>Organico</h2>
    <dl>
        {#each ensemble.lineup as { name, instruments } (name)}
            <div>
                <dt>{name}</dt>
                {#each instruments as instrument (instrument)}
                    <dd>{instrument}</dd>
                {/each}
            </div>
        {/each}
    </dl>
</section>

<!-- SEGNAPOSTO, da riattivare quando ci sono i dati: il repertorio della formazione, qualche genere e qualche brano, perché si capisca
     subito come suona (idea da Luni Tunes, 1/11/2026). I dati andrebbero nell'intestazione del Markdown, come l'organico: `repertoire`.
<section>
    <h2>Repertorio</h2>
    <ul>
        {#each ensemble.repertoire as piece (piece)}
            <li>{piece}</li>
        {/each}
    </ul>
</section>
-->

<section>
    <h2>Suona con noi</h2>
    <p>
        Per suonare in {ensemble.title} si entra da soci: prima la <a href="/associazione/iscrizione">domanda di iscrizione</a> all'associazione, con la quota annuale di
        12 €, poi la richiesta di entrare nella formazione. Le parti e la sala prove le mette l'associazione, e alcuni strumenti si possono avere in
        prestito.
    </p>
    <p><a href={whatsappHref(`Ciao, vorrei suonare in ${ensemble.title}.`)}>Chiedi su WhatsApp</a></p>
</section>

{#if events.length > 0}
    <section>
        <h2>Prossimi appuntamenti</h2>
        <ol>
            {#each events as event (event.id)}
                <li><EventCard {event} /></li>
            {/each}
        </ol>
    </section>
{/if}

{#if related.length > 0}
    <section>
        <h2>Se ne parla</h2>
        <ol>
            {#each related as article (articleKey(article))}
                <li><ArticleCard {article} /></li>
            {/each}
        </ol>
    </section>
{/if}

<section>
    <h2>Domande frequenti</h2>
    <FaqItem item={faq.maestro} />
    <FaqItem item={faq.brani} />
    <FaqItem item={faq.nuovaFormazione} />
</section>

<p class="rimando"><a href="/formazioni">Le nostre formazioni</a></p>
