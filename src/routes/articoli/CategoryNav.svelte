<script lang="ts">
    import { page } from "$app/state";
    import { activeCategories } from "$lib/articles";

    // Tutti gli articoli e le categorie, con la pagina corrente indicata; con una categoria sola non serve
    const links = [{ href: "/articoli", name: "Tutti" }, ...activeCategories.map(({ slug, name }) => ({ href: `/articoli/${slug}`, name }))];
</script>

{#if activeCategories.length > 1}
    <nav aria-label="Categorie degli articoli">
        <ul>
            {#each links as { href, name } (href)}
                <li><a {href} aria-current={page.url.pathname === href ? "page" : undefined}>{name}</a></li>
            {/each}
        </ul>
    </nav>
{/if}
