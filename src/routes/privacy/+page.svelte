<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MediaImage from '$lib/MediaImage.svelte';

	import bannerImage from '$lib/images/campus/bis-facade-south-lg.webp';

	// Data from server-side load:
	export let data;

	// The 'mdRenderers' object is used by the svelte-markdown package, to allow
	// 'smart' replacement (rendering) of Markdown tokens. In this case, we provide
	// a component to add a suitable path prefix to the HREF for embedded images,
	// coming from the Strapi CMS.
	const mdRenderers = {
		image: MediaImage
	};

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<section id="banner">
	<div class="gradient"><img src={bannerImage} alt="" /></div>
	<div class="story-title">
		<h1 class="lg-header-text">Privacy Policy</h1>
	</div>
</section>
<section class="wrapper post-body">
	<SvelteMarkdown source={data.body} renderers={mdRenderers} />
</section>

<style>
	/*---------------------------------------------------------------------------
** Styles
**-------------------------------------------------------------------------*/

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
	.story-title {
		grid-area: banner;
		position: relative;
		color: white;
		text-align: center;
	}
	.story-title h1 {
		padding: 0 var(--gutter);
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

	@media screen and (max-width: 450px) {
		#banner {
			justify-items: flex-start;
		}
		.story-title {
			text-align: left;
			padding: 0px 1em;
		}
	}
</style>
