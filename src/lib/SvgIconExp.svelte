<script>
	import circleArrowRight from '$lib/icons/my-circle-arrow-right.svg';
	import arrowRight from '$lib/icons/arrow-right.svg';

	export let shape = '';
</script>

<svg class="svg-icon">
	{#if shape === 'circle-arrow-right'}
		<use href={circleArrowRight + '#circle-arrow-right-filled'} fill="currentcolor" />
	{:else if shape === 'arrow-right'}
		<use href={arrowRight + '#arrow-right-outline'} stroke="currentcolor" />
	{/if}
</svg>
