import { getEventFeed } from '$lib/api/EventFeed.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const now = new Date();
	const startOfCurrentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const eventsToShow = 4;

	const feed = await getEventFeed();

	// get index of nearest future event to the date now
	const i = feed.indexOf(
		feed.find((evt) => {
			return evt.when.getTime() >= startOfCurrentDay.getTime();
		})
	);

	let filteredEvents;
	const future = feed.slice(i, i + eventsToShow);
	const past = feed.slice(Math.max(0, i - eventsToShow), i);
	const diff = eventsToShow - future.length;

	if (diff === 0) {
		filteredEvents = future;
	} else {
		filteredEvents = [...past.slice(-diff), ...future];
	}

	return {
		events: filteredEvents
	};
}

// Local data:

// Sort the events by due date. Find the ones starting on
// or after today’s date; if six or more, take the first six. If
// less than six, fill to six (if possible) with the most recent
// from those prior to today’s date.
