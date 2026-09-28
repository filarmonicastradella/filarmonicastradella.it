<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import { navItems } from "$lib/navigation";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');

    // Il menu si chiude dopo una navigazione (senza JS la pagina si ricarica e si chiude da sola).
    let menu = $state<HTMLElement>();

    afterNavigate(() => {
        if (menu?.matches(":popover-open")) menu.hidePopover();
    });
</script>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></span>
    </a>

    <button type="button" popovertarget="menu">
        <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" aria-hidden="true">
            <rect x="3" y="8.25" width="18" height="1.5" rx="0.75" />
            <rect x="3" y="15" width="18" height="1.5" rx="0.75" />
        </svg>
        <span>Menu</span>
    </button>

    <nav id="menu" popover bind:this={menu} aria-label="Navigazione principale">
        <ul>
            {#each navItems as item (item.href)}
                <li><a href={item.href} aria-current={page.url.pathname === item.href ? "page" : page.url.pathname.startsWith(item.href + "/") ? "true" : undefined}>{item.title}</a></li>
            {/each}
        </ul>
    </nav>
</header>
