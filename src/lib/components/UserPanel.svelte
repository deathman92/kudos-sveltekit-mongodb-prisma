<script lang="ts">
  import type { User } from '@prisma/client'
  import UserCircle from './UserCircle.svelte'

  let { users, onSelectUser }: { users: User[]; onSelectUser: (userId: string) => void } = $props()
</script>

<div class="flex w-1/6 flex-col bg-gray-200">
  <div class="flex h-20 items-center justify-center bg-gray-300 text-center">
    <h2 class="text-xl font-semibold text-blue-600">My Team</h2>
  </div>
  <div class="flex flex-1 flex-col gap-y-10 overflow-y-scroll py-4">
    {#each users as user (user.id)}
      <UserCircle
        profile={user.profile}
        class="mx-auto h-24 w-24 flex-shrink-0"
        onclick={() => onSelectUser(user.id)}
      />
    {/each}
  </div>
  <div class="bg-gray-300 p-6 text-center">
    <form method="post" action="/logout">
      <button
        class="rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
      >
        Sign out
      </button>
    </form>
  </div>
</div>
