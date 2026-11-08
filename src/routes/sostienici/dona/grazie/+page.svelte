<!-- Dopo una donazione con Stripe: il link di pagamento rimanda qui (dal 8/11/2026). Fuori dai motori e dalla mappa del sito. -->
<svelte:head>
    <title>Grazie per la tua donazione — Filarmonica Alessandro Stradella</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<header>
    <h1>Grazie per la tua donazione</h1>
    <p>
        Il tuo contributo ci aiuta a pagare strumenti, spartiti, sala prove e concerti. Riceverai un'email con la conferma del pagamento. Per la
        ricevuta valida per la detrazione compila il modulo: il tesoriere te la manda per email.
    </p>
    <!-- Il modulo per la ricevuta con la modalità già scelta: chi arriva qui ha pagato online con Stripe -->
    <p><a href="/contatti/scrivi?motivo=ricevuta&amp;modalita=carta">Chiedi la ricevuta</a></p>
</header>

<p class="rimando"><a href="/sostienici">Sostienici</a></p>
