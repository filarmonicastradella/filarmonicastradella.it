import { getPastEvents, getUpcomingEvents } from "$lib/server/calendar";
import type { PageServerLoad } from "./$types";

// Gli eventi in programma; di quelli passati basta sapere se ce ne sono, per il rimando a Eventi passati
export const load: PageServerLoad = async () => ({ events: await getUpcomingEvents(), hasPast: (await getPastEvents()).length > 0 });
