<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const ensemble = $derived(data.ensemble);
</script>

<svelte:head>
    <title>{ensemble.title} — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content={ensemble.summary} />
</svelte:head>

<header
    itemscope
    itemtype="https://schema.org/MusicGroup"
    style:--cover-placeholder={ensemble.coverImage && `url(${ensemble.coverImage.placeholder})`}
    style:--cover-position={ensemble.cover?.position}
>
    <h1 itemprop="name">{ensemble.title}</h1>
    <p itemprop="description">{ensemble.summary}</p>
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
            <dt>{name}</dt>
            {#each instruments as instrument (instrument)}
                <dd>{instrument}</dd>
            {/each}
        {/each}
    </dl>
</section>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Come posso suonare in questa formazione?</summary>
        <p>Iscriviti alla Filarmonica con la <a href="/support/join">domanda di iscrizione</a>.</p>
    </details>
    <details>
        <summary>Potete suonare al mio evento?</summary>
        <p>
            Sì: se vuoi {ensemble.title} alla tua cerimonia, festa o matrimonio <a href="/booking">raccontaci l'occasione</a> e ti rispondiamo
            con la disponibilità e una proposta.
        </p>
    </details>
</section>

<p class="rimando"><a href="/about/ensembles">Tutte le formazioni</a></p>
