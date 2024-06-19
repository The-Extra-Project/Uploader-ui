
import { createClient, SupabaseClient } from "@supabase/supabase-js";  
import { PrismaClient, Prisma } from '@prisma/client'
import { env } from "@/env.mjs";
import { configDotenv } from "dotenv";
import { Database } from "@/types_supabase";
export const prismaCLient = new PrismaClient()
declare global {
    // eslint-disable-next-line no-var
    var cachedDBClient: SupabaseClient
  }

configDotenv({
  path: "../../.env",
})

export const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL || "", env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" )

var supClient: SupabaseClient

if (process.env.NODE_ENV === "production") {
    supClient = new SupabaseClient(
        env.NEXT_PUBLIC_SUPABASE_URL || "", env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )
} else {
  if (!global.cachedDBClient) {
    global.cachedDBClient = new SupabaseClient(
        env.NEXT_PUBLIC_SUPABASE_URL || "", env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )
  }
  supClient = global.cachedDBClient
}

export const db = supabase

// TODO: for the side of the server integration, we need to see which one of the client works
//export const db2 = createClientServer

