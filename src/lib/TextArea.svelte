<script>
  export let label = '',
    name = '',
    id = '',
    placeholder = '',
    disabled = false,
    pattern = undefined,
    required = false;
  
  let text = '', error = '';
  
  function validate(field) {
    error = field.validationMessage;
    return {
      update: (value) => {
        error = field.validationMessage
      }
    }
  }
  </script>
  
  <label class="text-area">
    <span>{label}</span>
    <textarea {name} {id} {placeholder} {disabled} {pattern} {required}
      autocomplete="none" bind:value={text} use:validate={text} />
    <span class="error">{error}</span>
  </label>
  
  <style>
  .text-area {
    display: flex;
    flex-flow: column nowrap;
  }
  .text-area textarea {
    background: inherit;
    padding: 13px 16px;
    border: 1px solid rgba(208, 213, 221, 1); /* Gray 200 */
    border-radius: 8px;
    font-family: inherit;
    font-size: 16px;
  }
  .text-area textarea:focus {
    outline: 1px solid rgba(168, 173, 181, 1); /* Gray 300 */
  }
  .text-area textarea:invalid {
    border: 1px solid rgba(253, 162, 155, 1); /* Secondary red */
  }
  .text-area textarea:disabled {
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