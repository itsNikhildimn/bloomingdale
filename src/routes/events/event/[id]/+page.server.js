import { getSingleEvent } from '$lib/api/EventFeed.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  return { event: await getSingleEvent(params.id) };
}