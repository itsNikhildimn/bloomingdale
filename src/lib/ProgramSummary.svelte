<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	export let data;

	let summary;

	onMount(() => {
		const q = gsap.utils.selector(summary);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ y: 60 },
			{
				scrollTrigger: {
					trigger: summary,
					start: 'top 95%'
				},
				y: 0,
				duration: 1
			}
		);
	});
</script>

<section class="Summary" bind:this={summary}>
	<div class="inner">
		<div class="title">
			<div class="h-frame">
				<h2 class="md-header-text h-text">{data.title}</h2>
			</div>
		</div>
		<div class="text">
			<div class="b-frame">
				<div class="b-text">
					{#each data.text as paragraph}
						<p class="lg-body-text">{@html paragraph}</p>
						<br />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.Summary {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		color: var(--secondary-black);
		width: 100vw;
		height: max-content;
		padding: 80px var(--gutter) calc(80px + var(--b-r-section));
		background: var(--gradient-blue-orange);
	}

	.inner {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.title {
		min-width: 50%;
		margin-bottom: 2rem;
	}

	h2 {
		max-width: 14em;
		padding-right: 2rem;
		color: var(--secondary-black);
	}
	p {
		width: 100%;
		color: var(--secondary-black-o60);
	}

	@media (min-width: 769px) {
		.inner {
			flex-direction: row;
			justify-content: space-between;
		}
		.Summary {
			padding: 128px var(--gutter) 128px;
		}
	}
</style>
