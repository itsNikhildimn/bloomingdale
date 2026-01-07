<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	// Props
	export let data;

	// Refs
	let mission;

	// Vars
	let current = 1,
		timerId;

	onMount(() => {
		const q = gsap.utils.selector(mission);

		// Set height of image-container to height of image

		function setHeight() {
			const h = gsap.getProperty(q('.image-container img')[0], 'height', 'px');
			gsap.set(q('.image-container'), { height: h });
		}

		function throttle() {
			clearTimeout(timerId);
			timerId = setTimeout(setHeight, 200);
		}

		setHeight();

		window.addEventListener('resize', throttle);

		//// Text reveal ////
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 180 },
			{
				scrollTrigger: {
					trigger: mission,
					start: 'top 70%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		for (let i = 0; i < data.items.length; i++) {
			if (i === 0) {
				q('.item')[i].dataset.isOpen = true;
			} else {
				q('.item')[i].dataset.isOpen = false;
			}
		}

		// Set initial height for concertina compartments (first item open)
		gsap.set('.item:not(:first-child) .point', {
			height: 0
		});
		// Button for first item corresponds to 'open'
		gsap.to(q(`.item:first-child svg`), { rotate: -180, duration: 0.2 });

		// Set initial image
		gsap.set(q('.image-container img:not(:first-child)'), { opacity: 0 });
	});

	// -----------------------------------------------------
	// Click handlers
	// -----------------------------------------------------
	function toggleDropdown(e) {
		let isOpen;
		const q = gsap.utils.selector(mission);

		// id of button
		const id = e.currentTarget.dataset.id;

		// get selected
		const item = e.currentTarget.parentElement;
		const point = item.querySelector('.point');
		const svg = item.querySelector('svg');

		// get non-selected
		const rest = q('.item button')
			.filter((btn) => {
				return +btn.dataset.id !== +id;
			})
			.map((btn) => {
				return {
					point: btn.parentElement.querySelector('.point'),
					svg: btn.querySelector('svg')
				};
			});

		// get expanded height
		const pointInner = item.querySelector('.point-inner');
		const h = gsap.getProperty(pointInner, 'height', 'px');

		// Set bool
		isOpen = item.dataset.isOpen === 'true';

		// Open
		if (!isOpen) {
			gsap.to(point, { height: h, duration: 0.5 });
			gsap.to(svg, { rotate: -180, duration: 0.2 });

			rest.forEach((item) => {
				gsap.to(item.point, { height: 0, duration: 0.5 });
				gsap.to(item.svg, { rotate: 0, duration: 0.2 });
				item.point.parentElement.dataset.isOpen = false;
			});

			setTimeout(ScrollTrigger.refresh, 500);
		}

		// Close yeah
		if (isOpen) {
			gsap.to(point, { height: 0, duration: 0.5 });
			gsap.to(svg, { rotate: 0, duration: 0.2 });
			setTimeout(ScrollTrigger.refresh, 500);
		}

		item.dataset.isOpen = !isOpen;
	}

	function changeImage(e) {
		let isOpen;
		const q = gsap.utils.selector(mission);
		const id = e.currentTarget.dataset.id;
		isOpen = e.currentTarget.parentElement.dataset.isOpen === 'false';

		if (id === current || isOpen) return;

		const currentImage = q('.image-container img').find((image) => +image.dataset.id == current);
		const nextImage = q('.image-container img').find(
			(image) => +image.dataset.id == +e.currentTarget.dataset.id
		);

		gsap.to(currentImage, { opacity: 0 });
		gsap.to(nextImage, { opacity: 1 });

		current = e.currentTarget.dataset.id;
	}
</script>

<section id="mission" bind:this={mission}>
	<div class="header">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">
				{#each data.title as frag}
					{frag}
				{/each}
			</h2>
		</div>
		<div class="b-frame">
			<h3 class="lg-body-text b-text">{@html data.subtitle}</h3>
		</div>
	</div>
	<!-- Concertina -->
	<div class="content">
		<div class="concertina">
			{#each data.items as item, id}
				<div class="item item-{id}">
					<button
						on:click={(e) => {
							toggleDropdown(e);
							changeImage(e);
						}}
						data-id={item.id}
					>
						<span>{item.title}</span>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.2788 7.96484L8.93208 12.3115C8.41875 12.8248 7.57875 12.8248 7.06542 12.3115L2.71875 7.96484"
								stroke="black"
								stroke-width="2"
								stroke-miterlimit="10"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					{#if item.points}
						<div class="point p-{id}">
							<div class="point-inner">
								{#each item.points as point}
									{#if point.title}
										<h4>{point.title}</h4>
									{/if}
									<p>
										{#if point.bullet}
											<span>
												<img class="bullet" src={point.bullet} alt="" />
											</span>
										{/if}
										{point.text}
									</p>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="image-container">
			{#each data.items as item, id}
				<img src={item.src} alt={item.alt} data-id={item.id} />
			{/each}
		</div>
	</div>
</section>

<style>
	#mission {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		color: var(--secondary-black);
		width: 100vw;
		height: max-content;
		padding: 80px var(--gutter) calc(80px + var(--b-r-section));
		background-color: white;
	}

	.header {
		margin: auto;
		text-align: center;
		/* margin-top: 40px; */
		display: flex;
		flex-direction: column;
	}

	h2 {
		text-align: left;
		max-width: 300px;
	}

	h3 {
		text-align: left;
		width: 100%;
		color: var(--secondary-black-o60);
	}

	.content {
		display: flex;
	}

	.image-container {
		position: relative;
		display: none;
		width: 100%;
		flex-grow: 1;
		flex-basis: 50%;
	}

	.image-container img {
		position: absolute;
		border-radius: var(--b-r-container);
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 1/1.1;
	}

	.item:not(:last-child) {
		border-bottom: solid 1px hsla(0, 18%, 10%, 0.2);
	}

	button {
		width: 100%;
		padding: 1.5rem 0;
		font-size: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h4,
	p {
		font-size: 1rem;
	}

	h4 {
		font-weight: 500;
		margin-bottom: 1rem;
	}

	p {
		padding-bottom: 1.5rem;
		color: hsla(0, 18%, 10%, 0.6);
		display: flex;
		line-height: 22.4px;
		font-size: 1em;
	}

	p span {
		margin-right: 0.5em;
		align-self: start;
	}

	.point {
		overflow: hidden;
	}

	.point-inner {
		height: max-content;
	}

	@media (max-width: 768px) {
		button {
			font-size: 1.25rem;
		}

		.concertina {
			width: 100%;
		}
	}

	@media (min-width: 769px) {
		#mission {
			padding: 128px var(--gutter) 128px;
		}

		h2,
		h3 {
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			max-width: 780px;
		}

		.image-container {
			display: block;
		}

		.header {
			margin-top: 0;
			margin-bottom: 5.5rem;
		}

		.concertina {
			width: 50%;
			padding-right: 8vw;
		}
	}

	@media (min-width: 965px) {
		.header {
			max-width: 960px;
		}
	}
</style>
