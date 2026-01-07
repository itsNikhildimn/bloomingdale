<script>
	import MyLink from './buttons/MyLink.svelte';

	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';

	// Component static data
	export let data;

	// refs
	let reasons;

	onMount(() => {
		const q = gsap.utils.selector(reasons);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ y: 170 },
			{
				scrollTrigger: {
					trigger: reasons,
					start: 'top 80%'
				},
				y: 0,
				duration: 1
			}
		);

		const mm = gsap.matchMedia();

		mm.add(
			'(max-width: 899px)',
			() => {
				gsap.set(q('.container:first-child .shaft'), { xPercent: 0 });

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: reasons,
						start: `top bottom `,
						end: '400%', // This is how long we pin
						scrub: 1
					}
				});

				tl.to('.container:first-child .shaft', { xPercent: -100, ease: 'linear' });
			},
			reasons
		);

		mm.add(
			'(min-width: 900px)',
			() => {
				gsap.set(q('.container:first-child .shaft'), { yPercent: -10 });
				gsap.set(q('.container:last-child .shaft'), { yPercent: -80 });

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: reasons,
						start: `top bottom `,
						end: '400%', // This is how long we pin
						scrub: 1
					}
				});

				tl.to('.container:first-child .shaft', { yPercent: -100, ease: 'linear' }).to(
					'.container:last-child .shaft',
					{
						yPercent: 10,
						ease: 'linear'
					},
					'<'
				);
			},
			reasons
		);
		return () => {
			mm.kill();
		};
	});
</script>

<section id="reasons" bind:this={reasons}>
	<div class="background" />
	<div class="inner wrapper">
		<div class="left">
			<div class="h-frame">
				<h2 class="lg-header-text h-text">{data.title}</h2>
			</div>
			<div class="b-frame">
				<h4 class="lg-body-text b-text">
					{data.text}
				</h4>
			</div>
			<div class="summary" />
			<MyLink style="btn btn-orange opposite" href="/about">About us</MyLink>
		</div>
		<div class="right">
			<div class="container">
				<div class="shaft">
					{#each data.images as image}
						<img src={image.image} alt={image.alt} loading="lazy" />
					{/each}
				</div>
			</div>
			<div class="container">
				<div class="shaft">
					{#each data.images as image}
						<img src={image.image} alt={image.alt} loading="lazy" />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* 
  In this instance I've taken a different approach to the slight 
  overlapping with the preceeding section, since hiding overflow
  of virtically animated columns, as per the initial implimentation 
  clipped content from the top of the sections whilst the background
  was set to negative margin. In 'effect' it was being clipped 
  early.
  */

	#reasons {
		position: relative;
		margin-top: calc(0px - var(--b-r-section));
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-orange);
		overflow: hidden;
	}

	.inner.wrapper {
		position: relative;
		padding: calc(76px + var(--b-r-section)) var(--gutter) 0;
		height: 100%;
	}

	.left,
	.right {
		flex-basis: 50%;
	}

	.left h2 {
		color: white;
		line-height: 1.2;
	}

	.left h4 {
		color: rgb(228, 228, 228);
		max-width: 80%;
	}

	.right {
		display: flex;
		padding: 5rem 0 7rem;
	}

	.container {
		position: relative;
		margin-left: calc(0px - var(--gutter));
		width: 100vw;
	}

	.container:last-child {
		display: none;
	}

	.shaft {
		display: flex;
		justify-content: center;
		width: max-content;
	}

	.shaft img {
		height: 50vw;
		width: auto;
		object-fit: cover;
		border-radius: var(--b-r-container);
		aspect-ratio: 2/3;
		margin: 0 6px;
		margin: 0 1vw;
	}

	@media (min-width: 900px) {
		#reasons {
			height: calc(100vh + var(--b-r-section));
		}

		.inner {
			display: flex;
		}

		.right {
			display: flex;
			justify-content: flex-end;
			padding: unset;
		}

		.container {
			width: unset;
			margin-left: unset;
		}

		.container:last-child {
			display: block;
		}

		.shaft {
			flex-direction: column;
			width: unset;
		}

		.shaft img {
			height: 30vw;
			margin-bottom: 24px;
			margin: 0.7vw 0.7vw;
		}
	}
</style>
