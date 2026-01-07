//---------------------------------------------------------------------------
// Module:  $lib/api/PrivacyPolicy.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getPrivacyPolicy
//    Returns parent feedback entries as an array, extracted from the API
// response from Strapi.
//---------------------------------------------------------------------------

export async function getPrivacyPolicy() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/privacy-policy?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		return body.data.body;
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load privacy policy', err);
	}

	return '';
}
