<script>
	//---------------------------------------------------------------------------
	// Module:  $routes/enquiry/Process.svelte
	// Author:  S. Wheeler
	//
	// This component provides a page section for the enrolment process.
	//---------------------------------------------------------------------------

	// Main imports:
	import Carousel from '$lib/Carousel.svelte';

	// Component static data:
	import { processSteps } from '$lib/data/carouselPages.js';

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<div id="admission-process">
	<Carousel title="Admission process" pages={processSteps} />
</div>

<style>
	/*---------------------------------------------------------------------------
   * Styles
   *-------------------------------------------------------------------------*/

	#admission-process {
		background-color: var(--brand-colors-yellow);
		color: var(--secondary-dark-blue);
    border-radius: var(--b-r-section) var(b-r-section) 0 0;
    margin-top: var(--negative-margin);
    position: relative;
	}
</style>
