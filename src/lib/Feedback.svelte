<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import Drawer from './Drawer.svelte';

	// Data
	import { feedback } from '$lib/data/feedback.js';

	// Media
	import mp4 from '$lib/video/bis.mp4';
	import webm from '$lib/video/bis.webm';
	import ModalVideoTestimonial from './ModalVideoTestimonial.svelte';

	// Component properties:
	export let tag = 'show-all';
	export let stats = undefined;

	// refs
	let section;

	// vars
	const filteredList =
		tag === 'show-all' ? $feedback : $feedback.filter((v) => v.tags.includes(tag));

	let card = null,
		isMobile,
		isOpen = false,
		modalIsOpen = false,
		seeMore = '',
		seeMoreText = 'See more',
		initialContainerHeight,
		id,
		seeMoreCtx;

	onMount(() => {
		const q = gsap.utils.selector(section);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		const textRevealTween = gsap.fromTo(
			q('.h-text'),
			{ yPercent: 180 },
			{
				scrollTrigger: {
					trigger: section,
					start: 'top 80%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		let base = 140;
		const testimonialCards = gsap.utils.toArray(q('.testimonial-card'));
		for (let i = 0; i < testimonialCards.length; i++) {
			const total = i * base;
			gsap.set(testimonialCards[i], { yPercent: total });
		}

		// Animate Testimonial cards on scroll
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: q('.what-parents-say'),
				start: 'top top',
				end: `${filteredList.length * 40}%`, // This is how long we pin
				pin: true,
				scrub: true,
				anticipatePin: 0.2
				// markers: true
			}
		});

		for (let i = 0; i < testimonialCards.length; i++) {
			if (i != 0)
				tl.to(
					testimonialCards[i],
					{
						yPercent: 0,
						duration: i * 10,
						ease: 'linear',
						boxShadow: '0px 0px 40px -14px rgba(0, 0, 0, 0.0)'
					},
					'<'
				);
		}

		// setTimeout(ScrollTrigger.refresh, 1);

		const mm = gsap.matchMedia();

		mm.add('(max-width: 820px)', () => {
			// Mobile
			isMobile = true;
			setUpTestimonialCards();
			handleClose();

			let base = 140;
			const statsCards = gsap.utils.toArray(q('.stats-card'));
			for (let i = 0; i < statsCards.length; i++) {
				const total = i * base;
				gsap.set(statsCards[i], { yPercent: total });
			}

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: q('.stats'),
					start: 'top top',
					end: `${4 * 40}%`, // This is how long we pin
					pin: true,
					scrub: true,
					anticipatePin: 0.2
					// markers: true
				}
			});

			for (let i = 0; i < statsCards.length; i++) {
				if (i != 0)
					tl.to(
						statsCards[i],
						{
							yPercent: 0,
							duration: i * 10,
							ease: 'linear',
							boxShadow: '0px 0px 40px -14px rgba(0, 0, 0, 0.0)'
						},
						'<'
					);
			}

			setTimeout(ScrollTrigger.refresh, 1);
		});

		mm.add('(min-width: 821px)', () => {
			// Desktop
			isMobile = false;

			// Reset
			gsap.set(q('.p-container'), { clearProps: 'height' });
			gsap.set(q('.p-container span'), { webkitLineClamp: 3 });
			gsap.set('body', { overflow: 'auto' });

			handleClose();

			// -----------------------------------------------------
			// Stat Cards
			// -----------------------------------------------------
			gsap.fromTo(
				q('.stats-card'),
				{ yPercent: 100 },
				{
					scrollTrigger: {
						trigger: '.stats',
						start: 'top 98%',
						end: 'top 75%',
						scrub: 3,
						refreshPriority: -1
					},
					yPercent: 0,
					stagger: {
						each: 0.11
					}
				}
			);
		});

		return () => {
			mm.revert();
			textRevealTween.kill();
		};
	});

	function setUpTestimonialCards() {
		if (isMobile) {
			const q = gsap.utils.selector(section);
			const tl = gsap.timeline();
			tl.set(q('.p-container span'), { clearProps: 'webkitLineClamp' })
				// Apply line clamp
				.set(q('.p-container span'), { webkitLineClamp: 3 })
				.add(() => {
					// Get new height
					initialContainerHeight = gsap.getProperty(q('.p-container')[0], 'height', 'px');
				})
				.set(q('.p-container'), { height: 'max-content' });
		}
	}

	function handleOpen(item) {
		if (isMobile) return;
		card = item;
		isOpen = true;
		if (!isMobile) gsap.set('body', { overflow: 'hidden' });
	}

	function handleClose() {
		if (isMobile) return;
		isOpen = false;
		gsap.set('body', { overflow: 'auto' });
	}

	// Expand card to see more text (Mobile view only)
	function seeMoreLess(e) {
		if (!isMobile) return;
		const targetEle = e.currentTarget;
		const card = e.currentTarget.parentElement;

		seeMore = targetEle.dataset.seeMore === 'true';

		seeMoreCtx = gsap.context(() => {
			let h;
			if (!seeMore) {
				targetEle.innerText = 'See less';
				// Grow
				gsap
					.timeline()
					.set('.p-container', { height: initialContainerHeight })
					.set('.p-container span', { clearProps: 'webkitLineClamp' }, '>')
					.add(() => {
						// Get heights before line clamp	is applied
						h = gsap.getProperty('span', 'height', 'px');
					})
					.to('.p-container', { height: () => h });

				ScrollTrigger.refresh();
			}

			if (seeMore) {
				targetEle.innerText = 'See more';
				// Shrink
				gsap
					.timeline()
					.to('.p-container', { height: initialContainerHeight })
					.set(
						'.p-container span',
						{
							webkitLineClamp: 3,
							onComplete: () => {
								gsap.set('.p-container', { clearProps: 'height' });
							}
						},
						'>'
					);
				ScrollTrigger.refresh();
			}
		}, card);

		targetEle.dataset.seeMore = !seeMore;
	}

	function openModal() {
		id = 1;
		modalIsOpen = true;
	}

	function closeModal() {
		modalIsOpen = false;
	}
