import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { env } from '@/lib/env'

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const getPrismaClient = () => {
  const connectionString = env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({
    adapter,
    log: ['query']
  })
}

export const db = globalPrisma.prisma ?? getPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalPrisma.prisma = db
}