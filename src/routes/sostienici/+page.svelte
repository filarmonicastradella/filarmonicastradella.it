<svelte:head>
    <title>Sostienici — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Come sostenere la Filarmonica Alessandro Stradella APS: iscrivendoti come socio o con una donazione." />
</svelte:head>

<header>
    <h1>Sostienici</h1>
    <p>
        Suonare costa, e chi suona da solo lo sa bene. Con le quote dei soci e le donazioni la Filarmonica si fa carico di ciò che un singolo musicista
        difficilmente potrebbe sostenere.
    </p>
</header>

<ul>
    <li>
        <a href="/associazione/iscrizione">
            <h2>Diventa socio</h2>
            <p>Con la quota annuale di 12 € entri nell'associazione e puoi chiedere di entrare nelle nostre formazioni.</p>
        </a>
    </li>
    <li>
        <a href="/sostienici/dona">
            <h2>Fai una donazione</h2>
            <p>Un contributo libero tramite bonifico bancario, con le agevolazioni fiscali previste per le APS.</p>
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
<p>Hai dubbi? Leggi le <a href="/faq">domande frequenti</a> o <a href="/contatti#scrivici">scrivici</a>.</p>
-->
