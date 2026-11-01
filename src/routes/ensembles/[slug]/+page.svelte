<script lang="ts">
    import { onMount } from "svelte";
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { articleKey, articles } from "$lib/articles";
    import { hasNotEnded } from "$lib/events";
    import { organization } from "$lib/organization";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const ensemble = $derived(data.ensemble);
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
    itemid="{organization.url}/ensembles/{ensemble.slug}#formazione"
    style:--cover-placeholder={ensemble.coverImage && ensemble.cover && `url(${ensemble.coverImage.placeholder})`}
    style:--cover-position={ensemble.cover?.position}
>
    <h1 itemprop="name">{ensemble.title}</h1>
    <p itemprop="description">{ensemble.summary}</p>
    <link itemprop="url" href="{organization.url}/ensembles/{ensemble.slug}" />
    <link itemprop="parentOrganization" href="{organization.url}/#ente" />
    {#if ensemble.coverImage && ensemble.cover}
        <enhanced:img src={ensemble.coverImage.picture} alt={ensemble.cover.alt} sizes="100vw" fetchpriority="high" itemprop="image" />
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

<section>
    <h2>Suona con noi</h2>
    <p>
        Per suonare in {ensemble.title} si entra da soci: prima la <a href="/about/join">domanda di iscrizione</a> all'associazione, con la quota annuale di
        12 €, poi la richiesta di entrare nella formazione. Strumento, parti e sala prove li mette a disposizione l'associazione.
    </p>
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

<p class="rimando"><a href="/ensembles">Le nostre formazioni</a></p>
