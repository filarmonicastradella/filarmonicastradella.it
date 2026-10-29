import { MediaQuery } from "svelte/reactivity";

// Stato del menu mobile, condiviso tra l'intestazione (che lo apre e lo chiude) e il layout (che al cambio
// di pagina lascia vedere la chiusura del menu invece della dissolvenza tra le pagine).
// Il pannello esiste solo sotto 64rem: se la finestra si allarga con il menu aperto (un tablet girato), il menu
// conta come chiuso, così la pagina non resta bloccata dietro un pannello che non c'è più.
const wide = new MediaQuery("min-width: 64rem");
let open = $state(false);

export const menu = {
    get open() {
        return open && !wide.current;
    },
    set open(value: boolean) {
        open = value;
    }
};
