<script>
    import Icon from "@iconify/svelte";
</script>

<footer>
    <div class="footer-container">
        <!-- Social Media Navigation -->
        <nav aria-label="Social media">
            <ul>
                <li>
                    <a href="https://instagram.com/filarmonicastradella" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <Icon icon="simple-icons:instagram" />
                    </a>
                </li>
                <li>
                    <a href="https://facebook.com/filarmonicastradella" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <Icon icon="simple-icons:facebook" />
                    </a>
                </li>
                <li>
                    <a href="https://wa.me/393505363110" aria-label="WhatsApp Business" target="_blank" rel="noopener noreferrer">
                        <Icon icon="simple-icons:whatsapp" />
                    </a>
                </li>
                <li>
                    <a href="https://youtube.com/@filarmonicastradella" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                        <Icon icon="simple-icons:youtube" />
                    </a>
                </li>
                <li>
                    <a href="https://tiktok.com/@filarmonicastradella" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                        <Icon icon="simple-icons:tiktok" />
                    </a>
                </li>
            </ul>
        </nav>

        <div class="footer-content">
            <p class="footer-title">Filarmonica Alessandro Stradella APS</p>
            
            <div class="footer-contacts">
                <address>
                    <span class="contact-line">
                        <span class="icon-wrapper">
                            <Icon icon="lucide:map-pin" />
                        </span>
                        <a href="https://maps.google.com/?q=Via+Stretta+5+54013+Fivizzano+MS" target="_blank" rel="noopener noreferrer">
                            Via Stretta 5, 54013 Fivizzano (MS)
                        </a>
                    </span>
                    <span class="separator">•</span>
                    <span class="contact-line">C.F. 90021290458</span>
                    <span class="separator">•</span>
                    <span class="contact-line">RUNTS Repertorio n. 176207</span>
                    <span class="separator">•</span>
                    <span class="contact-line">
                        <a href="https://www.anbima.it/massacarrara/regionetoscana-massacarrara-unita-di-base" target="_blank" rel="noopener noreferrer">
                            Affiliata ANBIMA APS
                        </a>
                    </span>
                </address>

                <div class="contact-details">
                    <div class="contact-item">
                        <span class="icon-wrapper">
                            <Icon icon="lucide:phone" />
                        </span>
                        <a href="tel:+393505363110">+39 350 536 3110</a>
                    </div>
                    <div class="contact-item">
                        <span class="icon-wrapper">
                            <Icon icon="lucide:mail" />
                        </span>
                        <a href="mailto:info@filarmonicastradella.it">info@filarmonicastradella.it</a>
                    </div>
                    <div class="contact-item">
                        <span class="icon-wrapper">
                            <Icon icon="lucide:shield-check" />
                        </span>
                        <a href="mailto:filarmonicastradella@pec.it">filarmonicastradella@pec.it</a>
                    </div>
                </div>
            </div>

            <ul class="footer-legal">
                <li><a href="/legal/privacy">Informativa Privacy</a></li>
                <span class="separator">•</span>
                <li><a href="/legal/cookies">Politica dei Cookie</a></li>
                <span class="separator">•</span>
                <li><a href="/legal/terms">Termini e Condizioni</a></li>
            </ul>
            
            <small>&copy; {new Date().getFullYear()} Filarmonica Alessandro Stradella APS. Tutti i diritti riservati.</small>
        </div>
    </div>
</footer>

<!--
<style>
    footer {
        background-color: var(--bg-subtle);
        color: var(--text-main);
        padding: var(--space-3xl) var(--space-lg);
        border-top: 1px solid var(--border-color-medium);
    }

    .footer-container {
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-2xl);
    }

    /* Social Navigation */
    footer nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: var(--space-xl);
    }

    footer nav ul a {
        color: var(--text-muted);
        font-size: 1.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: color var(--transition-fast);
    }

    footer nav ul a:hover {
        color: var(--color-primary);
    }

    /* Main Footer Content */
    .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--space-lg);
        border-top: 1px solid var(--border-color-medium);
        padding-top: var(--space-2xl);
    }

    .footer-title {
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-main);
        margin: 0;
        letter-spacing: var(--letter-spacing-tight);
    }

    .footer-contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-md);
    }

    address {
        font-style: normal;
        font-size: var(--font-size-sm);
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
        flex-wrap: wrap;
    }

    .contact-line {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2xs);
    }

    .contact-details {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xl);
        flex-wrap: wrap;
    }

    .contact-item {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2xs);
        font-size: var(--font-size-sm);
    }

    .icon-wrapper {
        display: inline-flex;
        align-items: center;
        color: var(--color-primary);
        font-size: 1rem;
        flex-shrink: 0;
    }

    .separator {
        color: var(--border-color-strong);
        font-size: var(--font-size-xs);
    }

    footer a {
        color: var(--text-muted);
        text-decoration: none;
        transition: color var(--transition-fast);
    }

    footer a:hover {
        color: var(--color-primary);
        text-decoration: none;
    }

    /* Legal Links */
    .footer-legal {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        flex-wrap: wrap;
        font-size: var(--font-size-xs);
    }

    small {
        font-size: var(--font-size-xs);
        color: var(--text-disabled);
        margin-top: var(--space-2xs);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        footer {
            padding: var(--space-2xl) var(--space-md);
        }

        footer nav ul {
            gap: var(--space-lg);
        }

        .contact-details {
            flex-direction: column;
            align-items: center;
            gap: var(--space-sm);
        }

        .footer-legal span.separator,
        address span.separator {
            display: none;
        }

        address {
            flex-direction: column;
            align-items: center;
            gap: var(--space-xs);
        }

        .contact-line {
            justify-content: center;
            text-align: center;
        }

        .footer-legal {
            flex-direction: column;
            align-items: center;
            gap: var(--space-xs);
        }
    }
</style>
-->