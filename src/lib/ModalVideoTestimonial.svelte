<script>
	import { afterUpdate } from 'svelte';
	export let isOpen, id, closeModal, media;

	// refs
	let video;

	let item;
	$: item = media.find((item) => item.id == id);

	afterUpdate(() => {
		if (isOpen && video.readyState === 0) video.load();
		// If re-opening same video after close, restart playback.
		if (isOpen && video.readyState > 2) video.play();
	});

	function handleClick() {
		// On closing the popup, pause the video playback & reset to start.
		video.pause();
		video.currentTime = 0;
	}
</script>

<div class="modal {isOpen ? 'open' : ''}">
	<div class="overlay" />
	<div class="container">
		<button
			on:click={() => {
				closeModal();
				handleClick();
			}}>X</button
		>
		<video bind:this={video} class="media" muted autoplay loop playsinline>
			<source src={item?.mp4} type="video/mp4" />
			<source src={item?.webm} type="video/webm" />
			Your browser does not support HTML video.
		</video>
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
		/* align-items: center; */
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

	.modal video {
		opacity: 0;
	}

	.modal.open video {
		max-width: 100%;
		/* max-height: 80%; */
		opacity: 1;
		transition: opacity 0.5s ease;
	}
</style>
