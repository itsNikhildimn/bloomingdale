//import adapter from 'svelte-adapter-appengine';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			nodejsRuntime: 18,
      precompress: true
		})
	}
};

export default config;
