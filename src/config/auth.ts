import prisma from "@/data/prisma"
import Google, { GoogleProfile } from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      /**
       *
       * @param {import("@auth/core/providers/google").GoogleProfile} profile
       * @returns
       */
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: profile.email === "shahrukhmlk@gmail.com" ? "admin" : "user",
        }
      },
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
