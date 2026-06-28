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
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Post new blog</h2>
      {state.error && (
        <p className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">{state.error}</p>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Post
        </button>
      </form>
    </div>
  )
}

export default NewBlog