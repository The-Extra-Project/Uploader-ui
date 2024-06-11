import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
// import { configDotenv } from "dotenv"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
// import NextAuth from "next-auth/next"
// import CredentialsProvider from "next-auth/providers/credentials"
// import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"

import { env } from "@/env.mjs"

// import Google from "next-auth/providers/google"

// import { db, supabase } from "@/lib/db"
// import { createClientUser } from "@/lib/supabase-client-server"

// configDotenv({
//   path: "../../../.env",
// })

// export async function loginWithEmail(formData: any) {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: process.env.GITHUB_SUPABASE_CALLBACK_URL,
//       scopes: "admin dashboard-user data-upload",
//     },
//   })

//   if (error) {
//     redirect("/error")
//   }

//   revalidatePath("/", "layout")
//   redirect("/")
// }

// export async function signInWithOAuth() {
//   await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: process.env.GITHUB_SUPABASE_CALLBACK_URL,
//     },
//   })
// }

// // export async function signupWithEmail(formData: any) {
// //   const supabase = createClientUser()
// //   // type-casting here for convenience
// //   // in practice, you should validate your inputs
// //   const data = {
// //     email: formData.get("email") as string,
// //     password: formData.get("password") as string,
// //   }

// //   const { error } = await supabase.auth.signUp(data)

// //   if (error) {
// //     redirect("/error")
// //   }

// //   revalidatePath("/", "layout")
// //   redirect("/")
// // }

// export type creds = {
//   email: string
//   password: string
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     }),
//     // CredentialsProvider({
//     //   name: "Email",
//     //   credentials: {
//     //     email: { label: "Email", type: "text", placeholder: "Email" },
//     //     password: { label: "Password", type: "password" },
//     //   },
//     // //   authorize: async () => {},
//     // }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//     secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
//   }),
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   },
// }

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
    }),
    // CredentialsProvider({
    //   name: "Email",
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "Email" },
    //     password: { label: "Password", type: "password" },
    //   },
    // //   authorize: async () => {},
    // }),
  ],

  // ***********************
  // this is the code that
  // is causing the error

  // check this out: https://authjs.dev/getting-started/adapters/supabase

  // adapter: SupabaseAdapter({
  //   url: env.NEXT_PUBLIC_SUPABASE_URL || "",
  //   secret: env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  // }),

  // ***********************

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
