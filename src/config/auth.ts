import prisma from "@/data/prisma"
import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google({})],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },
})
