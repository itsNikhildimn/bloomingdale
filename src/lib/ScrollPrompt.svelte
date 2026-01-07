<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	let arrow;

	onMount(() => {
		animateArrow();
	});

	function animateArrow() {
		gsap.to(arrow, { y: -5, repeat: 1000, yoyo: true, ease: 'power1.inOut', duration: 0.7 });
	}
</script>

<div class="scroll-prompt">
	<div class="text">SCROLL</div>
	<div class="container">
		<div class="arrow" bind:this={arrow}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
			</svg>
		</div>
	</div>
</div>

<style>
	.scroll-prompt {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.scroll-prompt .text {
		margin-bottom: 0.8rem;
		font-size: 0.9rem;
		letter-spacing: 2px;
		color: white;
	}
	.container {
		height: 3rem;
		width: 3rem;
		border-radius: 50%;
		border: 1.6px white solid;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.arrow {
		transform: translateY(4px);
	}
</style>
