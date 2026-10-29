// Foto: larghezze esplicite e qualità 40, che in AVIF quasi dimezza il peso senza differenze visibili
// (`?enhanced&w=400;640;800;1280;1600&quality=40`); la copertina della home tiene le larghezze automatiche.
declare module "*&quality=40" {
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
