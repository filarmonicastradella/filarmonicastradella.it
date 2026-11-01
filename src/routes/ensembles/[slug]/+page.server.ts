import { getUpcomingEvents } from "$lib/server/calendar";
import type { PageServerLoad } from "./$types";

// Gli eventi in cui suona la formazione: quelli con il suo hashtag nella descrizione (src/lib/server/calendar.ts).
export const load: PageServerLoad = async ({ params }) => ({
    events: (await getUpcomingEvents()).filter(({ ensembles }) => ensembles.some(({ slug }) => slug === params.slug))
});
