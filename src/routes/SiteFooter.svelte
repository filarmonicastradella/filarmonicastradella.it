<script lang="ts">
    import { siFacebook, siInstagram, siTiktok, siWhatsapp, siYoutube } from "simple-icons";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    const socials = [
        { name: "Instagram", href: "https://instagram.com/filarmonicastradella", icon: siInstagram },
        { name: "Facebook", href: "https://facebook.com/filarmonicastradella", icon: siFacebook },
        { name: "WhatsApp", href: "https://wa.me/393505363110", icon: siWhatsapp },
        { name: "YouTube", href: "https://youtube.com/@filarmonicastradella", icon: siYoutube },
        { name: "TikTok", href: "https://tiktok.com/@filarmonicastradella", icon: siTiktok }
    ];
</script>

<footer>
    <nav aria-label="Social media">
        <ul>
            {#each socials as { name, href, icon } (name)}
                <li>
                    <a {href} target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg>
                        <span>{name}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

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
                <dd><a href="mailto:{organization.pec}">{organization.pec}</a></dd>
            </dl>
        </address>
    </section>

    <section>
        <h2>L'associazione</h2>

        <dl>
            <dt>Denominazione</dt>
            <dd>{organization.name}</dd>
            <dt>Codice fiscale</dt>
            <dd>{organization.taxCode}</dd>
            <dt>Iscrizione al RUNTS</dt>
            <dd>{organization.runts}</dd>
            <dt>Affiliazione</dt>
            <dd>
                <a href={organization.affiliation.href} target="_blank" rel="noopener noreferrer">{organization.affiliation.name}</a>
            </dd>
        </dl>
    </section>

    <nav aria-label="Informazioni">
        <h2>Informazioni</h2>
        <ul>
            <li><a href="/legal/privacy">Informativa Privacy</a></li>
            <li><a href="/legal/cookies">Politica dei Cookie</a></li>
            <li><a href="/faq">Domande frequenti</a></li>
        </ul>
    </nav>

    <p><small>&copy; {new Date().getFullYear()} Filarmonica Alessandro Stradella APS. Tutti i diritti riservati.</small></p>
</footer>
