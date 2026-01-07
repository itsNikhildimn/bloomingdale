<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';
	import arrowOutward from '$lib/icons/arrow-outward.svg';
	import LocaleDate from '$lib/LocaleDate.svelte';

	import MyLink from './buttons/MyLink.svelte';

	// Assets:
	import defaultImage from '$lib/images/missing-image.svg';

	// Component props:
	export let events;

	// refs
	let section;

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
					start: 'top 70%'
				},
				yPercent: 0,
				duration: 1
			}
		);
	});
</script>

<section id="upcoming-events" bind:this={section}>
	<div class="background" />
	<div class="inner wrapper">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">Upcoming Events</h2>
		</div>
		<div class="news-items">
			{#each events as event}
				<div class="card">
					<img class="event-image"
            src={event.featured?.URL || defaultImage} alt={event.featured?.altText} />
					<div>
						<h4 class="md-header-text">{event.title}</h4>
						<div class="meta">
							{event.category ? event.category + ' | ' : ''}<LocaleDate date={event.when} format="short" />
						</div>
					</div>
					<div class="link-outwards">
						<a href="/events/event/{event.id}">
							<span>View&nbsp;event</span>
							<span>
								<img class="icon" src={arrowOutward} alt="arrow outwards" />
							</span>
						</a>
					</div>
				</div>
			{/each}
		</div>
		<div class="container">
			<MyLink href="/events" style="btn btn-orange">See all events</MyLink>
		</div>
	</div>
</section>

<style>
	#upcoming-events {
		position: relative;
		padding-bottom: calc(80px + var(--b-r-section));
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
		background-color: var(--brand-colors-mint);
	}

	.inner.wrapper {
		position: relative;
	}

	.inner.wrapper .container {
		display: flex;
		justify-content: center;
	}

	.news-items {
		padding-bottom: 64px;
		padding-bottom: 40px;
	}

	.card,
	.card .event-image {
		border-radius: calc(var(--b-r-container) / 3 * 2);
		width: 100%;
	}

	h2 {
		text-align: center;
		color: var(--secondary-dark-blue);
	}

	.card {
		margin-bottom: 32px;
	}

	.card {
		background-color: white;
		padding: 16px;
		border-radius: var(--b-r-container);
	}

	.card .event-image {
		aspect-ratio: 2/1.3;
		height: auto;
		object-fit: cover;
	}

	.card > div {
		display: flex;
		flex-direction: column;
	}

	.card > div .meta {
		color: var(--secondary-black-o60);
		margin: 16px 0;
	}

	.card > div h4 {
		order: 1;
		margin-bottom: 32px;
		color: var(--secondary-dark-blue);
	}

	a {
		display: flex;
		align-items: center;
		color: var(--brand-colors-orange);
		font-weight: 500;
	}
	a .icon {
		margin-left: 6px;
		width: 16px;
		height: 16px;
	}

	@media (min-width: 769px) {
		#upcoming-events {
			position: relative;
			padding-bottom: calc(128px + var(--b-r-section));
		}

		.h-frame {
			margin-bottom: 64px;
		}

		.card {
			margin-left: auto;
			margin-right: auto;
			padding: 24px;
			display: flex;
			flex-direction: row;
			width: 100%;
			max-width: 1096px;
		}

		.card > div h4 {
			order: 0;
		}

		.card .event-image {
			width: 22%;
		}

		.card div {
			margin-left: 24px;
			justify-content: space-between;
		}

		.card div .meta {
			margin-bottom: 0;
		}
		.card .link-outwards {
			flex-grow: 1;
			display: flex;
			align-items: flex-end;
		}
	}
</style>
