<script>
	//---------------------------------------------------------------------------
	// Module:  $lib/Timeline.svelteHTML
	//
	// Used in the Landing page to show a scrollable timeline of School history.
	//---------------------------------------------------------------------------

	// Main imports:
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	// Assets:
	import SvgIcon from '$lib/SvgIcon.svelte';

	// Data:
	import stories from '$lib/data/timeline.js';

	// Refs:
	let history;

	let isMobile,
		page = 0,
		direction = 1;

	// Component state:
	let tl;

	onMount(() => {
		const q = gsap.utils.selector(history);
		const mm = gsap.matchMedia();
		let timeOutFunctionId;

		window.addEventListener('resize', throttle);

		function throttle() {
			clearTimeout(timeOutFunctionId);
			timeOutFunctionId = setTimeout(setLineValues, 500);
		}

		function setLineValues() {
			if (!isMobile) return;

			const cpage = page;
			tl.progress(0);
			tl.invalidate();
			tl.tweenFromTo(0, tl.labels[`story-${cpage + 1}`], { duration: 0.001 });
		}

		mm.add(
			'(max-width: 820px)',
			() => {
				isMobile = true;
				return () => {
					isMobile = false;
				};
			},
			history
		);

		tl = gsap.timeline({
			paused: true
		});

		tl.timeScale(20);

		for (let i = 0; i < stories.length - 1; i++) {
			tl.addLabel(`story-${i + 1}`, '+=2').to(
				q('.scroller'),
				{ xPercent: parseInt(`-${i + 1}00 `), ease: 'none', duration: 15, ease: 'power1.inOut' },
				'+=2'
			);
			if (isMobile) {
				tl.to(
					q('.timeline-inner'),
					{
						x: () => `-${gsap.getProperty(q('.part')[1], 'width') * (i + 1)}`,
						id: `tween-${i + 1}`,
						duration: 15,
						ease: 'power1.inOut'
					},
					'<'
				);
			}
			tl.to(q(`.line-${i + 1} .solid`), { width: '100%', duration: 15, ease: 'power1.inOut' }, '<')
				.to(q(`.point-${i + 1}`), { opacity: 1.0, background: '#fff' })
				.to(q(`.point-${i + 1} span`), { opacity: 1, duration: 3 }, '<')
				.add(() => {
					// record page value to calculate position of timeline-inner on window resize
					page = direction === 1 ? i + 1 : i;
				});
		}

		tl.addLabel('story-4').addLabel('end', '+=2').to({}, { duration: 10 });
	});

	// Event handlers:

	function pageBack(ev) {
		// Handles a click on a navigation button, to move to a new story.
		const story = parseInt(ev.currentTarget.closest('.segment').dataset.story, 10),
			prev = `story-${story - 1}`;
		direction = -1;
		tl.tweenTo(prev);
	}

	function pageForward(ev) {
		const story = parseInt(ev.currentTarget.closest('.segment').dataset.story, 10),
			next = `story-${story + 1}`;
		direction = 1;
		tl.tweenTo(next);
	}
</script>

