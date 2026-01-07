import { getSchoolPolicies } from '$lib/api/SchoolPolicies.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    policies: await getSchoolPolicies()
  };
};