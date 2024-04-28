import { requireUser } from '$lib/server/auth.js'
import { createKudo } from '$lib/server/kudo.js'
import { getUserById } from '$lib/server/user.js'
import type { Color, Emoji } from '@prisma/client'
import { error, fail, redirect } from '@sveltejs/kit'

export async function load(event) {
  const user = requireUser(event)
  const { userId } = event.params

  const recipient = await getUserById(userId)

  if (!recipient) {
    return error(404)
  }

  return { recipient, user }
}

export const actions = {
  async default(event) {
    const user = requireUser(event)

    const form = await event.request.formData()

    const message = form.get('message')
    const backgroundColor = form.get('backgroundColor')
    const textColor = form.get('textColor')
    const emoji = form.get('emoji')
    const recipientId = form.get('recipientId')

    if (
      typeof message !== 'string' ||
      typeof recipientId !== 'string' ||
      typeof backgroundColor !== 'string' ||
      typeof textColor !== 'string' ||
      typeof emoji !== 'string'
    ) {
      return fail(400, { error: 'Invalid Form Data' })
    }

    if (!message.length) {
      return fail(400, { error: 'Please provide a message' })
    }

    if (!recipientId.length) {
      return fail(400, { error: 'No recipient found' })
    }

    await createKudo(message, user.id, recipientId, {
      backgroundColor: backgroundColor as Color,
      textColor: textColor as Color,
      emoji: emoji as Emoji,
    })

    return redirect(302, '/home')
  },
}
