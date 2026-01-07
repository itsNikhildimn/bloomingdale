//---------------------------------------------------------------------------
// Module:  $lib/api/helpers.js
//
// This module provides a number of 'helper' functions that make the task of
// unpacking Strapi API responses easier and more consistent.
//---------------------------------------------------------------------------

import { PUBLIC_MEDIA_PREFIX } from '$env/static/public';

//---------------------------------------------------------------------------
// getMediaInfo
//    Extracts data (URL & size) from a Strapi 'media' field. If the field
// is empty then a supplied default (d) - or the value 'undefined' if no
// default - is returned in its place.
//---------------------------------------------------------------------------

export function getMediaInfo(p, d = undefined) {
	return p
		? {
				URL: (PUBLIC_MEDIA_PREFIX || '') + p.url,
				width: p.width,
				height: p.height,
				altText: p.alternativeText
		  }
		: d;
}

//---------------------------------------------------------------------------
// getUserName
//    Unpacks a Strapi user name.
//---------------------------------------------------------------------------

export function getUserName(p) {
	return p ? [p.firstname, p.lastname].join(' ') : 'Unknown author';
}
