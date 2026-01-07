<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import globe from '$lib/icons/illustrations/globe-purple.svg';
	import diploma from '$lib/icons/illustrations/diploma-orange.svg';
	import chat from '$lib/icons/illustrations/chat.svg';
	import grade from '$lib/icons/illustrations/grade-blue.svg';
	import physics from '$lib/icons/illustrations/physics-yellow.svg';

	const data = {
		title: 'Some key facts about the Bloomingdale school',
		items: [
			{
				src: globe,
				alt: '',
				title: 'International Curriculum',
				text: 'Only school with International Baccalaureate Curriculum from Playgroup to High School'
			},
			{
				src: chat,
				alt: '',
				title: 'Inquiry Based',
				text: 'All our classes are designed to avoid lecture and to encourage inquiry and interactions'
			},

			{
				src: diploma,
				alt: '',
				title: 'Experienced Teachers',
				text: 'Teachers with diversified experience. Most of the teachers with minimum 5 years of experience.'
			},
			{
				src: physics,
				alt: '',
				title: 'Work Experience',
				text: 'We prepare young adults for work place from age of 12'
			},
			{
				src: grade,
				alt: '',
				title: 'Staff Student Ratio',
				text: 'Staff Student ratio of 1: 9'
			}
		]
	};

	// refs
	let facts, message, factCards;

	onMount(() => {
		const q = gsap.utils.selector(facts);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 110 },
			{
				scrollTrigger: {
					trigger: q('.h-text'),
					start: 'top 95%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		// -----------------------------------------------------
		// Floating Cards Animation
		// -----------------------------------------------------
		const mm = gsap.matchMedia();

		let y;

		mm.add(
			'(max-width: 768px)',
			() => {
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
						end: `${4 * 80}%`, // This is how long we pin
						pin: true,
						scrub: true,
						anticipatePin: 0.2
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
					{ yPercent: -40, duration: () => tl.duration() },
					0
				);

				setTimeout(ScrollTrigger.refresh, 1);
			},
			facts
		);

		mm.add('(min-width: 769px) and (max-width: 1200px)', () => {
			y = -380;
		});

		mm.add('(min-width: 1201px)', () => {
			y = -280;
		});

		mm.add('(min-width: 769px)', () => {
			gsap.to(factCards, {
				scrollTrigger: {
					trigger: facts,
					start: 'top top',
					end: '500%', // This is how long we pin
					pinSpacing: false, // better add a spacer then
					pin: true,
					scrub: 1
				},
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
				<h2 class="md-header-text h-text">{data.title}</h2>
			</div>
			{#if data.subTitle}
				<div class="b-frame">
					<p class="lg-body-text b-text">
						{data.subTitle}
					</p>
				</div>
			{/if}
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
<div class="spacer" />

<style>
	.spacer {
		height: 300vh; /* Animation can run for 200 vh */
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
		.spacer {
			display: none;
		}
		.Facts {
			height: unset;
			display: block;
			height: 100vh;
		}

		.background {
			height: calc(100% + var(--b-r-section));
		}

		.message {
			opacity: 1;
			position: relative;
			padding: 50px 0;
		}

		.message .container {
			margin: auto;
		}

		/* HERE */
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
		/* Rows */
		.row:nth-child(odd) {
			justify-content: flex-start;
		}
		.row:nth-child(even) {
			justify-content: flex-end;
		}

		.cards .row {
			min-width: 100%;
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
		/* Rows */
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
