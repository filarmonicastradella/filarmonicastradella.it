<script lang="ts">
    import logoSvg from "$lib/assets/favicon.svg?raw";
    import { navItems } from "$lib/navigation";

    // Il file SVG dichiara una dimensione enorme (826×1382): senza CSS il logo occuperebbe tutta la pagina.
    // Il nero diventa currentColor, così il logo prende il colore del collegamento che lo contiene.
    const logo = logoSvg
        .replace('width="826" height="1382"', 'width="22" height="36"')
        .replaceAll('fill="black"', 'fill="currentColor"');
</script>

<header>
    <a href="/">
        <span aria-hidden="true">{@html logo}</span>
        <span>Filarmonica Alessandro Stradella <abbr title="Associazione di Promozione Sociale">APS</abbr></span>
    </a>

    <nav aria-label="Navigazione principale">
        <ul>
            {#each navItems as item (item.href)}
                <li><a href={item.href}>{item.title}</a></li>
            {/each}
        </ul>
    </nav>
</header>
