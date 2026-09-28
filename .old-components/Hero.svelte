<script>
    import bgImage from "$lib/assets/wallpaper.jpg";
    import { fade } from "svelte/transition";

    let mounted = $state(false);

    $effect(() => {
        mounted = true;
    });
</script>

<!-- style="background-image: url({bgImage});" -->
<section aria-labelledby="hero-heading">
    {#if mounted}
        <hgroup in:fade={{ duration: 400 }}>
            <h1 id="hero-heading">Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></h1>
            <p>Dal <strong>1777</strong> al <strong>{new Date().getFullYear()}</strong></p>
            <p>Custodi della <strong>tradizione</strong>, interpreti del <strong>futuro.</strong></p>
        </hgroup>

        <a in:fade={{ duration: 400 }} href="/support/join">Unisciti a Noi</a>
    {/if}
</section>

<!--
<style>
    section {
        position: relative;
        min-height: calc(100vh - var(--navbar-height));
        min-height: calc(100svh - var(--navbar-height));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: var(--space-xl) var(--space-lg);
        color: var(--hero-color, #ffffff);
        background-color: var(--bg-surface);
        background-size: cover;
        background-position: center;
    }

    section::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--hero-overlay, linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.82)));
        z-index: 1;
    }

    section > * {
        position: relative;
        z-index: 2;
    }

    hgroup {
        max-width: var(--content-max-width-page, 1400px);
        margin-bottom: var(--space-xl);
    }

    h1 {
        font-size: clamp(2.25rem, 5vw + 1.25rem, var(--font-size-6xl));
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--space-md);
        color: var(--hero-title-color, #ffffff);
    }

    h1 abbr {
        font-style: italic;
        font-size: 0.8em;
        letter-spacing: var(--letter-spacing-wide);
        text-decoration: none;
        opacity: 0.9;
    }

    hgroup p:first-of-type {
        font-family: var(--font-heading);
        font-size: var(--font-size-sm);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        margin: 0 0 var(--space-xs) 0;
        opacity: 0.8;
    }

    hgroup p:first-of-type strong {
        font-weight: var(--font-weight-bold);
        letter-spacing: var(--letter-spacing-wide);
        opacity: 1;
    }

    hgroup p:last-of-type {
        font-size: var(--font-size-md);
        margin: 0;
        opacity: 0.95;
    }

    hgroup p:last-of-type strong {
        font-weight: var(--font-weight-semibold);
        color: var(--hero-strong-color, #ffffff);
        opacity: 1;
    }

    a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: #ffffff;
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        padding: var(--space-md) var(--space-xl);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-sm);
        transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
        backdrop-filter: blur(4px);
    }

    a:hover {
        background-color: #ffffff;
        color: var(--text-main);
        border-color: #ffffff;
    }

    @media (min-width: 768px) {
        section {
            padding: var(--space-xl);
        }

        hgroup {
            margin-bottom: var(--space-3xl);
        }

        h1 {
            margin: 0 0 var(--space-lg);
        }

        hgroup p:last-of-type {
            font-size: var(--font-size-lg);
        }

        a {
            padding: var(--space-md) var(--space-2xl);
        }
    }

    @media (max-height: 500px) {
        section {
            padding: var(--space-md) var(--space-lg);
        }

        hgroup {
            margin-bottom: var(--space-md);
        }

        h1 {
            font-size: var(--font-size-3xl);
            margin: 0 0 var(--space-sm);
        }

        hgroup p:last-of-type {
            font-size: var(--font-size-md);
        }
    }
</style>
-->