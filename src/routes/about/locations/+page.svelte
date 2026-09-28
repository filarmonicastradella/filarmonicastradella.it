<script lang="ts">
    import Section from "$lib/components/Section.svelte";
    import { legalSeat, operationalSeats } from "$lib/locations";
</script>

<svelte:head>
    <title>Le nostre sedi — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="La sede legale a Fivizzano e le sedi operative di Fivizzano e Serricciolo della Filarmonica Alessandro Stradella APS." />
</svelte:head>

<main id="contenuto">
    <header>
        <h1>Le nostre sedi</h1>
        <p>L'associazione ha la sede legale a Fivizzano e due sedi operative, a Fivizzano e a Serricciolo.</p>
    </header>

    <Section title="Sede legale">
        <address>
            {#each legalSeat.address as line}{line}<br />{/each}
        </address>
        <p><a href={legalSeat.mapsHref} target="_blank" rel="noopener noreferrer">Apri la mappa su Google Maps</a></p>
    </Section>

    <Section title="Sedi operative">
        <ul>
            {#each operationalSeats as seat (seat.id)}
                <li>
                    <h3>{seat.name}</h3>
                    <address>
                        {#each seat.address as line}{line}<br />{/each}
                    </address>
                    <p>{seat.description}</p>
                    <p><a href={seat.mapsHref} target="_blank" rel="noopener noreferrer">Apri la mappa su Google Maps</a></p>
                </li>
            {/each}
        </ul>
    </Section>

    <p><a href="/contacts#sedi">Mappe e recapiti</a></p>
</main>
