/*
 * iPhone e iPad: lì i file di calendario (.ics, webcal://) si aprono da soli nel calendario del dispositivo; altrove
 * (Android, computer) i link portano a Google Calendar. Il browser non dice quali programmi ci sono (per la privacy),
 * quindi si guarda solo il sistema. L'iPad si presenta come un Mac: lo distingue lo schermo touch. Solo nel browser.
 */
export const isIos = () =>
    /iphone|ipad|ipod/i.test(navigator.userAgent) || (/macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

/*
 * Dispositivo e browser in poche parole, per le segnalazioni sul sito («iPhone, Safari 18, finestra larga 390 px»): si ricavano
 * dallo user agent, che il browser manda già a ogni pagina, e dalla finestra. Chi scrive li vede nel modulo e li può correggere.
 * Solo nel browser.
 */
const browsers: [string, RegExp][] = [
    ["Edge", /Edg(?:A|iOS)?\/(\d+)/],
    ["Samsung Internet", /SamsungBrowser\/(\d+)/],
    ["Opera", /OPR\/(\d+)/],
    ["Firefox", /(?:Firefox|FxiOS)\/(\d+)/],
    ["Chrome", /(?:Chrome|CriOS)\/(\d+)/],
    ["Safari", /Version\/(\d+)[\d.]* (?:Mobile\/\S+ )?Safari/]
];

export function describeDevice() {
    const agent = navigator.userAgent;
    const system = isIos()
        ? /iphone|ipod/i.test(agent)
            ? "iPhone"
            : "iPad"
        : /android/i.test(agent)
          ? "Android"
          : /windows/i.test(agent)
            ? "Windows"
            : /macintosh/i.test(agent)
              ? "Mac"
              : /cros/i.test(agent)
                ? "ChromeOS"
                : /linux/i.test(agent)
                  ? "Linux"
                  : "";
    const browser = browsers.map(([name, pattern]) => [name, agent.match(pattern)?.[1]]).find(([, version]) => version);
    return [system, browser && `${browser[0]} ${browser[1]}`, `finestra larga ${window.innerWidth} px`].filter(Boolean).join(", ");
}
