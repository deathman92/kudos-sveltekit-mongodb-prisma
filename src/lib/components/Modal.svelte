<script lang="ts">
  import type { Snippet } from 'svelte'
  import Portal from './Portal.svelte'
  import { goto } from '$app/navigation'

  let {
    open,
    ariaLabel,
    class: clazz,
    children,
  }: { open: boolean; ariaLabel?: string; class?: string; children: Snippet } = $props()
</script>

{#if open}
  <Portal wrapperId="modal">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      class="fixed inset-0 overflow-auto bg-gray-600 bg-opacity-80"
      aria-labelledby={ariaLabel ?? 'modal-title'}
      role="dialog"
      aria-modal="true"
      onclick={() => goto('/home')}
    ></div>
    <div
      class="pointer-events-none fixed inset-0 flex max-h-screen items-center justify-center overflow-scroll"
    >
      <div class="{clazz} pointer-events-auto max-h-screen bg-gray-200 p-4 md:rounded-xl">
        {@render children()}
      </div>
    </div>
  </Portal>
{/if}
