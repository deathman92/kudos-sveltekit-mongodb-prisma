import { requireUser } from '$lib/server/auth.js'
import { redirect } from '@sveltejs/kit'

export function load(event) {
  requireUser(event)
  redirect(302, '/home')
}
