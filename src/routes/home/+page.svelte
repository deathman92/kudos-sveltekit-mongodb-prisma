<script lang="ts">
  import type { PageData as KudoPageData } from './kudo/[userId]/$types'
  import UserPanel from '$lib/components/UserPanel.svelte'
  import SearchBar from '$lib/components/SearchBar.svelte'
  import RecentBar from '$lib/components/RecentBar.svelte'
  import Kudo from '$lib/components/Kudo.svelte'
  import KudoPage from './kudo/[userId]/+page.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { afterNavigate, goto, preloadData, pushState } from '$app/navigation'

  let { data } = $props()
  let newKudoData: KudoPageData | null = $state(null)

  async function newKudo(userId: string) {
    const url = `/home/kudo/${userId}`
    const result = await preloadData(url)
    if (result.type === 'loaded') {
      newKudoData = result.data as KudoPageData
      pushState(url, {})
    } else {
      goto(url)
    }
  }

  afterNavigate(() => {
    newKudoData = null
  })
</script>

{#if newKudoData}
  <Modal open>
    <KudoPage data={newKudoData} form={null} />
  </Modal>
{/if}

<div class="flex h-full">
  {#await data.users}
    <UserPanel users={[]} onSelectUser={newKudo} />
  {:then users}
    <UserPanel {users} onSelectUser={newKudo} />
  {/await}

  <div class="flex flex-1 flex-col">
    <SearchBar />
    <div class="flex flex-1">
      <div class="flex w-full flex-col gap-y-4 p-10">
        {#await data.kudos}
          Loading kudos...
        {:then kudos}
          {#each kudos as kudo (kudo.id)}
            <Kudo {kudo} profile={kudo.author.profile} />
          {/each}
        {/await}
      </div>
      {#await data.recentKudos}
        <RecentBar kudos={[]} />
      {:then recentKudos}
        <RecentBar kudos={recentKudos} />
      {/await}
    </div>
  </div>
</div>
