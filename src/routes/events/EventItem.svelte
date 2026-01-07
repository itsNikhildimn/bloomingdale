<script>
	//---------------------------------------------------------------------------
	// Module:  routes/events/EventItem.svelte
	//
	// Provides a plug-in component for the News aggregation page.
	//---------------------------------------------------------------------------

  // Assets:
	import defaultImage from '$lib/images/missing-image.svg';

	// Components:
	import LocaleDate from '$lib/LocaleDate.svelte';

	// Component properties:
	export let event;

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<a class="event" href="/events/event/{event.id}">
	<img src={event.featured?.URL || defaultImage} alt={event.featured?.altText} />
	<div class="event-summary">
		<p class="lg-body-text event-title">{event.title}</p>
    {#if event.summary}
		<p class="sm-body-text">{event.summary}</p>
    {/if}
		<p class="event-date m-body-text">
			Start date:
			<LocaleDate date={event.when} format="short" />
		</p>
	</div>
</a>

<style>
	/*---------------------------------------------------------------------------
   * Styles
   *-------------------------------------------------------------------------*/

	.event {
		min-width: 270px;
		flex: 0 0 30%;
		border: 1px solid lightgray;
		border-top-right-radius: 16px;
		border-top-left-radius: 16px;
	}
	.event > img {
		width: 100%;
		height: auto;
		max-height: 300px;
		object-fit: contain;
		border-radius: 16px;
	}
	.event-summary {
		padding: 32px;
	}

	.event p:first-child {
		font-weight: 500;
	}

	.event p:nth-child(2) {
		color: var(--secondary-black-o60);
		margin: 1em 0px;
	}

	@media screen and (max-width: 670px) {
		.event {
			flex: 0 0 48%;
		}
	}

	@media screen and (max-width: 450px) {
		.event {
			border: none;
		}
	}
</style>
