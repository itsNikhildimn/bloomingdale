<script>
	//---------------------------------------------------------------------------
	// Module:  $lib/PageHeader.svelte
	// Author:  S. Wheeler
	//
	// This component is used by the top level layout to provide a 'responsive'
	// page header / menu on all pages. The menu is triggered to 'open' by a
	// button [at the far right] that is also used to 'close' it again.
	//---------------------------------------------------------------------------

	// Main imports:
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { gsap } from 'gsap/dist/gsap';
	import SiteMenu from './SiteMenu.svelte';

	// Assets:
	import logoWhite from '$lib/images/logo-white.svg';
	import logoBlack from '$lib/images/logo-black.svg';
	import worldSchools from '$lib/images/IB-world-schools.webp';

	// Properties:
	export let highContrast = false;

	// Component state:
	let menuActive = false,
		lastPos = 0,
		menuShown = true,
		menuOpaque = false;

	// Event handler functions:
	function toggleMenu() {
		menuActive = !menuActive;
		menuShown = true;
		lastPos = window.scrollY;

		if (menuActive) {
			gsap.set('body', { overflowY: 'hidden' });
		} else {
			gsap.set('body', { overflowY: 'auto' });
		}
	}

	function showHideMenu() {
		if (!menuActive) {
			const scrollDown = window.scrollY > lastPos,
				delta = Math.abs(window.scrollY - lastPos);
			menuOpaque = window.scrollY > window.innerHeight;

			if (window.scrollY < 45) {
				menuShown = true;
			} else if (menuShown && scrollDown && delta > 15) {
				menuShown = false;
			} else if (!menuShown && !scrollDown && delta > 15) {
				menuShown = true;
			}
			if (scrollDown !== menuShown || delta > 15) {
				lastPos = window.scrollY;
			}
		}
	}

	// Hooks:

	onMount(() => {
		// Listen for window scroll events, to show and hide the menu top-bar.
		window.addEventListener('scroll', showHideMenu);
		return () => {
			window.removeEventListener('scroll', showHideMenu);
		};
	});

	beforeNavigate(() => {
		// Close the menu (if open) before we navigate to a different page.
		menuShown = true;
		menuActive = false;
		gsap.set('body', { overflowY: 'auto' });
	});

	//---------------------------------------------------------------------------
	// Template:
	//---------------------------------------------------------------------------
</script>

<div
	class="page-header"
	class:active={menuActive}
	class:opaque={menuOpaque || menuActive}
	class:hidden={!menuShown && !menuActive}
	class:high-contrast={highContrast}
