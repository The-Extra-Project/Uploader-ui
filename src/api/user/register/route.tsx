import {getServerSession} from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
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
    await db.from("User").insert({email: email , password: password})

  }