/*
 * La firma nei moduli (dal 8/11/2026): chi dichiara scrive nome e cognome invece di spuntare una casella, un gesto più
 * consapevole (per la legge è comunque una firma elettronica semplice, come la spunta). Il pattern del campo controlla
 * che il nome firmato sia quello scritto sopra, senza badare a maiuscole e spazi; se i nomi mancano non c'è controllo.
 * L'attributo pattern è sempre intero e con il flag v: si proteggono solo i caratteri della sintassi.
 */
const letters = (text: string) =>
    [...text.trim()]
        .map((char) =>
            /\s/.test(char)
                ? "\\s+"
                : char.toLowerCase() !== char.toUpperCase()
                  ? `[${char.toLowerCase()}${char.toUpperCase()}]`
                  : /[\^$\\.*+?()[\]{}|/]/.test(char)
                    ? `\\${char}`
                    : char
        )
        .join("")
        .replace(/(\\s\+)+/g, "\\s+");

/** Il pattern per la firma: uno dei modi di scrivere il nome dati (per esempio nome e cognome, o cognome e nome) */
export const signaturePattern = (...ways: string[]) => {
    const valid = ways.map((way) => way.trim()).filter((way) => way.length >= 2);
    return valid.length ? `\\s*(?:${valid.map(letters).join("|")})\\s*` : undefined;
};
