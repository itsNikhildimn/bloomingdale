<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	import microsoft from '$lib/logos/microsoft.svg';
	import nwea from '$lib/logos/nwea-map.png';
	import cialfo from '$lib/logos/cialfo.png';
	import collegeBoard from '$lib/logos/college-board.png';
	import triumph from '$lib/logos/triumph-pe.webp';

	// refs
	let trusted;

	onMount(() => {
		const q = gsap.utils.selector(trusted);
		// -----------------------------------------------------
		// Icon reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('img'),
			{ yPercent: 150 },
			{
				scrollTrigger: {
					trigger: trusted,
					start: 'top 80%'
				},
				yPercent: 0,
				stagger: {
					amount: 0.5, // total time for staggers combined
					each: 0.2 // Amount of time between each subtweens start time
				}
			}
		);
	});
</script>

<section id="trusted-by" bind:this={trusted}>
	<h2>Partners</h2>
	<div class="logos">
		<div class="frame">
			<img src={nwea} alt="IB-Continuum logo Microsoft showcase school logo" />
		</div>
		<div class="frame">
			<img src={microsoft} alt="Microsoft showcase school logo" />
		</div>
		<div class="frame">
			<img src={cialfo} alt="Cialfo logo" />
		</div>
		<div class="frame">
			<img src={collegeBoard} alt="College Board logo" />
		</div>
		<div class="frame">
			<img src={triumph} alt="Triumph logo" />
		</div>
	</div>
	<div class="underlap" />
</section>

<style>
	.underlap {
		height: var(--b-r-section);
	}

	h2 {
		color: var(--secondary-black-o60);
		text-align: center;
		font-size: 18px;
		margin-bottom: 1.5rem;
	}
	.logos {
		display: flex;
		justify-content: space-around;
		padding: 40px 0px;
		flex-wrap: wrap;
	}

	.frame {
		width: 16%;
		display: flex;
		align-items: center;
		justify-content: center;
		/* margin: 0 30px 40px; */
	}

	.frame img {
		max-width: 100%;
		max-height: 60%;
	}

	.frame:nth-child(2) img {
		width: 50%;
	}

	@media only screen and (max-width: 768px) {
		.logos .frame {
			width: 40%;
		}

		.frame img {
			max-height: unset;
		}

		.frame:nth-child(2) img {
			width: 80%;
		}
	}
	@media only screen and (max-width: 407px) {
		.logos {
			flex-direction: column;
			align-items: center;
		}
		.frame {
			margin-bottom: 2rem;
		}

		.frame img {
			margin: auto;
		}
	}

	@media (min-width: 769px) {
		h2 {
			font-size: 1.25rem;
			margin-bottom: 0;
		}
	}
</style>
