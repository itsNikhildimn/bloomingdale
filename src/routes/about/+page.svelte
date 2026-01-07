<script>
	// Components:
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import VisText from '$lib/VisText.svelte';
	import VisTextB from '$lib/VisTextB.svelte';
	import BloomFacts from '$lib/BloomFacts.svelte';
	import HorizontalCarousel from '$lib/HorizontalCarousel.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Carousel from '$lib/Carousel.svelte';

	// Component static data:
	// import { teachers } from '$lib/data/horizontalCarousel.js';
	import { aboutHero } from '$lib/data/hero.js';
	import { timeline } from '$lib/data/carouselPages.js';

	import {
		ourHistory,
		principalsMessage,
		chairmansMessage,
		earlyYearsAbout
	} from '$lib/data/about.js';

	export let data;

	const teachers = {
		title: ['Awesome teachers', 'with great knowledge'],
		entries: data.teachers
	};
</script>

<svelte:head>
	<title>About Us | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={aboutHero} />
<VisText data={ourHistory} bgColor="yellow" />
<BloomFacts />
<Carousel pages={timeline} isAbout={true} />
<VisText data={principalsMessage} />
<VisText data={chairmansMessage} bgColor="orange" reverse="reverse" />
<HorizontalCarousel data={teachers} />
<Feedback tag="about" stats="true" />
<VisTextB data={earlyYearsAbout} underlap="true" />
