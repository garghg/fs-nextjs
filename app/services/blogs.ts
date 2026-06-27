import { eq, ilike } from 'drizzle-orm'
import { db } from '../../db/index'
import { blogs } from '../../db/schema'

export const getBlogs = async (filter?: string) => {
  const result = filter
    ? await db.query.blogs.findMany({
        where: ilike(blogs.title, `%${filter}%`),
      })
    : await db.query.blogs.findMany()

  return result.toSorted((a, b) => b.likes - a.likes)
}

export const addBlog = async (title: string, author: string, url: string) => {
  const newBlog = {
    title,
    author,
    url,
  }
  await db.insert(blogs).values(newBlog)
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
