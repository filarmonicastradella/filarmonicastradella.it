<script lang="ts">
    import wallpaper from "$lib/assets/wallpaper.webp";
</script>

<header style="--hero-image: url({wallpaper})">
    <hgroup>
        <h1>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></h1>
        <p>Dal 1777 al {new Date().getFullYear()}</p>
        <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro</strong>.</p>
    </hgroup>
    <p><a href="/support/join">Unisciti a noi</a></p>
</header>

<style>
    /*
     * A tutta larghezza anche se "main" ha un limite: si "sfonda" fuori da quel contenitore con la
     * tecnica standard (width:100vw + margine negativo), invece di un div di layout solo per questo.
     * Colore del testo provvisorio (bianco caldo): i colori definitivi arriveranno con colors.css.
     *
     * Occupa tutto lo schermo (non più 100svh meno l'intestazione): l'intestazione ora galleggia
     * sopra di lei (position: fixed, trasparente), quindi la hero deve risalire sotto di lei con un
     * margine negativo pari alla sua altezza, altrimenti il padding-block-start aggiunto a "main"
     * (necessario perché l'intestazione non riserva più spazio nel flusso) la spingerebbe in basso.
     *
     * "view-timeline-name" dichiara questo elemento come riferimento temporale di scorrimento: la
     * topbar (SiteHeader.svelte) lo usa per sapere quando la hero è uscita dalla vista e diventare
     * opaca, senza JS.
     */
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
        min-height: 100svh;
        margin-block-start: calc(-1 * var(--header-height));
        padding-block: var(--space-4xl);
        padding-inline: var(--space-lg);
        margin-inline: calc(50% - 50vw);
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--hero-image);
        background-position: center;
        background-size: cover;
        color: #f5efe6;
        text-align: center;
        view-timeline-name: --hero;
        view-timeline-axis: block;
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

    /*
     * La data, in maiuscolo come le altre etichette del sito (time/dt/th in typography.css).
     * "margin-inline: auto" è necessario perché "main p" (typography.css) dà un max-width senza
     * centrare: sotto quella larghezza non cambia nulla, sopra lascerebbe il testo ancorato a
     * sinistra invece che al centro (il testo dentro è centrato, ma non la "scatola" del paragrafo).
     */
    hgroup p:first-of-type {
        margin-block-start: var(--space-sm);
        margin-inline: auto;
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        opacity: 0.8;
    }

    hgroup p:last-of-type {
        max-width: 32rem;
        margin-block-start: var(--space-xs);
        margin-inline: auto;
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-style: italic;
        /* Senza questa riga eredita l'interlinea 1,65 del corpo del testo, pensata per paragrafi lunghi:
           su una riga sola lascia troppo spazio sopra il testo */
        line-height: var(--line-height-heading);
    }

    /* Stesso motivo di "hgroup p:first-of-type" sopra: "main p" dà un max-width senza centrare */
    header > p {
        margin-block: var(--space-xl) 0;
        margin-inline: auto;
    }

    /* Bottone "fantasma": solo un filetto, coerente con "niente riquadri pieni" del resto del sito */
    header > p a {
        display: inline-block;
        padding: var(--space-sm) var(--space-xl);
        border: 1px solid currentColor;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
    }

    /*
     * Comparsa dal basso: animazione CSS pura, non una transizione Svelte — parte da sola quando
     * l'elemento compare nella pagina, funziona anche senza JS e il contenuto resta nell'HTML
     * prerenderato alla build (a differenza di un {#if mounted} pilotato da onMount).
     */
    @media (prefers-reduced-motion: no-preference) {
        hgroup {
            animation: comparsa 0.9s cubic-bezier(0.2, 0, 0, 1) both;
        }

        header > p {
            animation: comparsa 0.9s cubic-bezier(0.2, 0, 0, 1) 0.15s both;
        }
    }

    @keyframes comparsa {
        from {
            opacity: 0;
            transform: translateY(1.5rem);
        }
    }
</style>
