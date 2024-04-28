import type { KudoStyle, Prisma } from '@prisma/client'
import { prisma } from './prisma'

export function createKudo(
  message: string,
  authorId: string,
  recipientId: string,
  style: KudoStyle,
) {
  return prisma.kudo.create({
    data: {
      message,
      author: {
        connect: {
          id: authorId,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
      style,
    },
  })
}

export function getFilteredKudos(
  recipientId: string,
  sortFilter: Prisma.KudoOrderByWithRelationInput,
  whereFilter: Prisma.KudoWhereInput,
) {
  return prisma.kudo.findMany({
    select: {
      id: true,
      style: true,
      message: true,
      author: {
        select: {
          profile: true,
        },
      },
    },
    orderBy: sortFilter,
    where: {
      recipientId,
      ...whereFilter,
    },
  })
}

export function getRecentKudos() {
  return prisma.kudo.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      style: {
        select: {
          emoji: true,
        },
      },
      recipient: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  })
}
