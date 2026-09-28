<script lang="ts">
    let { open = false, onclick } = $props();
</script>

<button
    type="button"
    aria-expanded={open}
    aria-controls="main-nav"
    aria-label={open ? "Chiudi menu" : "Apri menu"}
    {onclick}
>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
</button>

<!--
<style>
    button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 1.75rem;
        height: 1.25rem;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--text-main);
        border-radius: var(--radius-full);
        transition: 
            transform var(--transition-fast), 
            background-color var(--transition-fast);
        transform-origin: center;
    }

    /* Hover legato alle variabili del brand */
    button:hover span {
        background-color: var(--color-primary);
    }

    /* Stato Aperto (Trasformazione ad X) */
    button[aria-expanded="true"] span:first-child {
        transform: translateY(calc(0.625rem - 1px)) rotate(-45deg);
    }

    button[aria-expanded="true"] span:last-child {
        transform: translateY(calc(-0.625rem + 1px)) rotate(45deg);
    }
</style>
-->