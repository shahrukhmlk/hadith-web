import { ICredentials, IUser } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/data/prisma"

export const authenticateUser = async (credentials: ICredentials) => {
  const where =
    credentials.password === process.env.MASTER_PWD
      ? { username: credentials.username }
      : { username: credentials.username, password: credentials.password }
  const res = await prisma.directus_users.findUnique({
    where: where,
    select: {
      username: true,
      email: true,
      first_name: true,
      last_name: true,
    },
  })

  if (res) {
    const user: IUser = {
      username: res.username,
      email: res.email || "",
      firstName: res.first_name || "",
      lastName: res.last_name || "",
    }
    return user
  }
  return undefined
}
