"use client"
import { useNotification } from '../components/NotificationContext'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false
    })

    if (result?.error) {
      setError("Invalid login credentials")
    } else {
      showNotification('Logged in successfully')
      router.push('/')
      router.refresh()
    }
  }
  
  return (
    <div>
      <h2>Login</h2>
      {error && <p data-testid="error-message" style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit" data-testid="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginPage