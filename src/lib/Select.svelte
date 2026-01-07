<script>
	import { createEventDispatcher } from 'svelte';
	import SvgIcon from '$lib/SvgIcon.svelte';

	export let name,
		value = '',
		color = 'orange',
		options = [],
		expanded = false;

	let dispatch = createEventDispatcher();

	let popup;

	function toggleOptions() {
		dispatch('show', expanded ? 'none' : name);
	}

	function selectOption(ev) {
		value = ev.currentTarget.innerText;
	}
</script>

<button class="select btn btn-{color}" on:click={toggleOptions}>
	<span>{name + (value ? ': ' + value : '')}</span><SvgIcon shape="arrow-down" />
	<div class="popup" bind:this={popup} style:display={expanded ? 'block' : 'none'}>
		{#each options as opt}
			<button on:click={selectOption} class="btn-{color}">{opt}</button>
		{/each}
	</div>
</button>

<style>
	.select {
		position: relative;
	}
	.popup {
		display: none;
		position: absolute;
		left: 0px;
		top: calc(100% + 4px);
		background-color: inherit;
		z-index: 1000;
		width: 100%;
		text-align: center;
		border-radius: 8px;
		max-height: 16em;
		overflow: scroll;
	}
	.popup button {
		display: block;
		width: 100%;
		padding: 4px 0px;
	}
</style>
