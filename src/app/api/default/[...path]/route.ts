import { auth } from "@/config/auth"
import prisma from "@/data/prisma"
import { enhance } from "@zenstackhq/runtime"
import RestApiHandler from "@zenstackhq/server/api/rest"
import { NextRequestHandler } from "@zenstackhq/server/next"
import type { NextRequest } from "next/server"

// create an enhanced Prisma client with user context
async function getPrisma(req: NextRequest) {
  const session = await auth()
  // @ts-expect-error
  return enhance(prisma, { user: session?.user })
}

const handler = NextRequestHandler({
  getPrisma,
  useAppDir: true,
})

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
}
