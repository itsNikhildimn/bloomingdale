<script>
	// Components
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import BandWithVideo from '$lib/BandWithVideo.svelte';
	import ProgramSummary from '$lib/ProgramSummary.svelte';
	import ProgramMission from '$lib/ProgramMission.svelte';
	import VisTextB from '$lib/VisTextB.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import Admission from '$lib/Admission.svelte';
	import WhyEarlyYears from '../../lib/WhyEarlyYears.svelte';

	// Data
	import { earlyYearsHero } from '$lib/data/hero.js';
	import { earlyYearsSummary } from '$lib/data/programSummary.js';
	import { earlyYearsMission } from '$lib/data/programMission.js';
	import { earlyYearsAbout } from '$lib/data/about.js';

	// Assets
	import eYVideoMP4 from '$lib/video/bloomingdale-play-school.mp4';
	import eYVideoWEBM from '$lib/video/bloomingdale-play-school.webm';
</script>

<svelte:head>
	<title>Early Years Program | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={earlyYearsHero} />
<BandWithVideo mp4={eYVideoMP4} webm={eYVideoWEBM} />
<ProgramSummary data={earlyYearsSummary} />
<ProgramMission data={earlyYearsMission} />
<VisTextB data={earlyYearsAbout} />
<WhyEarlyYears />
<Feedback tag="eyp" />
<Admission />
