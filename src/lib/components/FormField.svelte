<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  type Props = { for: string; label: string; error?: string } & HTMLInputAttributes

  let {
    for: htmlFor,
    label,
    type = 'text',
    value = $bindable(),
    error = '',
    onchange,
    ...other
  }: Props = $props()

  let errorText = $state(error)

  $effect(() => {
    errorText = error
  })

  const onChange: typeof onchange = (e) => {
    errorText = ''
    onchange && onchange(e)
  }
</script>

<label for={htmlFor} class="font-semibold text-blue-600">{label}</label>
<input
  onchange={onChange}
  bind:value
  {type}
  id={htmlFor}
  name={htmlFor}
  class="my-2 w-full rounded-xl p-2"
  {...other}
/>
<div class="w-full text-center text-xs font-semibold tracking-wide text-red-500">
  {errorText || ''}
</div>
