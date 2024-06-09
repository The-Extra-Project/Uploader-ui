import {createServerClient, type CookieOptions, createBrowserClient} from "@supabase/ssr"
import { cookies } from "next/headers"
import { configDotenv } from "dotenv"

configDotenv()
export function createClientServer() {
const cookieStore = cookies()

return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            }
        }
    }
)

}


export function createClientUser() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
    
}