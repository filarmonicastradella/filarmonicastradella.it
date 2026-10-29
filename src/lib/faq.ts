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
        question: "Chi dirige?",
        answer: "Più direttori, che sono prima di tutto musicisti: ognuno dirige in autonomia i propri brani, e negli altri suona con tutti."
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
