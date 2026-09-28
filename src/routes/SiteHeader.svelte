<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import Menu from "@lucide/svelte/icons/menu";
    import X from "@lucide/svelte/icons/x";
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

    <button type="button" popovertarget="menu"><Menu size={24} strokeWidth={1.5} aria-hidden="true" /> <span>Menu</span></button>

    <nav id="menu" popover bind:this={menu} aria-label="Navigazione principale">
        <button type="button" popovertarget="menu" popovertargetaction="hide"><X size={24} strokeWidth={1.5} aria-hidden="true" /> <span>Chiudi il menu</span></button>
        <ul>
            {#each navItems as item (item.href)}
                <li><a href={item.href} aria-current={page.url.pathname === item.href ? "page" : page.url.pathname.startsWith(item.href + "/") ? "true" : undefined}>{item.title}</a></li>
            {/each}
        </ul>
    </nav>
</header>
