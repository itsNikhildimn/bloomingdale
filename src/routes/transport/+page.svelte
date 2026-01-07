<script>
	import { gsap } from 'gsap/dist/gsap.js';
	import HeroSecondary from '$lib/HeroSecondary.svelte';
	import Admission from '$lib/Admission.svelte';
	// Assets:
	import location from '$lib/icons/location.svg';
	import time from '$lib/icons/time-gray.svg';
	import { onMount } from 'svelte';

	import { transportHero } from '$lib/data/hero.js';

	// Properties:
	export let data;

	// Refs:
	let mapFrame;

	// Component data:
	let currentRoute = data.routes[0];

	const initialRef =
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244869.26043082154!2d80.56263546751742!3d16.47137522854875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fab834015e77%3A0x1660809113441b72!2sBloomingdale%20International%20school%20(Galileo%20Campus)!5e0!3m2!1sen!2suk!4v1681888899396!5m2!1sen!2suk';

	let mapRef = currentRoute?.mapRef || initialRef;
	let mapLocation = 'beside';

	// Event handlers:

	function selectRoute(ev) {
		const wanted = ev.currentTarget.innerText;
		currentRoute = data.routes.find((r) => r.name === wanted);
		mapRef = currentRoute?.mapRef || initialRef;
	}

	function setMapLocation(ev) {
		mapLocation = ev.matches ? 'beneath' : 'beside';
	}

	// Hooks:

	onMount(() => {
		const mm = matchMedia('(max-width: 1260px)');
		mm.addEventListener('change', setMapLocation);
		mapLocation = mm.matches ? 'beneath' : 'beside';
		return () => mm.removeEventListener('change', setMapLocation);
	});
</script>

<svelte:head>
   <title>Transport | Bloomingdale International School</title>
</svelte:head>

<HeroSecondary data={transportHero} />
<section id="routes">
	<div class="wrapper">
		<div class="section-head">
			<h2 class="md-header-text">Transport</h2>
			<p class="lg-body-text">
				Starting for the academic year 2021-22 Parents will be able to get alert as the bus is about
				to reach the designated stop. Parents will also be able to track child’s location through a
				mobile App
			</p>
		</div>
		<div class="tabs">
			{#each data.routes as route}
				<button
					type="button"
					class:current={route.name === currentRoute.name}
					class="sm-body-text"
					on:click={selectRoute}>{route.name}</button
				>
			{/each}
		</div>
		<div class="route-info">
			<table class="route-detail">
				<thead>
					<tr><th class="sm-header-text">Time</th><th class="sm-header-text">Location</th></tr>
				</thead>
				<tbody>
					{#each currentRoute.stops as stop}
						<tr>
							<td><img src={time} alt="" /><span>{stop.time}</span></td>
							<td>
								<div>
									<img src={location} alt="" />
									<span>{stop.location}</span>
                </div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div bind:this={mapFrame}>
				<iframe
					class="map-frame"
					src={mapRef}
					title="Location map"
					width="600"
					height="450"
					style="border:0;"
					allowfullscreen="true"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				/>
			</div>
		</div>
	</div>
</section>
<Admission />

<style>
	/*---------------------------------------------------------------------------
  * Styles
  *-------------------------------------------------------------------------*/

	#routes {
		min-height: 100vh;
		background-image: var(--gradient-blue-orange-reverse);
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		position: relative;
	}

	.wrapper {
		padding: 100px var(--gutter) 132px;
	}

	.section-head {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 128px;
	}

	.section-head h2 {
		margin-bottom: 32px;
	}

	.section-head p {
		color: var(--secondary-black-o60);
	}
	.tabs {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		column-gap: 10px;
	}

	.tabs button {
		background-color: rgba(30, 21, 21, 0.05);
		color: var(--secondary-black-o60);
		border-radius: 24px 24px 0px 0px;
		border-radius: var(--b-r-container) var(--b-r-container) 0px 0px;
		padding: 12px 24px;
	}

	.tabs button.current {
		background-color: white;
		color: var(--secondary-black);
	}

	.route-info {
		background-color: white;
		padding: 24px;
		border-radius: 0px 24px 24px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 24px;
    align-items: flex-start;
	}

	.route-detail tr {
		height: 54px;
	}

	.route-detail th {
		text-align: left;
		width: 50%;
	}

	.route-detail tbody td {
		border-top: 1px solid rgba(30, 21, 21, 0.1);
	}

	.map-frame {
		border-radius: var(--b-r-container);
		width: 100%;
    aspect-ratio: 1.0;
	}

	th {
		vertical-align: top;
	}
	th:first-child {
		max-width: 38%;
	}

	td * {
		display: inline;
		vertical-align: middle;
	}

	td img {
		margin-right: 8px;
	}

	@media screen and (min-width: 1261px) {
		.map-frame {
			height: 100%;
		}
	}

	@media screen and (max-width: 1260px) {
		.route-info {
			grid-template-columns: 1fr;
		}

		.map-frame {
			margin-top: 40px;
			height: 450px;
		}
	}
	@media screen and (max-width: 768px) {
		.section-head {
			grid-template-columns: 1fr;
		}
	}
	@media screen and (max-width: 640px) {
		.section-head {
			margin-bottom: 80px;
		}
		.tabs button {
			padding: 6px 12px;
			border-radius: 16px 16px 0 0;
		}

		.map-frame {
			aspect-ratio: 1/1;
			height: auto;
		}

		th:first-child {
			max-width: unset;
			width: 25%;
		}
	}
	@media screen and (max-width: 480px) {
		.tabs {
			column-gap: 4px;
		}
	}

	@media screen and (max-width: 404px) {
		.tabs {
			justify-content: flex-start;
		}
	}
</style>
