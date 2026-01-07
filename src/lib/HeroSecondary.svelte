<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import MyLink from './buttons/MyLink.svelte';
	import ScrollPrompt from './ScrollPrompt.svelte';

	export let data;

	// Refs
	let hero, btn;

	// Pin section so that next section can slide in over
	// over the top
	onMount(() => {
		ScrollTrigger.create({
			trigger: hero,
			start: 'top top',
			end: '100%',
			pin: true,
			pinSpacing: false
		});

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.context(() => {
			gsap.set('h1, p', { opacity: 1 });
			gsap.set('.h-text, .b-text', { yPercent: 160 });
			gsap.to('.h-text, .b-text', { yPercent: 0, duration: 1 });
			gsap.fromTo(btn, { yPercent: 130 }, { yPercent: 0, opacity: 1, duration: 1 });
		}, hero);
	});
</script>

<section class="hero" bind:this={hero}>
	<picture>
		<source srcset={data.srcset} media="(max-width: 767px)" type="image/webp" />
		<img src={data.src} alt={data.alt} />
	</picture>
	<div class="overlay" />
	<div class="container">
		<div class="h-frame">
			<h1 class="lg-header-text h-text">
				{#each data.title as frag}
					{frag}<br />
				{/each}
			</h1>
		</div>
		<div class="b-frame">
			<p class="lg-body-text b-text">{data.desc}</p>
		</div>

		<!-- to conditionally show button add to btn-container: 
			{data.btn ? 'show' : ''} -->
		<div class="btn-container" bind:this={btn}>
			<MyLink
				style="btn btn-bw"
				href="https://www.youtube.com/watch?v=PNXIY-kW-eM"
				target="”_blank”">Early years showreel</MyLink
			>
		</div>
	</div>
	<ScrollPrompt />
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		width: 100vw;
		height: calc(100vh + var(--b-r-section));
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(0, 0, 0);
		background: linear-gradient(41deg, rgba(0, 0, 0, 0.637) 0%, rgba(0, 0, 0, 0.161) 100%);
		opacity: 0.7;
	}

	picture {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.container {
		position: absolute;
		top: 34%;
		left: 0;
		display: flex;
		flex-direction: column;
		color: var(--white);
		padding: 0 var(--gutter);
	}

	h1 {
		opacity: 0;
		width: 6em;
		width: 11em;
	}

	p {
		opacity: 0;
		font-weight: 400;
		max-width: 28em;
	}

	.btn-container {
		opacity: 0;
		width: max-content;
		display: none;
	}
</style>
