<script>
	export let name = '',
		id = '',
		placeholder = '',
		disabled = false,
		pattern = undefined,
		required = false,
		autocomplete = undefined;

	let text = '',
		error = '';

	function validate(field) {
		return {
			update: (value) => {
				error = '';
			}
		};
	}

	function showError(ev) {
		error = ev.currentTarget.validationMessage;
	}
</script>

<label class="text-input" class:invalid={error}>
	<span class="label" class:shown={!!text}>{placeholder}</span>
	<input
		type="text"
		{name}
		{id}
		{placeholder}
		{disabled}
		{pattern}
		{required}
		{autocomplete}
		bind:value={text}
		use:validate={text}
		on:invalid={showError}
		on:blur={showError}
	/>
	<span class="error">{error}</span>
</label>

<style>
	.text-input {
		display: flex;
		flex-flow: column nowrap;
		position: relative;
	}
	.text-input input {
		appearance: none;
		background: inherit;
		padding: 13px 16px;
		border: 1px solid rgba(208, 213, 221, 1); /* Gray 200 */
		border-radius: 8px;
		font-family: inherit;
		font-size: 16px;
	}
	.text-input input:focus {
		outline: 1px solid rgba(168, 173, 181, 1); /* Gray 300 */
	}
	.text-input.invalid input {
		border: 1px solid rgba(253, 162, 155, 1); /* Secondary red */
	}
	.text-input input:disabled {
		background-color: rgba(245, 245, 245, 1); /* Gray 100 */
		color: rgba(208, 213, 221, 1); /* Gray 200 */
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
		color: rgba(253, 162, 155, 1); /* Secondary red */
		margin-top: 8px;
	}
</style>
