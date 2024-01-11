import prisma from "@/data/prisma"
import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      /* profile(profile) {
        return {
          role: profile.role ?? "user",
          id: profile.id,
          email: profile.email,
          image: profile.image,
          name: profile.name,
        }
      }, */
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      session.user.id = user.id
      return session
    },
  },
})
