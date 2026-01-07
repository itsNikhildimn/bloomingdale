<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import campusBuilding from '../lib/images/campus/bis-facade-south-wide-small.webp';

	// Refs
	let band;

	onMount(() => {
		const q = gsap.utils.selector(band);
		gsap.to(q('.shaft'), {
			scrollTrigger: {
				trigger: band,
				start: 'top 140%',
				end: '100%',
				scrub: 3
			},
			xPercent: 50
		});
	});
</script>

<section id="band" bind:this={band}>
	<div class="band-inner">
		<div class="container">
			<div class="shaft">
				<h2 class="band-text">School For Creators</h2>
				<img src={campusBuilding} alt="Campus Building" />
				<h2 class="band-text">School For Creators</h2>
			</div>
			<div class="spacer" />
		</div>
	</div>
</section>

<style>
	#band {
		margin-top: var(--negative-margin);
		color: white;
		overflow: hidden;
		position: relative;
	}

	.band-inner {
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-mint);
		height: max-content;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
	}

	.container {
		padding: 4em 0;
	}

	.spacer {
		height: calc(var(--b-r-section));
	}

	.shaft {
		display: flex;
		align-items: center;
		height: max-content;
		font-size: clamp(130px, 11.111vw, 160px);
	}

	.container h2 {
		white-space: nowrap;
		font-size: inherit;
	}

	img {
		border-radius: var(--b-r-container);
		width: 1.9em;
		height: 1.07em;
		margin: 0 0.3em;
		object-fit: cover;
	}

	@media (max-width: 731px) {
		.shaft {
			font-size: clamp(80px, 21.7vw, 130px);
		}
	}
</style>
