<script>
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';

	import { artHero } from '$lib/data/hero';
	import { artSummary } from '$lib/data/programSummary';
	import { arts } from '$lib/data/carouselPages';
</script>

<svelte:head>
   <title>Art | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={artHero} />
<ProgramSummary data={artSummary} />
<Carousel pages={arts} />
<Feedback tag="arts" />
<Admission />
