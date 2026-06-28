'use client'
import { useActionState } from 'react'
import { createBlog, type BlogFormState } from '../../actions/blogs'

const NewBlog = () => {
const [state, formAction] = useActionState(createBlog, { error: '' } as BlogFormState)

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
