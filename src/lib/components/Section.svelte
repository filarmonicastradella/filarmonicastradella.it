<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, children }: { title: string; children: Snippet } = $props();

    const id = $props.id();
</script>

<section aria-labelledby="{id}-heading">
    <h2 id="{id}-heading">{title}</h2>
    {@render children()}
</section>
