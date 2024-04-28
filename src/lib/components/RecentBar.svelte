<script lang="ts">
  import type { Kudo, KudoStyle, User } from '@prisma/client'
  import UserCircle from './UserCircle.svelte'
  import { emojiMap } from '$lib/constants'

  interface KudoWithRecipient {
    id: string
    style: Pick<KudoStyle, 'emoji'> | null
    recipient: Pick<User, 'id' | 'profile'>
  }

  let { kudos }: { kudos: KudoWithRecipient[] } = $props()
</script>

<div class="flex w-1/5 flex-col items-center border-l-4 border-l-yellow-300">
  <h2 class="my-6 text-xl font-semibold text-yellow-300">Recent Kudos</h2>
  <div class="mt-10 flex h-full flex-col gap-y-10">
    {#each kudos as kudo (kudo.id)}
      <div class="relative h-24 w-24">
        <UserCircle profile={kudo.recipient.profile} class="h-20 w-20" width={80} height={80} />
        <div
          class="absolute bottom-2 right-4 flex h-8 w-8 items-center justify-center rounded-full text-3xl"
        >
          {emojiMap[kudo.style?.emoji || 'THUMBSUP']}
        </div>
      </div>
    {/each}
  </div>
</div>
