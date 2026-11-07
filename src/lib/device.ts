/*
 * iPhone e iPad: lì i file di calendario (.ics, webcal://) si aprono da soli nel calendario del dispositivo; altrove
 * (Android, computer) i link portano a Google Calendar. Il browser non dice quali programmi ci sono (per la privacy),
 * quindi si guarda solo il sistema. L'iPad si presenta come un Mac: lo distingue lo schermo touch. Solo nel browser.
 */
export const isIos = () =>
    /iphone|ipad|ipod/i.test(navigator.userAgent) || (/macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
