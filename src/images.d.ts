// Immagini della storia: importate con larghezze esplicite (`?enhanced&w=400;640;800;1280;1600`).
declare module "*?enhanced&w=400;640;800;1280;1600" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}

// Anteprime delle copertine: una miniatura sfocata incorporata nella pagina (`?w=24&blur=2&format=webp&inline`).
declare module "*&inline" {
    const src: string;
    export default src;
}
