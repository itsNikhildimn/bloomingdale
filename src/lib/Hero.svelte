<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import heroCreatorMob from '$lib/images/heroes/hero-creator-750.webp';
	import heroDesignerMob from '$lib/images/heroes/hero-designer-750.webp';
	import heroPerformerMob from '$lib/images/heroes/hero-performer-750.webp';
	import heroCreator from '$lib/images/heroes/hero-creator.webp';
	import heroDesigner from '$lib/images/heroes/hero-designer.webp';
	import heroPerformer from '$lib/images/heroes/hero-performer.webp';
	import girlStudent from '$lib/images/girl-student-cropped.webp';
	import boyStudent from '$lib/images/boy-student-cropped.webp';

	import eyp from '$lib/images/heroes/hero-early-years.webp';
	import eypCropped from '$lib/images/heroes/hero-early-years-c.webp';

	import grandJuryBadge from '$lib/images/badges/badge1.webp';
	import businessAwardsBadge from '$lib/images/badges/badge2.webp';

	import ScrollPrompt from './ScrollPrompt.svelte';

	// Component props:
	export let isCarousel = false,
		badge = 1;

	// refs
	let hero, backdrop;

	// Component data:
	const cards = [
		{
			caption: 'designers',
			image: heroDesigner,
			srcset: `${heroDesignerMob}`
		},
		{
			caption: 'creators',
			image: heroCreator,
			srcset: `${heroCreatorMob}`
		},
		{
			caption: 'performers',
			image: heroPerformer,
			srcset: `${heroPerformerMob}`
		}
	];

	let firstImage = isCarousel ? heroDesigner : eyp;
	let firstCroppedImage = isCarousel ? heroDesignerMob : eypCropped;

	let current = cards.findIndex((c) => c.image === firstImage);

	let timer;

	// onMount hook
	//   Starts GSAP animation for entry of caption text and, if image
	// carousel required, starts loading secondary images.

	onMount(() => {
		const q = gsap.utils.selector(hero);

		ScrollTrigger.create({
			trigger: hero,
			start: 'top top',
			end: '300%',
			pin: true,
			pinSpacing: false
		});

		// Load images for image replacement animation. Start animation when
		// all images available.
		if (isCarousel) {
			Promise.all(cards.map((c) => loadImage(c.image))).then((images) => {
				cards.forEach((c, n) => {
					const picture = document.createElement('picture');
					const source = document.createElement('source');
					source.srcset = c.srcset;
					source.media = '(max-width: 767px)';
					picture.appendChild(source);
					picture.appendChild(images[n]);
					c.element = picture;
				});
				timer = setInterval(() => {
					if (!document.hidden) {
						changeImage();
						changeBadge();
					}
				}, 5000);
			});
		}

		return () => {
			if (timer) clearInterval(timer);
		};
	});

	// loadImage
	//   Called from the 'onMount' hook to load an image and return a
	// corresponding 'Image' element (off-screen). Does so asynchronously,
	// providing a Promise that resolves to the element.

	function loadImage(src) {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.fetchPriority = 'high';
			image.onload = resolve(image);
			image.onerror = reject();
			image.src = src;
			// Style below must match initial image, or there's a glitch when
			// replacement happens.
			image.style = 'object-fit: cover; object-position: center; width: 100%; height: 100%;';
		});
	}

	// changeImage
	//   Called from an interval timer, to replace the backdrop image and
	// caption with the next in sequence.

	function changeImage() {
		const q = gsap.utils.selector(hero);
		const next = (current + 1) % cards.length;
		const nextCard = cards[next].element;
		const prevCard = backdrop.children[0];
		nextCard.style.opacity = 1;
		backdrop.insertBefore(nextCard, prevCard);

		if (prevCard) {
			gsap
				.timeline({
					onComplete: () => {
						backdrop.removeChild(prevCard);
					}
				})
				.to(prevCard, { opacity: 0, duration: 1 });
		}

		const captions = q('.captions .hero-text');

		gsap
			.timeline({ defaults: { duration: 0.6 } })
			.set(captions[next], {
				xPercent: -6
			})
			.to(captions[next], { xPercent: 0, opacity: 1 })
			.to(captions[current], { opacity: 0, xPercent: 10 }, '<5%');

		current = next;
	}

	function changeBadge() {
		const q = gsap.utils.selector(hero);
		// if 1, fade 1 and bring in 2 else fade 2 and bring in 1
		if (badge === 1) {
			gsap.to(q('.badges img:first-child'), { opacity: 0 });
			gsap.to(q('.badges img:last-child'), { opacity: 1 });
			gsap.to(q('.badges p:first-child'), { opacity: 0 });
			gsap.to(q('.badges p:last-child'), { opacity: 1 });

			badge = 2;
		} else {
			gsap.to(q('.badges img:first-child'), { opacity: 1 });
			gsap.to(q('.badges img:last-child'), { opacity: 0 });
			gsap.to(q('.badges p:first-child'), { opacity: 1 });
			gsap.to(q('.badges p:last-child'), { opacity: 0 });

			badge = 1;
		}
	}
