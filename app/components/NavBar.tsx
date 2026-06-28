'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">home</Link>
      {' | '}
      <Link href="/blogs">blogs</Link>
      {' | '}
      <Link href="/users">users</Link>
      {' | '}
      {session ? (
        <>
          <Link href="/blogs/new">add blog</Link>
          {' | '}
          <em>{session.user?.name} logged In</em>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {' | '}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  )
}
