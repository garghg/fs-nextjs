import { db } from "@/db"
import { getCurrentUser } from "./sessions"
import { readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const isInList = async (blogId: number) => {
  const user = await getCurrentUser()
  const item = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, Number(user?.id)), eq(readingList.blogId, blogId))
  })
  return !!item
}