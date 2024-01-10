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
  if (credentials.password === process.env.MASTER_PWD) {
    const user: IUser = {
      username: "master",
      email: "master@admin.com",
      firstName: "master",
      lastName: "master",
    }
    return user
  }
  return undefined
}
