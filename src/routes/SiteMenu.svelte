<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import { navItems } from "$lib/navigation";

    let { open = false, onClose }: { open?: boolean; onClose?: () => void } = $props();

    const isActive = (href: string) => (page.url.pathname === href ? "page" : page.url.pathname.startsWith(href + "/") ? "true" : undefined);

    // Il menu si chiude dopo una navigazione (senza JS la pagina si ricarica e si chiude da sola).
    afterNavigate(() => onClose?.());

    // A menu aperto il contenuto dietro non deve scorrere.
    $effect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    });
</script>

<nav aria-label="Navigazione principale" data-open={open || undefined}>
    <ul>
        {#each navItems as item (item.href)}
            <li><a href={item.href} aria-current={isActive(item.href)}>{item.title}</a></li>
        {/each}
    </ul>
</nav>

<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a {
        color: var(--text);
        text-decoration: none;
    }

    /* La pagina corrente, la sezione in cui ci si trova e il passaggio del mouse nel colore del marchio */
    a[aria-current],
    a:hover {
        color: var(--text-brand);
    }

    /*
     * Sotto i 64rem: pannello a tutto schermo sotto la barra, aperto dal pulsante a due barre.
     * Voci grandi in Cormorant. Apertura e chiusura simmetriche: il pannello sfuma e scende (o risale)
     * di poco; "allow-discrete" ritarda il passaggio a "display: none" fino alla fine della chiusura,
     * "@starting-style" dà il punto di partenza all'apertura.
     */
    @media (max-width: 63.999rem) {
        nav {
            display: none;
            position: fixed;
            inset: var(--header-height) 0 0;
            padding-block: var(--space-7);
            padding-inline: var(--page-inline);
            overflow-y: auto;
            background-color: var(--bg);
            opacity: 0;
            translate: 0 calc(-1 * var(--shift));
            transition:
                opacity var(--duration-slow) var(--ease),
                translate var(--duration-slow) var(--ease),
                display var(--duration-slow) allow-discrete;
        }

        nav[data-open] {
            display: block;
            opacity: 1;
            translate: 0;
        }

        @starting-style {
            nav[data-open] {
                opacity: 0;
                translate: 0 calc(-1 * var(--shift));
            }
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        nav a {
            font-family: var(--font-display);
            font-size: var(--fs-h1);
            font-weight: var(--fw-display);
            line-height: var(--lh-heading);
        }
    }

    /* Da 64rem: voci in linea nell'intestazione */
    @media (min-width: 64rem) {
        nav {
            margin-inline-start: auto;
        }

        ul {
            display: flex;
            align-items: center;
            gap: var(--space-6);
        }

        nav a {
            font-size: var(--fs-small);
            font-weight: var(--fw-text-medium);
        }
    }

    /* Spostamento dell'apertura; con il movimento ridotto resta solo la dissolvenza */
    nav {
        --shift: var(--space-4);
    }

    @media (prefers-reduced-motion: reduce) {
        nav {
            --shift: 0;
        }
    }
</style>
