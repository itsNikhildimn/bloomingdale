<script>
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';

	export let select, string, timeSpanArray;

	let selected = string;
</script>

<Listbox value={selected} on:change={(e) => (selected = e.detail)} class="dropdown">
	<ListboxButton class={'btn btn-dropdown button'}>
		<span>{selected}</span>
		<div class="svg-container">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.2788 7.96484L8.93208 12.3115C8.41875 12.8248 7.57875 12.8248 7.06542 12.3115L2.71875 7.96484"
					stroke="white"
					stroke-width="2"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</ListboxButton>

	<ListboxOptions class={'dropdown-list'}>
		{#each timeSpanArray as option, id}
			<ListboxOption
				static
				on:click={select.bind(null, option)}
				on:keydown
				name={id}
				value={option.label ? option.label : option}
				class={'option lg-body-text'}
			>
				{option.label ? option.label : option}
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>

<style>
	:global(.dropdown-list) {
		position: absolute;
		border-radius: var(--b-r-container);
		text-align: center;
		margin-top: 6px;
		padding: 0;
		list-style: none;
		background-color: #fff;
		z-index: 1;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		width: 100%;
		height: 14em;
	}
	:global(.dropdown) {
		position: relative;
		display: inline-block;
	}

	:global(.dropdown:not(:nth-child(3))) {
		margin-right: 0.5rem;
	}

	:global(.dropdown-list) {
		position: absolute;
		border-radius: var(--b-r-container);
		text-align: center;
		margin-top: 6px;
		padding: 0;
		list-style: none;
		background-color: #fff;
		z-index: 1;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		width: 100%;
		height: 14em;
		/* visibility: hidden; */
	}

	:global(.option) {
		font-weight: 400;
		color: var(--secondary-black);
		padding: 10px 10px;
		cursor: pointer;
		margin-bottom: 0;
	}

	:global(.option:hover) {
		background-color: #f4f4f4;
	}

	@media (max-width: 478px) {
		:global(.dropdown) {
			width: 100%;
			margin-bottom: 1.2em;
		}

		:global(.button) {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}

	@media (min-width: 789px) {
		:global(.dropdown:not(:last-child)) {
			margin-right: 0.5rem;
		}
	}

	@media (min-width: 965px) {
		:global(.dropdown-list) {
			height: 15em;
		}
	}
</style>
