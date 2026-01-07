//---------------------------------------------------------------------------
// Module:  $lib/api/ParentFeedback.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

// Helper functions:
import { getMediaInfo } from './helpers';

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getParentFeedback
//    Returns parent feedback entries as an array, extracted from the API
// response from Strapi.
//---------------------------------------------------------------------------

export async function getParentFeedback() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/parent-feedbacks?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		return body.data.map((item) => ({
			id: item.id,
			comment: item.comment,
			from: item.parentName,
			relation: item.relation,
			tags: item.tags?.split(',').map((s) => s.trim()) || [],
			photo: getMediaInfo(item.photo),
			video: getMediaInfo(item.video)?.URL
		}));
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load parent feedback', err);
	}

	return [];
}
