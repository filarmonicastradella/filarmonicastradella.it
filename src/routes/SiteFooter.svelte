<script lang="ts">
    import InstagramIcon from "~icons/simple-icons/instagram";
    import FacebookIcon from "~icons/simple-icons/facebook";
    import WhatsappIcon from "~icons/simple-icons/whatsapp";
    import YoutubeIcon from "~icons/simple-icons/youtube";
    import TiktokIcon from "~icons/simple-icons/tiktok";
    import { legalSeat } from "$lib/locations";
    import { organization } from "$lib/organization";

    const socials = [
        { name: "Instagram", href: "https://instagram.com/filarmonicastradella", Icon: InstagramIcon },
        { name: "Facebook", href: "https://facebook.com/filarmonicastradella", Icon: FacebookIcon },
        { name: "WhatsApp", href: "https://wa.me/393505363110", Icon: WhatsappIcon },
        { name: "YouTube", href: "https://youtube.com/@filarmonicastradella", Icon: YoutubeIcon },
        { name: "TikTok", href: "https://tiktok.com/@filarmonicastradella", Icon: TiktokIcon }
    ];
</script>

<footer>
    <nav aria-label="Social media">
        <ul>
            {#each socials as { name, href, Icon } (name)}
                <li>
                    <a {href} target="_blank" rel="noopener noreferrer">
                        <Icon aria-hidden="true" />
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
            <dd>
                <a href={organization.runts.href} target="_blank" rel="noopener noreferrer">{organization.runts.name}</a>
            </dd>
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
