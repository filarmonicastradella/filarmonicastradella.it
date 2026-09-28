<script lang="ts">
    import type { Snippet } from "svelte";

    // `id` è l'àncora opzionale per i collegamenti alla sezione (es. /contacts#scrivici).
    let { title, id: anchor, children }: { title: string; id?: string; children: Snippet } = $props();

    const id = $props.id();
</script>

<section id={anchor} aria-labelledby="{id}-heading">
    <h2 id="{id}-heading">{title}</h2>
    {@render children()}
</section>
