<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import { afterNavigate } from "$app/navigation";
    import { navItems } from "$lib/navigation";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    const logo = logoSvg.replace('width="826" height="1382"', 'width="22" height="36"');

    // Il menu è un <details> nativo: funziona senza JS. Con JS si richiude dopo la navigazione.
    let menuOpen = $state(false);

    afterNavigate(() => {
        menuOpen = false;
    });
</script>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></span>
    </a>

    <nav aria-label="Navigazione principale">
        <details bind:open={menuOpen}>
            <summary>Menu</summary>
            <ul>
                {#each navItems as item}
                    {#if "links" in item}
                        <li>
                            <details name="menu-accordion">
                                <summary>{item.title}</summary>
                                <ul>
                                    {#each item.links as link}
                                        <li><a href={link.href}>{link.label}</a></li>
                                    {/each}
                                </ul>
                            </details>
                        </li>
                    {:else}
                        <li><a href={item.href}>{item.title}</a></li>
                    {/if}
                {/each}
            </ul>
        </details>
    </nav>
</header>
