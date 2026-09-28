<script lang="ts">
    import type { Snippet } from "svelte";

    // `id` è l'àncora opzionale per i collegamenti alla sezione (es. /contacts#scrivici).
    let {
        title,
        id: anchor,
        level = 2,
        children
    }: { title: string; id?: string; level?: 2 | 3; children: Snippet } = $props();

    const id = $props.id();
</script>

<section id={anchor} aria-labelledby="{id}-heading">
    <svelte:element this={`h${level}`} id="{id}-heading">{title}</svelte:element>
    {@render children()}
</section>
