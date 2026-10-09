<script lang="ts">
    import type { EventItem } from "$lib/events";

    // `level` è il livello del titolo, da scegliere in base a dove compare la scheda.
    let { event, level = 3 }: { event: EventItem; level?: 3 | 4 } = $props();

    // Tutto nel fuso di Fivizzano, qualunque sia quello di chi guarda.
    const timeZone = "Europe/Rome";
    const format = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString("it-IT", { timeZone, ...options });
    const dayKey = (date: Date) => date.toLocaleDateString("en-CA", { timeZone }); // AAAA-MM-GG, per confrontare i giorni

    // Le date "tutto il giorno" non hanno orario e finiscono il giorno dopo l'ultimo (fine esclusa).
    const allDay = $derived(!event.start.includes("T"));
    const start = $derived(new Date(event.start));
    const lastDay = $derived(event.end ? new Date(new Date(event.end).getTime() - (allDay ? 86_400_000 : 0)) : start);

    // Data in occhiello sopra il titolo: "sab 10 ottobre"; se dura più giorni "lun 7 – mar 8 dicembre".
    const sameDay = $derived(dayKey(lastDay) === dayKey(start));
    const sameMonth = $derived(dayKey(lastDay).slice(0, 7) === dayKey(start).slice(0, 7));
    const date = $derived.by(() => {
        const last = format(lastDay, { weekday: "short", day: "numeric", month: "long" });
        if (sameDay) return last;
        const first = format(start, sameMonth ? { weekday: "short", day: "numeric" } : { weekday: "short", day: "numeric", month: "long" });
        return `${first} – ${last}`;
    });

    // Didascalia: ora di inizio ("ore 21", "ore 20.30") e luogo.
    const time = $derived.by(() => {
        if (allDay) return "";
        const [hour, minute] = start.toLocaleTimeString("it-IT", { timeZone, hour: "numeric", minute: "2-digit" }).split(/[.:]/);
        return minute === "00" ? `ore ${hour}` : `ore ${hour}.${minute}`;
    });
    // Il calendario dà spesso l'indirizzo completo: nella scheda basta il nome del luogo, il resto è nella pagina dell'evento.
    const place = $derived(event.location.split(",")[0].trim());
    const separator = $derived(time && place ? " · " : "");
</script>

<article itemscope itemtype="https://schema.org/Event">
    <a itemprop="url" href="/events/{event.id}">
        <p><time itemprop="startDate" datetime={event.start}>{date}</time></p>
        {#if event.end}
            <meta itemprop="endDate" content={event.end} />
        {/if}
        <svelte:element this={`h${level}`}><span itemprop="name">{event.summary}</span></svelte:element>
        {#if event.description}
            <p itemprop="description">{event.description}</p>
        {/if}
        {#if time || place}
            <p>{time}{separator}{#if place}<span itemprop="location">{place}</span>{/if}</p>
        {/if}
    </a>
</article>

<style>
    /*
     * Ogni parte ha un numero fisso di righe, così nella griglia date, titoli e descrizioni partono alla
     * stessa altezza in tutte le schede: data e didascalia su una riga, titolo su due, descrizione su tre.
     * Il testo che non ci sta si interrompe con i puntini; quello intero è nella pagina dell'evento.
     */
    a > p:first-child,
    :is(h3, h4) ~ p:not([itemprop="description"]) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    h3,
    h4,
    [itemprop="description"] {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    h3,
    h4 {
        -webkit-line-clamp: 2;
        line-clamp: 2;
        min-block-size: 2lh;
    }

    [itemprop="description"] {
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }

    /* Ora e luogo come didascalia, sempre in fondo alla scheda */
    :is(h3, h4) ~ p:not([itemprop="description"]) {
        margin-block-start: auto;
        font-size: var(--fs-small);
    }
</style>
