import { getCurrentUser } from "./sessions"

export const getUserToken = async () => {
  const user = await getCurrentUser()
  const token = user?.token
  return token
}