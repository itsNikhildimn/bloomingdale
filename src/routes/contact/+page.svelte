<script>
	// Main imports:
	import { enhance, applyAction } from '$app/forms';
  import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

	// Components:
	import TextInput from '$lib/TextInput.svelte';
	import EmailInput from '$lib/EmailInput.svelte';
	import TextArea from '$lib/TextArea.svelte';
	import CampusInfo from './CampusInfo.svelte';
	import Button from '$lib/buttons/Button.svelte';
	import MyLink from '$lib/buttons/MyLink.svelte';

	// Assets:
	import childrenSteps from '$lib/images/children-steps.webp';

	// Properties:
	export let form;

  // Refs:
  let contactForm, tokenField;

	// Component data:
	let submitted = false;

	// Event handlers:
  function submitForm() {
		submitted = true;
    grecaptcha.ready(async () => {
      tokenField.value = await grecaptcha.execute(
        PUBLIC_RECAPTCHA_KEY,
        {action: 'contact'}
      );
      contactForm.requestSubmit();
    });
  }

	function onSubmit() {
		return async ({ result }) => {
			await applyAction(result);
		};
	}

	//---------------------------------------------------------------------------
	// Template
	//---------------------------------------------------------------------------
</script>

<svelte:head>
  <script async
    src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_KEY}">
  </script>
</svelte:head>

<section id="enquiry-form">
	<div class="form-area">
		<form method="POST" use:enhance={onSubmit} class="sm-body-text" bind:this={contactForm}>
      <input type="hidden" name="token" bind:this={tokenField}>
			<h2 class="md-header-text">Contact us</h2>
			<p><TextInput name="name" placeholder="Full name" required autocomplete="name" /></p>
			<p><EmailInput name="email" placeholder="your@email.com" required
            autocomplete="email" /></p>
			<p><TextArea name="message" placeholder="Leave us a message" /></p>
			<p>
				{#if !submitted}
					<Button style="btn btn-orange" nextStage={submitForm}>Send message</Button>
				{:else if !form}
					<span class="btn btn-orange"><span>Please wait</span></span>
				{:else if !form?.ok}
					<span>Submission failed:<br />{form.reason}</span><br />
					<Button style="btn btn-orange" nextStage={submitForm}>Send message</Button>
				{:else}
					<MyLink style="btn btn-orange" check="true" href="/">Message sent</MyLink>
				{/if}
			</p>
		</form>
	</div>
	<img class="side-bar-image" src={childrenSteps} alt="" />
</section>

<CampusInfo />

<style>
	/*---------------------------------------------------------------------------
 * Styles
 *-------------------------------------------------------------------------*/

	#enquiry-form {
		display: grid;
		grid-template-columns: 40% 60%;
		min-height: 100vh;
		/* padding-bottom: 40px; */
	}

	.side-bar-image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}

	.form-area {
		justify-self: flex-start;
		align-self: center;
		min-width: 350px;
		padding-left: var(--gutter);
	}

	.form-area p {
		margin: 1.5em 0px;
	}

	@media screen and (max-width: 800px) {
		.side-bar-image {
			display: none;
		}
	}
</style>
