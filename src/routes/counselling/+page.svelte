<script>
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import VisTextB from '$lib/VisTextB.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';

	import { counselingHero } from '$lib/data/hero.js';
	import { counselingSummary } from '$lib/data/programSummary.js';
	import { counselingAbout } from '$lib/data/about.js';
	import { counselingMission } from '$lib/data/programMission.js';
</script>

<svelte:head>
	<title>Counselling | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={counselingHero} />
<ProgramSummary data={counselingSummary} />
<ProgramMission data={counselingMission} />
<VisTextB data={counselingAbout} />
<Feedback tag="counselling" />
<Admission />
