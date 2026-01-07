import { getEventFeed } from '$lib/api/EventFeed.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return { events: await getEventFeed() };
};