'use client'
import { useActionState, useEffect } from 'react'
import { createBlog, type BlogFormState } from '../../actions/blogs'
import { useNotification } from '@/app/components/NotificationContext'
import { useRouter } from 'next/navigation'

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: '',
    success: false,
  } as BlogFormState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog Created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Post new blog</h2>
      {state.error && (
        <p>
          <strong style={{ color: 'red' }}>{state.error}</strong>
        </p>
      )}
      <form action={formAction}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
            />
          </label>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default NewBlog
