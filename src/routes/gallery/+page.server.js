import { getPictures } from '$lib/api/Gallery.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    pictures: await getPictures()
  };
};