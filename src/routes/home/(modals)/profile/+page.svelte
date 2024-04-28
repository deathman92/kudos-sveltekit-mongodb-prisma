<script lang="ts">
  import { enhance } from '$app/forms'
  import FormField from '$lib/components/FormField.svelte'
  import ImageUploader from '$lib/components/ImageUploader.svelte'
  import SelectBox from '$lib/components/SelectBox.svelte'
  import { departments } from '$lib/constants.js'

  let { data, form } = $props()

  let formError = $state(form?.error)
  let formData = $state({
    firstName: form?.fields?.lastName || data.user.profile.firstName,
    lastName: form?.fields?.lastName || data.user.profile.lastName,
    department: form?.fields?.department || data.user.profile.department || 'MARKETING',
    profilePicture: data.user.profile.profilePicture || '',
  })

  $effect(() => {
    formError = form?.error
    formData = {
      firstName: form?.fields?.lastName || data.user.profile.firstName,
      lastName: form?.fields?.lastName || data.user.profile.lastName,
      department: form?.fields?.department || data.user.profile.department || 'MARKETING',
      profilePicture: data.user.profile.profilePicture || '',
    }
  })

  async function handleFileUpload(file: File) {
    const fileFormData = new FormData()
    fileFormData.append('profile-pic', file)

    const response = await fetch('/avatar', {
      method: 'post',
      body: fileFormData,
    })
    const { imageUrl } = await response.json()
    formData.profilePicture = imageUrl
  }
</script>

<div class="p-3">
  <h2 class="mb-4 text-center text-4xl font-semibold text-blue-600">Your Profile</h2>
  <div class="mb-2 w-full text-center text-xs font-semibold tracking-wide text-red-500">
    {formError}
  </div>
  <div class="flex">
    <div class="w-1/3">
      <ImageUploader onchange={handleFileUpload} imageUrl={formData.profilePicture || ''} />
    </div>
    <div class="flex-1">
      <form
        method="post"
        use:enhance={({ cancel }) => {
          if (!confirm('Are you sure?')) cancel()
        }}
      >
        <FormField
          for="firstName"
          label="First Name"
          bind:value={formData.firstName}
          error={form?.errors?.firstName}
        />
        <FormField
          for="lastName"
          label="Last Name"
          bind:value={formData.lastName}
          error={form?.errors?.lastName}
        />
        <SelectBox
          class="w-full rounded-xl px-3 py-2 text-gray-400"
          id="department"
          label="Department"
          bind:value={formData.department}
          options={departments}
        />
        <button
          formaction="/home/profile?/delete"
          class="mt-4 w-full rounded-xl bg-red-300 px-16 py-2 font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-red-400"
        >
          Delete
        </button>
        <div class="mt-4 w-full text-right">
          <button
            formaction="/home/profile?/save"
            class="rounded-xl bg-yellow-300 px-16 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
