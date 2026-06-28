'use server'
import { db } from '@/db'
import { getCurrentUser } from '../services/sessions'
import { readingList, users } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const generateNewToken = async () => {
  const newToken = crypto.randomUUID()
  const user = await getCurrentUser()
  await db
    .update(users)
    .set({ token: newToken })
    .where(eq(users.id, Number(user?.id)))
  revalidatePath('/me')
}

export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()
  const blogId = formData.get('blogId')
  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.blogId, Number(blogId)),
        eq(readingList.userId, Number(user?.id)),
      ),
    )
  revalidatePath('/me')
  revalidatePath(`/blogs/${blogId}`)
}
