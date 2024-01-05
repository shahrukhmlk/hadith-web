import "server-only"
import { authenticateUser } from "@/data/auth/auth"
import { getServerSession, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "username",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const user = await authenticateUser({
            username: credentials.username,
            password: credentials.password,
          })
          if (user) {
            return {
              id: "",
              email: user.email,
              name: user.firstName + " " + user.lastName,
            }
          }
        }
        return null
      },
    }),
  ],
}

export function auth() {
  return getServerSession(authOptions)
}
