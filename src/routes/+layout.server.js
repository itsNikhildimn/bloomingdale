import { getParentFeedback } from '$lib/api/ParentFeedback.js';
import { getNewsFeed } from '$lib/api/NewsFeed.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  return {
    feedback: await getParentFeedback(),
    news: await getNewsFeed()
  };
};