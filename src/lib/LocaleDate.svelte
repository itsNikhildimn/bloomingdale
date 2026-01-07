<script>
import { onMount } from 'svelte';

export let date, format;

let locale = "en-US";

// Event handlers:

function localeDate(d) {
  return d.toLocaleDateString(
    locale,
    format === 'long' ? {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    } : {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  );
}

// onMount hook:
//    Here we can reference client-side browser data, to detect the current
// user's preferred locale (for date presentation).

onMount(() => {
  locale = navigator.language;
});
</script>

<span>
  {localeDate(date)}
</span>