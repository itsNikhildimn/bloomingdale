import { getTeachers } from '$lib/api/Teachers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return { teachers: await getTeachers() };
};