<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import MyLink from '$lib/buttons/MyLink.svelte';

	// Programme data
	import { programmes } from '$lib/data/programmes.js';

	// Refs
	let section;

	// onMount hook
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
					start: 'top 70%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		// -----------------------------------------------------
		// Card & image animation
		// -----------------------------------------------------
		const mm = gsap.matchMedia();

		mm.add('screen and (min-width: 965px)', () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: q('.layout'),
					start: 'top -4vw',
					end: '+=1200',
					scrub: 1,
					pin: true,
					pinSpacing: false,
					invalidateOnRefresh: true
				}
			});

			const cards = q('.card');
			tl.to(cards, { y: () => -(cards[0].scrollHeight + 32), duration: 2 }, 0)
				.to(q('.image-1'), { opacity: 0, duration: 0.5 }, 1)
				.to(q('.image-2'), { opacity: 1, duration: 0.5 }, 1)
				.to(cards, { y: () => -2 * (cards[0].scrollHeight + 32), duration: 2 }, 2)
				.to(q('.image-2'), { opacity: 0, duration: 0.5 }, 3)
				.to(q('.image-3'), { opacity: 1, duration: 0.5 }, 3)
				.to(cards, { y: () => -3 * (cards[0].scrollHeight + 32), duration: 2 }, 4)
				.to(q('.image-3'), { opacity: 0, duration: 0.5 }, 5)
				.to(
					q('.image-4'),
					{
						opacity: 1,
						duration: 0.5,
						onComplete: () => {
							setTimeout(ScrollTrigger.refresh, 1);
						}
					},
					5
				);
		});

		// Belt and braces ...

		return () => {
			mm.revert();
		};
	});
</script>

<section id="programmes" bind:this={section}>
	<div class="wrapper">
		<div class="h-frame">
			<h2 class="md-header-text h-text">
				Discover and explore our Innovative and Cutting-Edge Educational Programs
			</h2>
		</div>
		<div class="layout lg-body-text">
			{#each programmes as p, n}
				<img class="image-{n + 1}" src={p.image} alt="p.alt" />
			{/each}
			<div class="cards">
				{#each programmes as p, n}
					<div class="shadow card card-{n + 1}">
						<h4 class="sm-header-text">{p.title}</h4>
						<p class="desc">{p.text}</p>
						<p class="link">
							<MyLink href={p.link} style={`btn btn-${p.color}`}>Learn more</MyLink>
						</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="spacer" />
	</div>
</section>

<style>
	.spacer {
		height: 120vh;
	}

	#programmes {
		position: relative;
		background: linear-gradient(180deg, #caefff 0%, #effffd 23.3%, #fff0d0 82.39%);
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		padding-bottom: 132px;
	}

	#programmes h2 {
		width: 540px;
		margin: 0px auto;
		text-align: center;
	}

	.h-frame {
		margin-bottom: 88px;
	}

	.layout {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 350px;
		gap: 24px;
		grid-template-areas: 'images cards';
	}

	.layout > img {
		grid-area: images;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 24px;
		opacity: 0;
		width: 535px;
		max-width: 40vw;
	}

	.layout > img.image-1 {
		opacity: 1;
	}

	.cards {
		grid-area: cards;
		overflow-y: visible;
		display: flex;
		flex-flow: column nowrap;
		gap: 32px;
	}

	.card {
		flex: 1 0 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		background-color: white;
		border-radius: 24px;
		padding: 48px;
	}

	.card .desc {
		color: var(--secondary-black-o60);
	}

	.card h4 {
		font-size: 28px; /* mob 18 */
		line-height: 120%;
		font-weight: 500;
		margin-bottom: 1em;
	}

	@media only screen and (max-width: 1130px) {
		.layout > img {
			width: 460px;
			max-width: 35vw;
		}
	}

	@media only screen and (max-width: 964px) {
		#programmes h2 {
			width: auto;
		}
		.card h4 {
			font-size: 18px;
			text-align: center;
		}
		.layout {
			display: block;
		}
		.layout > img {
			display: none;
		}
		.card .link {
			text-align: center;
			margin-top: 40px;
		}
	}

	@media only screen and (min-width: 965px) {
		.layout {
			padding: 100px 0;
			height: 100vh;
		}
	}
</style>
