import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import fs from 'node:fs';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/media': {
				target: 'http://127.0.0.1:1337',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/media/, '')
			}
		}
		// https: {
		//   key: fs.readFileSync('localhost.key'),
		//   cert: fs.readFileSync('localhost.crt')
		// }
	}
});
