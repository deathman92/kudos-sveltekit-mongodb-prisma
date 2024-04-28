<script lang="ts">
  import { enhance } from '$app/forms'
  import FormField from '$lib/components/FormField.svelte'

  let { form } = $props()

  let action: 'login' | 'register' = $state('login')
  let errors = $state(form?.errors)
  let formError = $state(form?.error)
  let formData = $state(form?.fields)

  $effect(() => {
    errors = form?.errors
    formError = form?.error
    formData = form?.fields
  })

  function onActionChange() {
    action = action === 'login' ? 'register' : 'login'
    const newState = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }
    errors = newState
    formData = newState
    formError = ''
  }
</script>

<div class="flex h-full flex-col items-center justify-center gap-y-4">
  <!-- Form Switcher Button -->
  <button
    class="absolute right-8 top-8 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
    onclick={onActionChange}
  >
    {action === 'login' ? 'Sign Up' : 'Sign In'}
  </button>

  <h2 class="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
  <p class="font-semibold text-slate-300">
    {action === 'login' ? 'Log In To Give Some Praise!' : 'Sign Up To Get Started!'}
  </p>

  <form method="post" class="w-96 rounded-2xl bg-gray-200 p-6" use:enhance>
    <div class="w-full text-center text-xs font-semibold tracking-wide text-red-500">
      {formError}
    </div>
    <FormField for="email" label="Email" value={formData?.email} error={errors?.email} />
    <FormField
      for="password"
      label="Password"
      type="password"
      value={formData?.password}
      error={errors?.password}
    />
    {#if action === 'register'}
      <FormField
        for="firstName"
        label="First Name"
        value={formData?.firstName}
        error={errors?.firstName}
      />
      <FormField
        for="lastName"
        label="Last Name"
        value={formData?.lastName}
        error={errors?.lastName}
      />
    {/if}

    <div class="w-full text-center">
      <button
        type="submit"
        formaction="?/{action}"
        class="mt-2 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
      >
        {action === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  </form>
</div>
