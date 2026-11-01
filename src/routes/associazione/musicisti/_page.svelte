<!-- Elenco dei musicisti dato dall'utente il 26/10/2026, aggiornato il 29/10/2026 (archi). In ogni strumento i nomi vanno in ordine alfabetico di cognome. -->
<script lang="ts">
    const families = [
        {
            name: "Legni",
            sections: [
                { name: "Ottavino", players: ["Matilde Ottanelli"] },
                { name: "Flauto", players: ["Ester Caracausi", "Federico Fiorentino", "Margherita Marchetti"] },
                {
                    name: "Clarinetto",
                    players: [
                        "Giordano Ambrosini",
                        "Yasmine Bouafiya",
                        "Alex Carlini",
                        "Simone Del Macchia",
                        "Elena Ferrari",
                        "Erica Giorgi",
                        "Caterina Lucchini",
                        "Samuele Pozzi"
                    ]
                },
                { name: "Clarinetto basso", players: ["Leonardo Orietti"] },
                { name: "Sassofono soprano", players: ["Mattia Furfori"] },
                { name: "Sassofono contralto", players: ["Martina Benedetti", "Ibrahima Diouf", "Barbara Orietti", "Enea Pedrini", "Ludovico Tonelli"] },
                { name: "Sassofono tenore", players: ["Alessio Linari", "Lorenzo Poletti"] },
                { name: "Sassofono baritono", players: ["Maurizio Calasso"] }
            ]
        },
        {
            name: "Ottoni",
            sections: [
                { name: "Tromba", players: ["Francesco Antoniotti", "Elia Belloni", "Lorenzo Lombardi", "Stefano Trusendi"] },
                { name: "Corno", players: ["Andrei Neagovici", "Luca Pinelli"] },
                { name: "Euphonium", players: ["Mario Lombardi", "Manuel Pasquelli"] },
                { name: "Trombone", players: ["Federico Gavarini", "Aaron Venturi"] },
                { name: "Tuba", players: ["Gianfranco Gavarini", "Federico Polloni"] }
            ]
        },
        {
            name: "Percussioni",
            sections: [
                { name: "Percussioni", players: ["Santiago Del Duca", "Marco Lombardi", "Giacomo Viola"] },
                { name: "Glockenspiel", players: ["Saverio Crocetti"] }
            ]
        },
        {
            name: "Archi",
            sections: [
                { name: "Violino", players: ["Martha Crocetti", "Olga Martinelli", "Alfred Richter", "Eleonora Rocchi", "Riccardo Toffano"] },
                { name: "Violoncello", players: ["Michela Adorni", "Gabriella Mauri"] },
                { name: "Contrabbasso", players: ["Nicola Guazzagni", "Marta Viola"] }
            ]
        }
    ];
</script>

<svelte:head>
    <title>I nostri musicisti — Filarmonica Alessandro Stradella</title>
    <meta name="description" content="I musicisti della Filarmonica Alessandro Stradella, divisi per strumento: legni, ottoni, percussioni e archi." />
</svelte:head>

<header>
    <h1>I nostri musicisti</h1>
    <p>Sono loro a fare la Filarmonica: musicisti volontari, ragazzi e adulti insieme, strumento per strumento.</p>
</header>

{#each families as family (family.name)}
    <section>
        <h2>{family.name}</h2>
        <dl>
            {#each family.sections as section (section.name)}
                <div>
                    <dt>{section.name}</dt>
                    {#each section.players as player (player)}
                        <dd>{player}</dd>
                    {/each}
                </div>
            {/each}
        </dl>
    </section>
{/each}


<p class="rimando"><a href="/associazione">L'associazione</a></p>
