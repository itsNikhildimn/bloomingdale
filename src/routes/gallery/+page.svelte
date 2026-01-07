<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap.js';
	export let data;

	onMount(() => {
		const q = gsap.utils.selector(section);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 180 },
			{
				scrollTrigger: {
					trigger: section,
					start: 'top 80%'
				},
				yPercent: 0,
				duration: 1
			}
		);
	});

	// refs
	let section;

	const pictureClasses = [
		'half left',
		'half right',
		'span2 left',
		'auto right',
		'auto right',
		'half left',
		'half right',
		'auto left',
		'span2 right',
		'auto left'
	];
</script>

<svelte:head>
   <title>Gallery | Bloomingdale International School</title>
</svelte:head>

<section id="gallery" bind:this={section}>
	<div class="wrapper">
		<div class="h-frame">
			<h1 class="lg-header-text h-text">Gallery</h1>
		</div>
		<div class="b-frame">
			<p class="subhead lg-body-text b-text">
				Our School Gallery exhibits student creativity and achievements, featuring artwork,
				photography, music, and projects that reflect our school's culture and values.
			</p>
		</div>
		<div class="pictures">
			{#each data.pictures as pic, n}
				<img
					class={'picture ' + pictureClasses[n % pictureClasses.length]}
					src={pic.URL}
					alt={pic.altText}
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	#gallery {
		min-height: 100vh;
		background-image: var(--gradient-blue-orange-reverse);
		padding-top: 160px;
	}

	#gallery h1 {
		text-align: center;
	}

	.subhead {
		width: 552px;
		margin: 0px auto;
		text-align: center;
		color: var(--secondary-black-o60);
	}

	.pictures {
		display: grid;
		grid-template-columns: 4fr 1fr 1fr 4fr;
		grid-auto-rows: 400px;
		gap: 16px;
		padding: 128px 0px;
	}

	.picture.half {
		grid-row: span 1;
		grid-column: span 2;
	}

	.picture.span2 {
		grid-row: span 2;
		grid-column: span 3;
	}

	.picture.auto {
		grid-row: span 1;
		grid-column: span 1;
	}

	.picture {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: var(--b-r-container);
	}

	@media screen and (max-width: 800px) {
		#gallery h1 {
			text-align: left;
		}
		.subhead {
			width: auto;
			text-align: left;
		}
		.pictures {
			margin-top: 40px;
			display: flex;
			flex-flow: column nowrap;
			padding: 80px 0px;
		}
		.picture {
			height: 300px;
		}
	}
</style>
