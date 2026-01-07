<script>
	export let isOpen, id, closeModal, media;

	let item;
	$: item = media.find((item) => item.id == id);
</script>

<div class="modal {isOpen ? 'open' : ''}">
	<div class="overlay" />
	<div class="container">
		<button on:click={closeModal}>X</button>
		<img src={item?.media} alt="" />
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
	}
	.modal.open {
		pointer-events: unset;
	}

	.modal .overlay {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.879);
		height: 100vh;
		width: 100vw;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.modal.open .overlay {
		opacity: 1;
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container button {
		color: white;
		font-size: 2rem;
		position: absolute;
		top: 1rem;
		right: var(--gutter);
		z-index: 999;
		opacity: 0;
		mix-blend-mode: difference;
	}
	.modal.open .container button {
		opacity: 1;
	}
	.modal img {
		opacity: 0;
	}
	.modal.open img {
		max-width: 80%;
		max-height: 80%;
		opacity: 1;
		transition: opacity 0.5s ease;
	}
</style>
