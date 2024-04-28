<script lang="ts">
  import type { Profile } from '@prisma/client'
  import Image from './Image.svelte'

  let {
    profile,
    class: clazz,
    width,
    height,
    onclick,
  }: {
    profile: Profile
    class?: string
    width: number
    height: number
    onclick?: (...args: any) => any
  } = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="{clazz} relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-400"
  {onclick}
>
  {#if profile.profilePicture}
    <Image
      src={profile.profilePicture}
      {width}
      {height}
      layout="constrained"
      class="absolute m-auto"
    />
  {:else}
    <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
  {/if}
</div>
