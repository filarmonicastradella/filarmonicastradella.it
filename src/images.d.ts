// Immagini della storia: importate con larghezze esplicite (`?enhanced&w=480;960;1600`).
declare module "*?enhanced&w=480;960;1600" {
    const picture: import("vite-imagetools").Picture;
    export default picture;
}
