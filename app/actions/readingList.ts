'use server'
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "../services/sessions"
import { revalidatePath } from "next/cache"

export const addToList = async (formData: FormData) => {
  const user = await getCurrentUser()
  const userId = Number(user?.id)
  const blogId = Number(formData.get('blogId'))
  await db.insert(readingList).values({ userId, blogId })
  revalidatePath(`/blogs/${blogId}`)
}