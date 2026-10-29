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
            'Sì: per un concerto, un convegno, una cerimonia o una festa <a href="/booking">raccontaci l\'occasione</a>. Ti rispondiamo con la disponibilità e la formazione adatta.'
    }
} satisfies Record<string, FaqItem>;
