import { dev } from '$app/environment'
import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import type { User } from '@prisma/client'
import { prisma } from './prisma'
import type { LoginForm, RegisterForm } from './types'
import { fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { createUser } from './user'
import { Bcrypt } from 'oslo/password'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'kudos-session',
    attributes: {
      path: '.',
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => ({
    email: attributes.email,
    profile: attributes.profile,
  }),
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<User, 'id'>
  }
}

export async function register(event: RequestEvent, user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } })
  if (exists) {
    return fail(400, { error: 'User already exists with that email' })
  }

  const newUser = await createUser(user)
  if (!newUser) {
    return fail(400, {
      error: 'Something went wrong trying to create a new user',
      fields: { email: user.email },
    })
  }
  return createUserSession(event, newUser.id, '/')
}

export async function login(event: RequestEvent, { email, password }: LoginForm) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await new Bcrypt().verify(user.password, password))) {
    return fail(400, { error: 'Incorrect login' })
  }

  return createUserSession(event, user.id, '/')
}

export async function createUserSession(
  { cookies, locals }: RequestEvent,
  userId: string,
  redirectTo: string,
) {
  if (locals.session) {
    await lucia.invalidateSession(locals.session.id)
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  })
  return redirect(302, redirectTo)
}

export async function logout({ cookies, locals }: RequestEvent) {
  if (!locals.session) {
    return fail(401)
  }
  await lucia.invalidateSession(locals.session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  })
  return redirect(302, '/login')
}

export function requireUser({ locals, url }: RequestEvent, redirectTo = url.pathname) {
  if (locals.user) {
    return locals.user
  }

  const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
  return redirect(302, `/login?${searchParams}`)
}
