<script>
	import { onMount } from 'svelte';
	import { Power1, gsap } from 'gsap/dist/gsap';
	import { getDaysInMonth, subYears, format, addYears } from 'date-fns';
	import validation, { isValidYear, isValidMonth, isValidDay } from '$lib/helpers/validation.js';

	import closeIcon from '$lib/icons/close-icon-gray.svg';

	import MyLink from '$lib/buttons/MyLink.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
	import Button from '$lib/buttons/Button.svelte';

	let admission, popup, card;
	$: feedback = '&nbsp;';

	onMount(() => {
		const q = gsap.utils.selector(admission);

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 180 },
			{
				scrollTrigger: {
					trigger: admission,
					start: 'top 70%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		gsap.set(popup, { yPercent: 120, autoAlpha: 0 });
		gsap.set(card, { yPercent: 80 });
	});

	function handleSubmit() {
		// if validation returns true animate popup and set isValid to true
		const response = validation(selectedDay, selectedMonth, selectedYear);

		if (response.isValid) {
			yearGroup = response.yearGroup;
			openPopup();
			feedback = 'Success';
		} else {
			feedback = response.feedback; // Promt user to complete selection
		}

		// if validation returns false return feedback and set isValid to false
	}

	function openPopup() {
		// disable scroll on body while popup is open
		gsap.set('body', { overflow: 'hidden' });
		//open popup
		gsap.to(popup, { yPercent: 0, ease: Power1.inOut, autoAlpha: 1, duration: 0.8 });
		gsap.to(card, { yPercent: 0, ease: Power1.inOut, duration: 1.1 });
	}

	function closePopup() {
		feedback = '&nbsp;';
		// re-enable scroll
		gsap.set('body', { overflow: 'unset' });
		// close popup
		gsap.to(popup, { yPercent: 120, ease: Power1.inOut, duration: 0.8 });
		gsap.to(card, { yPercent: 80, ease: Power1.inOut, duration: 1.1 });
	}

	// Refs

	let months = [
		{ value: 1, label: 'January' },
		{ value: 2, label: 'February' },
		{ value: 3, label: 'March' },
		{ value: 4, label: 'April' },
		{ value: 5, label: 'May' },
		{ value: 6, label: 'June' },
		{ value: 7, label: 'July' },
		{ value: 8, label: 'August' },
		{ value: 9, label: 'September' },
		{ value: 10, label: 'October' },
		{ value: 11, label: 'November' },
		{ value: 12, label: 'December' }
	];

	// Create array of 16 consecutive years up to 3 years from current date
	// Calculate the start year
	const startDate = subYears(new Date(), 19);

	let years = Array.from({ length: 17 }, (_, i) =>
		format(addYears(new Date(startDate), i), 'yyyy')
	);

	let selectedDay = 'Day',
		selectedMonth = 'Month',
		selectedYear = 'Year',
		monthValue = null,
		yearValue = null,
		yearGroup = '';

	// Default Days
	let days = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
		27, 28, 29, 30, 31
	];

	// Case for feedback message, before submission
	// Check if the selected day exists in the selected month and year
	$: {
		// Create an array of days, given the selected month and year
		days = Array(getDaysInMonth(new Date(yearValue, monthValue)))
			.fill(1)
			.map((n, i) => n + i);

		// 1st: if a month, year and day have been selected
		if (selectedDay !== 'Day' && monthValue && yearValue) {
			// If selected day does not exist in the selected month and year
			if (!days.includes(selectedDay)) {
				selectedDay = 'Day'; // reset value of button
				feedback = 'Please pick a day that exists for this month and year'; // populate feedback
			}
		}
	}

	function select(option) {
		if (isValidDay(option)) {
			selectedDay = option;
		}
		if (isValidMonth(option.label)) {
			selectedMonth = option.label;
			monthValue = option.value; // set year value for evaluation
		}
		if (isValidYear(option)) {
			selectedYear = option;
			yearValue = option; // set year value for evaluation
		}
	}
</script>

