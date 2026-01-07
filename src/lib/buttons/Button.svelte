<script>
	export let style,
		nextStage = undefined,
		handleSubmit = undefined;
</script>

{#if handleSubmit}
	<button class={style} on:click={handleSubmit}>
		<span><slot /></span>
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 28 28"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			xmlns:serif="http://www.serif.com/"
			style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
			><path
				id="circle-arrow-right-filled"
				d="M14,0c7.727,0 14,6.273 14,14c0,7.727 -6.273,14 -14,14c-7.727,0 -14,-6.273 -14,-14c0,-7.727 6.273,-14 14,-14Zm2.92,15l-2.293,2.293c-0.39,0.39 -0.39,1.024 -0,1.414c0.39,0.39 1.024,0.39 1.414,0l4,-4c0.391,-0.39 0.391,-1.024 0,-1.414l-4,-4c-0.39,-0.39 -1.024,-0.39 -1.414,-0c-0.39,0.39 -0.39,1.024 -0,1.414l2.293,2.293l-8.254,0c-0.552,-0 -1,0.448 -1,1c0,0.552 0.448,1 1,1l8.254,0Z"
				style="fill:currentcolor;"
			/></svg
		>
	</button>
{:else if nextStage}
	<button type="button" class={style} on:click={nextStage}>
		<span><slot /></span>
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 28 28"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			xmlns:serif="http://www.serif.com/"
			style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
			><path
				id="circle-arrow-right-filled"
				d="M14,0c7.727,0 14,6.273 14,14c0,7.727 -6.273,14 -14,14c-7.727,0 -14,-6.273 -14,-14c0,-7.727 6.273,-14 14,-14Zm2.92,15l-2.293,2.293c-0.39,0.39 -0.39,1.024 -0,1.414c0.39,0.39 1.024,0.39 1.414,0l4,-4c0.391,-0.39 0.391,-1.024 0,-1.414l-4,-4c-0.39,-0.39 -1.024,-0.39 -1.414,-0c-0.39,0.39 -0.39,1.024 -0,1.414l2.293,2.293l-8.254,0c-0.552,-0 -1,0.448 -1,1c0,0.552 0.448,1 1,1l8.254,0Z"
				style="fill:currentcolor;"
			/></svg
		>
	</button>
{:else}
	<button class={style}>
		<span><slot /></span>
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 28 28"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xml:space="preserve"
			xmlns:serif="http://www.serif.com/"
			style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
			><path
				id="circle-arrow-right-filled"
				d="M14,0c7.727,0 14,6.273 14,14c0,7.727 -6.273,14 -14,14c-7.727,0 -14,-6.273 -14,-14c0,-7.727 6.273,-14 14,-14Zm2.92,15l-2.293,2.293c-0.39,0.39 -0.39,1.024 -0,1.414c0.39,0.39 1.024,0.39 1.414,0l4,-4c0.391,-0.39 0.391,-1.024 0,-1.414l-4,-4c-0.39,-0.39 -1.024,-0.39 -1.414,-0c-0.39,0.39 -0.39,1.024 -0,1.414l2.293,2.293l-8.254,0c-0.552,-0 -1,0.448 -1,1c0,0.552 0.448,1 1,1l8.254,0Z"
				style="fill:currentcolor;"
			/></svg
		>
	</button>
{/if}
