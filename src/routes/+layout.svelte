<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { onMount, afterUpdate } from 'svelte';

	import './styles.css';
	import './styles-btn.css';
	import PageHeader from '$lib/PageHeader.svelte';
	import PageFooter from '$lib/PageFooter.svelte';

	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { TextPlugin } from 'gsap/dist/TextPlugin';
	import { Observer } from 'gsap/dist/Observer';
	import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

	// Stores
	import { page } from '$app/stores';
	import { feedback } from '$lib/data/feedback.js';
	import { news } from '$lib/data/news.js';

	// assets
	import whatsapp from '$lib/icons/whatsapp.svg';

	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	export let data; // Get data from server load

	$feedback = data.feedback; // Write to the stores
	$news = data.news;

	gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer, ScrollToPlugin);

	let highContrast = false;
	let isWhatsApp = false;
	let isNiaaChat = false;

	ScrollTrigger.config({ ignoreMobileResize: true });

	// Pages with a light coloured first section.
	const lowContrastPages = [
		'/news/?$',
		'/policies/?$',
		'/careers/?$',
		'/enquiry/?$',
		'/contact/?$',
		'/gallery/?$'
	];

	setMenuTheme();

	function setMenuTheme() {
		// Check for 'low contrast' pages and adjust the top-bar accordingly.
		highContrast = lowContrastPages.some((p) => $page.url.pathname.match(new RegExp(p)));
	}

	beforeNavigate(() => {
		ScrollTrigger.killAll();
		// This will kills all animations even those in the header and
		// footer which won't be reinstated
		gsap.globalTimeline.kill();
	});

	function gtag() {
		window.dataLayer.push(arguments);
	}

	afterNavigate(() => {
		if (window.fbq) fbq('track', 'PageView');
		if (window.dataLayer)
			gtag('config', PUBLIC_GA_MEASUREMENT_ID, {
				page_title: document.title,
				page_path: $page.url.pathname,
				anonymize_ip: true
			});
		setMenuTheme();
	});

	onMount(() => {
		ScrollTrigger.normalizeScroll({
			allowNestedScroll: true
		});
		// window.dataLayer = window.dataLayer || [];
		setTimeout(() => {
			// Chat to appear when window is min-width of 769px and min-height of 400px
			const mm = window.matchMedia('(min-width: 769px) and (min-height: 400px)');
			if (mm.matches) {
				// const niaaChat = document.createElement('script');
				// niaaChat.type = 'text/javascript';
				// niaaChat.async = true
				// niaaChat.src = 'https://chatbot.in8.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/79f1eadd76cd4a2c9c6fa226f698745d/43549a15f064417d997f7907674bb826';
				// document.body.appendChild(niaaChat);
				isNiaaChat = true;
			} else {
				isWhatsApp = true;
			}
		}, 1500);
		gtag('js', new Date());
		gtag('config', 'AW-975190924');
	});
</script>

<svelte:head>
	
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Bloomingdale International School" />
	<meta
		property="og:description"
		content="The premier international school in Andhra Pradesh, India"
	/>
	<meta property="og:image" content="/site-preview.png" />
	<!-- Facebook Pixel Code -->
	<!-- Facebook Pixel Code -->
	<!-- Facebook Pixel Code -->
	<script>
		!(function (f, b, e, v, n, t, s) {
			if (f.fbq) return;
			n = f.fbq = function () {
				n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
			};
			if (!f._fbq) f._fbq = n;
			n.push = n;
			n.loaded = !0;
			n.version = '2.0';
			n.queue = [];
			t = b.createElement(e);
			t.async = !0;
			t.src = v;
			s = b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t, s);
		})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '552650238481842');
	</script>
	<noscript>
		<img
			height="1"
			width="1"
			alt=""
			src="https://www.facebook.com/tr?id=552650238481842&ev=PageView&noscript=1"
		/>
	</noscript>
	<!-- End Facebook Pixel Code -->
</svelte:head>

<div class="app">
	<PageHeader {highContrast} />

	<main>
		<slot />
	</main>

	<PageFooter />
	{#if isWhatsApp}
		<div class="whats-app-button">
			<a href="https://wa.me/918340818818" target="_blank"
				><img src={whatsapp} alt="whatsapp link" /></a
			>
		</div>
	{:else if isNiaaChat}
		<div class="npf_chatbots" data-w="43549a15f064417d997f7907674bb826" style="display:none;"></div>
		<script type="text/javascript"> var s=document.createElement("script"); s.type="text/javascript"; s.async=true; s.src="https://chatbot.in8.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/79f1eadd76cd4a2c9c6fa226f698745d/43549a15f064417d997f7907674bb826"; document.body.appendChild(s); </script>
	{/if}
</div>

<style>
	/*
** NOTE: The footer padding sizes and media breakpoints here must match those
** in the page Footer component.
*/
	.app {
		--footer-padding: 0px;
	}

	.whats-app-button {
		z-index: 999;
		position: fixed;
		bottom: 2rem;
		right: 2rem;
	}

	main > :global(*:last-child) {
		padding-bottom: calc(20px + var(--footer-padding) + var(--b-r-section)) !important;
	}

	@media screen and (min-width: 769px) {
		.app {
			--footer-padding: 150px;
		}
	}

	@media screen and (min-width: 965px) {
		.app {
			--footer-padding: 190px;
		}
	}
</style>
