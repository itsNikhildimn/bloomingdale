<script>
	//---------------------------------------------------------------------------
	// Module:  routes/policies/+page.svelte
	//
	// Provides a page component for the School Policies page. This list a set
	// of policy documents, providing a summary of the purpose and a link to the
	// full document in PDF.
	//---------------------------------------------------------------------------

	// Components:
	import SvelteMarkdown from 'svelte-markdown';
	import MediaImage from '$lib/MediaImage.svelte';
	import SvgIcon from '$lib/SvgIcon.svelte';

	// Properties:
	export let data;

	// Component data:
	let currentTab = data.policies[0];

	// The 'mdRenderers' object is used by the svelte-markdown package, to allow
	// 'smart' replacement (rendering) of Markdown tokens. In this case, we provide
	// a component to add a suitable path prefix to the HREF for embedded images,
	// coming from the Strapi CMS.
	const mdRenderers = {
		image: MediaImage
	};

	// Event handlers:

	function selectPolicy(ev) {
		currentTab = data.policies.find((p) => p.title === ev.currentTarget.innerText);
	}

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
	<title>School Policies | Bloomingdale International School</title>
</svelte:head>

<section id="policies">
	<div class="wrapper">
		<h1 class="lg-header-text">BIS School Policies</h1>
		<div class="tabs">
			{#each data.policies as p}
				<button type="button" class:current={p.title === currentTab.title}
          on:click={selectPolicy}>{p.title}</button>
			{/each}
		</div>
		<div class="policy-content md-body-text">
			<SvelteMarkdown source={currentTab.summary} renderers={mdRenderers} />
      <iframe title={currentTab.title} src={currentTab.policyDoc} />
		</div>
	</div>
</section>

<style>
	/*---------------------------------------------------------------------------
 * Styles
 *-------------------------------------------------------------------------*/

	#policies {
		min-height: 100vh;
		background-image: var(--gradient-blue-orange-reverse);
	}

	.wrapper {
		padding: 140px var(--gutter) 240px;
	}

	.tabs {
		margin-top: 40px;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		column-gap: 10px;
	}

	.tabs button {
		background-color: rgba(30, 21, 21, 0.05);
		color: var(--secondary-black-o60);
		border-radius: 24px 24px 0px 0px;
		padding: 12px 24px;
	}

	.tabs button.current {
		background-color: white;
		color: var(--secondary-black);
	}

	.policy-content {
		background-color: white;
		padding: 48px;
		border-radius: 0px 24px 24px 24px;
	}

	.policy-content :global(h1),
	.policy-content :global(h2),
	.policy-content :global(h3) {
		color: var(--brand-colors-orange);
	}

	.policy-content :global(h2),
	.policy-content :global(h3),
	.policy-content :global(p),
	.policy-content :global(ul),
	.policy-content :global(ol) {
		margin: 1em 0;
	}

	.policy-content :global(ul),
	.policy-content :global(li) {
		margin-left: 1em;
		list-style: none;
	}

	.policy-content :global(ul) :global(li) {
		position: relative;
	}
	.policy-content :global(ul) :global(li::before) {
		content: '';
		height: 12px;
		width: 12px;
		background-image: url('$lib/icons/infinity-bullet.svg');
		background-size: contain;
		position: absolute;
		left: -1.2em;
		top: 6px;
	}
  .policy-content iframe {
    width: 100%; aspect-ratio: 8.25 / 11.7;
    margin-top: 1.2rem;
  }
</style>
