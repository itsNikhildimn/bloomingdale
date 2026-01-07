<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import VisTextC from '$lib/VisTextC.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';

	// Static component data
	import { middleYearsHero } from '$lib/data/hero.js';
	import { middleYearsSummary } from '$lib/data/programSummary.js';
	import { middleYearsMission } from '$lib/data/programMission.js';
	import { middleYearsAbout } from '$lib/data/about.js';
	import { middleYearsExternalAssessment } from '$lib/data/about.js';
</script>

<svelte:head>
	<title>Middle Years Program | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={middleYearsHero} />
<ProgramSummary data={middleYearsSummary} />
<ProgramMission data={middleYearsMission} />
<VisTextC data={middleYearsAbout} />
<VisTextC data={middleYearsExternalAssessment} bgColor="orange" layout="reverse" />
<Feedback tag="myp" />
<Admission />
