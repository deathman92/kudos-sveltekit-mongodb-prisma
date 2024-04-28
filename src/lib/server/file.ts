import { put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

export async function uploadAvatar(request: Request) {
  const formData = await request.formData()

  const file = formData.get('profile-pic')

  if (!(file instanceof File)) {
    return ''
  }

  const { url } = await put(`avatars/${file.name}`, file, {
    access: 'public',
    token: BLOB_READ_WRITE_TOKEN,
  })

  return url
}
