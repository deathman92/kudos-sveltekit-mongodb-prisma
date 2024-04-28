<script lang="ts">
  import { dev } from '$app/environment'
  import { Image, type ImageProps } from '@unpic/svelte'

  let { ...props }: Omit<ImageProps, 'cdn'> = $props()

  const cdn: ImageProps['cdn'] = dev ? undefined : 'vercel'
</script>

<Image {cdn} {...props} />
