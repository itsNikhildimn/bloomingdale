<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	import bookshelf from '$lib/icons/book-shelf.svg';
	import chatmarks from '$lib/icons/chat.svg';
	import planet from '$lib/icons/planet.svg';

	// refs
	let section;

	onMount(() => {
		const q = gsap.utils.selector(section);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text'),
			{ yPercent: 110 },
			{
				scrollTrigger: {
					trigger: section,
					start: 'top 80%'
				},
				yPercent: 0,
				duration: 1
			}
		);
	});
</script>

<section id="early-years" bind:this={section}>
	<div class="wrapper">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">Why Bloomingdale’s Early Years Programme</h2>
		</div>
		<div class="cards lg-body-text">
			<div class="card card-1">
				<svg width="96" height="72" viewBox="0 0 96 72">
					<use href={bookshelf + '#books-on-shelf'} style="color: #DE8A2E;" />
				</svg>
				<h4>Playgroup</h4>
				<p>
					Ideal program for a child to start informal play based education. For kids of 2 years.
				</p>
			</div>
			<div class="card card-2">
				<svg width="96" height="83" viewBox="0 0 96 83">
					<use href={chatmarks + '#chat-balloons'} style="color: #64A8DF;" />
				</svg>
				<h4>Nursery</h4>
				<p>
					The program designed to focus on multiple intelligence an ideal form to get kids into
					formal education. Designed for kids between 3 to 4 years.
				</p>
			</div>
			<div class="card card-3">
				<svg width="96" height="67" viewBox="0 0 96 67">
					<use href={planet + '#planet-icon'} style="color: #CEDA42;" />
				</svg>
				<h4>Early Years</h4>
				<p>
					This is the first introduction to formal education. The thematic lessons are designed with
					transdisciplinary focus. For ages 4 to 6 years.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	#early-years {
		background-color: white;
		position: relative;
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		padding-bottom: 60px;
		padding-bottom: 128px;
	}

	#early-years h2 {
		width: 640px;
		margin: 0px auto;
		text-align: center;
	}

	.h-frame {
		margin-bottom: 88px;
	}

	.cards {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.card {
		flex-basis: 420px;
		text-align: center;
		padding: 48px 32px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.card:not(:last-child) {
		border-right: 1px solid rgba(30, 21, 21, 0.2);
	}

	.card > svg {
		flex-basis: 96px;
		justify-self: center;
	}

	.card h4 {
		font-size: 20px;
		font-weight: 500;
		margin-top: 48px;
		margin-bottom: 16px;
	}

	@media only screen and (max-width: 750px) {
		#early-years h2 {
			width: auto;
		}
		.h-frame {
			margin-bottom: 0px;
		}

		.card h4 {
			font-size: 18px;
			margin-top: 42px;
		}
		.cards {
			flex-flow: column nowrap;
		}
		.card {
			flex-basis: auto;
		}
		.card:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid rgba(30, 21, 21, 0.2);
		}
	}
</style>
