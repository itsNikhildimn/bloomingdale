<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import MyLink from './buttons/MyLink.svelte';

	// Assets
	import earlyYears from '$lib/icons/illustrations/alphabet.svg';
	import middleYears from '$lib/icons/illustrations/equation.svg';
	import primaryYears from '$lib/icons/illustrations/grade.svg';
	import diploma from '$lib/icons/illustrations/diploma-blue.svg';
	import cbse from '$lib/icons/illustrations/books-red.svg';

	// refs
	let section;

	const programs = [
		{
			image: earlyYears,
			alt: '',
			title: 'Early Years',
			desc: 'Age 3-7, our program for the youngest learners who grow up and develop at a tremendous rate',
			color: 'orange',
			href: 'eyp'
		},
		{
			image: primaryYears,
			alt: '',
			title: 'Primary Years',
			desc: 'Develops young students as caring, active participants in a lifelong journey of learning',
			color: 'lime',
			href: 'pyp'
		},
		{
			image: middleYears,
			alt: '',
			title: 'Middle Years',
			desc: 'Ages 11-16, interdisciplinary, critical thinking, global awareness, community service, and intercultural understanding',
			color: 'purple',
			href: 'myp'
		},
		{
			image: cbse,
			alt: '',
			title: 'CBSE',
			desc: 'Central Board of Secondary Education is a national level board of education in India for Grades 6 to 12',
			color: 'red',
			href: 'cbse'
		},
		{
			image: diploma,
			alt: '',
			title: 'Diploma',
			desc: 'IB Diploma Programme fosters overall student development in Grades 11 & 12',
			color: 'blue',
			href: 'diploma'
		}
	];

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

<section id="programs" bind:this={section}>
	<div class="h-frame">
		<h2 class="lg-header-text h-text">Learning for all<br /> purposes and ages</h2>
	</div>
	<div class="cards">
		{#each programs as program}
			<div class="card">
				<div class="card-inner">
					<img src={program.image} alt="Middle years icon" />
					<h3 class="sm-heading lg-body-text">{program.title}</h3>
					<p class="desc sm-body-text">
						{program.desc}
					</p>
					<div class="btn-container">
						<MyLink style={`btn btn-${program.color}`} href={program.href}>Learn more</MyLink>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#programs {
		margin-top: var(--negative-margin);
		border-top-right-radius: var(--b-r-section);
		border-top-left-radius: var(--b-r-section);
		position: relative;
		width: 100vw;
		background-color: white;
		text-align: center;
		padding: 80px var(--gutter) 80px;
	}

	.h-frame {
		margin-bottom: 64px;
	}
	.cards {
		display: flex;
		flex-direction: column;
	}

	.card {
		min-width: 50%;
		flex-grow: 1;
	}

	.card-inner {
		margin: auto;
		max-width: 230px;
		flex-wrap: wrap;
		padding: 4rem 0;
	}

	.card:not(:last-child) .card-inner {
		border-bottom: 0.5px var(--secondary-black-o60) solid;
	}

	img {
		margin: auto;
		margin-bottom: 48px;
	}

	h3 {
		margin-bottom: 1rem;
	}

	p {
		color: var(--secondary-black-o60);
		margin-bottom: 48px;
	}

	@media (min-width: 769px) {
		.cards {
			flex-direction: row;
			justify-content: space-around;
			flex-wrap: wrap;
		}
		.card:nth-child(1),
		.card:nth-child(2) {
			border-bottom: 0.5px var(--secondary-black-o60) solid;
		}
		.card:not(:last-child) .card-inner {
			border-bottom: unset;
		}
	}

	@media (min-width: 1261px) {
		#programs {
			height: calc(100vh + var(--b-r-section) * 2);
			padding: 160px var(--gutter) 160px;
		}

		.card-inner {
			padding: unset;
		}

		.card {
			min-width: unset;
			padding: unset;
		}
		.card:nth-child(1),
		.card:nth-child(2) {
			border-bottom: unset;
		}
		.card:not(:last-child) {
			border-right: 0.5px var(--secondary-black-o60) solid;
		}
	}
</style>
