import { requireUser } from '$lib/server/auth.js'

export function load(event) {
  requireUser(event)
}
