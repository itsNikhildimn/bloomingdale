<script>
	//---------------------------------------------------------------------------
	// Module:  routes/news/+page.svelte
	//
	// Provides a page component for the News aggregation page.
	//---------------------------------------------------------------------------

	// Components:
	import SvgIcon from '$lib/SvgIcon.svelte';

  // Assets:
  import missingImage from '$lib/images/missing-image.svg';

  // Stores:
  import { news } from '$lib/data/news.js';

	// Local data:

	let filter = '-all-',
		sortOrder = 'newest';
	let items = filterItems();
	let categories = allCategories();

	$: items = filterItems(filter, sortOrder);

	// Event handlers:

	function setFilter(ev) {
		filter = ev.currentTarget.dataset.filter;
	}

	function allCategories() {
		let categories = [];
		for (const story of $news) {
			const origin = story.origin,
				tag = origin[0].toUpperCase() + origin.slice(1).toLowerCase();
			if (!categories.includes(tag)) categories.push(tag);
		}
		return categories;
	}

	function filterItems() {
		let filtered = [];
		if (filter !== '-all-') {
			filtered = $news.filter((s) => s.origin === filter);
		} else filtered = $news.slice();
		switch (sortOrder) {
			case 'newest':
				filtered.sort(sortNewest);
				break;
			case 'oldest':
				filtered.sort(sortOldest);
				break;
			default:
				break;
		}
		return filtered;
	}

	function sortNewest(a, b) {
		const aTime = a.updatedAt.getTime(),
			bTime = b.updatedAt.getTime();
		return bTime - aTime;
	}

	function sortOldest(a, b) {
		const aTime = a.publishedAt.getTime(),
			bTime = b.publishedAt.getTime();
		return aTime - bTime;
	}

	function aspectType(story) {
		const ratio = story.featured?.height ? story.featured.width / story.featured.height : 1;
		return ratio < 1.4 ? 'square' : 'wide';
	}

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
   <title>News | Bloomingdale International School</title>
</svelte:head>

<section id="news">
	<h1 class="lg-header-text">News @Bis</h1>
	<div class="list-select">
		<div class="tag-buttons">
			<button class={`btn btn-${filter === '-all-' ? 'orange' : 'blue'}`}
        data-filter="-all-" on:click={setFilter}><span>All</span></button
			>
			{#each categories as c}
        {@const cat = c.toLowerCase()}
				<button class={`btn btn-${filter === cat ? 'orange' : 'blue'}`}
          data-filter={cat} on:click={setFilter}><span>{c}</span></button
				>
			{/each}
		</div>
		<div>
			<span>Sort by: </span>
			<span class="select">
				<select bind:value={sortOrder}>
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
					<option value="relevance">Relevant</option>
				</select>
			</span>
		</div>
	</div>
	<div class="stories">
		{#each items as story}
			{@const form = aspectType(story)}
      {@const image = story.featured?.URL || missingImage}
			<div class="story origin-{story.origin} {form}">
				<img src={image} alt={story.featured?.altText || ''} loading="lazy" />
				<span class="title">
					{story.title}<br />
				</span>
				<a href="/news/story/{story.id}" class="btn btn-alt">
					<span class="sm-body-text">Read all</span><SvgIcon shape="arrow-stout" />
				</a>
			</div>
		{/each}
	</div>
</section>

<style>
	/*---------------------------------------------------------------------------
 * Styles
 *-------------------------------------------------------------------------*/

	#news {
		background-image: var(--gradient-blue-orange-reverse);
		min-height: 100vh;
		padding: 140px var(--gutter) 240px;
	}

	.list-select {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin: 40px 0px;
	}
	.tag-buttons {
		display: flex;
		flex-flow: row wrap;
		gap: 8px;
	}
	.list-select select {
		appearance: none;
		background-color: transparent;
		border: none;
		border-radius: 0px;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		padding: 0 1em 0 0;
	}
	.list-select .select {
		position: relative;
		line-height: 160%;
	}
	.list-select .select::after {
		content: '';
		width: 0.6em;
		height: 0.3em;
		background-color: black;
		display: inline-block;
		position: relative;
		left: -1rem;
		top: -0.1rem;
		clip-path: polygon(0 0, 50% 100%, 100% 0, 90% 0, 50% 90%, 10% 0);
	}

	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		line-height: 180%;
		gap: 2em;
	}

	.story {
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.story.square {
		flex: 1 1 28%;
	}
	.story.wide {
		flex: 0 1 60%;
	}

	.story img {
		margin-bottom: 24px;
		border-radius: 24px;
		height: 340px;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}

	.story .title {
		font-size: 1.25rem;
	}

	.btn-alt span {
		margin-right: 5px;
	}

	.btn-alt :global(svg) {
		width: 18px;
		height: 18px;
	}

	.story.origin-news::after {
		content: url('$lib/icons/infinity-icon.svg');
		width: 48px;
		height: 48px;
		box-sizing: border-box;
		position: absolute;
		right: 20px;
		top: 20px;
		background-color: white;
		border-radius: 8px;
		text-align: center;
		padding: 12px 0px;
	}

	.story.origin-facebook::after {
		content: url('$lib/icons/facebook-icon.svg');
		width: 48px;
		height: 48px;
		box-sizing: border-box;
		position: absolute;
		right: 20px;
		top: 20px;
		background-color: white;
		border-radius: 8px;
		text-align: center;
		padding: 14px 0px;
	}

	.story.origin-instagram::after {
		content: url('$lib/icons/instagram-icon.svg');
		width: 48px;
		height: 48px;
		box-sizing: border-box;
		position: absolute;
		right: 20px;
		top: 20px;
		background-color: white;
		border-radius: 8px;
		text-align: center;
		padding: 12px 0px;
	}

	.story.origin-youtube::after {
		content: url('$lib/icons/youtube-icon.svg');
		width: 48px;
		height: 48px;
		box-sizing: border-box;
		position: absolute;
		right: 20px;
		top: 20px;
		background-color: white;
		border-radius: 8px;
		text-align: center;
		padding: 12px 0px;
	}

	@media screen and (max-width: 450px) {
		#news {
			padding-bottom: 140px;
		}
		.stories {
			display: block;
		}
		.story {
			display: block;
			margin-bottom: 24px;
		}
		.story img {
			width: 100%;
			height: 240px;
		}
	}
</style>
