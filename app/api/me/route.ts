import { NextResponse } from 'next/server'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'

export const GET = async (req: Request) => {
  const token = req.headers.get('authorization')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token.substring(7)),
  })

  const usersInfo = await db.query.users.findFirst({
    where: eq(users.id, Number(user?.id)),
    with: { blogs: true },
  })
  return NextResponse.json(usersInfo)
}
