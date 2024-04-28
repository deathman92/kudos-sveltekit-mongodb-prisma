import { Bcrypt } from 'oslo/password'
import type { RegisterForm } from './types'
import { prisma } from './prisma'
import type { Profile } from '@prisma/client'

export async function createUser(user: RegisterForm) {
  const passwordHash = await new Bcrypt().hash(user.password)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  })
  return { id: newUser.id, email: newUser.email }
}

export async function getOtherUsers(userId: string) {
  return await prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      profile: {
        firstName: 'asc',
      },
    },
  })
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } })
}

export function updateUser(userId: string, profile: Partial<Profile>) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  })
}

export function deleteUser(userId: string) {
  return prisma.user.delete({ where: { id: userId } })
}
