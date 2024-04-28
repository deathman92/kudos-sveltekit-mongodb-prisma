<script lang="ts">
  import { page } from '$app/stores'
  import { sortOptions } from '$lib/constants'
  import SelectBox from './SelectBox.svelte'
</script>

<form
  method="get"
  class="flex h-20 w-full items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 px-6"
>
  <div class="flex w-2/5 items-center">
    <input
      type="text"
      name="filter"
      class="w-full rounded-xl px-3 py-2"
      placeholder="Search a message or name"
    />
    <svg
      class="-ml-8 h-4 w-4 fill-current text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><path d="M0 0h24v24H0V0z" fill="none" /><path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      /></svg
    >
  </div>
  <SelectBox
    class="w-full rounded-xl px-3 py-2 text-gray-400"
    containerClass="w-40"
    name="sort"
    options={sortOptions}
  />
  <button
    type="submit"
    class="rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
  >
    Search
  </button>
  {#if $page.url.searchParams.has('filter')}
    <a
      href="/home"
      class="rounded-xl bg-red-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
    >
      Clear Filters
    </a>
  {/if}
  <div class="flex-1"></div>
</form>
