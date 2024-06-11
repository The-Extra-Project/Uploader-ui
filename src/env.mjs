import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"


export const env = createEnv({
server: {
    KOYEB_APP_DEPLOYMENT: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    GITHUB_SUPABASE_CALLBACK_URL: z.string().min(1),
},
client: {

},
runtime: {
    KOYEB_APP_DEPLOYMENT: process.env.KOYEB_APP_DEPLOYMENT,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}
})