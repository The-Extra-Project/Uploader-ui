import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import jwt from "jsonwebtoken"
import NextAuth, { getServerSession } from "next-auth"
// import { configDotenv } from "dotenv"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

import { env } from "@/env.mjs"
import { db, supabase } from "@/lib/db"
import { configDotenv } from "dotenv"

const bcrypt = require("bcrypt")

//configDotenv()
configDotenv({
  path: "../../../.env",
})

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, token, user }) {
      const signingSecret = env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
}



export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
