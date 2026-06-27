import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/users/${u.username}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
