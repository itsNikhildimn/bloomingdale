//---------------------------------------------------------------------------
// Module:  $lib/api/Gallery.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching data from the Strapi CMS.
//---------------------------------------------------------------------------

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';
import { PUBLIC_MEDIA_PREFIX } from '$env/static/public';

//---------------------------------------------------------------------------
// getPictures
//    Returns media listed in the singleton 'Gallery', as an array.
//---------------------------------------------------------------------------

export async function getPictures() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/gallery?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error(body.error.message);

		return body.data.pictures.map((item) => ({
			id: item.id,
			URL: PUBLIC_MEDIA_PREFIX + item.url,
			width: item.width,
			height: item.height,
			altText: item.alternativeText
		}));
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load gallery', err);
	}

	return [];
}
