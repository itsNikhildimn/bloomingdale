//---------------------------------------------------------------------------
// Module:  $lib/api/Teachers.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

import { getMediaInfo } from './helpers';

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getTeachers
//    Returns highlighted teachers, extracted from the API response from
// Strapi.
//---------------------------------------------------------------------------

export async function getTeachers() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/teachers?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error(body.error.message);

		return body.data.map((item) => {
			const image = getMediaInfo(item.image);
			return {
				id: item.id,
				name: item.name,
				role: item.role,
				about: {
					exp: item.experience,
					bio: item.biography
				},
				image: image?.URL,
				alt: image?.altText || ''
			};
		});
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load teacher data', err);
	}

	// Empty list as fallback
	return [];
}
