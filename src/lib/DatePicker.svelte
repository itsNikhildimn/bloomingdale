<script>
	import { DateInput } from 'date-picker-svelte';

	export let name = '',
		id = '',
		placeholder = '',
		disabled = false,
		required = false;

	let today = new Date();
	let earliest = new Date(today.getFullYear() - 20, 0, 1);
	let dateVal = null;
	let valid = false;
</script>

<label class="date-picker" class:invalid={!valid}>
	<span class="label" class:shown={dateVal !== null}>{placeholder}</span>
	<input type="hidden" {name} value={dateVal?.toISOString().slice(0, 10) || ''} />
	<DateInput
		{name}
		{id}
		{placeholder}
		{disabled}
		{required}
		format="yyyy-MM-dd"
		min={earliest}
		bind:value={dateVal}
		bind:valid
	/>
	<span class="error">{valid ? '' : 'Choose a valid date'}</span>
</label>

<style>
	.date-picker {
		display: flex;
		flex-flow: column nowrap;
		position: relative;
	}
	.date-picker :global(input) {
		appearance: none;
		background: inherit;
		padding: 13px 16px;
		border: 1px solid rgba(208, 213, 221, 1); /* Gray 200 */
		border-radius: 8px;
		font-family: inherit;
		font-size: 16px;
		width: 100%;
	}
	.date-picker :global(input:focus) {
		outline: 1px solid rgba(168, 173, 181, 1); /* Gray 300 */
	}
	.date-picker.invalid :global(input) {
		border: 1px solid #fda29b; /* Secondary red */
	}
	.date-picker :global(input:disabled) {
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
