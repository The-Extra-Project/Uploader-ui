import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google"
import EmailProvider  from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github"
import { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import { configDotenv } from "dotenv"
import {db} from "@/lib/db"


configDotenv(
    {
        path: "../../../.env"
    }
)



export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider(
            {
                clientId: process.env.GITHUB_CLIENT_ID || "",
                clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            }),

        EmailProvider({
            from: process.env.SMTP_FROM,
            sendVerificationRequest: async ({ identifier, url, provider }) => {        
                const user = await db.functions.invoke(
                    "insertDB",
                    
                )

                )
                
                // user.findUnique({          
                //             where: { email: identifier },          
                //             select: { emailVerified: true },
                // })

    ],
    adapter: SupabaseAdapter(
        {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
            secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
        }
    ),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/login",
        error: "/error",
    },


}