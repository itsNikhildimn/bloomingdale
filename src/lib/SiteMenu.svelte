<script>
	//---------------------------------------------------------------------------
	// Module:  $lib/Sitemenu.svelte
	// Author:  S. Wheeler
	//
	// This component is used by both the PageHeader and PageFooter components,
	// to include a responsive 'site-wide' menu of page links. It offers two
	// colour themes: light (black text) or dark (white text).
	//---------------------------------------------------------------------------

	// Components:
	import SvgIcon from '$lib/SvgIcon.svelte';

	// Assets:
	import runners from '$lib/images/runners.webp';
	import children from '$lib/images/children-steps.webp';

	// Component properties:
	export let theme = 'light';

	// Component data:
	let subMenu = '',
		siteMenu;

	// Event handlers:
	function toggleSubMenu(ev) {
		const id = ev.currentTarget.dataset.id;
		subMenu = subMenu === id ? '' : id;
	}

	function hideSubMenu() {
		subMenu = '';
	}

	//---------------------------------------------------------------------------
	// Template:
	//---------------------------------------------------------------------------
</script>

<div class={['site-menu', 'theme-' + theme].join(' ')} bind:this={siteMenu}>
	<nav class={['top-level', subMenu ? 'active' : ''].join(' ')}>
		<a href="/">Home</a>
		<a href="/about">About Us</a>
		<button class="menu-btn" on:click={toggleSubMenu} data-id="academics">
			<span>Academics</span>
			<span class="more" aria-label="more"><SvgIcon shape="chevron-stout" /></span></button
		>
		<button class="menu-btn" on:click={toggleSubMenu} data-id="school-life">
			<span>School Life</span>
			<span class="more" aria-label="more"><SvgIcon shape="chevron-stout" /></span></button
		>
		<a href="/careers">Careers</a>
		<a href="/news">News</a>
		<a href="/events">Events</a>
		<a href="/policies">School policies</a>
		<a href="/contact">Contact Us</a>
	</nav>

	{#if subMenu === 'academics'}
		<div class="sub-menu academics">
			<button class="back btn btn-alt" on:click={hideSubMenu}>
				<SvgIcon shape="chevron-back" /><span>Back</span></button
			>
			<nav>
				<a href="/academics">Overview</a>
				<a href="/eyp">Early Years</a>
				<a href="/pyp">Primary Years</a>
				<a href="/myp">Middle Years</a>
				<a href="/cbse">CBSE</a>
				<a href="/diploma">Diploma</a>
				<a href="/counselling">Counselling</a>
			</nav>
			<div class="spacer" />
			<img class="submenu-image" src={children} alt="students" />
		</div>
	{:else if subMenu === 'school-life'}
		<div class="sub-menu school-life">
			<button class="back btn btn-alt" on:click={hideSubMenu}>
				<SvgIcon shape="chevron-back" /><span>Back</span></button
			>
			<nav>
				<a href="/after-school">After School</a>
				<a href="/sports">Sports</a>
				<a href="/art">Art</a>
				<a href="/transport">Transport</a>
				<a href="/gallery">Gallery</a>
			</nav>
			<div class="spacer" />
			<img class="submenu-image" src={runners} alt="track" />
		</div>
	{/if}
</div>

<style>
	/* 
	stratagy for mobile friendly menu
	within a max-width of 800px and a max height of 744px
	*/

	/*---------------------------------------------------------------------------
  * Styles:
  *-------------------------------------------------------------------------*/

	.theme-light {
		color: var(--secondary-black);
	}

	.theme-dark {
		color: white;
	}

	/* The normal layout for the site menu is a 2-column grid, with main menu
  ** on the left and sub-menu on the right. This is altered by media queries,
  ** below, for smaller screens. */
	.site-menu {
		padding: 0px var(--gutter) var(--gutter);
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-areas: 'main sub';
		align-items: stretch;
		justify-items: stretch;
	}

	.site-menu.theme-dark {
		padding: 0px;
		grid-template-columns: 1fr 1fr;
		column-gap: 0px;
		min-height: 0px;
	}

	/* All 'nav' elements are lists of links, arranged vertically. */
	.site-menu nav {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
	}

	/* The top level (main) menu is centered vertically and has a large
  ** font size. */
	.top-level {
		grid-area: main;
		font-size: 46px;
		line-height: 120%;
	}

	.top-level :global(svg) {
		height: 0.8em;
		width: auto;
	}

	.theme-dark .top-level {
		font-size: 22px;
	}

	.top-level button .more {
		display: none;
	}

	/* The sub-menu has three components: the sub-menu itself, and
  ** an illustrative image. */
	.sub-menu {
		grid-area: sub;
		display: flex;
		flex-flow: column nowrap;
		justify-content: stretch;
		align-items: stretch;
		font-size: 16px;
		padding-top: 8px;
		/* animation: fadeIn 1s; */
	}

	.back {
		display: none;
		color: var(--brand-colors-orange);
		margin-bottom: 40px;
		animation: fadeIn 1s;
		font-size: 32px;
	}
	.btn-alt.back :global(span) {
		color: var(--brand-colors-orange);
	}
	.back :global(svg) {
		height: 1.5rem;
		width: auto;
	}

	/* We fade the sub-menu in, when it appears or is changed. */
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	/* Menu items can be either a direct link (a) or a button that shows
  ** or hides the sub-menu. We style both the same. */
	.site-menu a,
	.site-menu .menu-btn {
		border: none;
		background-color: transparent;
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		font-weight: inherit;
		text-align: left;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		padding: 4px 0;
		transition: color var(--hover-transition-length);
	}

	/* The active menu item is styled with an orange colour, whether it is
  ** active because of 'hover' or keyboard navigation. */
	.site-menu a:hover,
	.site-menu button:hover,
	.site-menu a:active,
	.site-menu button:active {
		color: var(--brand-colors-orange);
	}

	.sub-menu nav {
		flex: 0 0 auto;
	}

	.sub-menu .spacer {
		flex: 1 1 auto;
	}

	.submenu-image {
		flex: 0 0 auto;
		width: 100%;
		aspect-ratio: 490 / 267;
		object-fit: cover;
		border-radius: 24px;
	}

	.theme-dark .submenu-image {
		display: none;
	}

	@media screen and (max-width: 1400px) {
		.top-level,
		.back {
			font-size: 46px;
		}
	}

	@media screen and (max-width: 1000px) {
		.site-menu.theme-light {
			grid-template-columns: 1fr;
			grid-template-areas: 'main-and-sub';
			/*padding: 16px 16px 90px;*/
		}
		.theme-light .top-level,
		.theme-light .sub-menu {
			grid-area: main-and-sub;
		}
		.theme-light .top-level button {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
		.theme-light .top-level button .more {
			display: block;
		}
		.theme-light .sub-menu {
			background-color: white;
			font-size: 20px;
		}
		.theme-light .back {
			display: flex;
		}
		.sub-menu {
			padding-top: 0px;
		}
		.submenu-image {
			display: none;
		}
	}

	@media screen and (max-width: 830px) {
		.top-level,
		.back {
			font-size: 46px;
		}
	}

	@media screen and (max-width: 800px) {
		.top-level,
		.back {
			font-size: 26px;
		}
	}

	@media screen and (max-width: 400px) {
		.top-level,
		.back {
			font-size: 20px;
		}
	}

	@media screen and (max-height: 580px) {
		.top-level,
		.back {
			font-size: 26px;
		}
		.submenu-image {
			display: none;
		}
	}
</style>
