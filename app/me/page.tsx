import { generateNewToken } from "../actions/me"
import { getReadingList, getUserToken } from "../services/me"
import { getCurrentUser } from "../services/sessions"

const MePage = async () => {
  const session = await getCurrentUser()
  const token = await getUserToken()
  const blogList = await getReadingList()

  if (!session) return <div>no user logged in</div>

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {session.name}</p>
      <p>Username: {session.username}</p>
      <div>
        <h2>API Token</h2>
        <p>Current Token: {token || "No token generate yet"}</p>
        <form action={generateNewToken}>
          <button type="submit">Generate new Token</button>
        </form>
      </div>
      <ul>
        {blogList.map(b => (
          <li key={b.blogs.id}>
            {b.blogs.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MePage