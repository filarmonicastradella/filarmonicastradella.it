<svelte:head>
    <title>Sostienici — Filarmonica Alessandro Stradella APS</title>
    <meta name="description" content="Come sostenere la Filarmonica Alessandro Stradella APS, iscrivendoti o con una donazione, e che cosa coprono quote e donazioni." />
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
        <a href="/support/join">
            <h2>Diventa socio</h2>
            <p>Con la quota annuale di 12 € entri nell'associazione e puoi suonare nelle nostre formazioni.</p>
        </a>
    </li>
    <li>
        <a href="/support/donate">
            <h2>Fai una donazione</h2>
            <p>Un contributo libero tramite bonifico bancario, con le agevolazioni fiscali previste per le APS.</p>
        </a>
    </li>
    <!-- 5x1000: link segnaposto senza href finché l'associazione non è beneficiaria; poi href="/support/5x1000" e rinominare support/5x1000/_page.svelte in +page.svelte -->
    <li>
        <a aria-disabled="true">
            <h2>5x1000</h2>
            <p>Destinare il 5x1000 non costa nulla. Non ancora disponibile: aspettiamo di essere ammessi tra i beneficiari.</p>
        </a>
    </li>
    <!-- Da riattivare insieme a /support/volunteer (rinominare _page.svelte in +page.svelte):
    <li>
        <a href="/support/volunteer">
            <h2>Fai volontariato</h2>
            <p>Dai una mano anche senza suonare uno strumento.</p>
        </a>
    </li>
    -->
</ul>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>A cosa serve il tuo sostegno?</summary>
        <ul>
            <li>Lo strumento, per chi non ne ha uno suo, e i leggii.</li>
            <li>Le parti e il materiale di cartoleria.</li>
            <li>La sala prove e il suo riscaldamento.</li>
            <li>L'impianto audio.</li>
            <li>I diritti SIAE dei concerti.</li>
            <li>L'assicurazione dei soci.</li>
        </ul>
    </details>
    <details>
        <summary>Posso aiutare senza dare soldi?</summary>
        <p>Sì: da socio puoi mettere a disposizione il tuo tempo e le tue competenze. <a href="/support/join">Iscriviti</a>.</p>
    </details>
</section>

<!-- Tolto il 9/10/2026; con /faq riattivata si può rimettere:
<p>Hai dubbi? Leggi le <a href="/faq">domande frequenti</a> o <a href="/contacts/message">scrivici</a>.</p>
-->
