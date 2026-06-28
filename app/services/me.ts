import { db } from '@/db'
import { getCurrentUser } from './sessions'
import { blogs, readingList } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const getUserToken = async () => {
  const user = await getCurrentUser()
  const token = user?.token
  return token
}

export const getReadingList = async (isRead?: boolean) => {
  const user = await getCurrentUser()
  const userId = Number(user?.id)
  const conditions = [eq(readingList.userId, userId)]
  if (isRead !== undefined) {
    conditions.push(eq(readingList.read, isRead))
  }
  const userReadingList = await db
    .select()
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(and(...conditions))
  return userReadingList
}