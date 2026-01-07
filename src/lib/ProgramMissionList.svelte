<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	// Props
	export let data;

	// Refs
	let mission;

	onMount(() => {
		const q = gsap.utils.selector(mission);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 180 },
			{
				scrollTrigger: {
					trigger: mission,
					start: 'top 70%'
				},
				yPercent: 0,
				duration: 1
			}
		);
	});
</script>

<section id="mission" bind:this={mission}>
	<div class="header">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">
				{data.title}
			</h2>
		</div>
	</div>
	<div class="content">
		<ul>
			<h3>{data.list.title}</h3>
			{#each data.list.items as item, id}
				<li>{item}</li>
			{/each}
		</ul>
		<div class="image-container">
			<img src={data.src} alt={data.alt} />
		</div>
	</div>
</section>

<style>
	#mission {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		color: var(--secondary-black);
		width: 100vw;
		height: max-content;
		padding: 80px var(--gutter) calc(80px + var(--b-r-section));
		background-color: white;
	}

	.header {
		margin: auto;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.h-frame {
		margin-bottom: 40px;
	}

	h2 {
		margin: 0;
		text-align: left;
		max-width: 500px;
	}

	.content {
		display: flex;
	}

	.image-container {
		display: none;
		width: 100%;
		flex-grow: 1;
		flex-basis: 50%;
	}

	.image-container img {
		border-radius: var(--b-r-container);
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 1/1.1;
	}

	h3 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
	}

	ul {
		list-style-type: disc;
	}

	li {
		margin-bottom: 1.5rem;
		margin-left: 20px;
		color: hsla(0, 18%, 10%, 0.6);
		line-height: 22.4px;
		font-size: 1em;
	}

	@media (min-width: 769px) {
		#mission {
			padding: 128px var(--gutter) 128px;
		}

		.h-frame {
			margin-bottom: 88px;
		}

		h2 {
			text-align: center;
			margin-left: auto;
			margin-right: auto;
		}

		h3 {
			font-size: 24px;
			min-width: 600px;
		}

		.image-container {
			display: block;
		}

		ul {
			width: 50%;
			padding-right: 8vw;
		}
	}

	@media (min-width: 965px) {
		.header {
			max-width: 960px;
		}

		h2 {
			max-width: 900px;
		}

		h3 {
			font-size: 1.5;
			margin-bottom: 2rem;
		}
	}
</style>
