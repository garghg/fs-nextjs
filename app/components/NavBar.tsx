'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-4 bg-gray-800 px-6 py-3 text-white mb-5">
      <Link href="/" className="hover:text-gray-300">home</Link>
      <Link href="/blogs" className="hover:text-gray-300">blogs</Link>
      <Link href="/users" className="hover:text-gray-300">users</Link>
      {session ? (
        <>
          <Link href="/blogs/new" className="hover:text-gray-300">add blog</Link>
          <em className="ml-auto text-sm">{session.user?.name} logged in</em>
          <button onClick={() => signOut()} className="rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-700">
            logout
          </button>
        </>
      ) : (
        <div className="ml-auto flex gap-4">
          <Link href="/login" className="hover:text-gray-300">login</Link>
          <Link href="/register" className="hover:text-gray-300">register</Link>
        </div>
      )}
    </nav>
  )
}