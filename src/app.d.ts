/// <reference types="@sveltejs/enhanced-img" />
/// <reference types="unplugin-icons/types/svelte" />
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// La foto o il video aperto nella finestra di Foto e video, con il suo indirizzo nella barra (InstagramGrid)
		interface PageState {
			photo?: string;
			// Aperta da Foto e video (si chiude tornando indietro), non arrivando dal link della foto
			pushed?: boolean;
		}
		// interface Platform {}
	}
}

export {};
