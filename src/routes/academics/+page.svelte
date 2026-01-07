<script>
	// Main imports:
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import AcademicFacts from '$lib/AcademicFacts.svelte';
	import BandWithVideo from '$lib/BandWithVideo.svelte';
	import LearningForAll from '$lib/LearningForAll.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import FeatureGallery from '$lib/FeatureGallery.svelte';
	import Admission from '$lib/Admission.svelte';

	// Component static data:
	import { academicsHero } from '$lib/data/hero.js';
	import { academics } from '$lib/data/carouselPages.js';
	import { spaceDesignedForLearning } from '$lib/data/featureGallery.js';

	// Assets
	import bisMP4 from '$lib/video/bis.mp4';
	import bisWEBM from '$lib/video/bis.webm';
</script>

<svelte:head>
	<title>Academics | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={academicsHero} />
<AcademicFacts />
<BandWithVideo gap="true" mp4={bisMP4} webm={bisWEBM} />
<LearningForAll />
<Feedback tag="academics" stats={true} />
<Carousel pages={academics} />
<FeatureGallery data={spaceDesignedForLearning} />
<Admission />
