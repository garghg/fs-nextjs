import { db } from '@/db'
import { users } from '@/db/schema'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }
  const { username, name, password } = await request.json()
  const passwordHash = await bcrypt.hash(password, 10)

  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning()
  return NextResponse.json(user, { status: 201 })
}
