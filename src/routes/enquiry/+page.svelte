<script>
	//---------------------------------------------------------------------------
	// Module:  $routes/enquiry/+page.svelte
	// Author:  S. Wheeler
	//
	// This is a page component for the '/enquiry' route.
	//---------------------------------------------------------------------------

	// Main imports:
	import Admissions from './Admissions.svelte';
	import Feedback from '$lib/Feedback.svelte';
	import { onMount, tick } from 'svelte';

	// Assets:
	import childrenSteps from '$lib/images/children-steps.webp';

	let formHeight = '400px';

	// On mounting the component, fetch the script that displays the enquiry form,
	// but only after we've set an appropriate height.
	onMount(async () => {
		formHeight = Math.floor(window.innerHeight * 0.8) + 'px'
		await tick()
		var s=document.createElement("script"); s.type="text/javascript"; s.async=true; s.src="https://widgets.in8.nopaperforms.com/emwgts.js"; document.body.appendChild(s); 
	});

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
	<title>Admissions Enquiry | Bloomingdale International School</title>
</svelte:head>

<section id="enquiry-form">
	<div class="form-area">
		<div class="npf_wgts" data-height={formHeight} data-w="28e446de956f245dedeb953a28f4bf6b"></div>
	</div>
	<img class="side-bar-image" src={childrenSteps} alt="" />
</section>
<Admissions />
<Feedback tag="enquiry" />

<style>
	/*---------------------------------------------------------------------------
   ** Styles
   **-------------------------------------------------------------------------*/
	#enquiry-form {
		display: grid;
		grid-template-columns: 40% 60%;
		min-height: 100vh;
		padding-bottom: 40px;
	}
	.side-bar-image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}

	.form-area {
		justify-self: flex-start;
		align-self: center;
		min-width: 350px;
		padding-left: var(--gutter);
	}

	@media screen and (max-width: 800px) {
		.side-bar-image {
			display: none;
		}
	}
</style>
