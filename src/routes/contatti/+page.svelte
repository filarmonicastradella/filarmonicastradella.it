<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    // I QR stampati nei punti di raccolta portano ancora a /contatti?motivo=storia#scrivici, l'indirizzo del modulo fino all'8/11/2026:
    // con un motivo nell'indirizzo si passa subito al modulo, che lo sceglie. Senza JS resta il pulsante «Scrivici».
    onMount(() => {
        if (page.url.searchParams.has("motivo")) goto(`/contatti/scrivi${page.url.search}`, { replaceState: true });
    });
</script>

<svelte:head>
    <title>Contatti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Telefono, email, sede e modulo per scriverci della Filarmonica Alessandro Stradella APS di Fivizzano, in Lunigiana: informazioni, iscrizioni, donazioni ed eventi." />
</svelte:head>

<!-- Recapiti e sedi; il modulo per scriverci ha una pagina sua, /contatti/scrivi (dal 8/11/2026) -->
<header>
    <h1>Contatti</h1>
    <p>Per informazioni, iscrizioni e concerti scrivici o chiamaci.</p>
    <p><a href="/contatti/scrivi">Scrivi un messaggio</a></p>
</header>

<section>
    <h2>Recapiti</h2>
    <dl>
        <dt>Telefono</dt>
        <dd><a href="tel:+393505363110">+39&nbsp;350&nbsp;536&nbsp;3110</a></dd>
        <dt>Email</dt>
        <dd><a href="mailto:info@filarmonicastradella.it?subject=Informazioni">info@filarmonicastradella.it</a></dd>
        <dt>PEC</dt>
        <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
    </dl>
    <!-- La scheda contatto da salvare in rubrica (filarmonica.vcf): telefono, email, sito e sede in un tocco -->
    <p><a href="/contatti/filarmonica.vcf" download>Salva nei contatti</a></p>
    <!-- Da riattivare insieme a /faq:
    <p>Prima di scriverci, guarda le <a href="/faq">domande frequenti</a>.</p>
    -->
</section>

<!-- Le sedi, da $lib/locations come nel piè di pagina; per ora solo la legale: le sedi operative si aggiungono qui
     quando indirizzi e descrizioni sono confermati -->
<section>
    <h2>Sedi</h2>
    <dl>
        <dt>{legalSeat.name}</dt>
        <dd><a href={legalSeat.mapsHref} target="_blank" rel="noopener noreferrer">{legalSeat.address.join(", ")}</a></dd>
    </dl>
</section>

<section>
    <h2>Per la stampa</h2>
    <p>Presentazione, dati, simbolo e contatti per chi scrive di noi: <a href="/contatti/stampa">materiali per la stampa</a>.</p>
</section>
