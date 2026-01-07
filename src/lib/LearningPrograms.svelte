<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';

	import earlyYears from '$lib/icons/illustrations/alphabet.svg';
	import middleYears from '$lib/icons/illustrations/equation.svg';
	import primaryYears from '$lib/icons/illustrations/grade.svg';
	import diploma from '$lib/icons/illustrations/diploma-blue.svg';

	import MyLink from '$lib/buttons/MyLink.svelte';

	// refs
	let learningYears, message, learningYearsCards;

	const data = {
		title:
			'We provide an environment where we teach students how to think rather than what to think',
		items: [
			{
				src: earlyYears,
				alt: '',
				title: 'Early Years',
				text: 'Age 3-6, our program for the youngest learners who grow up and develop at a tremendous rate',
				color: 'orange',
				href: '/eyp'
			},
			{
				src: primaryYears,
				alt: '',
				title: 'Primary Years',
				text: 'Develops young students as caring, active participants in a lifelong journey of learning',
				color: 'lime',
				href: '/pyp'
			},
			{
				src: middleYears,
				alt: '',
				title: 'Middle Years',
				text: 'Ages 11-16, interdisciplinary, critical thinking, global awareness, community service, and intercultural understanding',
				color: 'purple',
				href: '/myp'
			},
			{
				src: diploma,
				alt: '',
				title: 'Diploma Programme',
				text: 'IB Diploma Programme fosters overall student development in Grades 11 & 12',
				color: 'blue',
				href: '/diploma'
			}
		]
	};

	onMount(() => {
		const q = gsap.utils.selector(learningYears);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text'),
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

		const mm = gsap.matchMedia();

		let y;
		mm.add('(min-width: 769px) and (max-width: 1200px)', () => {
			y = -295;
		});

		mm.add('(min-width: 1201px)', () => {
			y = -270;
		});

		mm.add('(min-width: 769px)', () => {
			gsap.to(learningYearsCards, {
				scrollTrigger: {
					trigger: learningYears,
					start: 'top top',
					end: '500%', // This is how long we pin
					pinSpacing: false, // better add a spacer then
					pin: true,
					scrub: 1
				},
				y: `${y}%` // -290
			});
		});
		return () => {
			mm.kill();
		};
	});
</script>

<section bind:this={learningYears} class="Learning-years">
	<div class="background" />
	<div bind:this={message} class="message">
		<div class="h-frame">
			<h4 class="md-header-text h-text">
				We provide an environment where we teach students how to think rather than what to think
			</h4>
		</div>
	</div>
	<div bind:this={learningYearsCards} class="cards">
		<div class="cards-inner">
			{#each data.items as item}
				<div class="row">
					<div class="card shadow">
						<img src={item.src} alt={item.alt} />
						<h2 class="sm-header-text">{item.title}</h2>
						<p class="desc sm-body-text">
							{item.text}
						</p>
						<div class="btn-container">
							<MyLink style={`btn btn-${item.color}`} href={item.href}>Learn more</MyLink>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- message was here -->
</section>
<div class="spacer" />

<style>
	.spacer {
		height: 400vh; /* Animation can run for 200 vh */
	}

	.Learning-years {
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
		min-width: 100%;
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

	.card .btn-container {
		position: absolute;
		bottom: 0;
		transform: translateY(50%);
	}

	.message h4 {
		max-width: 34rem;
		margin-top: 53px;
		text-align: center;
		line-height: 1.4;
		font-weight: 400;
		color: var(--secondary-dark-blue);
	}

	@media (min-width: 481px) {
		.card {
			max-width: 300px;
			min-width: 312px;
		}
	}

	@media (max-width: 731px) {
		.Learning-years .cards .cards-inner .row {
			min-width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.spacer {
			display: none;
		}

		.Learning-years {
			height: unset;
			display: block;
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
		}

		.row {
			margin-bottom: 70px;
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
			justify-content: flex-start;
			height: 260px;
		}

		/* Cards */
		.row:nth-child(2) .card {
			justify-content: flex-end;
			/* transform: translateX(-25%); */
		}
		.row:nth-child(3) .card {
			/* transform: translateX(-10%); */
		}
		.row:nth-child(4) .card {
			justify-content: flex-end;
			transform: translate(3vw, 25%);
		}
	}
</style>
