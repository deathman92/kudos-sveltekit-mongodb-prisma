import { login, register } from '$lib/server/auth.js'
import { validateEmail, validateName, validatePassword } from '$lib/server/validators.js'
import { fail, redirect } from '@sveltejs/kit'

export function load({ locals }) {
  if (locals.session) {
    redirect(302, '/')
  }
}

export const actions = {
  async login(event) {
    const form = await event.request.formData()
    const email = form.get('email')
    const password = form.get('password')

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { error: 'Invalid Form Data' })
    }

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      firstName: undefined,
      lastName: undefined,
    }

    if (Object.values(errors).some(Boolean)) {
      return fail(400, {
        errors,
        fields: { email, password: '', firstName: undefined, lastName: undefined },
      })
    }

    return await login(event, { email, password })
  },
  async register(event) {
    const form = await event.request.formData()
    const email = form.get('email')
    const password = form.get('password')
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string'
    ) {
      return fail(400, { error: 'Invalid Form Data' })
    }

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      firstName: validateName(firstName),
      lastName: validateName(lastName),
    }

    if (Object.values(errors).some(Boolean)) {
      return fail(400, { errors, fields: { email, password: '', firstName, lastName } })
    }

    return await register(event, { email, password, firstName, lastName })
  },
}
