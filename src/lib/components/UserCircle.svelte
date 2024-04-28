<script lang="ts">
  import type { Profile } from '@prisma/client'

  let {
    profile,
    class: clazz,
    onclick,
  }: { profile: Profile; class?: string; onclick?: (...args: any) => any } = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="{clazz} flex cursor-pointer items-center justify-center rounded-full bg-gray-400"
  {onclick}
>
  <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
</div>
