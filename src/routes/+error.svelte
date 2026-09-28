<script>
    import { page } from "$app/state";

    const notFound = $derived(page.status === 404);
</script>

<svelte:head>
    <title>{page.status} — Filarmonica Alessandro Stradella APS</title>
</svelte:head>

<main id="contenuto">
    <header>
        <h1>{notFound ? "Spartito non trovato" : "Silenzio improvviso"}</h1>
        <p>
            {notFound
                ? "La pagina che stai cercando sembra non esistere o è stata spostata in un altro pentagramma."
                : "Si è verificato un imprevisto tecnico durante l'esecuzione. Riprova più tardi."}
        </p>
    </header>

    {#if !notFound && page.error?.message}
        <p><code>{page.error.message}</code></p>
    {/if}

    <p><a href="/">Torna alla pagina principale</a></p>
</main>
