//---------------------------------------------------------------------------
// Module:  $lib/api/NewsFeed.js
//
// This module should be imported only in the server. It provides various
// functions for loading and caching News stories from the local CMS.
//---------------------------------------------------------------------------

// Helper functions:
import { getMediaInfo, getUserName } from './helpers.js';

// Constants:
import { STRAPI_TOKEN } from '$env/static/private';
import { STRAPI_SERVER_URL } from '$env/static/private';

//---------------------------------------------------------------------------
// getNewsFeed
//    Returns the last cached set of news stories. If the cache has expired
// (or does not exist)
//---------------------------------------------------------------------------

export async function getNewsFeed() {
	let stories = [].concat(
		await getLocalStories(),
		await getFacebookStories(),
		await getIgStories(),
		await getYoutubeStories()
	);

	// Change dates back into JS Dates.
	stories.forEach((s) => {
		s.publishedAt = new Date(s.publishedAt);
		s.updatedAt = new Date(s.updatedAt);
	});

	return stories;
}

//---------------------------------------------------------------------------
// getLocalStories
//---------------------------------------------------------------------------

async function getLocalStories() {
	try {
		let response = await fetch(`${STRAPI_SERVER_URL}/api/articles?populate=*`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
		});

		if (!response.ok) throw new Error(response.statusText);

		let body = await response.json();

		if (body.error) throw new Error('CMS rejected request', { cause: body.error });

		return body.data.map((story) => {
			try {
				return {
					id: `n-${story.id}`,
					origin: 'news',
					sourceId: story.id,
					title: story.title,
					featured: getMediaInfo(story.featured),
					author: getUserName(story.createdBy),
					tags: story.tags,
					publishedAt: new Date(story.publishedAt),
					updatedAt: new Date(story.updatedAt),
					body: story.body
				};
			} catch (err) {
				console.log('Bad format of local story...');
				console.log(JSON.stringify(story));
				throw err;
			}
		});
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('News: failed to load local stories', err);
	}

	return [];
}

//---------------------------------------------------------------------------
// getFacebookStories
//---------------------------------------------------------------------------

async function getFacebookStories() {
	try {
		let response = await fetch(
			`${STRAPI_SERVER_URL}/api/facebook-feed/facebook-posts` +
				'?populate=*&sort[0]=created:desc' +
				'&pagination[limit]=50',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
			}
		);

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error('CMS rejected request', { cause: body.error });

		return body.data.map((story) => {
			const URL = story.featured;
			const [width, height] = story.image_size.split('x').map((v) => parseInt(v, 10));

			return {
				id: `f-${story.id}`,
				origin: 'facebook',
				sourceId: story.postID,
				title: getTitle(story.title),
				featured: { URL, width, height },
				author: story.author,
				tags: story.tags,
				publishedAt: new Date(story.created),
				updatedAt: new Date(story.updated),
				body: story.body,
				permalink: story.permalink
			};
		});
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load Facebook posts', err);
	}

	return [];
}

//---------------------------------------------------------------------------
// getIgStories
//---------------------------------------------------------------------------

async function getIgStories() {
	try {
		let response = await fetch(
			`${STRAPI_SERVER_URL}/api/facebook-feed/instagram-posts` +
				'?populate=*&sort[0]=created:desc' +
				'&pagination[limit]=50',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
			}
		);

		if (!response.ok) throw new Error(response.statusText);

		const body = await response.json();

		if (body.error) throw new Error('CMS rejected request', { cause: body.error });

		return body.data.map((story) => {
			const URL = story.mediaURL;
			const [width, height] = story.mediaSize.split('x');
			return {
				id: `i-${story.id}`,
				origin: 'instagram',
				sourceId: story.mediaID,
				title: getTitle(story.caption),
				featured: { URL, width, height },
				author: story.author,
				tags: story.tags,
				publishedAt: new Date(story.created),
				updatedAt: new Date(story.created),
				body: story.caption,
				permalink: story.permalink
			};
		});
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('Failed to load Instagram posts', err);
	}

	return [];
}

//---------------------------------------------------------------------------
// getYoutubeStories
//---------------------------------------------------------------------------

async function getYoutubeStories() {
	try {
		let response = await fetch(
			`${STRAPI_SERVER_URL}/api/youtube-feed/youtube-videos` +
				'?populate=*&sort[0]=id:desc' +
				'&pagination[limit]=50',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + STRAPI_TOKEN }
			}
		);

		if (!response.ok) throw new Error(response.statusText);

		let body = await response.json();

		if (body.error) throw new Error('CMS rejected request', { cause: body.error });

		return body.data.map((story) => {
			try {
				const URL = story.preview;
				const [width, height] = story.previewSize.split('x');
				return {
					id: `y-${story.id}`,
					origin: 'youtube',
					sourceId: story.id,
					title: getTitle(story.title),
					featured: { URL, width, height },
					author: 'BIS Media',
					tags: '',
					publishedAt: new Date(story.published),
					updatedAt: new Date(story.published),
					body: story.title,
					permalink: story.permalink
				};
			} catch (err) {
				console.log('Bad format of Youtube story...');
				console.log(JSON.stringify(story));
				throw err;
			}
		});
	} catch (err) {
		if (err.cause?.code === 'ECONNREFUSED') console.log('Warning: Cannot reach Strapi instance');
		else console.log('News: failed to load Youtube stories', err);
	}

	return [];
}

//---------------------------------------------------------------------------
// getTitle
//    Strips out Emojis and returns a 'cleaned' string of max 60 characters.
//---------------------------------------------------------------------------

function getTitle(base) {
	return base
		.replace(
			/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
			''
		)
		.split('\n', 1)[0]
		.trim()
		.slice(0, 120);
}
