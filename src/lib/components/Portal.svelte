<script lang="ts">
  import type { Snippet } from 'svelte'

  const { wrapperId, children }: { wrapperId: string; children: Snippet } = $props()

  let wrapper: HTMLElement | null = null
  let ref: HTMLElement

  $effect(() => {
    let element = document.getElementById(wrapperId)
    let created = false

    if (!element) {
      created = true
      element = document.createElement('div')
      element.setAttribute('id', wrapperId)
      document.body.appendChild(element)
    }
    wrapper = element

    wrapper.appendChild(ref)

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  })
</script>

<div style="display: none">
  <div bind:this={ref}>
    {@render children()}
  </div>
</div>
