import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div>
      <h2>Blogs</h2>
      <form>
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit">Search</button>
      </form>
      {filter && <Link href="/blogs">Clear filter</Link>}
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
