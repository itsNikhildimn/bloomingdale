<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	// import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';
	import Band from '$lib/Band.svelte';
	import FeatureGallery from '$lib/FeatureGallery.svelte';
	import Carousel from '$lib/Carousel.svelte';

	// Static component data
	import { cbseHero } from '$lib/data/hero.js';
	// import { cbseSummary } from '$lib/data/programSummary.js';
	import { cbseMission } from '$lib/data/programMission.js';
	import { whyCBSE } from '$lib/data/carouselPages.js';
	import { whyBloomingdale } from '$lib/data/featureGallery.js';
</script>

<svelte:head>
	<title>CBSE Program | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={cbseHero} />
<Band />
<Carousel pages={whyCBSE} mainTitle="Why iCBSE?" />
<Feedback tag="show-all" stats="cbse" />
<FeatureGallery data={whyBloomingdale} />
<ProgramMission data={cbseMission} />
<Admission />