<section id="admission" bind:this={admission}>
	<div class="top">
		<div class="h-frame">
			<h2 class="lg-header-text h-text">Admission to Bloomingdale School</h2>
		</div>
		<div class="b-frame">
			<p class="lg-body-text b-text">
				Enter your child’s of birth to discover the key steps and relevant information about how to
				join us
			</p>
		</div>

		<div class="form">
			<Dropdown {select} timeSpanArray={days} string="Day" />
			<Dropdown {select} timeSpanArray={months} string="Month" />
			<Dropdown {select} timeSpanArray={years} string="Year" />
			<div class="btn-container">
				<Button style="btn btn-calc orange" {handleSubmit}>Calculate</Button>
			</div>
		</div>

		<p class="error-feedback">{@html feedback}</p>

		<!----------------------------------------->
		<!--  Popup                              -->
		<!----------------------------------------->
		<div class="popup" bind:this={popup}>
			<div class="card" bind:this={card}>
				<div class="close-btn-container">
					<button on:click={closePopup}>
						<img src={closeIcon} alt="close button icon" />
					</button>
				</div>
				<h2 class="lg-header-text good-news">Good News!</h2>
				<h4 class="lg-body-text">Your child is eligible for {yearGroup}</h4>
				<p class="lg-body-text">
					Contacting us is the first stage of the admission process. To make an initial enquiry,
					please contact us by phone at <span>+91-7569303221</span>
					or you can fill out our online enquiry form.<br /><br />

					After your enquiry, we will send you an information package and advise you if you have any
					questions about our school.
				</p>
				<div class="link">
					<MyLink style="btn btn-orange" href="/enquiry">Enquiry Form</MyLink>
				</div>
			</div>
		</div>
	</div>
	<div class="underlap" />
</section>

<style>
	#admission {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-orange);
		/*overflow: hidden;*/
	}

	.top {
		padding: 80px var(--gutter);
	}
	.underlap {
		height: calc(80px + var(--b-r-section));
	}

	h2,
	p {
		margin-left: auto;
		margin-right: auto;
		max-width: 35rem;
		text-align: center;
		color: white;
	}

	.form {
		margin: auto;
		display: flex;
		justify-content: space-between;
		justify-content: center;
		/* align-items: start; */
		position: relative;
		z-index: 15;
		flex-wrap: wrap;
		align-content: center;
		/* max-width: max-content; */
		/* width: min-content; */
	}

	.error-feedback {
		text-align: center;
		width: 100%;
		margin-top: 30px;
		text-align: center;
		width: 100%;
	}

	.popup {
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 500;
		width: 100%;
		top: calc(var(--b-r-section) * 2);
		left: 0;
		text-align: center;
		padding: 10px var(--gutter);
		background-color: rgb(145, 91, 36);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		visibility: hidden;
	}

	.card {
		position: relative;
		border-radius: var(--b-r-container);
		background-color: hsla(0, 0%, 100%, 1);
		padding: var(--gutter) var(--gutter) 48px;
		padding: 48px clamp(28px, 5vw, 48px) 48px;
		max-width: max-content;
		margin: auto;
	}
	.card .close-btn-container {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding-top: 0.5em;
		padding-right: 0.5em;
		display: flex;
		justify-content: flex-end;
	}

	.card h2 {
		margin-bottom: 0.2em;
		color: var(--secondary-black);
	}
	.card h4 {
		color: var(--secondary-black-o60);
	}
	.card p {
		max-width: 41rem;
		font-weight: 400;
		color: var(--secondary-black);
	}
	.card p span {
		font-weight: 400;
		color: var(--brand-colors-orange);
	}

	.link {
		margin-top: 24px;
	}

	.btn-container {
		margin-top: 1.2em;
		flex-basis: 60%;
		min-width: 340px;
	}

	@media (max-width: 478px) {
		.form {
			flex-direction: column;
		}
		.btn-container {
			min-width: unset;
		}
	}
	@media (max-width: 768px) {
		.link {
			text-align: right;
		}
	}
	@media (min-width: 769px) {
		.top {
			padding: 128px var(--gutter) 128px;
		}

		.form {
			flex-wrap: unset;
			align-content: unset;
			width: 40em;
			justify-content: center;
		}

		.link {
			margin-top: 40px;
		}

		.btn-container {
			width: unset;
			min-width: unset;
			margin-top: 0;
		}

		.good-news {
			font-size: 32px;
		}
	}

	@media (min-width: 965px) {
		.top {
			padding: 128px var(--gutter) 128px;
		}
	}
</style>
