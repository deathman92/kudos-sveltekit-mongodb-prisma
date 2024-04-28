<script lang="ts">
  let { children } = $props()
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="max-h-screen w-2/3 bg-gray-200 p-10 md:rounded-xl">
    {@render children()}
  </div>
</div>
