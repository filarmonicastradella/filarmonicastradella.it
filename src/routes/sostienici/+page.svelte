<script lang="ts">
    import { organization } from "$lib/organization";
</script>

<svelte:head>
    <title>Sostienici — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Come sostenere la Filarmonica Alessandro Stradella APS: con una donazione e, quando sarà possibile, con il 5x1000." />
</svelte:head>

<header>
    <h1>Sostienici</h1>
    <p>
        Suonare costa, e chi suona da solo lo sa bene. Con le donazioni la Filarmonica si fa carico di ciò che un singolo musicista
        difficilmente potrebbe sostenere.
    </p>
    <!-- Il modo più comodo per donare, con un clic: la pagina di pagamento di Stripe (carta, Apple Pay, Google Pay), come in Fai una donazione -->
    <p><a href={organization.donationHref}>Dona ora</a></p>
</header>

<ul>
    <!--
        Raccolte fondi: una scheda in testa all'elenco per ogni raccolta attiva, tolta quando la raccolta finisce.
        Modello da copiare fuori dal commento, con titolo, testo, obiettivo, scadenza e link veri:
    <li>
        <a href="/sostienici/dona">
            <h2>Raccolta fondi: strumentazione audio</h2>
            <p>
                [Che cosa compriamo e perché.] Obiettivo: [importo] €, entro il <time datetime="2026-12-31">31 dicembre 2026</time>.
            </p>
        </a>
    </li>
    -->
    <li>
        <a href="/sostienici/dona">
            <h2>Fai una donazione</h2>
            <p>Un contributo libero, online o con un bonifico bancario, con le agevolazioni fiscali previste per le APS.</p>
        </a>
    </li>
    <!-- 5x1000: link segnaposto senza href finché l'associazione non è beneficiaria; poi href="/sostienici/5x1000" e rinominare support/5x1000/_page.svelte in +page.svelte -->
    <li>
        <!-- svelte-ignore a11y_missing_attribute (segnaposto nella forma finale: l'href arriva con la pagina) -->
        <a>
            <h2>5x1000</h2>
            <p>Non ancora disponibile: aspettiamo di essere ammessi tra i beneficiari. Destinare il 5x1000 non costa nulla.</p>
        </a>
    </li>
    <!-- Da riattivare insieme a /sostienici/volontariato (rinominare _page.svelte in +page.svelte):
    <li>
        <a href="/sostienici/volontariato">
            <h2>Fai volontariato</h2>
            <p>Dai una mano anche senza suonare uno strumento.</p>
        </a>
    </li>
    -->
</ul>

<!-- Tolto il 9/10/2026; con /faq riattivata si può rimettere:
<p>Hai dubbi? Leggi le <a href="/faq">domande frequenti</a> o <a href="/contatti/scrivi">scrivici</a>.</p>
-->