</script>

<section class="hero" bind:this={hero}>
	<div class="backdrop" bind:this={backdrop}>
		<picture>
			<!-- <source srcset={heroDesignerMob} type="image/webp" media="(max-width: 767px" /> -->
			<source srcset={firstCroppedImage} type="image/webp" media="(max-width: 767px" />
			<img src={firstImage} alt="" />
		</picture>
	</div>
	{#if !isCarousel}
		<div class="overlay" />
	{/if}
	<div class="container">
		<div>
			<div class="line">
				<h1 class="hero-text">The <span>&#35;1</span></h1>
			</div>
			<div class="line">
				<img class="small-circle-portrait" src={boyStudent} alt="boy student" />
				<img class="small-circle-portrait" src={girlStudent} alt="girl student" />
				<h1 class="hero-text">School for</h1>
			</div>
			<div class="line captions">
				<h1 class="hero-text first" data-id="1">designers</h1>
				<h1 class="hero-text second" data-id="2">creators</h1>
				<h1 class="hero-text third" data-id="3">performers</h1>
			</div>
		</div>
		<div class="badges">
			<div class="images">
				<img src={grandJuryBadge} alt="Grand Jury India School Rankings awards badge 2022-23" />
				<img src={businessAwardsBadge} alt="Times Business Awards badge 2022" />
			</div>
			<div class="badge-text">
				<p class="b1text">
					<span class="line1">
						AWARDED 5<span class="super">TH</span>
					</span>
					<br />
					IN SCHOOL THAT CREATES
					<br />
					DESIGN THINKING LEADERS
				</p>
				<p class="b2text">
					BEST
					<br />
					INTERNATIONAL SCHOOL
					<br />
					<span class="pradesh"> IN ANDHRA PRADESH </span>
				</p>
			</div>
		</div>
	</div>

	<ScrollPrompt />
</section>

<style>
	.badges {
		position: relative;
		/* bottom: 15%; */
		width: 20rem;
		height: 80px;
		display: flex;
		width: 24rem;
		margin-top: 1.5rem;
	}

	.badges .images {
		width: 80px;
	}

	.badges img {
		opacity: 0;
		position: absolute;
		top: 0;
		width: 80px;
	}

	.badge-text {
		width: 16rem;
	}

	.badge-text p {
		opacity: 0;
		line-height: 1;
		color: white;
		margin-left: 0.8rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.badge-text p .super {
		font-size: 10px;
		vertical-align: super;
	}

	.b1text .line1 {
		font-weight: 100;
	}

	.b2text .pradesh {
		font-size: 12px;
	}

	.hero {
		position: relative;
		overflow: hidden;
		height: calc(100vh + var(--b-r-section));
	}

	.backdrop {
		height: 100%;
		width: 100%;
		background-color: black;
		display: grid;
		grid-template-areas: 'image';
	}

	.backdrop :global(picture) {
		grid-area: image;
		object-position: center;
		width: 100%;
		height: 100%;
	}

	.backdrop :global(img) {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(0, 0, 0);
		background: linear-gradient(41deg, rgba(0, 0, 0, 0.637) 0%, rgba(0, 0, 0, 0.161) 100%);
		opacity: 0.7;
	}

	.container {
		position: absolute;
		/* top: 40%;
		top: 45%; */
		bottom: 16%;
		left: 0;
		display: flex;
		flex-direction: column;
		color: var(--white);
		padding-left: var(--gutter);
	}

	.line {
		overflow-y: clip;
	}

	.line:nth-child(2) {
		display: flex;
		align-items: flex-start;
	}

	.line:first-child span {
		color: var(--brand-colors-orange);
	}
	.line:nth-child(2) img:first-child {
		margin-right: -0.7em;
	}

	.line:nth-child(2) img:nth-child(2) {
		margin-right: 1em;
	}

	.captions {
		position: relative;
		height: 5em;
	}

	.captions .hero-text {
		position: absolute;
		top: 0;
		left: 0;
	}

	.second,
	.third {
		opacity: 0;
	}

	@media only screen and (max-width: 964px) {
		.badges {
			display: none;
		}

		.container {
			bottom: 33%;
		}
	}
</style>
