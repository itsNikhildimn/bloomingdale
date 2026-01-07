<script>
	// Main imports:
	import Hero from '$lib/Hero.svelte';
	import BandWithVideo from '$lib/BandWithVideo.svelte';
	import LearningPrograms from '$lib/LearningPrograms.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Band from '$lib/Band.svelte';
	import FeatureGallery from '$lib/FeatureGallery.svelte';
	import UpcomingEvents from '$lib/UpcomingEvents.svelte';
	import HorizontalCarousel from '$lib/HorizontalCarousel.svelte';
	import Partners from '$lib/Partners.svelte';

	import { news } from '$lib/data/news.js';

	// Component static data:
	import { reasons } from '$lib/data/carouselPages.js';
	import { findingYourVoice } from '$lib/data/featureGallery.js';

	// Assets
	import bisMP4 from '$lib/video/bis.mp4';
	import bisWEBM from '$lib/video/bis.webm';
	import missingImage from '$lib/images/missing-image.svg';

	// Component dynamic data:
	export let data;

	const newsFeed = {
		title: ['News @Bis'],
		cta: '/news',
		readAllBtn: true,
		entries: $news
			.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
			.slice(0, 6)
			.map((item) => ({
				image: item.featured?.URL || missingImage,
				alt: item.featured?.altText || '',
				name: item.title,
				link: `/news/story/${item.id}`
			}))
	};
</script>

<svelte:head>
	<title>Home | Bloomingdale International School</title>
	<meta
		name="description"
		content="The Bloomingdale International School is the first in Andhra Pradesh to offer the International Baccalaurate (IB) Curriculum from pre-school to diploma level."
	/>
</svelte:head>

<Hero isCarousel={true} />
<BandWithVideo mp4={bisMP4} webm={bisWEBM} />
<LearningPrograms />
<Carousel pages={reasons} mainTitle="10 Reasons To Choose Bloomingdale" />
<Band />
<Feedback tag="home" stats={true} />
<FeatureGallery data={findingYourVoice} />
<UpcomingEvents events={data.events} />
<HorizontalCarousel data={newsFeed} />
<Partners />
