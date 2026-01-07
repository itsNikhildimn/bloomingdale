//---------------------------------------------------------------------------
// Module:  $lib/api/EventFeed.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

// Helper functions:
import { getMediaInfo, getUserName } from './helpers.js';

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

// Constants:

const emptyEvent = {
	id: 'N/A',
	title: 'undefined',
	featured: { URL: null, width: 800, height: 800 },
	author: 'N/A',
	publishedAt: new Date(0),
	updatedAt: new Date(0),
	body: 'Event not found'
};

//---------------------------------------------------------------------------
// getEventFeed
//    Returns an array of all events (less their body text), sorted by date
// of publication (latest first).
//---------------------------------------------------------------------------

export async function getEventFeed() {
	let events = [];

	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/events?sort[0]=when:desc&populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		events = body.data.map((event) => ({
			id: event.id,
			title: event.title || 'No title',
			category: event.category,
			when: new Date(event.when),
			featured: getMediaInfo(event.featured),
			author: getUserName(event.createdBy),
			summary: event.summary,
			publishedAt: new Date(event.publishedAt),
			updatedAt: new Date(event.updatedAt)
		}));
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load event data', err);
	}

	return events;
}

//---------------------------------------------------------------------------
// getSingleEvent
//    Does what it says on the tin.
//---------------------------------------------------------------------------

export async function getSingleEvent(id) {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/events/${id}?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();
		const event = body.data;

		return {
			id: event.id,
			title: event.title || 'No title',
			when: new Date(event.when),
			featured: getMediaInfo(event.featured),
			author: getUserName(event.createdBy),
			publishedAt: new Date(event.publishedAt),
			updatedAt: new Date(event.updatedAt),
			body: event.body || event.summary || ''
		};
	} catch (err) {
		console.log('Failed to load event data', err);
	}

	return { ...emptyEvent, id };
}
