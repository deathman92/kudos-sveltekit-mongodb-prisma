import { requireUser } from '$lib/server/auth.js'
import { getFilteredKudos, getRecentKudos } from '$lib/server/kudo.js'
import { getOtherUsers } from '$lib/server/user.js'
import type { Prisma } from '@prisma/client'

export async function load(event) {
  const user = requireUser(event)

  const sort = event.url.searchParams.get('sort')
  const filter = event.url.searchParams.get('filter')

  let sortOptions: Prisma.KudoOrderByWithRelationInput = {}
  if (sort) {
    if (sort === 'date') {
      sortOptions = {
        createdAt: 'desc',
      }
    }
    if (sort === 'sender') {
      sortOptions = {
        author: {
          profile: {
            firstName: 'asc',
          },
        },
      }
    }
    if (sort === 'emoji') {
      sortOptions = {
        style: {
          emoji: 'asc',
        },
      }
    }
  }

  let textFilter: Prisma.KudoWhereInput = {}
  if (filter) {
    textFilter = {
      OR: [
        {
          message: {
            mode: 'insensitive',
            contains: filter,
          },
        },
        {
          author: {
            OR: [
              { profile: { is: { firstName: { mode: 'insensitive', contains: filter } } } },
              { profile: { is: { lastName: { mode: 'insensitive', contains: filter } } } },
            ],
          },
        },
      ],
    }
  }
  const users = getOtherUsers(user.id).catch(() => [])
  const kudos = getFilteredKudos(user.id, sortOptions, textFilter).catch(() => [])
  const recentKudos = getRecentKudos().catch(() => [])
  return { users, kudos, recentKudos }
}
