/*
 * Condividere con il menu del dispositivo (WhatsApp, Messaggi, mail…), dove c'è; altrimenti, o se il dispositivo rifiuta, copiare
 * il link. Lo usano «Condividi l'articolo», «Condividi l'evento» e «Condividi» in Foto e video.
 *
 * Il rifiuto succede davvero: su Android, dopo una condivisione verso certe app, il browser a volte non si accorge che è finita e
 * rifiuta le successive («InvalidStateError») finché la pagina non si ricarica; e il menu si apre solo subito dopo un tocco
 * («NotAllowedError»). In questi casi il link si copia, e il pulsante lo dice. Se è chi condivide ad annullare («AbortError»),
 * niente. «failed»: né condiviso né copiato (per esempio un file senza link, che chi chiama può ripiegare sul link).
 *
 * Il menu solo sui dispositivi a tocco (telefoni e tablet); sul computer il link si copia e basta (dal 12/11/2026): lì il menu di
 * sistema, dove c'è, è scomodo e poco conosciuto.
 */
const touch = () => matchMedia("(pointer: coarse)").matches;

export async function share(data: ShareData): Promise<"shared" | "copied" | "cancelled" | "failed"> {
    if (touch() && navigator.share && (!data.files || navigator.canShare?.(data))) {
        try {
            await navigator.share(data);
            return "shared";
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
        }
    }
    if (!data.url || !navigator.clipboard) return "failed";
    try {
        await navigator.clipboard.writeText(data.url);
        return "copied";
    } catch {
        return "failed";
    }
}
