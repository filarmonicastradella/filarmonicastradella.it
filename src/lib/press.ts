// Rassegna stampa: gli articoli dei giornali sulla Filarmonica, dal più recente. Il riassunto è il sommario o
// l'attacco del giornale; per gli annunci senza sommario, una riga nostra che dice di che cosa si tratta.
export interface PressItem {
    title: string;
    date: string;
    publisher: string;
    author?: string;
    excerpt: string;
    /** Il link all'articolo online; senza, è un'uscita solo su carta */
    href?: string;
}

export const press: PressItem[] = [
    {
        title: "La Filarmonica dei giovani. Duecento anni in musica: «Una mostra e tante idee»",
        date: "2026-10-20",
        publisher: "La Nazione",
        author: "Roberto Oligeri",
        excerpt: "Fivizzano, l'evento celebrativo al Museo di Arte Sacra con autorità e cittadini.",
        href: "https://www.lanazione.it/massa-carrara/cronaca/la-filarmonica-dei-giovani-duecento-87a2bdf9"
    },
    {
        title: "Fivizzano ritrova la sua Filarmonica",
        date: "2026-10-12",
        publisher: "Il Tirreno",
        author: "Marco Landini",
        excerpt: "Applausi per il ritorno della Stradella al Museo d'Arte Sacra di San Giovanni."
    },
    {
        title: "A Fivizzano rinasce la Filarmonica «Alessandro Stradella»",
        date: "2026-10-28",
        publisher: "Il Corriere Apuano",
        excerpt: "Dopo trent'anni di silenzio, lo storico organico fondato nel 1777 è tornato a esibirsi al Museo di Arte Sacra.",
        href: "https://www.ilcorriereapuano.it/2026/10/a-fivizzano-rinasce-la-filarmonica-alessandro-stradella/"
    },
    {
        title: "Successo per «A tempo di vita», il concerto di fiati del gruppo Stradella Facendo della rinata Filarmonica di Fivizzano",
        date: "2026-10-12",
        publisher: "La Gazzetta di Massa e Carrara",
        author: "Sonia Cimoli",
        excerpt: "C'è una nuova energia che muove Fivizzano, ed ha il ritmo della musica.",
        href: "https://www.lagazzettadimassaecarrara.net/fivizzano/successo-per-a-tempo-di-vita-il-concerto-di-fiati-del-gruppo-stradella-facendo-della-rinata-filarmonica-di-fivizzano"
    },
    {
        title: "«Concerto autunnale» a Fivizzano della Filarmonica «Alessandro Stradella»",
        date: "2026-10-07",
        publisher: "Il Corriere Apuano",
        excerpt: "L'annuncio del concerto «A tempo di vita» di sabato 10 ottobre nel salone del Museo d'Arte Sacra di San Giovanni.",
        href: "https://www.ilcorriereapuano.it/evento/concerto-autunnale-a-fivizzano-della-filarmonica-alessandro-stradella/"
    }
].sort((a, b) => b.date.localeCompare(a.date));
