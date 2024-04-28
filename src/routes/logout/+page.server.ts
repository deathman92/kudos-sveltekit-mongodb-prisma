import { logout } from '$lib/server/auth.js'
import { redirect } from '@sveltejs/kit'

export function load() {
  redirect(302, '/')
}

export const actions = {
  default(event) {
    return logout(event)
  },
}
