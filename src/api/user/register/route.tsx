import {getServerSession} from "next-auth/next"
import { z } from "zod"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { authOptions } from "@/lib/auth"
import { cookies } from 'next/headers'
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

  // /user/register in order to create new account via the email /password
  export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const {email, password} = body;
    const supabase = createRouteHandlerClient({cookies})
   let responseSignIn =  await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (responseSignIn.error) {
      return NextResponse.json(
        { message: responseSignIn.error.message },
        {
          status: 401,
        }
      );
    }


    await db.from("User").update({email: email , password: password})
    
    return NextResponse.json({
      message: "authorized"
    },
    {
      status: 200,
      
    }  
  )
  }


  