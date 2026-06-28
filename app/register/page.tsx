'use client'

import { useActionState } from 'react'
import { registerUser, type UserFormData } from '../actions/users'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: '',
  } as UserFormData)
  return (
    <div>
      <h2>Register</h2>
      {state.error && (
        <p style={{ color: 'red' }}>
          <strong>{state.error}</strong>
        </p>
      )}
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values?.name}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              defaultValue={state.values?.confirmPassword}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
