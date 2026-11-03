// Domande frequenti che compaiono in più pagine: ogni risposta è scritta una volta sola, qui, così non si
// contraddicono. Le altre domande stanno solo nella pagina dove le cerca chi legge. Le risposte sono HTML scritto
// da noi, con i soli link interni.
export interface FaqItem {
    question: string;
    answer: string;
}

export const faq = {
    // Pagine dei singoli eventi, Le nostre formazioni
    evento: {
        question: "Potete suonare al mio evento?",
        answer:
            'Sì: per un concerto, un convegno, una cerimonia o una festa in Lunigiana, raccontaci l\'occasione almeno 30 giorni prima: ti rispondiamo con la disponibilità e la formazione adatta. Occasioni, formazioni e come chiedere sono nella pagina <a href="/contatti/ingaggi">La Filarmonica al tuo evento</a>.'
    },
    // Pagine delle singole formazioni: valgono per tutte
    maestro: {
        question: "Chi è il maestro?",
        answer:
            "Non ce n'è uno solo: i direttori sono più di uno, e prima di tutto sono musicisti. Li indicano i componenti di ogni formazione, dai 14 anni in su, e il consiglio direttivo ne ratifica la nomina per un anno. Ognuno dirige in autonomia i propri brani, e negli altri suona con tutti."
    },
    brani: {
        question: "Chi sceglie i brani?",
        answer: "I musicisti: propongono i brani e li votano in una graduatoria, e i direttori scelgono da lì quelli da suonare."
    }
} satisfies Record<string, FaqItem>;

// Le domande sugli ingaggi: nella pagina La Filarmonica al tuo evento e in Contatti quando il motivo è un ingaggio
export const bookingFaq: FaqItem[] = [
    { question: "Dove suonate?", answer: "Ci spostiamo in tutta la Lunigiana." },
    {
        question: "Suonate a funzioni religiose o a iniziative di partito?",
        answer:
            "No: siamo un'associazione laica e apartitica, e non suoniamo a funzioni religiose né a feste e iniziative di partito. Per le occasioni religiose collaboriamo però con le realtà musicali amiche della Lunigiana, e possiamo indicarti a chi rivolgerti."
    },
    { question: "Con quanto anticipo devo scrivervi?", answer: "Almeno 30 giorni prima dell'evento." },
    { question: "Con quanti musicisti suonate?", answer: "Dipende dalla formazione e dall'occasione: te lo indichiamo nella proposta." },
    {
        question: "Cosa serve sul posto?",
        answer: "Uno spazio adatto alla formazione, le sedie e un riparo in caso di pioggia. La corrente elettrica non sempre è necessaria, ma è gradita."
    }
];
