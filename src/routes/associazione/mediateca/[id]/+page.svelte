<script lang="ts">
    import { onMount } from "svelte";
    import ChevronLeftIcon from "~icons/heroicons/chevron-left-20-solid";
    import ChevronRightIcon from "~icons/heroicons/chevron-right-20-solid";
    import { goto } from "$app/navigation";
    import { formatArticleDate } from "$lib/articles";
    import { slidePath } from "$lib/gallery";
    import { organization, titleSuffix } from "$lib/organization";
    import { share } from "$lib/share";
    import type { PageProps } from "./$types";

    /*
     * La pagina di una foto o di un video di Foto e video (dal 12/11/2026): ogni casella della griglia porta qui, al posto della
     * finestra che c'era prima, ed è l'indirizzo che si condivide. La data del post come titolo (come in Foto e video: una
     * didascalia di Instagram non è un titolo), la didascalia come presentazione, poi la foto intera o il video con il player del
     * browser, e sotto «Precedente» e «Successiva» per le altre foto dello stesso post (anche con i tasti freccia; spenti alla
     * prima e all'ultima); «Condividi la foto» o «Condividi il video» nell'intestazione. In fondo il rimando al post in Foto e video.
     * L'anteprima dei link (hooks.server.ts) è la foto stessa, o il fotogramma del video.
     */
    let { data }: PageProps = $props();
    const post = $derived(data.post);
    const slide = $derived(post.slides[data.index]);
    const video = $derived(slide.mediaType === "VIDEO");
    const date = $derived(formatArticleDate(post.date));
    const previous = $derived(post.slides[data.index - 1]);
    const next = $derived(post.slides[data.index + 1]);
    const url = $derived(organization.url + slidePath(slide));

    /*
     * «Condividi la foto»: sul telefono il menu del dispositivo con la foto stessa, convertita in JPEG (il WebP del sito non tutte le
     * app lo accettano come foto), preparata appena la pagina è pronta perché il menu si apre solo subito dopo il tocco; per i video,
     * troppo pesanti, il link. Sul computer, o se il dispositivo rifiuta, il link copiato (`$lib/share`).
     */
    let canShare = $state(false);
    let copied = $state(false);
    let photo: { id: string; file: Promise<File | null> } | undefined;

    async function jpeg(src: string) {
        const image = new Image();
        image.src = src;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d")!.drawImage(image, 0, 0);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
        return blob && new File([blob], "filarmonica-stradella.jpg", { type: "image/jpeg" });
    }

    const preparePhoto = () =>
        (photo = { id: slide.id, file: !video && slide.imageUrl ? jpeg(slide.imageUrl).catch(() => null) : Promise.resolve(null) });

    onMount(() => {
        canShare = "share" in navigator || "clipboard" in navigator;
        preparePhoto();
    });

    async function shareSlide() {
        // Passando a un'altra foto del post la pagina resta montata: la foto si prepara di nuovo
        if (photo?.id !== slide.id) preparePhoto();
        const file = await photo!.file;
        let result = await share(file ? { files: [file], title: `Foto del ${date}` } : { title: `${video ? "Video" : "Foto"} del ${date}`, url });
        // Se il dispositivo rifiuta la foto, il link
        if (result === "failed" && file) result = await share({ title: `Foto del ${date}`, url });
        if (result === "copied") {
            copied = true;
            setTimeout(() => (copied = false), 3000);
        }
    }

    // I tasti freccia per le altre foto del post, tranne quando il fuoco è sul video, dove servono a spostarsi nel video
    function keydown(event: KeyboardEvent) {
        if (event.target instanceof HTMLVideoElement || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" && previous) goto(slidePath(previous), { noScroll: true });
        if (event.key === "ArrowRight" && next) goto(slidePath(next), { noScroll: true });
    }
</script>

<svelte:window onkeydown={keydown} />

<svelte:head>
    <title>{video ? "Video" : "Foto"} del {date}{titleSuffix}</title>
    <meta name="description" content={slide.alt} />
</svelte:head>

<header itemscope itemtype="https://schema.org/SocialMediaPosting">
    <h1><time itemprop="datePublished" datetime={post.date}>{date}</time></h1>
    {#each post.paragraphs as paragraph, i (i)}
        <p itemprop="description">{paragraph}</p>
    {/each}
    <link itemprop="url" href={url} />
    <link itemprop="author" href="{organization.url}/#ente" />
    <link itemprop="publisher" href="{organization.url}/#ente" />
    <!-- La foto per l'anteprima dei link (hooks.server.ts): il JPEG apposta, che tutte le app mostrano -->
    {#if slide.previewUrl ?? slide.imageUrl}
        <link itemprop="image" href={organization.url + (slide.previewUrl ?? slide.imageUrl)} />
    {/if}
    {#if canShare}
        <p>
            <button type="button" onclick={shareSlide} aria-live="polite"
                ><span hidden={copied}>Condividi {video ? "il video" : "la foto"}</span><span hidden={!copied}>Link copiato</span></button
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

<!-- Le altre foto dello stesso post, subito sotto la foto: alla prima e all'ultima il link resta senza indirizzo, spento, perché
     i pulsanti stiano sempre al loro posto -->
{#if post.slides.length > 1}
    <nav aria-label="Le altre foto del post">
        <ul>
            <li>
                <a href={previous ? slidePath(previous) : undefined} rel="prev" data-sveltekit-noscroll
                    ><ChevronLeftIcon aria-hidden="true" /> Precedente</a
                >
            </li>
            <li>
                <a href={next ? slidePath(next) : undefined} rel="next" data-sveltekit-noscroll>Successiva <ChevronRightIcon aria-hidden="true" /></a>
            </li>
        </ul>
    </nav>
{/if}

<p class="rimando"><a href="/associazione/mediateca#{post.anchor}">Foto e video</a></p>

<style>
    /* La foto intera, o il video, senza ritagli: al massimo alta quanto la finestra, meno l'intestazione del sito e i comandi */
    figure :is(img, video) {
        display: block;
        inline-size: 100%;
        block-size: auto;
        max-block-size: calc(100dvh - var(--header-height) - 2 * var(--space-8));
        object-fit: contain;
    }

    /* «Precedente» e «Successiva» attaccati alla foto, non staccati come un blocco a sé (layout.css); il rimando viene dopo, staccato */
    figure + nav {
        margin-block-start: var(--space-4);
    }

    figure + nav ul {
        gap: var(--space-2);
    }

    /* Sono pulsanti (forms.css), non le voci in maiuscoletto degli indici in cima alle pagine (content.css) */
    figure + nav a {
        letter-spacing: normal;
        text-transform: none;
    }

    /* Una foto sola, senza le altre: il rimando si stacca dalla foto come da un blocco */
    figure + p {
        margin-block-start: var(--space-9);
    }

    figure + nav a > :global(svg) {
        inline-size: 1.25rem;
        block-size: 1.25rem;
    }
</style>
