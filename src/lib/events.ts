export interface EventItem {
    id: string;
    summary: string;
    description: string;
    location: string;
    start: string;
    when: string;
}

const CALENDAR_ID = "10769a48a48eab07981c5dc931bd2a4b4b629eae0cbfcc9a92c16f5391156d47@group.calendar.google.com";
const CALENDAR_API_KEY = "AIzaSyC9-pNI0BctliGuvjWlUWUP9eeAT2oaBBM";
const TIME_ZONE = "Europe/Rome";

const formatDay = (date: Date) =>
    date.toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short", timeZone: TIME_ZONE });

const formatTime = (date: Date) =>
    date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });

const stripTags = (html?: string) => (html ? html.replace(/<[^>]*>?/gm, "").trim() : "");

function formatEventTime(evt: any): string {
    const startDate = new Date(evt.start.dateTime || evt.start.date);
    const endValue = evt.end?.dateTime || evt.end?.date;
    const isAllDay = !evt.start.dateTime;
    const startDay = formatDay(startDate);

    if (!endValue) {
        return isAllDay ? startDay : `${startDay} • ${formatTime(startDate)}`;
    }

    const endDate = new Date(endValue);

    if (isAllDay) {
        const lastDay = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
        const lastDayLabel = formatDay(lastDay);
        return startDay === lastDayLabel ? startDay : `${startDay} - ${lastDayLabel}`;
    }

    if (startDay === formatDay(endDate)) {
        return `${startDay} • ${formatTime(startDate)} - ${formatTime(endDate)}`;
    }

    return `${startDay} ${formatTime(startDate)} - ${formatDay(endDate)} ${formatTime(endDate)}`;
}

export async function fetchUpcomingEvents(fetchFn: typeof fetch = fetch): Promise<EventItem[]> {
    const params = new URLSearchParams({
        key: CALENDAR_API_KEY,
        timeMin: new Date().toISOString(),
        maxResults: "10",
        orderBy: "startTime",
        singleEvents: "true"
    });
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;
    const res = await fetchFn(url);
    if (!res.ok) throw new Error(`Calendar API: ${res.status}`);
    const data = await res.json();

    return (data.items ?? []).map((evt: any): EventItem => ({
        id: evt.id,
        summary: evt.summary ?? "",
        description: stripTags(evt.description),
        location: evt.location ?? "",
        start: evt.start.dateTime || evt.start.date,
        when: formatEventTime(evt)
    }));
}
