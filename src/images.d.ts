// Foto d'archivio: larghezze esplicite e qualità 40, che in AVIF quasi dimezza il peso senza differenze visibili
// (`?enhanced&w=400;640;800;1280;1600&quality=40`). Le foto a colori (copertine, home, «oggi») no:
// con la qualità 40 si vedevano sfocate.
declare module "*&quality=40" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}

// Foto a colori con larghezze esplicite (`?enhanced&w=400;640;800;1280;1600`), alla qualità predefinita.
declare module "*?enhanced&w=400;640;800;1280;1600" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}

// Il fregio del sonetto, un disegno al tratto largo al massimo 16rem: qualità predefinita, per non sfumare i contorni.
declare module "*?enhanced&w=256;512;768" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}

// Anteprime delle copertine: una miniatura sfocata incorporata nella pagina (`?w=24&blur=2&format=webp&inline`).
declare module "*&inline" {
    const src: string;
    export default src;
}

// La foto della hero, a tutta larghezza: anche 2048 per gli schermi grandi (`?enhanced&w=2048;1600;1280;960;640`).
declare module "*?enhanced&w=2048;1600;1280;960;640" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}
