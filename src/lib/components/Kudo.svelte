<script lang="ts">
  import { backgroundColorMap, colorMap, emojiMap } from '$lib/constants'
  import type { Kudo, Profile } from '@prisma/client'
  import UserCircle from './UserCircle.svelte'

  let { profile, kudo }: { profile: Profile; kudo: Partial<Kudo> } = $props()
</script>

<div
  class="flex {backgroundColorMap[
    kudo.style?.backgroundColor || 'RED'
  ]} relative w-full gap-x-2 rounded-xl p-4"
>
  <div>
    <UserCircle {profile} width={64} height={64} class="h-16 w-16" />
  </div>
  <div class="flex flex-col">
    <p
      class="{colorMap[
        kudo.style?.textColor || 'WHITE'
      ]} whitespace-pre-wrap break-all text-lg font-bold"
    >
      {profile.firstName}&nbsp;{profile.lastName}
    </p>
    <p class="{colorMap[kudo.style?.textColor || 'WHITE']} whitespace-pre-wrap break-all">
      {kudo.message}
    </p>
    <div
      class="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl"
    >
      {emojiMap[kudo.style?.emoji || 'THUMBSUP']}
    </div>
  </div>
</div>
