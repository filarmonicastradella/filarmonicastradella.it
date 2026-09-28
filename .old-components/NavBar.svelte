<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import MenuButton from "./MenuButton.svelte";
    import Icon from "@iconify/svelte";
    import { afterNavigate } from "$app/navigation";
    import { slide } from "svelte/transition";
    import { navItems } from "$lib/navigation";

    let open = $state(false);
    let headerEl = $state();

    afterNavigate(() => {
        open = false;
    });

    $effect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    });

    $effect(() => {
        if (!headerEl) return;

        const setNavbarHeight = () => {
            document.documentElement.style.setProperty("--navbar-height", `${headerEl.offsetHeight}px`);
        };

        setNavbarHeight();

        const resizeObserver = new ResizeObserver(setNavbarHeight);
        resizeObserver.observe(headerEl);

        return () => resizeObserver.disconnect();
    });
</script>

{#snippet renderNavItem(item: (typeof navItems)[number])}
    {#if "links" in item}
        <li>
            <details name="menu-accordion">
                <summary>
                    <Icon icon="mdi:chevron-down" />
                    <span>{item.title}</span>
                </summary>
                <ul>
                    {#each item.links as link}
                        <li>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    {/each}
                </ul>
            </details>
        </li>
    {:else}
        <li>
            <a href={item.href} class="direct">{item.title}</a>
        </li>
    {/if}
{/snippet}

<header bind:this={headerEl}>
    <nav aria-label="Navigazione principale">
        <a href="/">
            {@html logoSvg}
            <span
                >Filarmonica Alessandro Stradella <abbr
                    title="Associazione di Promozione Sociale">APS</abbr
                ></span
            >
        </a>

        <MenuButton {open} onclick={() => (open = !open)} />
    </nav>

    {#if open}
        <div transition:slide={{ duration: 250 }}>
            <div>
                <ul>
                    {#each navItems as item}
                        {@render renderNavItem(item)}
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</header>

<!--
<style>
    header {
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
        background-color: var(--bg-surface-raised);
        border-bottom: 1px solid var(--border-color-subtle);
        user-select: none;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: var(--space-md) var(--space-lg);
        background-color: var(--bg-surface-raised);
        position: relative;
        z-index: 10;
    }

    header a[href="/"] {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        font-family: var(--font-heading);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        text-decoration: none;
        color: var(--text-main);
        transition: color var(--transition-fast);
    }

    header a[href="/"]:hover {
        color: var(--color-primary);
    }

    header a[href="/"] :global(svg) {
        height: 2.25rem;
        width: auto;
        object-fit: contain;
        color: inherit;
        transition: color var(--transition-fast);
    }

    header a[href="/"]:hover :global(svg) {
        color: var(--color-primary);
    }

    abbr {
        font-size: 0.85em;
        font-weight: var(--font-weight-regular);
        color: var(--text-muted);
        text-decoration: none;
        margin-left: 0.15rem;
        transition: color var(--transition-fast);
    }

    header a[href="/"]:hover abbr {
        color: var(--color-primary);
    }

    header > div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        padding-top: calc(2.25rem + (var(--space-md) * 2) + 1px);
        background-color: var(--bg-surface-raised);
        overflow-y: auto;
        z-index: 5;
        scrollbar-width: none;
    }

    header > div::-webkit-scrollbar {
        display: none;
    }

    header > div > div {
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: var(--space-2xl) var(--space-lg) var(--space-3xl);
    }

    header ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    summary,
    .direct {
        cursor: pointer;
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        text-decoration: none;
        color: var(--text-main);
        display: inline-flex;
        align-items: center;
        gap: var(--space-md);
        width: 100%;
        padding: var(--space-2xs) 0;
        transition: color var(--transition-fast);
    }

    summary::-webkit-details-marker {
        display: none;
    }

    summary:hover,
    .direct:hover,
    details[open] summary {
        color: var(--color-primary);
    }

    summary :global(svg) {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        color: var(--text-muted);
        transition:
            transform var(--transition-fast),
            color var(--transition-fast);
    }

    summary:hover :global(svg),
    details[open] summary :global(svg) {
        color: var(--color-primary);
    }

    details[open] summary :global(svg) {
        transform: rotate(180deg);
    }

    .direct {
        padding-left: calc(1.5rem + var(--space-md));
    }

    details ul {
        margin: var(--space-2xs) 0 var(--space-xs) 0;
        padding-left: calc(1.5rem + var(--space-md));
        gap: var(--space-2xs);
    }

    details li a {
        font-family: var(--font-body);
        font-size: var(--font-size-md);
        color: var(--text-muted);
        text-decoration: none;
        display: inline-block;
        padding: var(--space-2xs) 0;
        transition: color var(--transition-fast);
    }

    details li a:hover {
        color: var(--color-primary);
    }
</style>
-->