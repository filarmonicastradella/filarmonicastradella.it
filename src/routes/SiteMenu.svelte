<script lang="ts">
    import ChevronDownIcon from "~icons/heroicons/chevron-down-solid";
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
            <li>
                {#if item.children}
                    <details name="menu-section">
                        <summary>
                            {item.title}
                            <ChevronDownIcon aria-hidden="true" />
                        </summary>
                        <ul>
                            <li><a href={item.href} aria-current={isActive(item.href)}>Panoramica</a></li>
                            {#each item.children as child (child.href)}
                                <li><a href={child.href} aria-current={isActive(child.href)}>{child.title}</a></li>
                            {/each}
                        </ul>
                    </details>
                {:else}
                    <a href={item.href} aria-current={isActive(item.href)}>{item.title}</a>
                {/if}
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a,
    summary {
        color: var(--text);
        text-decoration: none;
        cursor: pointer;
    }

    /* La pagina corrente, la sezione in cui ci si trova e il passaggio del mouse nel colore del marchio */
    a[aria-current],
    a:hover,
    summary:hover {
        color: var(--text-brand);
    }

    summary {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        list-style: none;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    /* ":global()": l'icona è un componente a sé, la classe di scoping non raggiunge il suo <svg> */
    summary :global(svg) {
        flex-shrink: 0;
        width: 1em;
        height: 1em;
        transition: transform var(--duration) var(--ease);
    }

    details[open] summary :global(svg) {
        transform: rotate(180deg);
    }

    /*
     * Sotto i 64rem: pannello a tutto schermo sotto la barra, aperto dal pulsante a due barre.
     * Voci grandi in Cormorant, pagine figlie in Jakarta sotto la voce.
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
        }

        nav[data-open] {
            display: block;
        }

        nav > ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        nav > ul > li > a,
        summary {
            font-family: var(--font-display);
            font-size: var(--fs-h1);
            font-weight: var(--fw-display);
            line-height: var(--lh-heading);
        }

        summary :global(svg) {
            width: 0.6em;
            height: 0.6em;
        }

        details ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-2);
            margin-block-start: var(--space-3);
        }

        details ul a {
            color: var(--text-muted);
            font-size: var(--fs-lead);
        }
    }

    /* Da 64rem: voci in linea nell'intestazione; le pagine figlie si aprono in un riquadro sotto la voce */
    @media (min-width: 64rem) {
        nav {
            margin-inline-start: auto;
        }

        nav > ul {
            display: flex;
            align-items: center;
            gap: var(--space-6);
        }

        nav > ul > li > a,
        summary {
            font-size: var(--fs-small);
            font-weight: var(--fw-text-medium);
        }

        details {
            position: relative;
        }

        details ul {
            position: absolute;
            top: calc(100% + var(--space-4));
            left: calc(-1 * var(--space-4));
            min-width: 14rem;
            padding: var(--space-3) var(--space-4);
            border: var(--border-width) solid var(--border);
            border-radius: var(--radius);
            background-color: var(--bg-raised);
        }

        details ul li + li {
            margin-block-start: var(--space-2);
        }

        details ul a {
            font-size: var(--fs-small);
        }
    }

    @media (max-width: 63.999rem) and (prefers-reduced-motion: no-preference) {
        nav[data-open] {
            animation: apertura var(--duration) var(--ease);
        }
    }

    @keyframes apertura {
        from {
            opacity: 0;
            transform: translateY(calc(-1 * var(--space-4)));
        }
    }
</style>
