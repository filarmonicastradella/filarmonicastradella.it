export interface EventItem {
    id: string;
    summary: string;
    description: string;
    location: string;
    start: string;
    end: string;
    when: string;
    htmlLink: string;
}

// Un evento è ancora da mostrare finché non è finito (le date "tutto il giorno" finiscono il giorno dopo).
export const hasNotEnded = (event: EventItem, now: Date) => new Date(event.end || event.start).getTime() > now.getTime();
