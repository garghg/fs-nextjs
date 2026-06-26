import { createBlog } from '../../actions/blogs'

const NewBlog = () => {
  return (
    <div>
      <h2>Post new blog</h2>
      <form action={createBlog}>
        <div>
          <label>
            title
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            author
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            url
            <input type="text" name="url" required />
          </label>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default NewBlog