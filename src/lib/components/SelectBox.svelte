<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements'

  type props = {
    options: { name: string; value: any }[]
    class?: string
    containerClass?: string
    label?: string
  } & HTMLSelectAttributes

  let {
    options = [],
    class: clazz,
    containerClass,
    id,
    value = $bindable(),
    label,
    ...other
  }: props = $props()
</script>

<div>
  <label for={id} class="font-semibold text-blue-600">{label}</label>
  <div class="flex items-center {containerClass} my-2">
    <select class="{clazz} appearance-none" {id} name={id} {...other} bind:value>
      {#each options as option (option.name)}
        <option value={option.value}>
          {option.name}
        </option>
      {/each}
    </select>
  </div>
</div>
