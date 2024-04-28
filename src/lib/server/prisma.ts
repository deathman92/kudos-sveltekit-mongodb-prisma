import { dev } from '$app/environment'
import { PrismaClient } from '@prisma/client'

function prismaClientSingleton() {
  const prisma = new PrismaClient()
  prisma.$connect()
  return prisma
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (!dev) globalForPrisma.prisma = prisma
