import { db } from "@/db"
import { auth } from "../auth"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email)
  })
}