// Domande frequenti che compaiono in più pagine (iscrizione, formazioni, musicisti): ogni risposta è scritta una
// volta sola, qui, così non si contraddicono. Le risposte sono HTML scritto da noi, con i soli link interni.
export interface FaqItem {
    question: string;
    answer: string;
}

export const faq = {
    impegno: {
        question: "Che impegno è richiesto?",
        answer: "Partecipare ad almeno metà delle attività, tra concerti, prove e momenti di vita associativa."
    },
    prove: {
        question: "Quanto spesso provate?",
        answer: "Una o due volte a settimana, più spesso prima dei concerti."
    },
    livello: {
        question: "Che livello serve?",
        answer: "Dipende dalla formazione, ma ce n'è una per ogni livello."
    },
    daZero: {
        question: "Posso cominciare da zero?",
        answer: "Sì: c'è posto anche per chi non ha mai suonato uno strumento."
    },
    repertorio: {
        question: "Chi sceglie i brani?",
        answer: "I musicisti: propongono i brani e li votano in una graduatoria, e i direttori scelgono da lì quelli da suonare."
    },
    direttori: {
        question: "Chi è il maestro?",
        answer: "Non ce n'è uno solo: i direttori sono più di uno e sono prima di tutto musicisti. Ognuno dirige in autonomia i propri brani, e negli altri suona con tutti."
    },
    evento: {
        question: "Potete suonare al mio evento?",
        answer:
            'Sì: per un concerto, un convegno, una cerimonia o una festa <a href="/booking">raccontaci l\'occasione</a>. Ti rispondiamo con la disponibilità e la formazione adatta.'
    },
    strumento: {
        question: "Devo avere uno strumento mio?",
        answer: "No: strumento, parti e sala prove li mette a disposizione l'associazione."
    },
    strumentiCercati: {
        question: "Quali strumenti cercate?",
        answer: "Tutti, e in particolare oboe, fagotto e altri archi."
    }
} satisfies Record<string, FaqItem>;
