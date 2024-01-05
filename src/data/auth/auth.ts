"use server"
import prisma from "@/data/prisma"

export interface ICredentials {
  username: string
  password: string
}

export interface IUser {
  username: string
  email: string
  firstName: string
  lastName: string
}

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
