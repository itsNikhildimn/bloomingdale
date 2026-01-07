<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	// refs
	let section;

	onMount(() => {
		const q = gsap.utils.selector(section);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text'),
			{ yPercent: 110 },
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
</script>

<section id="school-facts" bind:this={section}>
	<div class="wrapper">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">Some facts about Bloomingdale</h2>
		</div>
		<div class="facts">
			<div class="fact-card">
				<p class="factoid orange stat-nums-text">1/40</p>
				<p class="description">
					Schools in India with the International Baccalaureate PYP-MYP-DP currciculum from grade PK-12
				</p>
			</div>
			<div class="fact-card">
				<p class="factoid purple stat-nums-text">75<sup>%</sup></p>
				<p class="description">of students in Primary years take a foreign language</p>
			</div>
			<div class="fact-card">
				<p class="factoid green stat-nums-text">12</p>
				<p class="description">
					Competitive sports across all programmes and an intramural sports program for elementary and early childhood.
				</p>
			</div>
			<div class="fact-card">
				<p class="factoid blue stat-nums-text">48<sup>%</sup></p>
				<p class="description">Full-time faculty with advanced degrees</p>
			</div>
		</div>
	</div>
</section>

<style>
	#school-facts {
		position: relative;
		background-color: white;
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		padding-bottom: 60px;
		padding-bottom: 128px;
	}

	#school-facts h2 {
		width: 640px;
		margin: 0px auto;
		text-align: center;
	}

	.h-frame {
		margin-bottom: 88px;
	}

	.wrapper {
		min-height: 100vh;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.fact-card {
		padding: 44px;
		text-align: center;
	}

	.fact-card:not(:last-child) {
		border-right: 1px solid rgba(30, 21, 21, 0.2);
	}

	.factoid {
		margin-bottom: 48px;
	}

	.factoid sup {
		font-size: 36px;
		line-height: 100%;
		vertical-align: top;
	}

	.factoid.green {
		color: var(--brand-colors-lime);
	}
	.factoid.purple {
		color: var(--brand-colors-purple);
	}
	.factoid.blue {
		color: var(--brand-colors-blue);
	}
	.factoid.orange {
		color: var(--brand-colors-orange);
	}

	@media screen and (max-width: 814px) {
		#school-facts {
			padding-bottom: 128px;
		}
		#school-facts h2 {
			width: auto;
			margin-bottom: 8px;
		}
		.facts {
			display: block;
		}
		.fact-card:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid rgba(30, 21, 21, 0.2);
		}
		.fact-card {
			padding: 32px;
		}
		.factoid {
			margin-bottom: 32px;
		}
		.factoid sup {
			font-size: 24px;
		}
	}
</style>
