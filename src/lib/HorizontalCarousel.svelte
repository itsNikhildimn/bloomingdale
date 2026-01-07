<script>
	// There are two instances of Horizontal carousel:
	// 1. News (home page
	// 2. Teachers (about page)
	// 		* the teachers instance has a mechansim for
	//        triggering a modal popup

	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import MyLink from './buttons/MyLink.svelte';
	import SvgIcon from './SvgIcon.svelte';

	import ModalTeachers from './ModalTeachers.svelte';

	export let data;

	// Refs
	let news, shaft, card, backBtn, fwdBtn;

	let modalIsOpen = false,
		teacher = {};

	onMount(() => {
		const q = gsap.utils.selector(news);
		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text'),
			{ yPercent: 110 },
			{
				scrollTrigger: {
					trigger: news,
					start: 'top 80%'
				},
				yPercent: 0,
				duration: 1
			}
		);
	});

	// Move either the total of items in the viewport OR
	// The total of items outside the viewport (whichever is less)
	let increment = 0;
	function scroller(direction) {
		// -----------------------------------------------------
		// Carousel
		// -----------------------------------------------------
		let rectShaft = shaft.getBoundingClientRect();
		let rectCard = card.getBoundingClientRect();

		if (direction === 'forwards') {
			if (rectShaft.right > window.innerWidth) {
				gsap.to(shaft, {
					x: increment - rectCard.width - 24,
					onStart: () => {
						changeColor(direction);
					}
				});
				increment = increment - rectCard.width - 24;
			}
		}
		// shaft width /
		if (direction === 'backwards') {
			if (rectShaft.left < 0) {
				gsap.to(shaft, {
					x: increment + rectCard.width + 24,
					onStart: () => {
						changeColor(direction);
					}
				});
				increment += rectCard.width + 24;
			}
		}
	}

	function changeColor(direction) {
		let rShaft = shaft.getBoundingClientRect();
		let rCard = card.getBoundingClientRect();

		// Forward btn
		if (direction === 'forwards') {
			if (rShaft.right - rCard.width - 24 < window.innerWidth) {
				gsap.to(fwdBtn, { color: 'hsl(0,1%,55%)', duration: 0.2 }); // light
			} else {
				gsap.to(backBtn, { color: 'hsl(0,17%,10%)', duration: 0.2 });
				gsap.to(fwdBtn, { color: 'hsl(0,17%,10%)', duration: 0.2 }); // dark
			}
		}
		// Backwards btn
		if (direction === 'backwards') {
			if (rShaft.left + rCard.width + 24 > 0) {
				gsap.to(backBtn, { color: 'hsl(0,1%,55%)', duration: 0.2 }); // light
			} else {
				gsap.to(fwdBtn, { color: 'hsl(0,17%,10%)', duration: 0.2 }); // dark
				gsap.to(backBtn, { color: 'hsl(0,17%,10%)', duration: 0.2 }); // dark
			}
		}
	}

	// Modal for teachers instance
	function openModal(image, alt, name, role, exp, bio) {
		teacher = { image, alt, name, role, exp, bio };
		modalIsOpen = true;
	}
	function closeModal() {
		modalIsOpen = false;
	}
</script>

