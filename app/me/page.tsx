import { generateNewToken, markAsRead } from '../actions/me'
import { getReadingList, getUserToken } from '../services/me'
import { getCurrentUser } from '../services/sessions'
import Link from 'next/link'

const MePage = async () => {
  const session = await getCurrentUser()
  const token = await getUserToken()
  const readList = await getReadingList(true)
  const notReadList = await getReadingList(false)

  if (!session)
    return <div className="p-6 text-gray-500">No user logged in</div>

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Profile</h2>
      <div className="mb-6 rounded border border-gray-200 p-4">
        <p className="mb-1">
          <span className="font-medium">Name:</span> {session.name}
        </p>
        <p>
          <span className="font-medium">Username:</span> {session.username}
        </p>
      </div>

      <div className="mb-6 rounded border border-gray-200 p-4">
        <h3 className="mb-2 text-lg font-semibold">API Token</h3>
        <p className="mb-3 text-sm text-gray-600">
          {token || 'No token generated yet'}
        </p>
        <form action={generateNewToken}>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Generate new Token
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Not Read</h3>
        {notReadList.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing here yet</p>
        ) : (
          <ul className="space-y-1">
            {notReadList.map((b) => (
              <li key={b.blogs.id}>
                <Link
                  href={`/blogs/${b.blogs.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {b.blogs.title}
                </Link>
                <form action={markAsRead}>
                  <input type="hidden" name="blogId" value={b.blogs.id} />
                  <button
                    type="submit"
                    className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Read</h3>
        {readList.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing here yet</p>
        ) : (
          <ul className="space-y-1">
            {readList.map((b) => (
              <li key={b.blogs.id}>
                <Link
                  href={`/blogs/${b.blogs.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {b.blogs.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MePage
