<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';

	// Static components data
	import { afterSchoolHero } from '$lib/data/hero.js';
	import { afterSchoolSummary } from '$lib/data/programSummary.js';
	import { afterSchoolMission } from '$lib/data/programMission.js';
</script>

<svelte:head>
	<title>After School | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={afterSchoolHero} />
<ProgramSummary data={afterSchoolSummary} />
<ProgramMission data={afterSchoolMission} />
<Feedback tag="after-school" />
<Admission />
