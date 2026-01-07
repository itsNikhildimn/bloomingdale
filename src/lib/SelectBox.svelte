<script>
	//---------------------------------------------------------------------------
	// Module:  $lib/SelectBox.svelte
	//
	// This component provides a set of custom styling for a drop-down selection
	// box. Options are supplied as an artray of key-text pairs, where the key
	// is used as the 'value' of the SelectBox and the text is used for display.
	//---------------------------------------------------------------------------

	// Components used:
	import SvgIcon from '$lib/SvgIcon.svelte';

	// Properties:
	export let name = undefined,
		placeholder = '',
		options = [],
		value = '',
		required = false,
		disabled = false;

	// Instance data:
	let popup,
		expanded = false,
		focus = false,
		activeItem;
	let optionText = value,
		error = '';

	$: filtered = options.slice();

	$: if (!options.some((opt) => opt[0] === value)) optionText = value = '';

	// Event handlers:

	function keyPressed(ev) {
		// Provide keyboard control over the selection. Note that we don't (yet)
		// include typing into the 'value' field to filter options.
		switch (ev.key) {
			case 'ArrowDown':
				// Opens the popup (with Alt/Option key) or moves the focus
				// indicator down one row.
				if (ev.altKey) {
					expanded = true;
					activeItem = 0;
				} else if (expanded) {
					if (activeItem < options.length - 1) activeItem += 1;
					else activeItem = options.length - 1;
				}
				break;

			case 'ArrowUp':
				// Closes the popup (with Alt/Option key) or moves the focus
				// indicator up one row.
				if (ev.altKey) {
					expanded = false;
					activeItem = undefined;
				} else if (expanded) {
					if (activeItem > 0) activeItem -= 1;
					else activeItem = 0;
				}
				break;

			case 'Enter':
				if (ev.altKey) {
					expanded = true;
					activeItem = 0;
				}
				// Chooses the row with the focus indicator.
				else if (expanded && activeItem >= 0) {
					value = options[activeItem][0];
					optionText = options[activeItem][1];
					expanded = false;
					activeItem = undefined;
				} else return;
				break;

			default:
				// Ignores the event and lets it continue bubbling.
				return;
		}

		ev.preventDefault();
		ev.stopPropagation();
	}

	function togglePopup() {
		// Responds to a click/tap on the drop-down button, to open
		// the popup. Because this is only possible through a pointer
		// event [the button has tabindex -1], we hide the focus
		// indicator.
		expanded = !expanded;
		activeItem = undefined;
	}

	function selectOption(ev) {
		// Responds to a click/tap anywhere on the popup. If within
		// an option field, we select that option and close the popup.
		const optval = ev.target.closest('.option').dataset?.value;
		if (optval) {
			value = optval;
			optionText = options.find((o) => o[0] === optval)[1];
			expanded = false;
			activeItem = undefined;
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	function validate(field) {
		// Handles validation for the input area of the select box. The value
		// typed needs to match the long text of one of the filtered options.
		return {
			update: (val) => {
				const optval = val.toLocaleLowerCase();
				const matched = options.filter((o) => o[1].toLocaleLowerCase().startsWith(optval));
				const exact = matched.length === 1 ? matched[0] : undefined;
				if (exact) {
					value = exact[0];
					optionText = exact[1];
					expanded = false;
					filtered = options.slice();
					field.setCustomValidity('');
				} else {
					value = '';
					expanded = val.length > 0;
					filtered = matched.length > 0 ? matched : options.slice();
					field.setCustomValidity('Select a valid option');
				}
				error = '';
			}
		};
	}

	function showError(ev) {
		error = ev.currentTarget.validationMessage;
	}

	//---------------------------------------------------------------------------
	// Template
	//
	// The outer 'box' of the component is a standard 'label' element that wraps
	// the other components. This includes a dynamic error field, that appears
	// only when there's something to say about field validity.
	//---------------------------------------------------------------------------
</script>

<label class="select-box">
	<span class="label" class:shown={!!value}>{placeholder}</span>
	<span
		class="select-control"
		class:disabled
		class:focus
		class:invalid={Boolean(error)}
		role="combobox"
		aria-expanded={expanded}
		aria-controls={popup}
	>
		<input
			type="text"
			{required}
			{placeholder}
			bind:value={optionText}
			use:validate={optionText}
			on:keydown={keyPressed}
			on:focus={() => {
				focus = true;
			}}
			on:blur={() => {
				focus = false;
				expanded = false;
				showError();
			}}
			on:invalid={showError}
		/>
		<input type="hidden" {name} {value} />
		<button type="button" tabindex="-1" on:click={togglePopup}>
			<SvgIcon shape="arrow-down" /></button
		>
		<div
			class="popup"
			class:shown={expanded}
			tabindex="-1"
			on:click={selectOption}
			on:keydown={keyPressed}
		>
			{#each filtered as opt, n}
				<div class="option" data-value={opt[0]} class:active={activeItem === n}>
					<span>{opt[1]}</span>
					<span class="tick">{value === opt[0] ? '✓' : ''}</span>
				</div>
			{/each}
		</div>
	</span>
	<span class="error">{error}</span>
</label>

<style>
	/*---------------------------------------------------------------------------
 * Styles
 *-------------------------------------------------------------------------*/

	.select-box {
		display: flex;
		flex-flow: column nowrap;
		position: relative;
		--gray-100: rgba(245, 245, 245, 1); /* Gray 100 */
		--gray-200: rgba(208, 213, 221, 1); /* Gray 200 */
		--gray-300: rgba(168, 173, 181, 1); /* Gray 300 */
		--gray-400: rgba(249, 251, 250, 1); /* Gray 400 */
		--secondary-red: rgba(253, 162, 155, 1); /* Secondary red */
	}

	.select-control {
		display: inline-flex;
		flex-flow: row nowrap;
		justify-content: stretch;
		position: relative;
		width: 100%;
		border: 1px solid var(--gray-200);
		border-radius: 8px;
		font-size: 16px;
		padding: 13px 13px 13px 16px;
	}

	.select-control > input {
		flex: 1 0 auto;
		appearance: none;
		border: none;
		background: inherit;
		font-family: inherit;
		font-size: 16px;
		outline: none;
	}

	.select-control > button {
		flex: 0 0 auto;
		padding-left: 16px;
	}

	.select-control.focus {
		outline: 1px solid rgba(168, 173, 181, 1); /* Gray 300 */
	}
	.select-control.invalid {
		border: 1px solid var(--secondary-red);
	}
	.select-control.disabled {
		background-color: rgba(245, 245, 245, 1); /* Gray 100 */
		color: rgba(208, 213, 221, 1); /* Gray 200 */
	}

	.popup {
		position: absolute;
		top: calc(100% + 4px);
		left: 0px;
		width: 100%;
		background-color: white;
		border: 1px solid var(--gray-200);
		border-radius: 8px;
		z-index: 100;
		display: none;
	}
	.popup.shown {
		display: block;
	}

	.option {
		padding: 8px 15px;
		display: grid;
		grid-template-areas: 'option';
	}
	.option:hover,
	.option.active {
		background-color: var(--gray-100);
	}
	.option > * {
		grid-area: option;
	}
	.option .tick {
		text-align: right;
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
</style>
