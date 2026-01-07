<script>
	//---------------------------------------------------------------------------
	// Module:  routes/news/story[id]/+page.svelte
	//
	// Provides a page component for the 'News story detail' pages. These show
	// a single news story, with the featured image (if available) as a full
	// width 'banner' at the top.
	//---------------------------------------------------------------------------

	// Main imports:
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

	// Components:
	import MediaImage from '$lib/MediaImage.svelte';
	import LocaleDate from '$lib/LocaleDate.svelte';
	import SvgIcon from '$lib/SvgIcon.svelte';

  // Stores:
  import { news } from '$lib/data/news.js';
  import { page } from '$app/stores';

	// Assets:
	import fbIcon from '$lib/icons/facebook-icon.svg';
	import twIcon from '$lib/icons/twitter-icon.svg';
	import igIcon from '$lib/icons/instagram-icon.svg';
	import mailIcon from '$lib/icons/mail-icon.svg';
	import linkIcon from '$lib/icons/link-icon.svg';
  import missingImage from '$lib/images/missing-image.svg';

	import { PUBLIC_FB_APP_ID, PUBLIC_TWITTER_ID } from '$env/static/public';

	// Local data:

  const missing = {
    id:           `404`,
    origin:       'bad-slug',
    sourceId:     'n/a',
    title:        '',
    featured:     null,
    author:       '',
    tags:         '',
    publishedAt:  new Date(),
    updatedAt:    new Date(),
    body:
  `# Not Found (404)
  
  Sorry, the story you are trying to view cannot be found. Please check that you have followed a valid link.
  
  If you believe the story should be present, please [contact the site administrator](/contact).`
  };

  let story, newsBanner;
  $: {
    story = $news.find(s => s.id === $page.params.id) || missing;
    newsBanner = story.featured?.URL || missingImage;
  }

	let isInitialised = false;

	let twitterID = PUBLIC_TWITTER_ID;

	let copied;

	// The 'mdRenderers' object is used by the svelte-markdown package, to allow
	// 'smart' replacement (rendering) of Markdown tokens. In this case, we provide
	// a component to add a suitable path prefix to the HREF for embedded images,
	// coming from the Strapi CMS.
	const mdRenderers = {
		image: MediaImage
	}; 

	// onMount hook:

	onMount(() => {
		// Load the Facebook SDK.
		if (document.getElementById('facebook-sdk')) {
			isInitialised = true;
		} else {
			window.fbAsyncInit = function () {
				window.FB.init({
					appId: PUBLIC_FB_APP_ID,
					xfbml: true,
					version: 'v16.0'
				});
				isInitialised = true;
			};
			const fbs = document.createElement('script');
			fbs.id = 'facebook-sdk';
			fbs.src = 'https://connect.facebook.net/en_US/sdk.js';
			fbs.async = true;
			fbs.defer = true;
			fbs.crossOrigin = 'anonymous';
			document.body.appendChild(fbs);
		}
	});

	// Event handlers:

	function sharePage(ev) {
		const dest = ev.currentTarget.dataset.app;
		switch (dest) {
			case 'facebook':
				window.FB.ui({
					method: 'share',
					href: $page.url.href
				});
				break;
		}
	}

	function clipURL() {
		navigator.clipboard.writeText($page.url.href);
		copied.showModal();
	}

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
   <title>News - {story.title} | Bloomingdale International School</title>
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={story.title} />
	<meta property="og:description" content="News story" />
	{#if story.featured?.URL}
		<meta property="og:image" content={story.featured.URL} />
	{/if}
</svelte:head>

<section id="banner">
	<div class="gradient"><img src={newsBanner} alt="" /></div>
	<div class="story-title">
		<h1 class="lg-header-text">{story.title}</h1>
    {#if story !== missing}
		<p>
			Share article:<br />
			<span class="social-buttons">
				<button on:click={sharePage} data-app="facebook"><img src={fbIcon} alt="Facebook" /></button
				>
				<a href="https://twitter.com/intent/tweet?url={$page.url.href}&via={twitterID}">
					<img src={twIcon} alt="Twitter" /></a
				>
				<button><img src={igIcon} alt="Instagram" /></button>
				<a href="mailto:?subject={story.title}&body={$page.url.href}">
					<img src={mailIcon} alt="Email" /></a
				>
				<button on:click={clipURL}><img src={linkIcon} alt="Link" /></button>
			</span>
		</p>
		<p>
			<LocaleDate date={story.updatedAt} format="long" /><br />
			by {story.author}
		</p>
    {/if}
	</div>
</section>
<section id="story">
	{#if story.origin !== 'news'}
		<div>
      {#if story.featured?.URL}
        <img class="post-image" src={story.featured.URL} alt="" />
      {/if}
			{#if story.permalink}
				<p class="permalink xs-body-text">
					<a href={story.permalink} target="_blank" class="btn btn-alt">
						<span>Original post</span><SvgIcon shape="arrow-stout" /></a
					>
				</p>
			{/if}
		</div>
	{/if}
	<div class="post-body">
		<SvelteMarkdown source={story.body} renderers={mdRenderers} />
	</div>

	<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

	<dialog class="copy-notification" bind:this={copied}>
		<form method="dialog">
			<p>Page URL copied to clipboard.</p>
			<p class="close-button sm-body-text">
				<button type="submit" class="btn btn-alt"><SvgIcon shape="close" alt="Close" /></button>
			</p>
		</form>
	</dialog>
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
		justify-items: center;
	}
	.gradient > img {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		object-position: center;
	}
	.gradient {
		grid-area: banner;
		position: relative;
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
	.story-title {
		grid-area: banner;
		position: relative;
		color: white;
		text-align: center;
	}
	.story-title h1 {
		padding: 0 var(--gutter);
	}

	.story-title p {
		margin: 1em 0px;
		line-height: 180%;
	}
	.social-buttons {
		display: inline-flex;
		flex-flow: row nowrap;
		gap: 16px;
	}
	.social-buttons > * {
		background-color: white;
		border: none;
		border-radius: 8px;
		width: 40px;
		height: 40px;
		display: grid;
		grid-template-areas: 'button';
		align-items: center;
		justify-items: center;
	}
	.social-buttons img {
		grid-area: button;
		height: 20px;
		width: auto;
	}

	#story {
		width: 650px;
		margin: 120px auto 240px;
		text-align: justify;
	}

	.post-image {
		width: auto;
		height: auto;
		max-width: 100%;
		margin: 0px auto;
	}

	.permalink {
		text-align: center;
		margin-top: 1rem;
	}

	.post-body :global(*) {
		margin: 1em 0px;
	}
	.post-body :global(li) {
		margin: 0px 1.1em;
	}
	.post-body :global(blockquote) {
		padding: 20px 40px;
		background-image: var(--gradient-blue-orange);
		border-radius: 24px;
		text-align: center;
	}
	.post-body :global(blockquote::before) {
		content: url('$lib/icons/quotes.svg');
		opacity: 0.25;
	}
	.post-body :global(blockquote p:first-child) {
		font-size: x-large;
	}
	.post-body :global(img) {
		width: 100%;
		height: auto;
		border-radius: 24px;
	}

	.copy-notification {
		border: 1px solid gray;
		margin: 0 auto;
		background-color: white;
		border-radius: 6px;
		top: 30vh;
	}
	.copy-notification form {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 20px;
		padding: 8px;
	}
	.copy-notification .close-button :global(svg) {
		height: 1em;
		width: auto;
	}

	@media screen and (max-width: 800px) {
		#story {
			margin: 40px 0px 120px;
			width: auto;
			padding: 1em;
		}
	}

	@media screen and (max-width: 450px) {
		#banner {
			align-items: flex-end;
			justify-items: flex-start;
		}
		.story-title {
			text-align: left;
			padding: 0px 1em;
		}
	}
</style>
