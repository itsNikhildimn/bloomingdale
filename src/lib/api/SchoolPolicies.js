//---------------------------------------------------------------------------
// Module:  $lib/api/SchoolPolicies.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

//Helper functions:
import { getMediaInfo } from './helpers.js';

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getSchoolPolicies
//    Returns school policies as an array, extracted from the API
// response from Strapi.
//---------------------------------------------------------------------------

export async function getSchoolPolicies() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/policies?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error(body.error.message);

		return body.data.map((item) => ({
			id: item.documentId,
			title: item.title,
			summary: item.summary || '',
			policyDoc: getMediaInfo(item.policyDoc)?.URL
		}));
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load parent feedback', err);
	}

	return [
		// Titles only, as a fallback.
		{ title: 'Academic Integrity Policy' },
		{ title: 'Admission Policy' },
		{ title: 'Assessment Policy' },
		{ title: 'Inclusion Policy' },
		{ title: 'Language Policy' }
	];
}
