<script>
	// Child of HorizontalCarousel
	export let isOpen, closeModal, teacher;
</script>

<div class="modal {isOpen ? 'open' : ''}">
	<div class="overlay" />
	<div class="container">
		<button
			on:click={() => {
				closeModal();
			}}>X</button
		>
		<div class="body">
			<div class="card">
				<div class="card-inner">
					<img src={teacher.image} alt={teacher.alt} />
				</div>
				<div class="name lg-body-text">{teacher.name}</div>
				<span class="subject sm-body-text">{teacher.role}</span>
			</div>
			<div class="about">
				{#if teacher.exp}
					<h3 class="sm-header-text">{teacher.exp}</h3>
				{/if}
				<p class="sm-body-text">
					{teacher.bio}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.modal {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 900;
		overflow: scroll;
		overscroll-behavior: contain;
	}
	.modal.open {
		pointer-events: unset;
	}

	.modal.open :global(body) {
		overflow: hidden;
	}

	.modal .overlay {
		position: fixed;
		top: 0;
		left: 0;
		background-color: white;
		height: 100vh;
		width: 100vw;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.modal.open .overlay {
		opacity: 1;
	}

	.container {
		padding: 76px var(--gutter);
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		overscroll-behavior: contain;
	}

	.modal.open .container {
		transition: 1s 0.4s ease;
		opacity: 1;
	}

	.container button {
		color: black;
		font-size: 2rem;
		position: fixed;
		top: 1rem;
		right: var(--gutter);
		z-index: 999;
		opacity: 0;
	}
	.modal.open .container button {
		opacity: 1;
	}

	/* Body */
	.body {
		display: flex;
		overscroll-behavior: contain;
	}
	.card {
		width: 40%;
	}

	.card .name {
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 0.25rem;
	}

	.card .subject {
		color: var(--secondary-black-o60);
	}

	.card-inner {
		position: relative;
		aspect-ratio: 1/1;
		height: auto;
		display: flex;
	}

	.card-inner {
		margin-bottom: 24px;
	}

	.card-inner img {
		position: absolute;
		height: 100%;
		/* border-radius: calc(var(--b-r-container) / 3 * 2); */
		width: 100%;
		border-radius: var(--b-r-container);
		object-fit: cover;
	}

	.card .name {
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 0.25rem;
	}

	.about {
		padding: 0 var(--gutter);
		width: 60%;
	}

	.about h3 {
		color: var(--brand-colors-blue);
		margin-bottom: 0.5rem;
	}

	.about p {
		white-space: pre-wrap;
		color: var(--secondary-black-o60);
	}

	@media screen and (max-width: 768px) {
		.body {
			flex-direction: column;
		}

		.card {
			width: 60%;
		}

		.about {
			width: 100%;
			padding: 2rem 0 6rem 0;
		}

		.container {
			display: block;
		}
	}
</style>
