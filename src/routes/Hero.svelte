<header>
    <hgroup>
        <h1>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></h1>
        <p>Dal <strong>1777</strong> al <strong>{new Date().getFullYear()}</strong>: custodi della <strong>tradizione</strong>, interpreti del <strong>futuro</strong>.</p>
    </hgroup>
    <p><a href="/support/join">Unisciti a noi</a></p>
</header>

<style>
    /* Solo spazio, allineamento e tipografia: niente colori, bordi o sfondi finché non arrivano gli altri file */
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100svh - var(--header-height));
        padding-block: var(--space-4xl);
        text-align: center;
    }

    /*
     * La larghezza massima è in "ch" sull'h1 stesso, non su hgroup: così segue la sua dimensione
     * del font (che cresce con lo schermo via clamp) invece di restare fissa mentre il testo si
     * ingrandisce, cosa che a schermi larghi spezzava le righe più del necessario.
     */
    h1 {
        max-width: 20ch;
        margin-inline: auto;
        font-size: clamp(2.5rem, 4vw + 1.5rem, var(--font-size-5xl));
        line-height: var(--line-height-display);
    }

    hgroup p {
        max-width: 32rem;
        margin-block-start: var(--space-sm);
        margin-inline: auto;
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-style: italic;
    }

    header > p {
        margin-block: var(--space-xl) 0;
        margin-inline: auto;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
    }
</style>
