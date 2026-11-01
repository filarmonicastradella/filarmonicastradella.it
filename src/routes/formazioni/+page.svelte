<script lang="ts">
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { faq } from "$lib/faq";
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Le nostre formazioni — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="Le formazioni della Filarmonica Alessandro Stradella: Stradella Facendo, Streetella Band, Orchestra Infieri e Filarmonici Dissonanti." />
</svelte:head>

<header>
    <h1>Le nostre formazioni</h1>
    <p>
        Quattro formazioni per suonare insieme: Stradella Facendo, la nostra orchestra di fiati; la Streetella Band; l'Orchestra Infieri; i Filarmonici
        Dissonanti.
    </p>
</header>

<ul>
    {#each ensembles as ensemble (ensemble.slug)}
        <li>
            <a href="/formazioni/{ensemble.slug}">
                <h2>{ensemble.title}</h2>
                <p>{ensemble.summary}</p>
            </a>
        </li>
    {/each}
</ul>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Perché più formazioni?</summary>
        <p>
            Perché ogni repertorio chiede un organico diverso: il concerto in sala per l'orchestra di fiati, la musica in movimento per la street band,
            archi e fiati insieme per l'Orchestra Infieri, la musica antica per i Dissonanti. La Filarmonica le riunisce tutte: lo dice il nome, che dal
            greco vuol dire «amica della musica».
        </p>
    </details>
    <details>
        <summary>Come si entra in una formazione?</summary>
        <p>
            Prima ci si iscrive alla Filarmonica con la <a href="/associazione/iscrizione">domanda di iscrizione</a>; da soci si chiede di entrare nella formazione.
            Ognuna ha i suoi requisiti, e si può far parte anche di più di una.
        </p>
    </details>
    <details>
        <summary>Che livello serve?</summary>
        <p>Dipende dalla formazione, ma ce n'è una per ogni livello: si può cominciare anche da zero, senza aver mai suonato uno strumento.</p>
    </details>
    <details>
        <summary>Quali strumenti cercate?</summary>
        <p>Tutti, e in particolare oboe, fagotto e archi.</p>
    </details>
    <details>
        <summary>Posso proporre una nuova formazione?</summary>
        <p>Sì: basta che la propongano almeno tre soci, con una bozza di regolamento.</p>
    </details>
    <details>
        <summary>Chi è il maestro?</summary>
        <p>
            Non ce n'è uno solo: i direttori sono più di uno, e prima di tutto sono musicisti. Li indicano i componenti di ogni formazione, dai 14 anni in
            su, e il consiglio direttivo ne ratifica la nomina per un anno. Ognuno dirige in autonomia i propri brani, e negli altri suona con tutti.
        </p>
    </details>
    <details>
        <summary>Chi sceglie i brani?</summary>
        <p>I musicisti: propongono i brani e li votano in una graduatoria, e i direttori scelgono da lì quelli da suonare.</p>
    </details>
    <FaqItem item={faq.evento} />
</section>

