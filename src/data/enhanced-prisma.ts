import { auth } from "@/config/auth"
import { enhance } from "@zenstackhq/runtime"
import prisma from "./prisma"

export default async function getEnhancedPrisma() {
  // @ts-expect-error
  return enhance(prisma, { user: (await auth())?.user })
}
