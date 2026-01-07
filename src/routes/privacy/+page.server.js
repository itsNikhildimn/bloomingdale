import { getPrivacyPolicy } from '$lib/api/PrivacyPolicy.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    body: await getPrivacyPolicy()
  }
}