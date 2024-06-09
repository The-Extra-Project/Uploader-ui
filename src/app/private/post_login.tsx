import { redirect } from 'next/navigation'

import { createClient } from '@supabase/supabase-js'
import {configDotenv} from "dotenv"



export default async function PrivatePage() {
  let supabase = createClient(
    process.env.GITHUB_CLIENT_ID || "",
    process.env.GITHUB_CLIENT_SECRET || ""
  )

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}