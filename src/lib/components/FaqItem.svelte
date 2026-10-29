<script lang="ts">
    import type { FaqItem } from "$lib/faq";

    // Una domanda frequente condivisa tra più pagine ($lib/faq.ts), con la stessa forma di quelle scritte nella pagina
    let { item }: { item: FaqItem } = $props();
</script>

<details>
    <summary>{item.question}</summary>
    <p>{@html item.answer}</p>
</details>
