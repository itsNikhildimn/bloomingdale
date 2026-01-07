<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	export let data,
		bgColor = undefined,
		layout = undefined;

	// refs
	let about;

	onMount(() => {
		const q = gsap.utils.selector(about);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ y: 100 },
			{
				scrollTrigger: {
					trigger: about,
					start: 'top 90%'
				},
				y: 0,
				duration: 1
			}
		);

		ScrollTrigger.create({
			trigger: about,
			start: `top -${getComputedStyle(about).borderTopLeftRadius}`,
			end: '20%',
			pin: true
		});
	});
</script>

<section bind:this={about} class="About {bgColor ? bgColor : ''} {layout ? layout : ''}">
	<div class="inner">
		<div class="image-container">
			<img src={data.src} alt={data.alt} />
		</div>
		<div class="text">
			<div class="text-container">
				<div class="h-frame">
					<h2 class="lg-header-text h-text">{data.title}</h2>
				</div>
				<div class="b-frame">
					<div class="b-text">
						{#each data.text as paragraph}
							<p class="lg-body-text">{paragraph}</p>
							<br />
						{/each}
					</div>
				</div>
				{#if data.chairman}
					<div class="h-frame author">
						<h3 class="chairmans-name-text">{data.chairman.name}</h3>
						<h4 class="lg-body-text">{data.chairman.role}</h4>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="underlap" />
</section>

<style>
	.About {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		color: var(--secondary-dark-blue);
		width: 100vw;
		min-height: calc(100vh + (var(--b-r-section) * 2));
		height: max-content;
		padding: 80px var(--gutter) calc(80px + var(--b-r-section));
		background-color: var(--brand-colors-mint);
		display: flex;
		align-items: center;
	}

	.About .inner {
		display: flex;
		flex-direction: column;
	}

	.About.yellow {
		background-color: var(--brand-colors-yellow);
	}

	.About.orange {
		background-color: var(--brand-colors-orange);
	}

	.About.reverse {
		color: white;
	}

	.underlap {
		height: calc(80px + var(--b-r-section));
	}

	.image-container {
		width: 100%;
		flex-grow: 1;
		flex-basis: 50%;
	}

	img {
		border-radius: var(--b-r-container);
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 1/1.1;
	}

	.text {
		flex-basis: 50%;
		flex-grow: 1;
		padding-right: 8%;
		margin-top: 40px;
	}
	p {
		font-weight: 400;
	}

	@media (max-width: 768px) {
		.underlap {
			display: none;
		}
	}

	@media (min-width: 769px) {
		.About {
			flex-direction: row;
			padding: 128px var(--gutter) 128px;
		}

		.image-container {
			padding-right: 8%;
			align-self: center;
		}

		.About .inner {
			flex-direction: row;
		}

		.text {
			margin-top: 0;
			padding-right: 6%;
			display: flex;
			align-items: center;
		}

		.About.reverse .inner {
			flex-direction: row-reverse;
		}

		.About.reverse .image-container {
			padding-right: 0;
		}

		.About.reverse .text {
			padding-right: 6%;
		}
	}
</style>
