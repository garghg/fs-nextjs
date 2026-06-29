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
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Blogs</h2>
      <form className="mb-4 flex gap-2">
        <input
          type="text"
          name="filter"
          data-testid="filter-input"
          defaultValue={filter}
          placeholder="Search blogs..."
          className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {filter && (
        <Link
          href="/blogs"
          className="mb-4 inline-block text-sm text-blue-600 hover:underline"
        >
          Clear filter
        </Link>
      )}
      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((b) => (
          <li key={b.id}>
            <Link
              href={`/blogs/${b.id}`}
              className="text-blue-600 hover:underline"
            >
              {b.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">{b.likes} likes</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
