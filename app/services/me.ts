import { db } from '@/db'
import { getCurrentUser } from './sessions'
import { blogs, readingList } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUserToken = async () => {
  const user = await getCurrentUser()
  const token = user?.token
  return token
}

export const getReadingList = async () => {
  const user = await getCurrentUser()
  const userId = Number(user?.id)
  const userReadingList = db
    .select()
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId))
  return userReadingList
}