import { auth } from "@/config/auth"

export async function isAdmin(): Promise<boolean> {
  const session = await auth()
  return session?.user.role === "admin"
}
