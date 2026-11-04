# Revisione di design: Associazione

Secondo blocco della voce 0.1. Pagina `/associazione`, primo indice del menu. Stesso metodo della home (`design-home-2026-11-03.md`): build di `stili`, Chromium a 1280×800 e 390×844, chiaro e scuro, misure dagli stili calcolati; skill `critique-visual-hierarchy`, `critique-typography`, `better-typography`, `web-design-reviewer`. Sola lettura.

**Tipo.** **F** = la soluzione è chiara. **D** = serve una decisione. Tra parentesi la voce della lista unica, se c'era già.

## Com'è

Titolo, una frase di presentazione, quattro schede di solo testo in due colonne (Missione, Storia, Stradella, Iscrizione e variazioni), poi il piè di pagina. Sul largo il contenuto finisce a 810 px e il piè di pagina ne occupa altri 610; sul telefono il contenuto finisce a 990 px e il piè di pagina arriva a 2457.

## Gerarchia

**1. Il piè di pagina pesa più della pagina. D (3.11)** *(In parte risolto il 4/11/2026: occhielli al posto dei titoli Cormorant, «Dati dell'ente» al posto di «L'associazione». L'altezza resta.)*
È l'unico fondo scuro, ha tre titoli Cormorant e undici righe di dati: sul largo è alto quasi quanto il contenuto, sul telefono più del doppio. In più uno dei suoi titoli è «L'associazione», lo stesso testo dell'h1 della pagina. In una pagina corta come questa la parte più vistosa è quella che si ripete uguale ovunque. Proposta: occhielli in Jakarta al posto dei tre titoli (già in 3.11), e un nome diverso per la colonna dei dati («Dati dell'ente», «L'ente»).

**2. Quattro schede uguali, due tipi di contenuto. D (3.10)**
Missione, Storia e Stradella sono letture (articoli); Iscrizione è una cosa da fare, con un modulo e una quota. Nella griglia pesano uguale e l'iscrizione, l'unica azione della pagina, è l'ultima in basso a destra, dove l'occhio arriva per ultimo. Proposta: le tre letture come schede, l'iscrizione come sezione a sé sotto («Fare parte della Filarmonica», una frase e il pulsante pieno verso il modulo), che con la regola nuova dei pulsanti è proprio l'azione della pagina.

**3. Una pagina senza immagini, con tre immagini pronte. D (3.10)**
Storia e Stradella hanno già una copertina (la foto degli anni Trenta, la *Serenata*); la missione no. Una miniatura nelle schede delle letture darebbe alla pagina un punto d'ingresso che oggi manca: ora l'occhio va solo sul titolo e poi scorre su quattro blocchi grigi identici. Se la missione resta senza immagine, le schede con immagine si fanno solo se ce l'hanno tutte; altrimenti meglio nessuna.

**4. Titoli Cormorant uguali affiancati. D (3.10)**
Sul largo le schede sono due per riga: quattro h2 Cormorant da 24 px, a coppie sulla stessa riga. È quello che `DESIGN.md` §4 vieta («mai due titoli in Cormorant della stessa dimensione affiancati»), e vale anche per Formazioni e Sostienici. O la regola si riscrive («affiancati come titoli di pagina», non nelle griglie di schede), o le schede vanno una sotto l'altra come le agende. La proposta 2 la risolve qui (tre schede su una riga restano affiancate).

## Testi

**5. La presentazione dice due volte la stessa cosa. F** *(Risolto il 4/11/2026.)*
«La Filarmonica Alessandro Stradella APS è un'associazione di promozione sociale … che promuove la cultura musicale dal 1777»: APS è già «associazione di promozione sociale», e «promozione … promuove» si ripete. Proposta, con i soli fatti già sul sito: «Dal 1777 la Filarmonica Alessandro Stradella fa musica a Fivizzano, in Lunigiana. Oggi è un'associazione di promozione sociale con quattro formazioni.»

**6. «Iscrizione e variazioni». D** *(Risolto il 4/11/2026: titolo «Iscrizione», nella scheda e nella pagina.)*
«Variazioni» è il nome del modulo, non quello che cerca chi legge. Proposta: titolo «Iscrizione», e la variazione dei dati resta nella riga sotto («…o per aggiornare i tuoi dati e i consensi»). Il titolo della pagina d'arrivo andrebbe cambiato insieme (regola dei rimandi: stesso nome).

**7. «Chi siamo, in cosa crediamo e come stiamo insieme.» F** *(Risolto il 4/11/2026: «Perché siamo rinati, in cosa crediamo e dove vogliamo arrivare», dai titoli della missione.)*
Per la missione è la riga più vaga delle quattro: le altre hanno un dato (1777, Seicento, 12 €). Proposta: una frase con un fatto della missione, per esempio «Perché suoniamo, per chi, e cosa chiediamo a chi entra.»

## Tipografia e misure

- Titolo 44 px sul largo, 37,75 sul telefono; presentazione 18/28,8; schede 24/30 e 16/25,6: coerenti con la scala, interlinee uguali (dopo la correzione del 4/11).
- Sul telefono la presentazione va su cinque righe da circa 30 caratteri: le corde le tolgono quasi un quarto della larghezza (3.18). Qui si sente più che in home, perché è l'unico testo della pagina prima delle schede.
- Tra presentazione e schede ci sono 130 px vuoti sul largo: è lo stacco di 6 rem tra i blocchi. Con le corde che finiscono a 360 px, la parte destra della prima schermata resta vuota; con la proposta 3 si riempirebbe.

## Tema scuro

Nessun problema nuovo: contrasti buoni, piè di pagina in bordeaux notte che si stacca dal fondo. La voce attiva del menu e le corde in rosa velluto.

## Cosa funziona

- La voce «Associazione» evidenziata nel menu: si sa dove si è.
- Le righe delle schede sono brevi e concrete (tre su quattro hanno un dato).
- Le schede sono intere cliccabili, con il filetto che diventa bordeaux: si capisce che sono link.

## Ordine consigliato

1. Punti 5 e 7: testi, correzioni secche.
2. Punti 2, 3 e 4 insieme: sono la stessa decisione sull'impaginazione delle pagine indice (vale anche per Formazioni e Sostienici).
3. Punto 1 con il piè di pagina (3.11), che riguarda tutte le pagine.
4. Punto 6 se si cambia anche il nome della pagina d'arrivo.