<section id="history" bind:this={history}>
	<!-- <div class="wrapper"> -->
	<div class="timeline">
		<div class="timeline-inner">
			{#each stories as story, n}
				<div class="part">
					<div class="line line-{n}">
						<div class="solid" />
					</div>
					<div class="point point-{n}"><span>{story.year}</span></div>
				</div>
			{/each}
			<div class="part">
				<div class="line" />
			</div>
		</div>
	</div>
	<div class="scroll-wrapper">
		<div class="scroller">
			{#each stories as story, n}
				<div class="segment" data-story={n + 1}>
					<span class="year lg-header-text">{story.year}</span>
					<img src={story.featured} alt="" />
					<span class="story lg-body-text">{story.text}</span>
					<div class="scroller-nav">
						<button class="back btn" disabled={n === 0} on:click={pageBack}>
							<SvgIcon shape="circle-arrow-forward" />
						</button>
						<button class="forward btn" disabled={n === 3} on:click={pageForward}>
							<SvgIcon shape="circle-arrow-back" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- </div> -->
</section>

<style>
	#history {
		background-color: var(--brand-colors-blue);
		color: white;
		padding: 40px var(--gutter) 0;
		position: relative;
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		min-height: calc(100vh - var(--negative-margin));
		margin-top: var(--negative-margin);
		padding-bottom: calc(10px - var(--negative-margin));
		padding-top: 158px;
		width: 100vw;
		overflow: clip;
	}

	.timeline {
		width: 100%;
	}

	.timeline-inner {
		display: inline-flex;
		width: 100%;
	}

	.part {
		width: 31%;

		display: flex;
		align-items: center;
	}

	.part:first-child,
	.part:last-child {
		width: 16%;
	}

	.part .line {
		position: relative;
		padding: 1px 50px;
		width: calc(100% - 22px);
		background-image: linear-gradient(to right, #ffffff41 50%, rgba(255, 255, 255, 0) 0%);
		background-position: top;
		background-size: 16px 2px;
		background-repeat: repeat-x;
	}

	.solid {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: white;
		width: 0;
	}

	.part .point {
		position: relative;
		z-index: 2;
		width: 16px;
		height: 16px;
		border-radius: 1000px;
		border: solid 4px #ffffff41;
		outline: solid 6px var(--brand-colors-blue);
		overflow: visible;
	}

	.part .point span {
		color: #fff;
		position: absolute;
		font-size: 20px;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.41;
	}

	.part:first-child .line {
		background: #fff;
		opacity: 1;
	}
	.part:first-child .point {
		background-color: #fff;
		opacity: 1;
	}
	.part:first-child .point span {
		opacity: 1;
	}

	.scroll-wrapper {
		padding-top: 40px;
		overflow: clip;
		position: relative;
		margin-left: calc(0px - var(--gutter));
		width: 100vw;
	}

	.scroller {
		display: flex;
		flex-flow: row nowrap;
	}

	.segment {
		flex: 0 0 100%;
		display: grid;
		grid-template-columns: clamp(200px, 34vw, 489px) 1fr;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'image year'
			'image story'
			'image nav';
		gap: 2.5rem 8vw;

		padding: 60px var(--gutter);
	}

	.segment .year {
		grid-area: year;
	}
	.segment img {
		grid-area: image;
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 1rem;

		/* margin-left: var(--gutter); */
	}
	.segment .story {
		grid-area: story;
		padding-right: 2em;
		font-weight: 400;
	}

	.scroller-nav {
		grid-area: nav;
		align-self: center;
		display: flex;
		flex-flow: row nowrap;
		gap: 16px;
	}
	.scroller-nav button {
		border: none;
		padding: 0px;
		background-color: inherit;
		color: inherit;
	}
	.scroller-nav button:active,
	.scroller-nav button:disabled {
		opacity: 0.4;
	}
	.scroller-nav button :global(svg) {
		height: 48px;
		width: auto;
	}

	@media screen and (max-width: 820px) {
		.timeline {
			width: 100%;
			width: max-content;
		}

		.part {
			width: 36vw;
		}

		.part:first-child .line {
			padding: 1px 40%;
		}

		.part:first-child {
			width: 20vw;
		}

		.segment {
			grid-template-columns: 2fr 1fr;
			grid-template-rows: auto auto 1fr;
			grid-template-areas: 'image nav' 'year year' 'story story';
			gap: 1.6rem 8vw;
			padding: 24px var(--gutter) 40px;
		}
		.scroller-nav {
			align-self: flex-end;
		}
	}

	@media screen and (max-width: 450px) {
		.part:first-child .line {
			padding: 1px 30%;
		}
		.part .line {
			padding: 1px 40%;
		}

		.segment {
			grid-template-columns: 1fr auto;
			grid-template-rows: auto auto 1fr;
			grid-template-areas: 'image image' 'year nav' 'story story';
			align-items: flex-start;
		}
		.segment img {
			width: 100%;
		}
		.scroller-nav {
			gap: 8px;
		}
		.scroller-nav button :global(svg) {
			height: 38px;
		}
	}
</style>
