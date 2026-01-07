<script>
	//---------------------------------------------------------------------------
	// Module:  routes/events/+page.svelte
	//
	// Provides a page component for the Events aggregation page.
	//---------------------------------------------------------------------------

	// Components:
	import EventItem from './EventItem.svelte';

	// Assets:
	import bannerImage from '$lib/images/news-banner.webp';

	// Component properties:

	/** @type {import('./$types').PageData} */
	export let data;

	// Local data:

	let today = new Date().setHours(0, 0, 0, 0);

	let upcoming = data.events.filter((e) => e.when.getTime() >= today);

	let past = data.events.filter((e) => e.when.getTime() < today);

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
   <title>Events | Bloomingdale International School</title>
</svelte:head>

<section id="banner">
	<div class="gradient"><img src={bannerImage} alt="" /></div>
	<div class="page-title">
		<h1 class="lg-header-text">School Events</h1>
		<p class="lg-body-text">
			Our school constantly holds various events for our students, in which everyone can demonstrate
			skills, improve their own skills and work in a team, and in the end, win interesting prizes.
		</p>
	</div>
</section>
<section id="upcoming">
	<h2>Upcoming Events</h2>
	<div class="events">
		{#each upcoming as event}
			<EventItem {event} />
		{/each}
		{#if upcoming.length === 0}
			<p>
				There are no upcoming events at this time, but keep checking this page to see new events as
				we publish them.
			</p>
		{/if}
	</div>
</section>
<section id="past-events">
	<h2>Past Events</h2>
	<div class="events">
		{#each past as event}
			<EventItem {event} />
		{/each}
	</div>
</section>

<style>
	/*---------------------------------------------------------------------------
 * Styles
 *-------------------------------------------------------------------------*/

	#banner {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: 'banner';
		align-items: center;
	}
	.gradient > img {
		width: 100vw;
		height: calc(100vh + 40px);
		min-height: 500px;
		object-fit: cover;
		object-position: center;
	}
	.gradient {
		grid-area: banner;
	}
	.gradient::after {
		content: '';
		width: 100%;
		height: 100%;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
		position: absolute;
		left: 0px;
		top: 0px;
	}
	.page-title {
		grid-area: banner;
		position: relative;
		color: white;
		text-align: left;
		padding-left: var(--gutter);
	}
	.page-title p {
		width: 470px;
	}
	#upcoming,
	#past-events {
		position: relative;
		padding: 40px var(--gutter) 80px;
		border-radius: 40px 40px 0px 0px;
		margin-top: -40px;
	}
	#upcoming {
		background-color: white;
	}
	#past-events {
		background-image: var(--gradient-blue-orange);
		padding-bottom: 240px;
	}

	.events {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		gap: 2em;
	}

	p,
	h2 {
		margin: 1.5em 0px;
	}

	@media screen and (max-width: 670px) {
		.page-title p {
			width: 100%;
		}
	}

	@media screen and (max-width: 450px) {
		.events {
			display: block;
		}
		#past-events {
			padding-bottom: 140px;
		}
	}
</style>
