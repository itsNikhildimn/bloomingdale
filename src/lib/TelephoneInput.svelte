<script>
	import countryCodes from './data/CountryCodes.json';
	import '/node_modules/flag-icons/css/flag-icons.min.css';

	export let name = '',
		id = '',
		placeholder = '',
		disabled = false,
		required = false,
		autocomplete = 'tel';

	let country = 'in',
		fullName = 'India',
		ccode = '+91',
		tel = '',
		filterText = '';
	let error = '';

	let countries = Object.entries(countryCodes).map(([code, [name, prefix]]) => ({
		code,
		name,
		prefix
	}));

	let filtered = countries.slice();

	$: (() => {
		const needle = filterText.trim().toLocaleLowerCase();
		filtered = countries.filter((c) => c.name.toLocaleLowerCase().includes(needle));
	})();

	let popupShown = false,
		focus = false,
		field;

	const pattern = /^[0-9 \-]+$/;

	function validate(field) {
		field.setCustomValidity('Provide at least 8 digits');
		return {
			update: (value) => validateField(field, value)
		};
	}

	function validateField(field, value) {
		const digits = value.match(/[0-9\-]/g)?.length || 0;
		if (!value.match(pattern)) {
			field.setCustomValidity("Use only digit, '-' or space");
		} else if (digits < 8) {
			field.setCustomValidity('Provide at least 8 digits');
		} else field.setCustomValidity('');
		error = '';
	}

	function showError(ev) {
		error = field.validationMessage;
	}

	function toggleFlags() {
		popupShown = !popupShown;
	}

	function selectCountry(ev) {
		const cc = ev.target.closest('p').dataset.code;
		const prefix = countryCodes[cc][1];
		country = cc;
		ccode = `+${prefix}`;
		tel = '';
		fullName = countryCodes[cc][0];
		field.focus();
	}
</script>

<label class="telephone-input">
	<span class="label" class:shown={!!tel}>{placeholder}</span>
	<span class="input-wrapper" class:focus class:invalid={Boolean(error)} class:disabled>
		<button type="button" on:click={toggleFlags}>
			<span class="fi fi-{country}" title={fullName} /><span> {ccode}</span></button
		>
		<input
			type="tel"
			{id}
			{placeholder}
			{disabled}
			{required}
			{autocomplete}
			class="telephone-number"
			pattern={'[0-9\\-]{6,}'}
			bind:value={tel}
			use:validate={tel}
			bind:this={field}
			on:focus={() => {
				focus = true;
			}}
			on:blur={() => {
				focus = false;
			}}
			on:invalid={showError}
		/>
		<input type="hidden" {name} value={`${ccode}-${tel}`} />
	</span>
	<div class="popup" class:shown={popupShown}>
		<p class="search">
			<input type="text" placeholder="Search for countries" bind:value={filterText} />
		</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="country-list" on:click={selectCountry}>
			{#each filtered as cc}
				<p data-code={cc.code}><span class="fi fi-{cc.code}" /> {cc.name} (+{cc.prefix})</p>
			{/each}
		</div>
	</div>
	<span class="error">{error}</span>
</label>

<style>
	.telephone-input {
		display: flex;
		flex-flow: column nowrap;
		position: relative;
		width: 100%;
		--gray-100: rgba(245, 245, 245, 1); /* Gray 100 */
		--gray-200: rgba(208, 213, 221, 1); /* Gray 200 */
		--gray-300: rgba(168, 173, 181, 1); /* Gray 300 */
		--secondary-red: rgba(253, 162, 155, 1); /* Secondary red */
	}

	.input-wrapper {
		border: 1px solid var(--gray-200);
		border-radius: 8px;
		display: flex;
		flex-flow: row nowrap;
	}
	.input-wrapper button {
		padding: 0px 8px;
		border-right: 1px solid var(--gray-200);
		font-family: sans-serif;
		display: inline-flex;
		align-items: center;
		gap: 12px;
	}
	.input-wrapper.focus {
		border: 1px solid var(--gray-300);
	}
	.input-wrapper.focus button {
		border-right-color: var(--gray-300);
	}
	.input-wrapper.invalid {
		border: 1px solid var(--secondary-red);
	}
	.input-wrapper.disabled {
		background-color: var(--gray-100);
		color: var(--gray-200);
	}

	.telephone-number {
		appearance: none;
		background: inherit;
		padding: 13px 16px;
		font-family: inherit;
		font-size: 16px;
		border: none;
		width: 100%;
	}
	.telephone-number:focus {
		outline: none;
	}
	.label {
		font-size: 12px;
		line-height: 100%;
		color: rgba(168, 173, 181, 1); /* Gray 300 */
		position: absolute;
		top: -6px;
		left: 12px;
		background-color: white;
		z-index: 1;
		padding: 0px 2px;
		display: none;
	}
	.label.shown {
		display: block;
	}
	.error {
		font-size: 14px;
		line-height: 100%;
		color: var(--secondary-red);
		margin-top: 8px;
	}
	.popup {
		position: absolute;
		top: calc(100% + 4px);
		width: 100%;
		display: none;
		background-color: white;
		border: 1px solid var(--gray-200);
		z-index: 100;
	}
	.popup.shown {
		display: block;
	}

	.search {
		border-bottom: 1px solid var(--gray-200);
		position: relative;
	}
	.search input {
		appearance: none;
		background: inherit;
		padding: 13px 16px 13px 32px;
		font-family: inherit;
		font-size: 16px;
		border: none;
		width: 100%;
	}
	.search::after {
		content: url('$lib/icons/magnifier-small.svg');
		position: absolute;
		left: 8px;
		top: 13px;
		opacity: 0.3;
	}

	.country-list {
		max-height: calc(5 * 24px);
		overflow-y: scroll;
	}
	.country-list p {
		padding: 8px 4px;
	}
</style>
