# Revisione di design: la home

Primo blocco della voce 0.1 della lista unica: una pagina sola, la home, guardata nel browser. Sola lettura, nessun file del sito toccato.

**Come.** Build del ramo `stili` (compresa la modifica aperta a `layout.css`, voce 3.1), anteprima locale, Chromium a 1280×800 e 390×844, tema chiaro e scuro; misure prese dagli stili calcolati. Skill: `critique-visual-hierarchy` e `critique-typography` (Owl-Listener), `better-typography` (jakubkrehel), `web-design-reviewer` (GitHub), installate oggi nel progetto. `docs/DESIGN.md` non è un vincolo: dove una proposta lo contraddice è scritto.

**Tipo.** **F** = la soluzione è chiara. **D** = serve una decisione. Tra parentesi la voce della lista unica, se c'era già.

## Da correggere

**1. «Per il tuo evento» è un pulsante pieno, non a contorno. F** *(Risolto il 4/11/2026, commit 8e6dcb4: ora è tra i pulsanti secondari di `forms.css`. Poi, lo stesso giorno, i due pulsanti si sono scambiati: pieno «Per il tuo evento», cioè l'azione della pagina, e a contorno «Sostienici» nel menu, su tutto il sito.)*
Nella prima schermata ci sono due pulsanti bordeaux pieni, «Sostienici» e «Per il tuo evento»; nel tema scuro due blocchi rosa. `Hero.svelte` lo vorrebbe secondario, a contorno, come dice anche `DESIGN.md` (un solo pulsante pieno). La regola però non vince mai: Svelte la compila come `header.svelte-x > p:where(.svelte-x) > a:where(.svelte-x)`, che pesa (0,1,3), mentre quella generale di `forms.css` pesa (0,2,4). Non è un problema di gusto: lo stile scritto non arriva in pagina.
Come sistemarlo: dare più peso alla regola della hero (per esempio ripetere `:only-child`), oppure togliere la variante dalla hero e farla diventare il pulsante secondario generale di `forms.css`, che esiste già per le mappe e i download. La seconda è più pulita.

**2. Su schermo largo la foto perde lo striscione. D** *(Deciso il 4/11/2026: conta che si vedano le teste, non lo striscione. Sul largo la foto è al 30%, così la testa del direttore entra anche nella fascia più bassa, 1280×720, dove al 35% era tagliata.)*
A 1280×800 la fascia della foto è alta 340 px e mostra solo l'orchestra; lo striscione «Società Filarmonica Fivizzano 1777-1987, duecento anni e un po'», che dice di che concerto si tratta (ed è nel testo alternativo), resta tagliato sopra. Sul telefono si legge. Sul largo la foto è un'orchestra qualunque; con lo striscione è *quel* concerto.
Scelte: alzare la posizione della foto sul largo (si perde un po' di podio in basso), o una fascia più alta su schermo largo. Da decidere guardando.

**3. Il luogo del primo evento non dice il paese. F (1.5)**
«ore 21 · Sala "Tobagi"»: la descrizione dice che il concerto è ad Aulla, la scheda no. Chi legge solo la riga pensa a Fivizzano. Va corretto su Google Calendar, nel campo luogo («Sala Tobagi, Aulla»). Nella stessa scheda restano il titolo con le maiuscole («Concerto Autunnale: A Tempo di Vita») e il «voi» di «Aspettate di sentire il bis», già in 1.5.

## Gerarchia

**4. Il punto d'ingresso è il nome, che è già nel logo. D (3.6)** *(4/11/2026: in sospeso. La riga con il prossimo concerto nella prima schermata metteva troppe cose insieme.)*
L'occhio va prima sulla foto, poi sul titolo «Filarmonica Alessandro Stradella», che ripete il logotipo dell'intestazione. Il prossimo concerto, l'informazione più utile per chi arriva, è sotto la piega sia a 1280 (la sezione comincia a circa 900 px) sia sul telefono (circa 940 px). Proposta: tenere il nome ma portare nella prima schermata una riga con il prossimo appuntamento (data, titolo, luogo, link), sotto il sottotitolo e al posto del pulsante o accanto. È la voce 3.6: ora c'è la misura.

**5. Sotto la hero, sei sezioni con lo stesso passo. D (3.4, 3.5)**
Prossimi eventi, Chi siamo, Suona con noi, Ultimi articoli, Momenti in musica, Sostieni la Filarmonica: stesso titolo a sinistra, stesso testo a destra, stessa pausa di 6 rem, stesso rimando in fondo. Quattro su sei sono una o due frasi e un link. Su schermo largo la colonna sinistra ha solo il titolo e la pagina sembra un elenco di cartelli: niente prevale, e la pagina è lunga (3385 px sul largo, 4750 sul telefono) per quello che dice.
Proposta: le tre sezioni «porta» (Chi siamo, Suona con noi, Sostieni) diventano un solo blocco con un titolo e tre righe brevi con link, come l'agenda degli eventi; restano due blocchi pieni (eventi e articoli). Contrasta con la regola «mai titoli Cormorant affiancati» solo se le tre righe diventano colonne: in righe una sotto l'altra no.

**6. «Momenti in musica» senza galleria è la sezione più debole. D (3.5, 3.20, 1.4)** *(Risolto il 4/11/2026: senza foto la sezione non compare; il link a Instagram resta nel piè di pagina.)*
Oggi, senza il token di Instagram, è un titolo, una frase («Le foto dei nostri concerti sono su Instagram.») e un link. Con la galleria vuota la sezione andrebbe nascosta, lasciando il link a Instagram nel testo di «Chi siamo» o nel piè di pagina, che ha già le icone dei social.

**7. Il rimando in maiuscoletto è il segno più forte della pagina. D (3.8)** *(Chiuso il 4/11/2026: i rimandi restano, sono il passo successivo di ogni sezione e non competono con il pulsante della prima schermata; regola in AGENTS.md. Testi corretti con il nome della pagina d'arrivo: «Associazione», «Iscrizione».)*
Cinque rimandi bordeaux in maiuscolo spaziato con la freccia, uno per sezione: dopo la hero sono l'unico colore della pagina, e quindi la cosa più vistosa. Il bordeaux finisce per indicare «vai altrove» più che «questo conta». Si ridurrebbero da soli con la proposta 5.

## Tipografia

**8. Sul telefono titolo di sezione e titolo di scheda quasi uguali. D (4.2)** *(4/11/2026: rimandato alla proposta di scala modulare, voce 4.14 della lista unica.)*
A 390 px «Prossimi eventi» (h2) è 28 px, «Concerto Autunnale…» (h3) è 24 px, nello stesso carattere: 4 px di differenza, e il peso è lo stesso (600). La gerarchia la reggono solo il filetto e lo spazio. Proposta: h2 più grande su telefono (36 px, come già in 4.2) oppure h3 a 500, così la scheda si legge come voce e non come titolo.

**9. Interlinee diverse per lo stesso ruolo. F** *(Risolto il 4/11/2026: tutti i titoli tranne l'h1 a 1,25, `--lh-snug`; anche `DESIGN.md`. Chiude la voce 4.1.)*
Gli h3 delle schede evento hanno interlinea 1,25 (30 px), gli h3 degli articoli 1,1 (26,4 px). Il titolo «La Filarmonica dei giovani. Duecento anni in musica: «Una mostra e tante idee»», su tre righe, a 1,1 è stretto: `better-typography` vuole almeno 1,2 per i titoli che vanno a capo, `DESIGN.md` dice 1,2 per il Titolo 3. Una sola interlinea per gli h3, 1,2 o 1,25.

**10. Il sottotitolo gioca con due parole in grassetto. D (0.5)** *(Risolto il 4/11/2026: il motto è «Le dissonanze in un accordo solo», senza grassetti, anche nella missione.)*
«Custodi della **tradizione**, interpreti del **futuro**»: grigio pietra con due parole in nero, che in più si contrappongono. È il motto ancora da decidere (0.5); se resta, meglio tutto dello stesso colore, senza grassetti: il gesto distintivo della pagina è già «Stradella» in corsivo bordeaux, e due enfasi in tre righe si fanno concorrenza.

**11. Piè di pagina: tre titoli Cormorant uguali affiancati. D (3.11)** *(Risolto il 4/11/2026: i titoli delle colonne sono occhielli in Jakarta maiuscolo; «L'associazione» è diventata «Dati dell'ente».)*
Su schermo largo «Contatti», «L'associazione», «Note legali» sono tre titoli Cormorant della stessa dimensione sulla stessa riga: è il caso che `DESIGN.md` §4 vieta. Basterebbe l'occhiello in Jakarta maiuscolo, quello già usato per «Indirizzo», «Telefono»; sul telefono, una colonna sola, il problema non c'è.

## Tema scuro

**12. La foto è il blocco più chiaro e il pulsante il secondo. D (3.19)** *(Chiuso il 4/11/2026: nel tema scuro le foto vanno bene così; il velo è stato alleggerito solo sulla carta.)*
Nella prima schermata scura la foto (bianco e nero velato, ma con fondo chiaro) e i due pulsanti rosa pieni sono le tre cose più luminose: l'occhio va lì e non al titolo. Il punto 1 toglie un pulsante; per la foto, un velo più scuro solo nel tema scuro.

## Cosa funziona

- Il logotipo e la prima schermata sul telefono: foto, nome, corde con i pallini puntati verso il pulsante, tutto in una schermata, senza nulla che scorra di lato.
- Le corde allineate sul bordo destro dalla hero al piè di pagina.
- La colonna di testo (circa 70 caratteri per riga) e l'agenda degli eventi in righe, chiara su tutte e due le larghezze.
- Il piè di pagina scuro chiude bene la pagina; i dati dell'ente in `<dl>` si leggono.
- I testi delle sezioni sono brevi e concreti («Le parti e la sala prove le mette l'associazione»).

## Ordine consigliato

1. Punto 1 (pulsante): un errore vero, piccolo.
2. Punti 3 e 9: correzioni secche.
3. Punti 4, 5, 6 insieme: sono la stessa decisione sulla struttura della home, e dipendono da 0.2.
4. Il resto con la revisione delle altre pagine, perché tocca stili generali (titoli, rimandi, piè di pagina).

Prossimo blocco: la prossima pagina, a scelta (proposta: Associazione, il primo indice del menu).