</script>

<section bind:this={section} class="Feedback">
	<div class="background" />
	<div class="what-parents-say">
		<div class="left">
			<div class="container">
				<div class="h-frame">
					<h4 class="md-header-text h-text">
						Parents' feedback about our school. We provide an environment where we teach students
						how to think rather than what to think.
					</h4>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="testimonials">
				{#each filteredList as card}
					<div class="testimonial-card">
						<div class="p-container">
							<p class="lg-body-text">
								<span>{card.comment}</span>
							</p>
						</div>
						<span
							class="lg-body-text see-more"
							on:click={() => {
								handleOpen(card);
							}}
							on:click={seeMoreLess}
							on:keydown
							data-see-more="false"
							role="button" tabindex="0">{seeMoreText}</span
						>
						<div class="author">{card.from}</div>
						<div class="relation-to-student">{card.relation}</div>

						<div class="author-profile-container">
							{#if card?.video}
								<button on:click={openModal}>
									<svg
										class="play-button"
										width="32"
										height="32"
										viewBox="0 0 32 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="16" cy="16" r="16" fill="#1E1515" />
										<path
											d="M22.4265 15.1245C23.1123 15.5055 23.1123 16.4918 22.4265 16.8729L13.4856 21.84C12.8191 22.2103 12 21.7283 12 20.9658L12 11.0315C12 10.2691 12.8191 9.78709 13.4856 10.1574L22.4265 15.1245Z"
											fill="white"
										/>
									</svg>
								</button>
							{/if}

							<img
								class="author-profile"
								src={card.photo.URL}
								alt={card.photo.altText}
								loading="lazy"
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="floating">
		<Drawer {isOpen} {handleClose} {card} {openModal} class="hideDrawer" />
	</div>

	<div class="stats {stats ? 'show' : 'hide'}">
		{#if stats === 'cbse'}
		<div class="stats-card">
			<div class="num stat-nums-text">1</div>
			<div class="desc">
				iCBSE curriculum designed to align with NEP 2020, integrating skill-based, inquiry-driven learning with a focus on holistic development
			</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">100<span>%</span></div>
			<div class="desc">Focus on academic rigour, values, character and profile-building</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">12</div>
			<div class="desc">Competitive sports for middle and upper school</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">5<span>yrs</span></div>
			<div class="desc">Average experience of our faculty in CBSE</div>
		</div>
		{:else}
		<div class="stats-card">
			<div class="num stat-nums-text">1/40</div>
			<div class="desc">
				Schools in India with the International Baccalaureate PYP-MYP-DP currciculum from grade PK-12
			</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">75<span>%</span></div>
			<div class="desc">of students in Primary years take a foreign language</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">12</div>
			<div class="desc">
				Competitive sports across all programmes and an intramural sports program for elementary and early childhood
			</div>
		</div>
		<div class="stats-card">
			<div class="num stat-nums-text">4<span>yrs</span></div>
			<div class="desc">
				avg experience of our faculty in IB with 98% with over 2 years experience
			</div>
		</div>
		{/if}
	</div>
	<ModalVideoTestimonial isOpen={modalIsOpen} {id} {closeModal} media={[{ id: 1, mp4, webm }]} />
</section>

<style>
	.Feedback {
		position: relative;
		min-height: max-content;
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
		background: var(--gradient-blue-orange);
	}

	.what-parents-say {
		height: max-content;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 76px var(--gutter) 0;
		height: 100vh;
	}

	.left {
		max-width: 100%;
		max-width: 440px;
	}

	.left h4 {
		width: 100%;
		font-weight: 400;
		color: var(--secondary-black);
	}

	.right {
		flex-basis: 50%;
		/* height: 120%; */
	}

	.testimonials {
		position: relative;
		min-height: 0px;

		width: 100%;
		height: 25rem;
	}

	.testimonial-card {
		position: relative;
		background-color: white;
		padding: 32px;
		font-size: 25px;
		font-weight: 500;
		line-height: 1.4;

		position: absolute;
		margin-bottom: 120px;
		padding: 48px;

		border-radius: 20px;
	}
	/* .drawer p, */
	.see-more {
		margin-bottom: 30px;
	}

	.testimonial-card .p-container {
		overflow: hidden;
	}

	.testimonial-card p span:first-child {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		/* -webkit-line-clamp: 3; */
		-webkit-box-orient: vertical;
	}

	.testimonial-card .see-more {
		display: inline-block;
		cursor: pointer;
		text-decoration: underline;
		font-size: 16px;
	}

	.testimonial-card .author-profile-container {
		position: absolute;
		bottom: 0;
		right: 8%;
		transform: translateY(50%);
		width: 120px;
		height: 120px;
		border: white 4px solid;
		border-radius: 50%;
	}
	.author-profile-container button {
		position: absolute;
		top: -0.1rem;
		right: 0.1rem;
	}

	.testimonial-card img {
		border-radius: 50%;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Stats */
	.stats.hide {
		display: none;
	}

	.stats.show {
		display: flex;
	}

	.stats {
		min-height: max-content;
		position: relative;
		padding: 100px var(--gutter) 150px;
		align-items: stretch;
		justify-content: center;
		flex-wrap: wrap;
	}

	.stats-card {
		text-align: center;
		border-radius: var(--b-r-container);
		padding: 32px;
		background-color: white;
		color: var(--secondary-black-o60);
		flex-grow: 1;
		margin-left: 0;
		margin-right: 0;
		flex-basis: unset;
		flex-shrink: unset;
		min-width: unset;
		margin-bottom: 32px;
	}

	.stats-card:first-child .num {
		color: var(--brand-colors-orange);
	}
	.stats-card:nth-child(2) .num {
		color: var(--brand-colors-purple);
	}
	.stats-card:nth-child(3) .num {
		color: var(--brand-colors-lime);
	}
	.stats-card:last-child .num {
		color: var(--brand-colors-blue);
	}

	.stats-card .num {
		line-height: 100%;
		letter-spacing: -0.02em;
		display: flex;
		justify-content: center;
		margin-bottom: 38px;
	}

	.stats-card .num span {
		font-weight: 500;
		margin-top: -0.4em;
		font-size: 0.5em;
		display: inline-block;
	}
	@media only screen and (max-width: 820px) {
		.floating :global(.hideDrawer) {
			display: none;
		}

		.h-frame {
			margin-bottom: 40px;
		}

		.Feedback {
			padding-bottom: 5rem;
		}

		.stats {
			height: 100vh;
		}
		.stats-card {
			position: absolute;
			margin-bottom: 120px;
			padding: 48px;
			width: calc(100vw - var(--gutter) * 2);
			height: 223px;
		}
	}

	@media only screen and (min-width: 821px) {
		.stats.show {
			height: 90vh;
			padding: 0 var(--gutter) 200px;
			align-items: flex-start;
			align-content: center;
			max-width: 900px;
			margin: auto;
		}

		.what-parents-say {
			height: 100vh;
			flex-direction: row;
		}

		.left {
			flex-grow: 1;
			flex-shrink: 5;
			max-width: 50%;
			display: flex;
			align-items: center;
		}

		.left .container {
			height: 25rem;
		}

		.left .h-frame {
			margin-bottom: 0;
		}

		.left h4 {
			width: 80%;
		}

		.right {
			padding-left: 48px;
			display: flex;
			align-items: center;
		}

		.stats {
			align-items: center;
		}

		.stats-card {
			min-width: 286px;
			flex-shrink: 0;
			flex-grow: 0;
			flex-basis: 24%;
			max-width: 318px;
			padding: 48px 30px 30px 30px;
			aspect-ratio: 1/1;
			margin-left: 6px;
			margin-right: 6px;
			margin-bottom: 12px;
		}
	}

	@media only screen and (min-width: 1305px) {
		.stats.show {
			width: unset;
			max-width: unset;
			margin: unset;
		}
	}
</style>
