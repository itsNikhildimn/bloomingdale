<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';

	import physics from '$lib/icons/illustrations/physics-purple.svg';
	import chat from '$lib/icons/illustrations/chat.svg';
	import alphabet from '$lib/icons/illustrations/alphabet.svg';
	import planet from '$lib/icons/illustrations/planet.svg';
	import globe from '$lib/icons/illustrations/globe-blue.svg';
	import books from '$lib/icons/illustrations/books.svg';

	const data = {
		title: 'Academic Facts',
		subtitle:
			'Here at Bloomingdale, we are proud to offer an exciting academic programs that challenges our students and prepares them for success in college and beyond. Here are some advantages of the school:',
		items: [
			{
				src: physics,
				alt: '',
				title: 'Individuals',
				text: 'To heighten self-awareness and enhance self-esteem through acceptance.'
			},
			{
				src: chat,
				alt: '',
				title: 'Community involve',
				text: 'To provide a wide range of Outdoor Education programmes using.'
			},

			{
				src: alphabet,
				alt: '',
				title: 'Practical learning',
				text: 'To encourage the children to be responsible for their own individual.'
			},
			{
				src: planet,
				alt: '',
				title: 'Plan and details',
				text: 'Outdoor learning and tending to our school garden is a big part of day.'
			},
			{
				src: globe,
				alt: '',
				title: 'Online resources',
				text: 'To provide opportunities for involvement in a wide range of sports.'
			},
			{
				src: books,
				alt: '',
				title: 'Open school',
				text: 'To encourage every child to express their individuality appropriately.'
			}
		]
	};

	// refs
	let facts, message, factCards, spacer;

	onMount(() => {
		const q = gsap.utils.selector(facts);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ y: 100 },
			{
				scrollTrigger: {
					trigger: q('.h-text'),
					start: 'top 95%'
				},
				y: 0,
				duration: 1
			}
		);

		const mm = gsap.matchMedia();

		let y;

		mm.add(
			'(max-width: 768px)',
			() => {
				gsap.set(spacer, { height: '300vh' });
				gsap.set('.background', { height: '200vh' });
				// Stack cards
				let base = 140;
				const factCards = gsap.utils.toArray('.row');
				const cards = gsap.utils.toArray('.row .card');
				for (let i = 0; i < factCards.length; i++) {
					const total = i * base;
					gsap.set(factCards[i], { yPercent: total });
				}

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: facts,
						start: 'top top',
						end: `${10 * 80}%`, // This is how long we pin
						pin: true,
						scrub: true,
						anticipatePin: 0.2,
						pinSpacing: false
						// markers: true
					}
				});

				for (let i = 0; i < factCards.length; i++) {
					if (i != 0)
						tl.to(
							factCards[i],
							{
								yPercent: 0,
								duration: i * 10,
								ease: 'linear'
							},
							'<'
						).to(cards[i], { boxShadow: '0px 0px 40px -14px rgba(0, 0, 0, 0.0)' }, '<');
				}

				tl.fromTo(
					'.background',
					{ yPercent: 0 },
					{ yPercent: -20, duration: () => tl.duration() },
					0
				);

				tl.to({}, { duration: 60 });

				setTimeout(ScrollTrigger.refresh, 1);
			},
			facts
		);

		mm.add('(min-width: 769px) and (max-width: 1200px)', () => {
			y = -380;
		});

		mm.add('(min-width: 1201px)', () => {
			y = -340;
		});

		mm.add('(min-width: 769px)', () => {
			gsap.to(factCards, {
				scrollTrigger: {
					trigger: facts,
					start: 'top top',
					end: '650%', // This is how long we pin
					pinSpacing: false, // better add a spacer then
					pin: true,
					scrub: 1
				},
				// y: '-380%' // -125
				y: `${y}%` // -125
			});
		});
		return () => {
			mm.kill();
		};
	});
</script>

