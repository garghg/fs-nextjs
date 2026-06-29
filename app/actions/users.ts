'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export type UserFormData = {
  error: string
  values?: { username: string; password: string; confirmPassword: string; name: string }
  fieldErrors?: { username?: string; passwordConfirm?: string }
}

export const registerUser = async (
  prevState: UserFormData,
  formData: FormData,
) => {
  const username = (formData.get('username') as string)?.trim()
  const password = (formData.get('password') as string)?.trim()
  const confirmPassword = (formData.get('confirmPassword') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()

  const values = {
    username,
    password,
    confirmPassword,
    name,
  }

  if (!username || !name || !password || !confirmPassword) {
    return { error: 'All fields are required', values }
  }

  if (username.length < 4) {
    return {
      error: 'Username must be at least 4 characters',
      fieldErrors: { username: 'Username must be at least 4 characters' },
      values,
    }
  }

  if (password.length < 4) {
    return { error: 'Password must be at least 4 characters', values }
  }

  if (confirmPassword !== password) {
    return {
      error: 'Passwords did not match',
      fieldErrors: { passwordConfirm: 'Passwords did not match' },
      values,
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await db.insert(users).values({ username, name, passwordHash })
  } catch (error: any) {
    if (error.cause?.code === '23505') {
      return { error: 'Username already taken', values }
    }
    throw error
  }

  redirect('/login')
}
