import { auth } from "@/config/auth"
import prisma from "@/data/prisma"
import { enhance } from "@zenstackhq/runtime"
import RestApiHandler from "@zenstackhq/server/api/rest"
import { NextRequestHandler } from "@zenstackhq/server/next"
import type { NextRequest } from "next/server"

// create an enhanced Prisma client with user context
async function getPrisma(req: NextRequest) {
  // getSessionUser extracts the current session user from the request, its
  // implementation depends on your auth solution
  return enhance(prisma, { user: (await auth())?.user })
}

const handler = NextRequestHandler({
  getPrisma,
  useAppDir: true,
  handler: RestApiHandler({ endpoint: "http://localhost/api/rest" }),
})

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
}
