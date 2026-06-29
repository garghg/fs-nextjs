import { redirect } from 'next/navigation'
import { generateNewToken, markAsRead } from '../actions/me'
import { getReadingList, getUserToken } from '../services/me'
import { getCurrentUser } from '../services/sessions'
import Link from 'next/link'

const MePage = async () => {
  const session = await getCurrentUser()

  if (!session) redirect('/login')

  const token = await getUserToken()
  const readList = await getReadingList(true)
  const notReadList = await getReadingList(false)

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Profile</h2>

      <div
        data-testid="user-profile"
        className="mb-6 rounded border border-gray-200 p-4"
      >
        <p data-testid="user-name" className="mb-1">
          <span className="font-medium">Name:</span> {session.name}
        </p>
        <p data-testid="user-username">
          <span className="font-medium">Username:</span> {session.username}
        </p>
      </div>

      <div
        data-testid="api-token-section"
        className="mb-6 rounded border border-gray-200 p-4"
      >
        <h3 className="mb-2 text-lg font-semibold">API Token</h3>
        {token ? (
          <p data-testid="token-display" className="mb-3 text-sm text-gray-600">
            <span data-testid="api-token">{token}</span>
          </p>
        ) : (
          <p
            data-testid="no-token-message"
            className="mb-3 text-sm text-gray-600"
          >
            No token generated yet
          </p>
        )}
        <form action={generateNewToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Generate new Token
          </button>
        </form>
      </div>

      <div data-testid="reading-list-section" className="mb-6">
        {notReadList.length === 0 && readList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-sm text-gray-500">
            Nothing here yet
          </p>
        ) : (
          <>
            <div data-testid="unread-section" className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">Not Read</h3>
              {notReadList.length === 0 ? (
                <p
                  data-testid="no-unread-blogs"
                  className="text-sm text-gray-500"
                >
                  Nothing here yet
                </p>
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
                          data-testid={`mark-read-${b.blogs.id}`}
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
          </>
        )}
      </div>
    </div>
  )
}

export default MePage
