import { redirect, error } from '@sveltejs/kit';

const redirects = [
	{ from: 'about-us', to: '/about' },
	{ from: 'about-us/at-a-glance', to: '/about#history' },
	{ from: 'about-us/our-philosophy', to: '/about' },
	{ from: 'about-us/chairman-message', to: '/about' },
	{ from: 'about-us/principals-message', to: '/about' },
	{ from: 'about-us/policies', to: '/policies' },
	{ from: 'academics/preschool', to: '/eyp' },
	{ from: 'academics/elementary', to: '/pyp' },
	{ from: 'academics/ibdp-programme', to: '/diploma' },
	{ from: 'school-life/after-school', to: '/after-school' },
	{ from: 'school-life/sports', to: '/sports' },
	{ from: 'school-life/transport', to: '/transport' },
	{ from: 'school-life/art', to: '/art' },
	{ from: 'school-life/counseling', to: '/counselling' },
	{ from: 'school-life/gallery', to: '/gallery' },
	{ from: 'enquiry-form', to: '/enquiry' },
	{ from: 'admission-enquiry', to: '/enquiry' }
];

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const route = params.path.replace(/\/$/, '');
	const alt = redirects.find((r) => route === r.from);
	if (alt) throw redirect(308, alt.to);
	throw error(404, 'Not found');
}
