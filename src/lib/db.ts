import { createClient, SupabaseClient } from "@supabase/supabase-js";  
import { PrismaClient, Prisma } from '@prisma/client'


export const prismaCLient = new PrismaClient()
declare global {
    // eslint-disable-next-line no-var
    var cachedDBClient: SupabaseClient
  }

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" )

var supClient: SupabaseClient

if (process.env.NODE_ENV === "production") {
    supClient = new SupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )
} else {
  if (!global.cachedDBClient) {
    global.cachedDBClient = new SupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )
  }
  supClient = global.cachedDBClient
}

export const db = prismaCLient

// TODO: for the side of the server integration, we need to see which one of the client works
//export const db2 = createClientServer

