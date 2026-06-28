'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLike } from '../services/blogs'
import { auth } from '../auth'

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  if (
    !(
      title &&
      author &&
      url &&
      title.length > 4 &&
      author.length > 4 &&
      url.length > 4
    )
  ) {
    return { error: 'Title, Author, URL mist be at least 5 characters long' }
  }

  await addBlog(title, author, url)
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}
