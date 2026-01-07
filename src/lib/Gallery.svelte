<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	import ModalGallery from './ModalGallery.svelte';

	import { bands, galleryImagesLg } from '$lib/data/gallery.js';

	let section;

	let isOpen = false,
		id;

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

		// -----------------------------------------------------
		// Image scroll-past
		// -----------------------------------------------------
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top -4vw',
				end: '+=1200',
				pin: q('.content'),
				anticipatePin: 0.5,
				scrub: true
				//markers: true,
			}
		});

		let range;
		for (let i = 1; i <= bands.length; i++) {
			range = i % 2 !== 0 ? { start: -30, end: -40 } : { start: -45, end: -50 };
			tl.to(
				q(`.band:nth-child(${i})`),
				{
					yPercent: () => gsap.utils.random(range.start, range.end)
				},
				'<'
			);
		}
	});

	function openModal(idx) {
		id = idx;
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
	}
</script>

<section id="gallery" bind:this={section}>
	<div class="wrapper">
		<div class="content">
			<div class="h-frame">
				<h2 class="lg-header-text h-text">
					Showcasing student creativity: a vibrant school gallery
				</h2>
			</div>
			<div class="band-wrapper">
				{#each bands as band}
					<div class="band">
						{#each band as entry}
							<button
								on:click={() => {
									openModal(entry.id);
								}}
							>
								<img src={entry.image} alt="" loading="lazy" />
							</button>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<ModalGallery {isOpen} {id} {closeModal} media={galleryImagesLg} />
</section>

<style>
	#gallery {
		position: relative;
		background-color: var(--brand-colors-orange);
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		padding-bottom: 60px;
		overflow: hidden;
	}

	.content {
		height: calc(100vh - var(--b-r-section));
		position: relative;
	}

	#gallery h2 {
		width: 800px;
		margin: 0px auto;
		text-align: center;
		color: white;
		margin-bottom: 0px;
	}

	.h-frame {
		position: relative;
		z-index: 90;
	}

	.band-wrapper {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 16px;
		padding-top: 88px;
		-webkit-mask-image: linear-gradient(transparent, rgba(0, 0, 0, 1) 40px);
		mask-image: linear-gradient(transparent, rgba(0, 0, 0, 1) 40px);
	}

	.band {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 16px;
	}

	.band:nth-child(odd) {
		translate: 0 5%;
	}

	.band img {
		width: 100%;
		aspect-ratio: 269 / 440;
		object-fit: cover;
		object-position: center;
		border-radius: 24px;
	}

	@media only screen and (max-width: 820px) {
		#gallery h2 {
			width: auto;
		}
		#gallery .wrapper {
			min-height: 130vw;
		}
		.band-wrapper {
			grid-template-columns: repeat(3, 1fr);
			column-gap: 8px;
		}
		.band {
			row-gap: 8px;
		}
		.band img {
			border-radius: min(18px, 2vw);
			aspect-ratio: 269 / 350;
		}
		.band:nth-child(1n + 4) {
			display: none;
		}
	}

	@media only screen and (max-width: 580px) {
		#gallery .wrapper {
			min-height: 180vw;
		}
		.band-wrapper {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 8px;
		}
		.band {
			row-gap: 8px;
		}
		.band img {
			border-radius: min(18px, 2vw);
			aspect-ratio: 269 / 353;
		}
		.band:nth-child(1n + 3) {
			display: none;
		}
	}
</style>
