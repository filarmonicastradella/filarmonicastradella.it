<script lang="ts">

    const office = [
        { role: "Presidente e legale rappresentante", name: "Leonardo Orietti Del Duca" },
        { role: "Vicepresidente", name: "Marta Viola" }
    ];

    const members = ["Elia Belloni", "Francesca Nobili", "Monica Orietti"];
</script>

<svelte:head>
    <title>Consiglio direttivo — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Le persone che compongono il Consiglio direttivo, l'organo di amministrazione della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<header>
    <h1>Consiglio direttivo</h1>
    <p>
        Il Consiglio direttivo è l'organo di amministrazione dell'associazione. È stato nominato il
        <time datetime="2026-03-22">22 marzo 2026</time>. Il mandato dura un anno.
    </p>
</header>

<section>
    <h2>Cariche</h2>
    <dl>
        {#each office as { role, name } (role)}
            <dt>{role}</dt>
            <dd>{name}</dd>
        {/each}
    </dl>
</section>

<section>
    <h2>Consiglieri</h2>
    <ul>
        {#each members as name (name)}
            <li>{name}</li>
        {/each}
    </ul>
</section>
