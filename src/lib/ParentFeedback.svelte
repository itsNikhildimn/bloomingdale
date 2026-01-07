<script>
	//---------------------------------------------------------------------------
	// Module:  $lib/ParentFeedback.svelte
	//
	// Provides a page section component to display parent feedback in a
	// horizontally scrolled region.
	//---------------------------------------------------------------------------

	// Main imports:
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { Observer } from 'gsap/dist/Observer';
	import { feedback } from '$lib/data/feedback.js';
	import Drawer from './Drawer.svelte';

	// Assets:
	import quoteMark from '$lib/icons/quote-mark.svg';

	// Component properties:
	export let tag = 'show-all';

	// Refs:
	let section, cards, marker, scrollerView;

	// Component state:
	const filteredList =
		tag === 'show-all' ? $feedback : $feedback.filter((v) => v.tags.includes(tag));

	const scrollerWidth = filteredList.length * 30;

	let itemWidth, totalWidth, offset, leftMost, activeCard, timer, delayedUpdate;
	let started = false,
		isAnimating = false,
		interval = 3000;
	let isOpen = false,
		index = 0;

	gsap.registerPlugin(Observer);

	// Event handlers:

	// slideLeft
	//    Moves the array of cards to the left by one place, circulating the
	// leftmost one round to be the new rightmost.
	function slideLeft(dragged) {
		if (isAnimating || document.hidden) return;
		pauseAnimation();
		isAnimating = true;
		interval = dragged ? 4000 : 2000;

		const nextLeft = (leftMost + 1) % filteredList.length;
		const nextActive = (activeCard + 1) % filteredList.length;

		const tl = gsap.timeline({
			onComplete: () => {
				offset[leftMost] += totalWidth;
				leftMost = nextLeft;
				activeCard = nextActive;
				isAnimating = false;
				if (delayedUpdate) centreCards();
				else resumeAnimation();
			}
		});
		offset = offset.map((o) => o - itemWidth[activeCard]);
		tl.to(cards, { x: (n) => offset[n], duration: 1 });
		tl.to(marker, { x: nextActive * 30 - 5, duration: 1 }, '<');
		tl.set(cards[leftMost], { x: offset[leftMost] + totalWidth });
	}

	// slideRight
	//    Moves the array of cards right by one place, circulating the
	// rightmost one round to be the new leftmost.
	function slideRight(dragged) {
		if (isAnimating) return;
		pauseAnimation();
		isAnimating = true;
		interval = dragged ? 4000 : 2000;

		const nextLeft = (leftMost + filteredList.length - 1) % filteredList.length;
		const nextActive = (activeCard + filteredList.length - 1) % filteredList.length;
		const tl = gsap.timeline({
			onComplete: () => {
				leftMost = nextLeft;
				activeCard = nextActive;
				isAnimating = false;
				if (delayedUpdate) centreCards();
				else resumeAnimation();
			}
		});

		offset[nextLeft] -= totalWidth;
		tl.set(cards[nextLeft], { x: offset[nextLeft] });
		offset = offset.map((o) => o + itemWidth[activeCard]);
		tl.to(cards, { x: (n) => offset[n], duration: 1 });
		tl.to(marker, { x: nextActive * 30 - 5, duration: 1 }, '<');
	}

	// resumeAnimation
	//    Called to start or resume slider animation. Only does so if the
	// component has already reached the trigger point in the window.
	function resumeAnimation() {
		if (started) timer = setTimeout(slideLeft, interval);
	}

	// pauseAnimation
	//    Called to stop the timer-based animation of the slider. Note that
	// a current animation may be in progress and will run to completion.
	function pauseAnimation() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	// centreCards
	//    Called to re-centre the cards in the window (e.g. after resize).
	// Places card 0 at the centre of the window and lays others out to
	// left and right, as required.
	function centreCards() {
		pauseAnimation();

		// If animation currently running, defer laying out the cards until
		// it completes.
		if (isAnimating) {
			delayedUpdate = true;
			return;
		}
		delayedUpdate = false;

		// Find the (possibly new) widths of each of the cards, and deduce
		// the total width of all cards. Note that they may well have
		// translations on them, if the slider animation has been running.
		const viewWidth = scrollerView.clientWidth;
		itemWidth = Array.from(cards).map((el) => el.scrollWidth + 40);
		totalWidth = itemWidth.reduce((t, c) => t + c, 0);
		leftMost = activeCard = 0;

		// Arrange cards so that card 0 is centred.
		let pos = (viewWidth - (itemWidth[0] - 40)) / 2;
		offset = Array(itemWidth.length).fill(pos);
		for (let i = itemWidth.length - 1; pos > 0; i--) {
			offset[i] -= totalWidth;
			pos -= itemWidth[i];
			leftMost = i;
		}
		gsap.set(cards, { x: (n) => offset[n] });
		gsap.set(marker, { x: -5 });

		// (Re-)start the timer to animate transitions.
		resumeAnimation();
	}

	// onMount hook:
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
				duration: 1,
				onComplete: () => {
					started = true;
					resumeAnimation();
				}
			}
		);

		// -----------------------------------------------------
		// Slider setup
		// -----------------------------------------------------
		cards = q('.feedback-card');

		let debounce = 0;

		function onResize() {
			clearTimeout(debounce);
			debounce = setTimeout(centreCards, 200);
		}

		window.addEventListener('resize', onResize);
		centreCards();

		let slide = slideLeft;

		const observer = Observer.create({
			target: q('.scroller-view'),
			type: 'wheel,touch,pointer',
			tolerance: 10,
			onRight: () => {
				slide = slideRight;
			},
			onLeft: () => {
				slide = slideLeft;
			},
			onStop: () => {
				slide(true);
				slide = slideLeft;
			},
			onStopDelay: 0.1,
			preventDefault: true
		});

		return () => {
			window.removeEventListener('resize', onResize);
			clearTimeout(debounce);
			clearInterval(timer);
			observer.kill();
		};
	});

	function handleOpen(e) {
		index = e.currentTarget.dataset.idx;
		isOpen = true;
		gsap.set('body', { overflow: 'hidden' });
	}

	function handleClose() {
		isOpen = false;
		gsap.set('body', { overflow: 'auto' });
	}

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<section id="parent-feedback" bind:this={section}>
	<div class="content-wrapper">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">Parents' feedback about Bloomingdale</h2>
		</div>
		<div class="scroller-view" bind:this={scrollerView}>
			<div class="cards">
				{#each filteredList as fb, idx}
					<button class="feedback-card md-body-text" data-idx={idx} on:click={handleOpen}>
						<img src={quoteMark} alt="" />
						<p class="feedback-text lg-body-text">{fb.comment}</p>
						<div class="feedback-source">
							<img src={fb.photo?.URL} alt="" loading="lazy" />
							<h5 class="author">{fb.from}</h5>
							<p class="relation-to-student">{fb.relation}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>
		<div class="scroller-control">
			<svg viewBox="0 0 {scrollerWidth} 10" pointer-events="bounding-box">
				{#each filteredList as fb, n}
					<circle cx={n * 30 + 10} cy="5" r="5" fill="rgba(37, 75, 106, 0.2)" />
				{/each}
				<rect x="5" y="0" width="20" height="10" rx="5" bind:this={marker} />
			</svg>
		</div>
	</div>
	<Drawer {isOpen} {handleClose} {feedback} {index} />
</section>

<style>
	/*---------------------------------------------------------------------------
   * Styles
   *-------------------------------------------------------------------------*/

	#parent-feedback {
		position: relative;
		background: linear-gradient(180deg, #caefff 0%, #effffd 23.3%, #fff0d0 82.39%);
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		padding-bottom: 60px;
	}

	#parent-feedback .content-wrapper {
		min-height: 100vh;
	}

	#parent-feedback h2 {
		width: 640px;
		margin: 0px auto;
		text-align: center;
		padding: 128px 0px 0;
	}

	.h-frame {
		margin-bottom: 88px;
		padding: 0 var(--gutter);
	}

	.scroller-view {
		width: 100%;
		overflow-x: hidden;
	}

	.scroller-control {
		width: fit-content;
		margin: 24px auto;
	}

	.scroller-control svg {
		height: 8px;
		width: auto;
	}

	.cards {
		display: flex;
		flex-flow: row nowrap;
		column-gap: 40px;
	}

	.feedback-card {
		min-width: 552px;
	}

	.feedback-card {
		background-color: white;
		padding: 48px;
		border-radius: var(--b-r-container);
		box-sizing: content-box;
	}

	.feedback-card .feedback-text {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.feedback-text {
		margin: 24px 0 48px;
	}

	.feedback-source {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'image title' 'image caption';
		align-items: center;
		column-gap: 24px;
	}

	.feedback-source img {
		grid-area: image;
		width: 64px;
		height: 64px;
		border-radius: 32px;
		object-fit: cover;
	}

	.feedback-source h5 {
		grid-area: title;
		margin-bottom: 0;
		align-self: flex-end;
	}

	.feedback-source p {
		grid-area: caption;
		opacity: 60%;
		align-self: flex-start;
	}

	.md-body-text {
		font-size: 20px;
		line-height: 120%;
	}

	@media only screen and (max-width: 750px) {
		#parent-feedback h2 {
			width: auto;
			padding: 80px 0px 40px;
		}
		.md-body-text {
			font-size: 16px;
		}

		.feedback-card {
			min-width: 263px;
		}
	}
</style>
