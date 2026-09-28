<script lang="ts">
    import { legalSeat } from "$lib/locations";
</script>

<footer>
    <section>
        <h2>Contatti</h2>

        <address>
            <dl>
                <dt>Indirizzo</dt>
                <dd>
                    <a href={legalSeat.mapsHref} target="_blank" rel="noopener noreferrer">{legalSeat.address.join(", ")}</a>
                </dd>
                <dt>Telefono</dt>
                <dd><a href="tel:+393505363110">+39 350 536 3110</a></dd>
                <dt>Email</dt>
                <dd><a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a></dd>
                <dt>PEC</dt>
                <dd><a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a></dd>
            </dl>
        </address>

        <p><a href="/contacts/message">Scrivici tramite il modulo di contatto</a></p>
    </section>

    <nav aria-label="Social media">
        <ul>
            <li><a href="https://instagram.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com/filarmonicastradella" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://wa.me/393505363110" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="https://youtube.com/@filarmonicastradella" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://tiktok.com/@filarmonicastradella" target="_blank" rel="noopener noreferrer">TikTok</a></li>
        </ul>
    </nav>

    <section>
        <h2>L'associazione</h2>

        <dl>
            <dt>Denominazione</dt>
            <dd>Filarmonica Alessandro Stradella APS</dd>
            <dt>Codice fiscale</dt>
            <dd>90021290458</dd>
            <dt>Iscrizione al RUNTS</dt>
            <dd>Repertorio n. 176207</dd>
            <dt>Affiliazione</dt>
            <dd>
                <a href="https://www.anbima.it/massacarrara/regionetoscana-massacarrara-unita-di-base" target="_blank" rel="noopener noreferrer">ANBIMA APS</a>
            </dd>
        </dl>
    </section>

    <nav aria-label="Informazioni legali">
        <ul>
            <li><a href="/legal/privacy">Informativa Privacy</a></li>
            <li><a href="/legal/cookies">Politica dei Cookie</a></li>
            <li><a href="/legal/terms">Termini e Condizioni</a></li>
        </ul>
    </nav>

    <p><small>&copy; {new Date().getFullYear()} Filarmonica Alessandro Stradella APS. Tutti i diritti riservati.</small></p>
</footer>
