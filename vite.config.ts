import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		// Icone Iconify come componenti Svelte, impacchettate alla build: nessuna richiesta esterna a runtime.
		Icons({ compiler: 'svelte' }),
		enhancedImages(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] })],

			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({ fallback: '404.html' }),

			// Il CSS è poco (circa 9 kB compressi): incorporato nell'HTML non blocca la prima visualizzazione
			inlineStyleThreshold: Infinity,

			// Le voci di navigazione puntano a pagine non ancora create: avvisa invece di far fallire la build.
			prerender: {
				handleHttpError: 'warn',
				// Senza eventi in programma /events/[id] e /events/[id].ics non hanno pagine da generare, e senza articoli in Markdown pubblicati
				// nemmeno /articles/[category]/[slug]: non è un errore, le altre route sì.
				handleUnseenRoutes: ({ routes, message }) => {
					const optional = ['/events/[id]', '/events/[id].ics', '/articles/[category]/[slug]'];
					if (routes.some((route) => !optional.includes(route))) throw new Error(message);
				}
			}
		})
	]
});
