import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { configDotenv } from "dotenv"

configDotenv(
    {
        path: "../.env.local"
    }
)
export const env = createEnv({
server: {
    KOYEB_APP_DEPLOYMENT: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_ACCESS_TOKEN: z.string(),
    S3_ACCESSKEY_PARAM: z.string(),
    S3_SECRETKEY_PARAM: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_JWT_SECRET: z.string(),
    GITHUB_SUPABASE_CALLBACK_URL_GOOGLE: z.string(),
    WEB3_STORAGE_EMAIL: z.string(),
    TOKEN_CONTRACT_ADDRESS: z.string(),
    PUBLIC_SCAN_URL: z.string(),
    COMETH_API: z.string(),
    S3_BUCKET_NAME: z.string(),
    DATABASE_URL: z.string()
},
client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),

},
runtimeEnv: {
    KOYEB_APP_DEPLOYMENT: process.env.KOYEB_APP_DEPLOYMENT ,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    GITHUB_SUPABASE_CALLBACK_URL_GOOGLE: process.env.GITHUB_SUPABASE_CALLBACK_URL_GOOGLE,
    S3_ACCESSKEY_PARAM: process.env.S3_ACCESSKEY_PARAM,
    S3_SECRETKEY_PARAM:  process.env.S3_SECRETKEY_PARAM,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    WEB3_STORAGE_EMAIL: process.env.WEB3_STORAGE_EMAIL,
    COMETH_API: process.env.COMETH_API,
    TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
    PUBLIC_SCAN_URL: process.env.PUBLIC_SCAN_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
}

})