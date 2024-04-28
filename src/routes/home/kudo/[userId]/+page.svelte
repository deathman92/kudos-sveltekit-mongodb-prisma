<script lang="ts">
  import { enhance } from '$app/forms'
  import Kudo from '$lib/components/Kudo.svelte'
  import SelectBox from '$lib/components/SelectBox.svelte'
  import UserCircle from '$lib/components/UserCircle.svelte'
  import { colorMap, emojiMap } from '$lib/constants'
  import type { Color, Emoji } from '@prisma/client'

  let { data, form } = $props()

  let formError = $state(form?.error)
  let formData = $state({
    message: '',
    style: {
      backgroundColor: 'RED' as Color,
      textColor: 'WHITE' as Color,
      emoji: 'THUMBSUP' as Emoji,
    },
  })

  $effect(() => {
    formError = form?.error
  })

  function getOptions(data: Record<string, string>) {
    return Object.keys(data).reduce((acc: { name: string; value: string }[], curr) => {
      acc.push({
        name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
        value: curr,
      })
      return acc
    }, [])
  }

  const colors = getOptions(colorMap)
  const emojis = getOptions(emojiMap)
</script>

<div class="mb-2 w-full text-center text-xs font-semibold tracking-wide text-red-500">
  {formError}
</div>
<form method="post" action="/home/kudo/{data.recipient.id}" use:enhance>
  <input type="hidden" value={data.recipient.id} name="recipientId" />
  <div class="flex flex-col gap-y-2 md:flex-row md:gap-y-0">
    <div class="flex flex-col items-center gap-y-2 pr-8 text-center">
      <UserCircle profile={data.recipient.profile} class="h-24 w-24" />
      <p class="text-blue-300">
        {data.recipient.profile.firstName}
        {data.recipient.profile.lastName}
      </p>
      {#if data.recipient.profile.department}
        <span class="w-auto rounded-xl bg-gray-300 px-2 py-1 text-blue-300">
          {data.recipient.profile.department.charAt(0).toUpperCase() +
            data.recipient.profile.department.slice(1).toLowerCase()}
        </span>
      {/if}
    </div>
    <div class="flex flex-1 flex-col gap-y-4">
      <textarea
        name="message"
        class="h-40 w-full rounded-xl p-4"
        bind:value={formData.message}
        placeholder="Say something nice about {data.recipient.profile.firstName}..."
      ></textarea>
      <div class="flex flex-col items-center gap-x-4 md:flex-row md:justify-start">
        <SelectBox
          options={colors}
          name="backgroundColor"
          bind:value={formData.style.backgroundColor}
          label="Background Color"
          containerClass="w-36"
          class="w-full rounded-xl px-3 py-2 text-gray-400"
        />
        <SelectBox
          options={colors}
          name="textColor"
          bind:value={formData.style.textColor}
          label="Text Color"
          containerClass="w-36"
          class="w-full rounded-xl px-3 py-2 text-gray-400"
        />
        <SelectBox
          options={emojis}
          name="emoji"
          bind:value={formData.style.emoji}
          label="Emoji"
          containerClass="w-36"
          class="w-full rounded-xl px-3 py-2 text-gray-400"
        />
      </div>
    </div>
  </div>
  <br />
  <p class="mb-2 font-semibold text-blue-600">Preview</p>
  <div class="flex flex-col items-center gap-x-24 gap-y-2 md:flex-row md:gap-y-0">
    <Kudo profile={data.user.profile} kudo={formData} />
    <div class="flex-1"></div>
    <button
      type="submit"
      class="h-12 w-80 rounded-xl bg-yellow-300 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
    >
      Send
    </button>
  </div>
</form>
