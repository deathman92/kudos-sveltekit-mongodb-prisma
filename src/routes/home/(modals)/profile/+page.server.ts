import { logout, requireUser } from '$lib/server/auth.js'
import { deleteUser, updateUser } from '$lib/server/user.js'
import { validateName } from '$lib/server/validators.js'
import type { Department } from '@prisma/client'
import { fail, redirect } from '@sveltejs/kit'

export function load(event) {
  return {
    user: requireUser(event),
  }
}

export const actions = {
  async save(event) {
    const user = requireUser(event)

    const form = await event.request.formData()

    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const department = form.get('department')

    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof department !== 'string'
    ) {
      return fail(400, { error: 'Invalid Form Data' })
    }

    const errors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      department: validateName(department),
    }

    if (Object.values(errors).some(Boolean)) {
      return fail(400, { errors, fields: { firstName, lastName, department } })
    }

    await updateUser(user.id, { firstName, lastName, department: department as Department })

    return redirect(302, '/home')
  },
  async delete(event) {
    const user = requireUser(event)
    await deleteUser(user.id)
    return logout(event)
  },
}
