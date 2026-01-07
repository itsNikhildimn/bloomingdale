import { getOpportunities } from '$lib/api/Opportunities.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    jobs: await getOpportunities()
  };
};