'use server'
import { db } from '@/db'
import { getCurrentUser } from '../services/sessions'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const generateNewToken = async () => {
  const newToken = crypto.randomUUID()
  const user = await getCurrentUser()
  await db.update(users).set({ token: newToken }).where(eq(users.id, Number(user?.id)))
  revalidatePath('/me')
}
