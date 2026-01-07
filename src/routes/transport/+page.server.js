import { getBusRoutes } from '$lib/api/BusRoutes.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    routes: await getBusRoutes()
  };
};