<script>
	//---------------------------------------------------------------------------
	// Module:  routes/events/event[id]
	//
	// Provides a page component for the 'Event detail' pages. These show
	// a single event, with the featured image (if available) as a full
	// width 'banner' at the top and full body text (in place of summary).
	//---------------------------------------------------------------------------

	// Main imports:
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

	// Components:
	import MediaImage from '$lib/MediaImage.svelte';
	import LocaleDate from '$lib/LocaleDate.svelte';

	// Assets:
	import defaultBanner from '$lib/images/news-banner.webp';
	import fbIcon from '$lib/icons/facebook-icon.svg';
	import twIcon from '$lib/icons/twitter-icon.svg';
	import igIcon from '$lib/icons/instagram-icon.svg';
	import mailIcon from '$lib/icons/mail-icon.svg';
	import linkIcon from '$lib/icons/link-icon.svg';

	// Component properties:

	/** @type {import('./$types').PageData} */
	export let data;

	// Local data:

	// The 'mdRenderers' object is used by the svelte-markdown package, to allow
	// 'smart' replacement (rendering) of Markdown tokens. In this case, we provide
	// a component to add a suitable path prefix to the HREF for embedded images,
	// coming from the Strapi CMS.
	const mdRenderers = {
		image: MediaImage
	};

	// Banner image: from news story by preference, else use a default:
	const bannerImage = data.event.featured?.URL || defaultBanner;

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<section id="banner">
	<div class="gradient"><img src={bannerImage} alt="" /></div>
	<div class="event-title">
		<h1 class="lg-header-text">{data.event.title}</h1>
		<p>
			Share article:<br />
			<span class="social-buttons">
				<button><img src={fbIcon} alt="Facebook" /></button>
				<button><img src={twIcon} alt="Twitter" /></button>
				<button><img src={igIcon} alt="Instagram" /></button>
				<button><img src={mailIcon} alt="Email" /></button>
				<button><img src={linkIcon} alt="Link" /></button>
			</span>
		</p>
		<p>
			<LocaleDate date={data.event.updatedAt} format="long" /><br />
			by {data.event.author}
		</p>
	</div>
</section>
<section id="event">
	<h2><LocaleDate date={data.event.when} format="long" /></h2>
	<SvelteMarkdown source={data.event.body} renderers={mdRenderers} />
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
		min-height: 500px;
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
	.event-title {
		grid-area: banner;
		position: relative;
		color: white;
		text-align: center;
	}
	.event-title p {
		margin: 1em 0px;
		line-height: 180%;
	}
	.social-buttons {
		display: inline-flex;
		flex-flow: row nowrap;
		gap: 16px;
	}
	.social-buttons button {
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

	#event {
		width: 650px;
		margin: 120px auto 240px;
		text-align: justify;
	}
	#event :global(*) {
		margin: 1em 0px;
	}
	#event :global(li) {
		margin: 0px 1.1em;
	}
	#event :global(blockquote) {
		padding: 20px 40px;
		background-image: var(--gradient-blue-orange);
		border-radius: 24px;
		text-align: center;
	}
	#event :global(blockquote::before) {
		content: url('$lib/icons/quotes.svg');
		opacity: 0.25;
	}
	#event :global(blockquote p:first-child) {
		font-size: x-large;
	}
	#event :global(img) {
		width: 100%;
		height: auto;
		border-radius: 24px;
	}

	@media screen and (max-width: 800px) {
		#event {
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
		.event-title {
			text-align: left;
			padding: 0px 1em;
		}
	}
</style>
