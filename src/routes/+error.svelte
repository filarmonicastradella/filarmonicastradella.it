<script>
    import { page } from "$app/state";
</script>

<main id="contenuto" class="error-container">
    <div class="error-content">
        {#if page.status === 404}
            <span class="error-code">404</span>
            <h1>Spartito non trovato</h1>
            <p>La pagina che stai cercando sembra non esistere o è stata spostata in un altro pentagramma.</p>
        {:else}
            <span class="error-code">{page.status}</span>
            <h1>Silenzio improvviso</h1>
            <p>Si è verificato un imprevisto tecnico durante l'esecuzione. Riprova più tardi.</p>
            {#if page.error?.message}
                <p class="error-details"><code>{page.error.message}</code></p>
            {/if}
        {/if}

        <a href="/" class="home-button">Torna alla pagina principale</a>
    </div>
</main>

<!--
<style>
    .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - var(--navbar-height));
        padding: var(--space-xl);
        background-color: var(--bg-surface);
        color: var(--text-main);
        text-align: center;
    }

    .error-content {
        max-width: var(--content-max-width-text);
    }

    .error-code {
        font-family: var(--font-heading);
        font-size: var(--font-size-6xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-display);
        color: var(--border-color-strong);
        margin-bottom: var(--space-md);
        display: block;
    }

    h1 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-md);
        color: var(--text-main);
    }

    p {
        font-family: var(--font-body);
        font-size: var(--font-size-lg);
        line-height: var(--line-height-body);
        color: var(--text-muted);
        margin-bottom: var(--space-xl);
    }

    .error-details {
        font-size: var(--font-size-sm);
        background: var(--bg-subtle);
        border: 1px solid var(--border-color-medium);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-sm);
        margin-top: calc(var(--space-md) * -1);
        margin-bottom: var(--space-xl);
        color: var(--color-error);
    }

    .home-button {
        display: inline-block;
        font-family: var(--font-body);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-medium);
        text-decoration: none;
        color: var(--text-on-primary);
        background-color: var(--color-primary);
        padding: var(--space-sm) var(--space-xl);
        border-radius: var(--radius-sm);
        transition: background-color var(--transition-fast);
    }

    .home-button:hover {
        background-color: var(--color-primary-hover);
        color: var(--text-on-primary);
    }
</style>
-->