<section class="Carousel" bind:this={news}>
	<div class="background" />
	<div class="inner wrapper">
		<div class="header">
			<div class="h-frame">
				<h2 class="lg-header-text h-text">
					{#each data.title as frag}
						{frag} <br />
					{/each}
				</h2>
			</div>
			<div class="controls">
				<button
					bind:this={backBtn}
					on:click={() => {
						scroller('backwards');
					}}
				>
					<svg
						class="chevron-left"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g>
							<path
								d="M15 18L9 12L15 6"
								stroke="currentcolor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
					</svg>
				</button>
				<button
					bind:this={fwdBtn}
					on:click={() => {
						scroller('forwards');
					}}
				>
					<svg
						class="chevron-right"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g>
							<path
								d="M9 18L15 12L9 6"
								stroke="currentcolor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
					</svg>
				</button>
			</div>
		</div>
		<div class="items">
			<div class="shaft" bind:this={shaft}>
				{#each data.entries as entry}
					<div class="card" bind:this={card}>
						<div class="card-inner">
							<img class="" src={entry.image} alt={entry.alt} loading="lazy" />
							{#if entry.about}
								<button
									class="info-container"
									on:click={() => {
										openModal(
											entry.image,
											entry.alt,
											entry.name,
											entry.role,
											entry.about.exp,
											entry.about.bio
										);
									}}
								>
									<div class="info-card">
										{#if entry.about.exp}
											<h3 class="sm-header-text">{entry.about.exp}</h3>
										{/if}
										<p class="sm-body-text">{entry.about.bio}</p>
									</div>
								</button>
							{/if}
						</div>
						<div class="name lg-body-text">{entry.name}</div>
						{#if entry.role}
							<span class="subject sm-body-text">{entry.role}</span>
						{/if}
						{#if data.readAllBtn}
							<a href={entry.link} class="btn btn-alt">
								<span class="sm-body-text">Read all</span><SvgIcon shape="arrow-stout" />
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		{#if data.cta}
			<div class="container">
				<MyLink href={data.cta} style="btn btn-orange">See all news</MyLink>
			</div>
		{/if}
	</div>
	<ModalTeachers isOpen={modalIsOpen} {closeModal} {teacher} />
</section>

<style>
	.Carousel {
		position: relative;
		padding-bottom: calc(48px + var(--b-r-section));
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		margin-top: var(--negative-margin);
		height: calc(100% + var(--b-r-section));
		width: 100%;
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: white;
	}

	.inner.wrapper {
		position: relative;
		height: 100%;
	}

	h2 {
		text-align: left;
		color: var(--secondary-black);
		margin-bottom: 0;
	}

	h3 {
		color: var(--brand-colors-blue);
		margin-bottom: 0.5rem;
	}

	p {
		color: var(--secondary-black-o60);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card,
	.header {
		margin-bottom: 32px;
	}

	.controls {
		display: none;
		align-self: flex-end;
	}

	.container {
		display: flex;
		justify-content: center;
	}

	button {
		cursor: pointer;
	}

	button:first-child {
		color: hsl(0, 1%, 55%);
	}

	.subject {
		color: var(--secondary-black-o60);
	}

	.card .name {
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 0.25rem;
	}

	.card-inner {
		position: relative;
		aspect-ratio: 1/1;
		height: auto;
		display: flex;
	}

	.card-inner {
		margin-bottom: 24px;
	}

	.card-inner img {
		position: absolute;
		height: 100%;
		border-radius: calc(var(--b-r-container) / 3 * 2);
		width: 100%;
	}

	.card-inner img {
		border-radius: var(--b-r-container);
		object-fit: cover;
	}

	.info-container {
		cursor: pointer;
		position: relative;
		align-self: flex-end;
		padding: 0.5rem;
	}

	.info-card {
		background-color: white;
		padding: 1rem;
		border-radius: 1rem;
	}

	.info-card p {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.btn-alt span {
		margin-right: 5px;
	}

	.btn-alt :global(svg) {
		width: 18px;
		height: 18px;
	}

	@media (min-width: 581px) {
		.controls {
			display: block;
		}

		.items {
			overflow: hidden;
			position: relative;
			width: 100vw;
			margin-left: calc(0px - var(--gutter));
			padding-left: var(--gutter);
			margin-bottom: 40px;
		}

		.shaft {
			width: max-content;
			display: flex;
		}

		.card {
			margin-right: 24px;
			margin-bottom: unset;
			width: 350px;
			width: 426px;
		}

		.container {
			justify-content: flex-start;
		}

		.shaft .card:nth-child(even) .card-inner {
			aspect-ratio: 1/0.8;
		}

		.card-inner .info-card {
			opacity: 0;
			transition: opacity 0.5s;
		}

		.card-inner:hover .info-card {
			opacity: 1;
		}
	}

	@media (min-width: 769px) {
		/* .Carousel {
			padding-bottom: calc(72px + var(--b-r-section));
		} */
		.Carousel {
			padding-bottom: calc(var(--b-r-section));
		}
		.items {
			margin-bottom: 64px;
		}
	}

	@media (min-width: 965px) {
		.info-container {
			padding: 1rem;
		}
	}
</style>
