import { requireUser } from '$lib/server/auth.js'
import { uploadAvatar } from '$lib/server/file.js'
import { prisma } from '$lib/server/prisma.js'
import { json } from '@sveltejs/kit'

export async function POST(event) {
  const user = requireUser(event)

  const imageUrl = await uploadAvatar(event.request)

  if (imageUrl) {
    await prisma.user.update({
      data: {
        profile: {
          update: {
            profilePicture: imageUrl,
          },
        },
      },
      where: {
        id: user.id,
      },
    })
  }

  return json({ imageUrl })
}
