<script lang="ts">
  import Image from './Image.svelte'

  let { imageUrl, onchange }: { imageUrl?: string; onchange: (file: File) => void } = $props()

  let draggingOver = $state(false)
  let fileInput: HTMLInputElement

  function preventDefaults(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: DragEvent) {
    preventDefaults(e)
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      onchange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  function handleChange(e: Event & { currentTarget: HTMLInputElement }) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      onchange(e.currentTarget.files[0])
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="{draggingOver
    ? 'border-rounded border-4 border-dashed border-yellow-300'
    : ''} group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-400 transition duration-300 ease-in-out hover:bg-gray-500"
  ondragenter={() => (draggingOver = true)}
  ondragleave={() => (draggingOver = false)}
  ondrag={preventDefaults}
  ondragstart={preventDefaults}
  ondragend={preventDefaults}
  ondragover={preventDefaults}
  ondrop={handleDrop}
  onclick={() => fileInput.click()}
>
  {#if imageUrl}
    <div
      class="absolute m-auto h-full w-full rounded-full bg-blue-400 opacity-50 transition duration-300 ease-in-out group-hover:opacity-0"
    >
      <Image src={imageUrl} width={96} height={96} layout="constrained" />
    </div>
  {:else}
    <p
      class="pointer-events-none z-10 cursor-pointer select-none text-4xl font-extrabold text-gray-200 transition duration-300 ease-in-out group-hover:opacity-0"
    >
      +
    </p>
  {/if}
  <input type="file" bind:this={fileInput} onchange={handleChange} class="hidden" />
</div>
