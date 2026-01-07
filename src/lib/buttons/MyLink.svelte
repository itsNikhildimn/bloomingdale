<script>
	export let style,
		href = '#top',
		target = '_self',
		check = undefined;
</script>

{#if check}
	<a class={style} {href}>
		<span><slot /></span>
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="circle-check" transform="matrix(0.857143,0,0,0.857143,0,0)">
				<path
					d="M14,0C21.727,0 28,6.273 28,14C28,21.727 21.727,28 14,28C6.273,28 0,21.727 0,14C0,6.273 6.273,0 14,0ZM18.624,9.293L11.997,15.919C11.997,15.919 9.371,13.293 9.371,13.293C8.981,12.903 8.347,12.903 7.957,13.293C7.567,13.683 7.567,14.317 7.957,14.707L11.29,18.04C11.681,18.431 12.314,18.431 12.705,18.04L20.038,10.707C20.428,10.317 20.428,9.683 20.038,9.293C19.648,8.903 19.014,8.903 18.624,9.293Z"
					style="fill:currentcolor;"
				/>
			</g>
		</svg>
	</a>
{:else}
	<a class={style} {href} {target}>
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
	</a>
{/if}
