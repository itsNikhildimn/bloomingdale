<script>
  import { PUBLIC_MEDIA_PREFIX } from '$env/static/public';
  export let href = ''
  export let title = undefined
  export let text = ''
</script>

<img src={PUBLIC_MEDIA_PREFIX + href} {title} alt={text} loading="lazy">