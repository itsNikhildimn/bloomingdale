<script>
	import circleArrowRight from '$lib/icons/circle-arrow-right.svg';
	import arrowForward from '$lib/icons/circle-arrow-forward.svg';
	import arrowBack from '$lib/icons/circle-arrow-back.svg';
	import arrowRight from '$lib/icons/arrow-right.svg';
	import arrowDown from '$lib/icons/arrow-down.svg';
	import closeIcon from '$lib/icons/close-icon.svg';
	import arrowOut from '$lib/icons/arrow-outward.svg';
	import circleCheck from '$lib/icons/circle-check.svg';
	import chevronLeft from '$lib/icons/chevron-left.svg';
	import chevronRight from '$lib/icons/chevron-right.svg';
	import chevronBack from '$lib/icons/chevron-back.svg';
	import chevronStout from '$lib/icons/chevron-stout.svg';
	import arrowStout from '$lib/icons/arrow-stout.svg';

	export let shape = '',
		alt = undefined;
</script>

<svg class="svg-icon" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label={alt}>
	{#if alt}
		<title>{alt}</title>
	{/if}
	{#if shape === 'circle-arrow-right'}
		<use href={circleArrowRight + '#circle-arrow-right-filled'} fill="currentcolor" />
	{:else if shape === 'circle-arrow-forward'}
		<use href={arrowForward + '#circle-arrow-forward'} stroke="currentcolor" />
	{:else if shape === 'circle-arrow-back'}
		<use href={arrowBack + '#circle-arrow-back'} stroke="currentcolor" />
	{:else if shape === 'arrow-right'}
		<use href={arrowRight + '#arrow-right-outline'} stroke="currentcolor" />
	{:else if shape === 'arrow-down'}
		<use href={arrowDown + '#arrow-down-outline'} stroke="currentcolor" />
	{:else if shape === 'chevron-left'}
		<use href={chevronLeft + '#chevron-left'} stroke="currentcolor" />
	{:else if shape === 'chevron-right'}
		<use href={chevronRight + '#chevron-right'} stroke="currentcolor" />
	{:else if shape === 'arrow-out'}
		<use href={arrowOut + '#arrow-outward'} stroke="currentcolor" transform="translate(4,4)" />
	{:else if shape === 'close'}
		<use href={closeIcon + '#close-outline'} stroke="currentcolor" transform="scale({24 / 17})" />
	{:else if shape === 'circle-check'}
		<use href={circleCheck + '#circle-check'} fill="currentcolor" />
	{:else if shape === 'chevron-back'}
		<use href={chevronBack + '#chevron-back'} fill="currentcolor" />
	{:else if shape === 'chevron-stout'}
		<use href={chevronStout + '#chevron-stout'} fill="currentcolor" />
	{:else if shape === 'arrow-stout'}
		<use href={arrowStout + '#arrow-stout'} stroke="currentcolor" transform="scale({24 / 16})" />
	{/if}
</svg>