>
	<div class="sidebar" />

	<div class="topbar">
		<a href="/"
			><img
				class="logo"
				src={menuOpaque || menuActive || highContrast ? logoBlack : logoWhite}
				alt="bloomingdale logo"
			/></a
		>
		<nav>
			<a rel="external" href="/about"><img src={worldSchools} alt="IB World Schools" /></a>
			<a
				rel="external"
				href="https://kuula.co/share/collection/7Y4Cy?fs=1&vr=0&sd=1&thumbs=1&info=1&logo=0"
				class="virtual-tour collapse">Virtual Tour</a
			>
			<a href="/enquiry" class="btn btn-enquiry collapse"><span>Admissions</span></a>
			<button class="menu-icon" on:click={toggleMenu}>
				{#if menuActive}
					<svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M13 27.142 27.142 13M13 13.142l14.142 14.142"
							stroke="currentcolor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				{:else}
					<svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11 16h20M11 24h20"
							stroke="currentcolor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				{/if}
			</button>
		</nav>
	</div>

	<div class="site-menu">
		<SiteMenu theme="light" />
	</div>

	<div class="campus-details xs-body-text">
		<div>
			<h5 class="campus-name sm-body-text">Galileo Campus</h5>
			<p>T. +91 9525525525 ext 1</p>
			<address>Bloomingdale International School Road Penamaluru</address>
		</div>
		<hr />
		<div>
			<h5 class="campus-name sm-body-text">Early Years Village Campus</h5>
			<p><a href="tel:+919513632659">T. +91-9513632659</a></p>
			<address>Municipal&nbsp;Employees Colony&nbsp;Main&nbsp;Road</address>
		</div>
	</div>
</div>

<style>
	/*---------------------------------------------------------------------------
	Styles:
	---------------------------------------------------------------------------*/

	/* The page header is 'fixed' at the top of the screen, so that other content
  * scrolls under it. We have to mirror the page gutter, so it is positioned
  * in line with the page body. */
	.page-header {
		position: fixed;
		width: calc(100vw - 2 * (var(--gutter) - 20px));
		margin: 0px calc(var(--gutter) - 20px);
		box-sizing: border-box;
		z-index: 900;
		display: grid;
		grid-template-columns: minmax(22.64%, 326px) 1fr;
		grid-template-rows: auto 1fr;
		grid-template-areas: 'topbar topbar' 'campus sitemenu';
		border-radius: 0px 0px 24px 24px;
		background-color: transparent;
		color: white;
		transition: translate 1s;
	}

	.page-header.active {
		border-radius: 0px;
		width: 100vw;
		height: 100vh;
		margin: 0px;
	}

	.page-header.hidden {
		translate: 0px -100%;
	}

	.page-header.opaque {
		background-color: white;
		color: var(--secondary-black);
	}

	.page-header.high-contrast {
		color: var(--secondary-black);
	}

	/* The top bar (always visible) consists of the logo (left) and menu toggle
  * right. */
	.topbar {
		grid-area: topbar;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
	}

	.active .topbar {
		padding: 10px var(--gutter);
	}

	.logo {
		height: 32px;
		width: auto;
	}

	.topbar nav {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 2rem;
	}

	.topbar a,
	.topbar button {
		color: inherit;
		transition: color var(--hover-transition-length);
	}

	.topbar nav button {
		display: flex;
	}

	.topbar nav svg {
		align-self: center;
	}
	.topbar nav img {
		height: 40px;
		width: 40px;
	}

	/* When 'closed', all sections other than the top bar are hidden. */
	.campus-details,
	.site-menu,
	.sidebar {
		display: none;
	}

	/* When 'open' (active), all sections appear in the appropriate place
  * in a grid layout. */
	.active .campus-details {
		display: block;
		grid-area: campus;
		align-self: flex-end;
		padding: 0px var(--gutter) var(--gutter);
		color: var(--secondary-black);
		opacity: 0.6;
		font-size: 16px;
		line-height: 120%;
	}

	.active .campus-details > div h5 {
		margin-top: 0;
	}

	.campus-details hr {
		margin: 24px auto;
		width: 100%;
	}

	.campus-details h5,
	.campus-details p {
		font-weight: normal;
		margin: 1em 0px;
	}

	.campus-details h5 {
		font-weight: 500;
	}

	.campus-details p {
		padding-left: 1.5em;
		position: relative;
	}
	.campus-details p::before {
		content: url('$lib/icons/phone.svg');
		position: absolute;
		left: 0px;
	}

	.campus-details address {
		font-style: normal;
		padding-left: 1.5em;
		position: relative;
	}
	.campus-details address::before {
		content: url('$lib/icons/location-tag.svg');
		position: absolute;
		left: 0px;
	}

	.active .site-menu {
		display: block;
		grid-area: sitemenu;
		align-self: flex-end;
	}

	.active .site-menu > :global(*) {
		height: 100%;
	}

	/* The 'side bar' is a coloured (gradient) background that appears
  * underneath the logo and campus details. [Make sure it appears before
  * both in the template.] */
	.active .sidebar {
		display: block;
		grid-area: 1 / 1 / 3 / 2;
		background: linear-gradient(#caefff 0%, #effffd 23.3%, #fff0d0 82.39%);
		border-bottom-right-radius: 1.2rem;
		border-top-right-radius: 1.2rem;
	}

	/* Give the 'enquiry' link a rounded appearance. */
	.topbar a.btn-enquiry {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		background-color: white;
		color: var(--secondary-black);
		transition: color var(--hover-transition-length),
			background-color var(--hover-transition-length);
	}

	.high-contrast .topbar a.btn-enquiry,
	.opaque .topbar a.btn-enquiry {
		background-color: var(--secondary-black);
		color: white;
		transition: color var(--hover-transition-length),
			background-color var(--hover-transition-length);
	}

	.topbar a:hover,
	.topbar button:hover {
		color: var(--brand-colors-orange);
	}

	.topbar a.btn-enquiry:hover {
		background-color: var(--brand-colors-orange);
		color: white;
	}

	/* Media queries.
  */
	@media screen and (max-width: 964px) {
		.campus-details hr {
			margin: 20px auto;
		}
	}

	@media screen and (max-width: 800px) /*and (min-height: 650px) */ {
		.page-header.active {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr auto;
			grid-template-areas: 'topbar' 'sitemenu' 'campus';
		}
		.active .sidebar {
			grid-area: campus;
			border-radius: 1.2rem 1.2rem 0px 0px;
		}
		.active .campus-details {
			padding: 40px var(--gutter);
		}
	}

	@media screen and (max-width: 800px) and (max-height: 650px) {
		.active .site-menu {
			padding-bottom: 40px;
		}
		.active .campus-details {
			display: none;
		}
	}

	@media screen and (max-width: 660px) {
		.topbar nav a.collapse {
			display: none;
		}
	}

	@media screen and (max-width: 500px) {
		.page-header {
			border-radius: 0px;
		}
	}
	@media screen and (max-width: 480px) {
		.page-header nav {
			gap: 1rem;
		}
	}
</style>
