<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	export let gap = undefined;

	export let mp4, webm;

	// Refs
	let section, band, media;

	onMount(() => {
		// Get height of band area
		const offset = band.getBoundingClientRect().height;
		const height = section.getBoundingClientRect().height;

		/* We make content the height of its parent section and the band area combined. We apply a '-y' offset so that added height overflow at the top. However we start things off with the inner-container hidden off screen at the bottom (yPercent: 100) of its parent. When 'section' gets to the top of the viewport it gets pinned, and inner width animates upward to the extent of the band's height.
		 */

		let timerId;

		function recalcTweenProperties() {
			ScrollTrigger.refresh();
		}

		function throttle() {
			clearTimeout(timerId);
			timerId = setTimeout(recalcTweenProperties, 200);
		}

		window.addEventListener('resize', throttle);

		const ctx = gsap.context(() => {
			gsap.set('.content', { height: offset + height, yPercent: 100, opacity: 1 });
			gsap.set('.band-inner', { xPercent: 20 });
			// a tween doesn't use values passed in until it starts to run

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: '500%', // 300
					pin: true,
					pinSpacing: false,
					scrub: 2,
					invalidateOnRefresh: true
				}
			});

			tl.to('.content', {
				y: -offset * 2,
				duration: 0.5
			})
				.to(
					'.band-inner',
					{
						xPercent: 0,
						duration: 0.5
					},
					'<'
				)
				.add(() => media.play(), '<60%')
				.to('.content', { yPercent: 0, y: `-${offset}` })
				.to(media, { y: () => window.innerHeight / 2 + offset / 2 }, '<')
				.to(
					media,
					{
						scale: () => window.innerWidth / media.getBoundingClientRect().width,
						duration: 1,
						id: 'scale'
					},
					'<'
				)
				.to(media, { borderRadius: 0, duration: 1 }, '<')

				.set(band, { pointerEvents: 'auto' })
				.to({}, { duration: 2 });
		}, section);

		return () => {
			ctx.revert();
		};
	});
</script>

<section class="Infinity {gap ? 'gap' : ''}" bind:this={section}>
	<div class="content">
		<div class="band" bind:this={band}>
			<div class="band-inner">
				<h2 class="band-text">School For Creators</h2>
				<div class="video">
					<video class="media" bind:this={media} muted={true} loop preload="metadata" playsinline>
						<source src={mp4} type="video/mp4" />
						<source src={webm} type="video/webm" />
						Your browser does not support HTML video.
					</video>
				</div>
				<h2 class="band-text">School For Creators</h2>
			</div>
		</div>
	</div>
</section>
<section class="spacer" />

<style>
	.spacer {
		height: 300vh;
	}

	.Infinity {
		position: absolute;
		top: 0px;
		left: 0;
		pointer-events: none;
		height: 100vh;
		width: 100vw;
		margin-top: var(--negative-margin);
		color: white;
		overflow: hidden;
	}

	.Infinity.gap {
		position: unset;
	}

	.content {
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-mint);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		opacity: 0;
	}

	.band {
		padding: 4em 0;
	}

	.band-inner {
		display: flex;
		align-items: center;
		height: max-content;
		font-size: clamp(130px, 11.111vw, 160px);
	}

	.band h2 {
		white-space: nowrap;
		font-size: inherit;
	}

	.video {
		width: 25em;
		width: 2.5em;
		height: auto;
		padding: 0 0.3em;
		display: flex;
	}

	.video .media {
		border-radius: var(--b-r-container);
		height: 100%;
		width: 100%;
	}

	@media (max-width: 768px) {
		.Infinity.gap {
			margin-top: -50vh;
		}
	}

	@media (max-width: 731px) {
		.band-inner {
			font-size: clamp(80px, 21.7vw, 130px);
		}
	}
</style>
