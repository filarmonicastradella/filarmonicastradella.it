// I contributi, le sovvenzioni e i vantaggi economici ricevuti da pubbliche amministrazioni, in un solo punto:
// li leggono la tabella di /trasparenza/contributi e il file /trasparenza/contributi.csv. Un contributo nuovo si aggiunge qui.
export interface Contribution {
    year: number;
    grantor: string;
    // In euro, con i centesimi dopo il punto (1250.5)
    amount: number;
    purpose: string;
}

export const contributions: Contribution[] = [];

export const amountFormat = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
