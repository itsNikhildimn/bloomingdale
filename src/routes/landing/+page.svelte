<script>
	import Hero from '$lib/Hero.svelte';
	import BandWithVideo from '$lib/BandWithVideo.svelte';
	import Timeline from '$lib/Timeline.svelte';
	import Programmes from '$lib/Programmes.svelte';
	import EarlyYears from '$lib/WhyEarlyYears.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import ParentFeedback from '$lib/ParentFeedback.svelte';
	import SchoolFacts from '$lib/SchoolFacts.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import Carousel from '$lib/Carousel.svelte';

	// Component static data
	import { earlyYearsMission } from '$lib/data/programMission.js';
	import { playSchool } from '$lib/data/carouselPages.js';

	// Assets
	import bisMP4 from '$lib/video/bis.mp4';
	import bisWEBM from '$lib/video/bis.webm';
</script>

<svelte:head>
	<title>Landing Page | Bloomingdale International School</title>
</svelte:head>

<Hero />
<BandWithVideo gap={false} mp4={bisMP4} webm={bisWEBM} />
<Timeline />
<Programmes />
<EarlyYears />
<ProgramMission data={earlyYearsMission} />
<Carousel pages={playSchool} mainTitle="Why Bloomingdale?" />
<Gallery />
<ParentFeedback />
<SchoolFacts />
