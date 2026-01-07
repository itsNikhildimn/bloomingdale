<script>
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';
	import { sportsHero } from '$lib/data/hero.js';
	import { sportsSummary } from '$lib/data/programSummary.js';
	import { sports } from '$lib/data/carouselPages.js';
</script>

<svelte:head>
   <title>Sports | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={sportsHero} />
<ProgramSummary data={sportsSummary} />
<Carousel pages={sports} isSports={true} />
<Feedback tag="sports" />
<Admission />
