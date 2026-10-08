<script lang="ts">
    import ChevronDownIcon from "~icons/heroicons/chevron-down-solid";
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import { navItems } from "$lib/navigation";

    let { open = false, onClose }: { open?: boolean; onClose?: () => void } = $props();

    const isActive = (href: string) => (page.url.pathname === href ? "page" : page.url.pathname.startsWith(href + "/") ? "true" : undefined);

    // Transizione custom basata sull'altezza, totalmente opaca (nessuna dissolvenza): misura l'altezza
    // naturale dell'elemento e la anima da 0 a quel valore, tagliando il contenuto nel frattempo.
    function expand(node: HTMLElement, { duration = 250 } = {}) {
        const height = node.offsetHeight;
        return {
            duration,
            css: (t: number) => `overflow: hidden; height: ${t * height}px; opacity: 1;`
        };
    }

    // Il menu si chiude dopo una navigazione (senza JS la pagina si ricarica e si chiude da sola).
    afterNavigate(() => onClose?.());

    // A menu aperto il contenuto dietro non deve scorrere.
    $effect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    });
</script>

{#if open}
    <nav aria-label="Navigazione principale" transition:expand={{ duration: 250 }}>
        <ul>
            {#each navItems as item (item.href)}
                <li>
                    {#if item.children}
                        <details name="menu-section">
                            <summary>
                                <ChevronDownIcon aria-hidden="true" />
                                {item.title}
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
{/if}

<style>
    /*
     * Occupa lo schermo sotto la barra. Il padding orizzontale è lo stesso calcolo di "main"/
     * dell'intestazione (layout.css): così il contenuto del menu si allinea agli stessi margini del
     * resto della pagina, non a un valore a sé.
     */
    nav {
        position: fixed;
        inset: var(--header-height) 0 0;
        margin: 0;
        padding-block: var(--space-xl);
        padding-inline: max(var(--space-lg), calc((100% - var(--content-max-width)) / 2));
        overflow-y: auto;
    }

    nav ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    /* Stesso trattamento dei titoli veri (h1-h6 in typography.css): peso semibold, non regular */
    nav > ul > li > a,
    summary {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        font-family: var(--font-heading);
        font-size: var(--font-size-xl-2xl);
        font-weight: var(--font-weight-semibold);
    }

    /* Una voce con pagine figlie si apre sul posto (<details> nativo, nessun JS necessario) */
    summary {
        cursor: pointer;
        list-style: none;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    /*
     * ":global()": ChevronDownIcon è un componente Svelte a sé (icona Iconify, impacchettata alla
     * build), non un elemento scritto direttamente in questo template — la classe di scoping non
     * raggiunge il suo <svg> interno, serve dire esplicitamente di matcharlo comunque.
     * Dimensione esplicita (non "1em"): l'icona non deve scalare con il testo del titolo.
     */
    summary :global(svg) {
        width: var(--font-size-xl);
        height: var(--font-size-xl);
        flex-shrink: 0;
        transition: transform 0.2s ease;
    }

    details[open] summary :global(svg) {
        transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
        summary :global(svg) {
            transition: none;
        }
    }

    /*
     * Le pagine figlie si allineano sotto il testo del titolo, non sotto la sua icona: il rientro è
     * la larghezza dell'icona più lo spazio che la separa dal testo (stesso "gap" del titolo sopra).
     */
    details ul {
        gap: var(--space-2xs);
        margin-block-start: var(--space-xs);
        padding-inline-start: calc(var(--font-size-xl) + var(--space-sm));
    }

    details ul a {
        display: block;
        font-size: var(--font-size-md-lg);
    }
</style>
