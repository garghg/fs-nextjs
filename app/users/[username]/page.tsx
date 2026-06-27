import { getUserWithBlogs } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username)
  
  if (!user) {
    return notFound()
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Username: {user.username}</p>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage