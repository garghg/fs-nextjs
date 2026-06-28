'use server'
import { db } from '@/db'
import { readingList } from '@/db/schema'
import { getCurrentUser } from '../services/sessions'
import { revalidatePath } from 'next/cache'
import { and, eq } from 'drizzle-orm'

export const addToList = async (formData: FormData) => {
  const user = await getCurrentUser()
  const userId = Number(user?.id)
  const blogId = Number(formData.get('blogId'))

  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })

  if (existing) {
    await db
      .update(readingList)
      .set({ read: false })
      .where(eq(readingList.id, existing.id))
  } else {
    await db.insert(readingList).values({ userId, blogId })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath('/me')
}
