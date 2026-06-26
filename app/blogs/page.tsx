import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
