<script lang="ts">
    import Mediateca from "../Mediateca.svelte";
    import { formatArticleDate } from "$lib/articles";
    import { titleSuffix } from "$lib/organization";
    import type { PageProps } from "./$types";

    /*
     * L'indirizzo di una foto o di un video di Foto e video (dal 12/11/2026), quello che si condivide: la pagina Foto e video con
     * l'anteprima già aperta su quella foto o quel video (con JS; senza, la pagina). Il titolo e la descrizione sono della foto, e
     * l'anteprima del link è la foto stessa.
     */
    let { data }: PageProps = $props();
    const slide = $derived(data.post.slides[data.index]);
</script>

<svelte:head>
    <title>Foto e video del {formatArticleDate(data.post.date)}{titleSuffix}</title>
    <meta name="description" content={slide.alt} />
</svelte:head>

<Mediateca photo={slide} />
