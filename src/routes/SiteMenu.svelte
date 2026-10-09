<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import { navItems } from "$lib/navigation";

    let { open = false, onClose }: { open?: boolean; onClose?: () => void } = $props();

    const isActive = (href: string) => (page.url.pathname === href ? "page" : page.url.pathname.startsWith(href + "/") ? "true" : undefined);

    // Il menu si chiude dopo una navigazione (senza JS la pagina si ricarica e si chiude da sola).
    afterNavigate(() => onClose?.());
</script>

<!-- "--i": posizione nella sequenza con cui le voci compaiono all'apertura -->
<nav aria-label="Navigazione principale" data-open={open || undefined}>
    <ul>
        {#each navItems as item, i (item.href)}
            <li style:--i={i}><a href={item.href} aria-current={isActive(item.href)}>{item.title}</a></li>
        {/each}
    </ul>
    <!-- L'azione principale del sito: in linea da 64rem, in fondo al pannello sotto -->
    <p style:--i={navItems.length}><a href="/support/join">Unisciti a noi</a></p>
</nav>

<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li + li {
        margin: 0;
    }

    ul a {
        color: var(--text);
        font-weight: var(--fw-text-medium);
        text-decoration: none;
    }

    /* La pagina corrente, la sezione in cui ci si trova e il passaggio del mouse nel colore del marchio */
    ul a[aria-current],
    ul a:hover {
        color: var(--text-brand);
    }

    p {
        margin: 0;
    }

    /* Pulsante primario del design system */
    p a {
        display: inline-block;
        padding: var(--space-2) var(--space-5);
        border: var(--border-width) solid var(--accent);
        border-radius: var(--radius);
        background-color: var(--accent);
        color: var(--on-accent);
        font-size: var(--fs-button);
        font-weight: var(--fw-text-strong);
        text-decoration: none;
        transition: background-color var(--duration) var(--ease);
    }

    p a:hover {
        border-color: var(--accent-hover);
        background-color: var(--accent-hover);
    }

    /*
     * Sotto i 64rem: pannello a tutto schermo, con le voci in colonna, il pulsante in fondo e le corde
     * (layout.css) sul margine destro. Il pannello copre anche l'intestazione, di cui restano sopra solo
     * logo e pulsante del menu (SiteHeader.svelte): intestazione e pannello sono una sola superficie, senza
     * il filetto di separazione, e le corde partono dal fondo del pulsante del menu, collegate a lui.
     * Apertura: il pannello sfuma e le voci salgono appena, una dopo l'altra, mentre il pulsante si gira;
     * finito il giro, le corde scendono da lì. Chiusura, al contrario: prima le corde risalgono nel
     * pulsante, poi il pulsante torna orizzontale mentre il pannello sfuma. Le transizioni hanno il
     * ritardo nello stato di arrivo: quello aperto per l'apertura, quello chiuso per la chiusura.
     * "allow-discrete" rimanda "display: none" alla fine della chiusura, "@starting-style" dà il punto di
     * partenza all'apertura.
     */
    @media (max-width: 63.999rem) {
        nav {
            --shift: var(--space-3);
            display: none;
            position: fixed;
            inset: 0;
            padding-block: calc(var(--header-height) + var(--space-7)) var(--space-7);
            padding-inline: var(--page-inline) calc(var(--page-inline) + var(--corde-span) + var(--space-6));
            overflow-y: auto;
            background-color: var(--bg);
            opacity: 0;
            /* Chiusura: il pannello aspetta che le corde siano risalite */
            transition:
                opacity var(--duration-slow) var(--ease) var(--duration-slow),
                display var(--duration-slow) allow-discrete var(--duration-slow);
        }

        nav[data-open] {
            display: block;
            opacity: 1;
            transition-delay: 0s;
        }

        /* Dal fondo del pulsante del menu, centrato nell'intestazione, fino in fondo allo schermo */
        nav::after {
            inset-block-start: calc((var(--header-height) + var(--corde-span)) / 2);
            inset-inline-end: var(--page-inline);
            /* Ritratte nel pulsante; alla chiusura risalgono subito */
            clip-path: inset(0 0 100% 0);
            transition: clip-path var(--duration-slow) var(--ease);
        }

        /* All'apertura scendono quando il pulsante ha finito di girarsi */
        nav[data-open]::after {
            clip-path: inset(0);
            transition-delay: var(--duration-slow);
        }

        li,
        p {
            transition:
                opacity var(--duration-slow) var(--ease),
                translate var(--duration-slow) var(--ease);
        }

        nav[data-open] :is(li, p) {
            transition-delay: calc(var(--i) * var(--stagger) / 2);
        }

        @starting-style {
            nav[data-open] {
                opacity: 0;
            }

            nav[data-open]::after {
                clip-path: inset(0 0 100% 0);
            }

            nav[data-open] :is(li, p) {
                opacity: 0;
                translate: 0 var(--shift);
            }
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-5);
        }

        ul a {
            font-size: var(--fs-h3);
        }

        p {
            margin-block-start: var(--space-7);
        }

        /* A menu aperto la pagina dietro non scorre */
        :global(html:has(nav[data-open])) {
            overflow: hidden;
        }
    }

    @media (max-width: 63.999rem) and (prefers-reduced-motion: reduce) {
        nav {
            --shift: 0;
        }

        nav,
        nav::after {
            transition-delay: 0s;
        }

        nav::after {
            transition-duration: 0s;
        }
    }

    /* Da 64rem: voci in linea nell'intestazione e il pulsante alla loro destra */
    @media (min-width: 64rem) {
        nav::after {
            content: none;
        }

        nav {
            display: flex;
            align-items: center;
            gap: var(--space-6);
            margin-inline-start: auto;
        }

        ul {
            display: flex;
            align-items: center;
            gap: var(--space-6);
        }

        ul a {
            font-size: var(--fs-small);
        }
    }
</style>
