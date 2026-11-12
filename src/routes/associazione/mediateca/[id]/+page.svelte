<script lang="ts">
    import { onMount } from "svelte";
    import { formatArticleDate } from "$lib/articles";
    import { slidePath } from "$lib/gallery";
    import { organization, titleSuffix } from "$lib/organization";
    import { share } from "$lib/share";
    import type { PageProps } from "./$types";

    /*
     * La pagina di una foto o di un video di Foto e video (dal 12/11/2026): l'indirizzo che si condivide, anche dalla finestra
     * della griglia, che lo mette nella barra degli indirizzi. La data in occhiello, che cosa è nel titolo, la didascalia del
     * post come presentazione, poi la foto intera o il video con il player del browser, le altre foto dello stesso post e il
     * rimando al post in Foto e video. L'anteprima dei link (hooks.server.ts) è la foto stessa, o il fotogramma del video.
     */
    let { data }: PageProps = $props();
    const post = $derived(data.post);
    const slide = $derived(post.slides[data.index]);
    const video = $derived(slide.mediaType === "VIDEO");
    const heading = $derived(`${video ? "Video" : "Foto"}${post.slides.length > 1 ? ` ${data.index + 1} di ${post.slides.length}` : ""}`);
    const date = $derived(formatArticleDate(post.date));
    const previous = $derived(post.slides[data.index - 1]);
    const next = $derived(post.slides[data.index + 1]);

    // «Condividi», come negli articoli e negli eventi: il menu del dispositivo, o il link copiato
    let canShare = $state(false);
    let copied = $state(false);
    onMount(() => {
        canShare = "share" in navigator || "clipboard" in navigator;
    });

    async function sharePage() {
        if ((await share({ title: `${heading} del ${date}`, url: organization.url + slidePath(slide) })) === "copied") {
            copied = true;
            setTimeout(() => (copied = false), 3000);
        }
    }
</script>

<svelte:head>
    <title>{heading} del {date}{titleSuffix}</title>
    <meta name="description" content={slide.alt} />
</svelte:head>

<header itemscope itemtype="https://schema.org/SocialMediaPosting">
    <p><time itemprop="datePublished" datetime={post.date}>{date}</time></p>
    <h1>{heading}</h1>
    {#each post.paragraphs as paragraph, i (i)}
        <p itemprop="description">{paragraph}</p>
    {/each}
    <link itemprop="url" href={organization.url + slidePath(slide)} />
    <link itemprop="author" href="{organization.url}/#ente" />
    <link itemprop="publisher" href="{organization.url}/#ente" />
    <!-- La foto per l'anteprima dei link (hooks.server.ts): il JPEG apposta, che tutte le app mostrano -->
    {#if slide.previewUrl ?? slide.imageUrl}
        <link itemprop="image" href={organization.url + (slide.previewUrl ?? slide.imageUrl)} />
    {/if}
    {#if canShare}
        <p>
            <button type="button" onclick={sharePage} aria-live="polite"
                ><span hidden={copied}>Condividi</span><span hidden={!copied}>Link copiato</span></button
            >
        </p>
    {/if}
</header>

<figure>
    {#if video}
        <!-- svelte-ignore a11y_media_has_caption -->
        <video src={slide.mediaUrl} poster={slide.thumbnailUrl} width={slide.width} height={slide.height} controls playsinline></video>
    {:else}
        <img src={slide.imageUrl} srcset={slide.srcset} sizes="(min-width: 64rem) 64rem, 100vw" width={slide.width} height={slide.height} alt={slide.alt} />
    {/if}
</figure>

{#if previous || next}
    <nav aria-label="Le altre foto del post">
        <ul>
            {#if previous}
                <li><a href={slidePath(previous)}>Precedente</a></li>
            {/if}
            {#if next}
                <li><a href={slidePath(next)}>Successiva</a></li>
            {/if}
        </ul>
    </nav>
{/if}

<p class="rimando"><a href="/associazione/mediateca#{post.anchor}">Foto e video</a></p>

<style>
    /* La foto intera, o il video, senza ritagli: al massimo alta quanto la finestra, meno l'intestazione del sito */
    figure :is(img, video) {
        display: block;
        inline-size: 100%;
        block-size: auto;
        max-block-size: calc(100dvh - var(--header-height) - 2 * var(--space-4));
        object-fit: contain;
    }
</style>
