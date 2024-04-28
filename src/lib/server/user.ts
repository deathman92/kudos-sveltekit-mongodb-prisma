import { Bcrypt } from 'oslo/password'
import type { RegisterForm } from './types'
import { prisma } from './prisma'

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
