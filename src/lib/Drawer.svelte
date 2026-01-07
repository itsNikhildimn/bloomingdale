<script>
	export let isOpen = false,
		handleClose,
		openModal,
		card = null;

	let mobile;
	export { mobile as class };
</script>

<div class={mobile || ''}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="overlay {isOpen ? 'show' : ''}" on:click={handleClose} on:keydown />
	<div class="drawer {isOpen ? 'show' : ''}">
		<!-- close button -->
		<span>
			<svg
				class="close-button"
				width="40"
				height="40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				on:click={handleClose}
				on:keydown
				role="button"
				tabindex="0"
			>
				<path
					d="M13 27.142 27.142 13M13 13.142l14.142 14.142"
					stroke="currentcolor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		</span>

		<div class="container">
			<p class="lg-body-text">{card?.comment}</p>
			<div class="author">{card?.from}</div>
			<div class="relation-to-student">{card?.relation}</div>
			<div class="author-profile-container">
				{#if card?.video}
					<button on:click={openModal}>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="16" cy="16" r="16" fill="#1E1515" />
							<path
								d="M22.4265 15.1245C23.1123 15.5055 23.1123 16.4918 22.4265 16.8729L13.4856 21.84C12.8191 22.2103 12 21.7283 12 20.9658L12 11.0315C12 10.2691 12.8191 9.78709 13.4856 10.1574L22.4265 15.1245Z"
								fill="white"
							/>
						</svg>
					</button>
				{/if}

				<img class="author-profile" src={card?.photo.URL} alt={card?.photo.altText} />
			</div>
		</div>
	</div>
</div>

<style>
	.overlay {
		pointer-events: none;
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.668);
		opacity: 0;
		transition: opacity 0.4s;
	}

	.drawer {
		display: none;
		position: fixed;
		z-index: 100;
		top: 100px;
		right: 0;
		max-width: 600px;
		height: calc(100vh - 100px);
		background-color: white;
		color: var(--secondary-black);
		border-top-left-radius: var(--b-r-container);
		border-bottom-left-radius: var(--b-r-container);
		padding: 32px 32px 0;
		font-size: 25px;
		font-weight: 500;
		line-height: 1.4;
		transform: translateX(100%);
		transition: transform 0.4s;
		display: flex;
		flex-direction: column;
	}

	.drawer p {
		margin-bottom: 30px;
	}

	.container {
		padding-right: 2rem;
		overflow: scroll;
	}

	.container .relation-to-student {
		margin-bottom: 2rem;
	}

	.container img {
		border-radius: 50%;
		width: 6rem;
		height: 6rem;
		margin-bottom: 4rem;
		object-fit: cover;
	}

	.author-profile-container {
		position: relative;
		display: inline-block;
	}
	.author-profile-container button {
		position: absolute;
		right: 0;
	}
	.author-profile-container button svg {
		width: 1.8rem;
		height: 1.8rem;
	}

	.overlay.show {
		pointer-events: auto;
		opacity: 1;
		transform: translateX(0);
	}

	.drawer.show {
		transform: translateX(0);
	}

	.drawer .close-button {
		border-radius: 50%;
		background-color: lightgrey;
		cursor: pointer;
		margin-bottom: 20px;
	}
</style>