<section bind:this={facts} class="Facts">
	<div class="background" />
	<div bind:this={message} class="message">
		<div class="container">
			<div class="h-frame">
				<h2 class="lg-header-text h-text">{data.title}</h2>
			</div>
			<div class="b-frame">
				<div class="b-text">
					{#if data.subtitle}
						<p class="lg-body-text">
							{data.subtitle}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div bind:this={factCards} class="cards">
		<div class="cards-inner">
			{#each data.items as item}
				<div class="row">
					<div class="card shadow">
						<img src={item.src} alt={item.alt} />
						<h2 class="sm-header-text">{item.title}</h2>
						<p class="desc sm-body-text">
							{item.text}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
<div class="spacer" bind:this={spacer} />

<style>
	.spacer {
		height: 400vh; /* Animation can run for 200 vh */
	}

	.Facts {
		position: relative;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 0 var(--gutter);
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		margin-top: var(--negative-margin);
		height: calc(100vh + var(--b-r-section));
		width: 100%;
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background: var(--gradient-blue-orange-reverse);
	}

	.cards {
		position: absolute;
		top: 100%;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 100;
		padding: 0 var(--gutter);
	}

	.cards-inner {
		max-width: 1440px;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
	}

	.cards .row {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		position: relative;
		background-color: rgb(255, 255, 255);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		padding-top: 42px;
		border-radius: 20px;
		text-align: center;
		width: 100%;
	}

	.card img {
		margin-bottom: 35px;
	}

	.card .desc {
		margin-bottom: 42px;
		color: rgb(99, 99, 99);
		color: var(--secondary-black-o60);
	}

	.message .container {
		max-width: 34rem;
		margin-top: 53px;
		text-align: center;
		color: var(--secondary-dark-blue);
	}

	@media (min-width: 481px) {
		.card {
			max-width: 300px;
			min-width: 312px;
		}
	}

	@media (max-width: 731px) {
		.Facts .cards .cards-inner .row {
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.Facts {
			height: unset;
			display: block;
			height: 100vh;
		}

		.background {
			height: calc(100% + var(--b-r-section));
			height: 200%;
		}

		.message {
			opacity: 1;
			position: relative;
			padding: 50px 0;
		}

		.message .container {
			margin: auto;
		}
		.cards {
			position: unset;
			height: 100%;
			width: 100%;
			padding-left: 0;
			padding-right: 0;
			padding-bottom: 70px;
		}

		.cards-inner {
			flex-direction: row;
			justify-content: center;
		}

		.row {
			margin-bottom: 2rem;
			position: absolute;
		}

		.card {
			height: 345px;
		}
	}

	@media (min-width: 769px) {
		.cards .row {
			min-width: 100%;
		}
		/* Rows */
		.row:nth-child(odd) {
			justify-content: flex-start;
		}
		.row:nth-child(even) {
			justify-content: flex-end;
		}
	}

	@media (min-width: 901px) and (max-width: 1200px) {
		/* Cards */
		.row:nth-child(odd) .card {
			transform: translateX(4vw);
		}
		.row:nth-child(even) .card {
			transform: translateX(-4vw);
		}
	}

	@media (min-width: 1201px) {
		.row:first-child {
			justify-content: flex-start;
			height: 120px;
		}
		.row:nth-child(2) {
			justify-content: flex-end;
		}
		.row:nth-child(3) {
			justify-content: center;
			height: 260px;
		}
		.row:nth-child(4) {
			justify-content: flex-end;
			height: 260px;
		}
		.row:nth-child(5) {
			justify-content: flex-start;
			height: 190px;
		}
		.row:nth-child(6) {
			justify-content: center;
		}

		/* Cards */
		.row:nth-child(2) .card {
			transform: translateX(-25%);
		}
		.row:nth-child(3) .card {
			transform: translateX(-10%);
		}
		.row:nth-child(4) .card {
			transform: translateY(25%);
		}
		.row:nth-child(6) .card {
			transform: translate(60%, 20%);
		}
	}
</style>
