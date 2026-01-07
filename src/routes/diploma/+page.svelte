<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import VistText from '$lib/VisText.svelte';
	import Admission from '$lib/Admission.svelte';

	// Static component data
	import { diplomaHero } from '$lib/data/hero.js';
	import { diplomaSummary } from '$lib/data/programSummary.js';
	import { diplomaMission } from '$lib/data/programMission.js';
	import { diplomaAbout } from '$lib/data/about.js';
</script>

<svelte:head>
	<title>IB Diploma Program | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={diplomaHero} />
<ProgramSummary data={diplomaSummary} />
<ProgramMission data={diplomaMission} />
<Feedback tag="diploma" />
<VistText data={diplomaAbout} />
<Admission />
