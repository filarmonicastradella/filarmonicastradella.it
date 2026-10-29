<script lang="ts">
    import FaqItem from "$lib/components/FaqItem.svelte";
    import { faq } from "$lib/faq";
    import { ensembles } from "$lib/ensembles";
</script>

<svelte:head>
    <title>Le nostre formazioni — Filarmonica Alessandro Stradella APS</title>
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
            <a href="/about/ensembles/{ensemble.slug}">
                <h2>{ensemble.title}</h2>
                <p>{ensemble.summary}</p>
            </a>
        </li>
    {/each}
</ul>

<section>
    <h2>Domande frequenti</h2>
    <details>
        <summary>Che cos'è una filarmonica?</summary>
        <p>
            Lo dice il nome: «filarmonica» viene dal greco e vuol dire amica della musica. È un'associazione che riunisce chi ama la musica e vuole suonarla
            insieme, in più formazioni, dall'orchestra di fiati alla musica antica.
        </p>
    </details>
    <details>
        <summary>Perché ci sono più formazioni?</summary>
        <p>
            Perché ogni repertorio chiede un organico diverso: il concerto in sala per l'orchestra di fiati, la musica in movimento per la street band,
            archi e fiati insieme per l'orchestra Infieri, la musica antica per i Dissonanti. Così ognuno trova la musica che gli piace e il livello adatto.
        </p>
    </details>
    <details>
        <summary>Come si entra in una formazione?</summary>
        <p>
            Prima ci si iscrive alla Filarmonica con la <a href="/support/join">domanda di iscrizione</a>; da soci si chiede di entrare nella formazione.
            Ognuna ha i suoi requisiti.
        </p>
    </details>
    <FaqItem item={faq.livello} />
    <details>
        <summary>Posso suonare in più formazioni?</summary>
        <p>Sì: puoi entrare in più di una, ognuna con i suoi requisiti.</p>
    </details>
    <FaqItem item={faq.prove} />
    <FaqItem item={faq.repertorio} />
    <FaqItem item={faq.direttori} />
    <FaqItem item={faq.strumento} />
    <details>
        <summary>Posso proporre una nuova formazione?</summary>
        <p>Sì: basta che la propongano almeno tre soci, con una bozza di regolamento.</p>
    </details>
    <FaqItem item={faq.evento} />
</section>

<p class="rimando"><a href="/about">L'associazione</a></p>
