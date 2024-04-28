<script lang="ts">
  import '../app.css'

  let { children } = $props()
</script>

<div class="h-screen w-full bg-blue-600 font-mono">
  {@render children()}
</div>
