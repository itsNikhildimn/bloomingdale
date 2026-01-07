<script>
import SvgIcon from '$lib/SvgIcon.svelte';

export let href, rel = undefined, colour;
</script>

<a class="link-button btn btn-{colour}" {rel} {href}>
  <span><slot /></span>
  <SvgIcon shape='circle-arrow-right' />
</a>

<style>
.link-button { color: white }
</style>