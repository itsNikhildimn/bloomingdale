//---------------------------------------------------------------------------
// Module:  $lib/api/BusRoutes.js
//
// This module should be imported only on the server. It hides the complexity
// of fetching Event data from the Strapi CMS.
//---------------------------------------------------------------------------

// Configuration data:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getBusRoutes
//    Returns school bus routes as an array, extracted from the API
// response from Strapi.
//---------------------------------------------------------------------------

export async function getBusRoutes() {
	try {
		const response = await fetch(`${STRAPI_SERVER_URL}/api/bus-routes?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error(body.error.message);

		return body.data.map((item) => ({
			id: item.id,
			name: item.name,
			mapRef: item.mapref,
			stops: item.stops.map((stop) => ({
				time: stop.time,
				location: stop.location
			}))
		}));
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load bus routes', err);
	}

	return [
		// Names only, as a fallback.
		{ name: 'Route 1', stops: [] },
		{ name: 'Route 2', stops: [] },
		{ name: 'Route 3', stops: [] },
		{ name: 'Route 4', stops: [] },
		{ name: 'Route 5', stops: [] }
	];
}
