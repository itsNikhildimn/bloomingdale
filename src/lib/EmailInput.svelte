<script>

export let label = '',
  name = '',
  id = '',
  placeholder = '',
  disabled = false,
  pattern = undefined,
  required = false,
  autocomplete = 'email';
  
let email = '', error = '';

function validate(field) {
  return {
    update: (value) => {
      error = ''
    }
  }
}

function showError(ev) {
  error = ev.currentTarget.validationMessage;
}
</script>

<label class="email-input" class:invalid={error}>
  <span>{label}</span>
  <input type='email' {name} {id} {placeholder} {disabled} {pattern} {required} {autocomplete}
    bind:value={email} use:validate={email} on:invalid={showError} on:blur={showError} />
  <span class="error">{error}</span>
</label>

<style>
.email-input {
  display: flex;
  flex-flow: column nowrap;
}
.email-input input {
  appearance: none;
  background: inherit;
  padding: 13px 16px;
  border: 1px solid rgba(208, 213, 221, 1); /* Gray 200 */
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
}
.email-input input:focus {
  outline: 1px solid rgba(168, 173, 181, 1); /* Gray 300 */
}
.email-input.invalid input {
  border: 1px solid rgba(253, 162, 155, 1); /* Secondary red */
}
.email-input input:disabled {
  background-color: rgba(245, 245, 245, 1); /* Gray 100 */
  color: rgba(208, 213, 221, 1); /* Gray 200 */
}
.error {
  font-size: 14px;
  line-height: 100%;
  color: rgba(253, 162, 155, 1); /* Secondary red */
  margin-top: 8px;
}

</style>