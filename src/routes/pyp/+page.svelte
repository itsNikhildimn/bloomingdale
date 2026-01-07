<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';

	// Data
	import { primaryYearsHero } from '$lib/data/hero.js';
	import { primaryYearsMission } from '$lib/data/programMission.js';
	import { primaryYearsSummary } from '$lib/data/programSummary.js';
</script>

<svelte:head>
   <title>Primary Years Program | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={primaryYearsHero} />
<ProgramSummary data={primaryYearsSummary} />
<ProgramMission data={primaryYearsMission} />
<Feedback tag="pyp" stats={false} />
<Admission />
