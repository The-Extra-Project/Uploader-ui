"use server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signupAdmin, signup } from "@/app/api/user/register/actions";
import { use } from "react";
import { redirect } from "next/navigation";
// /user/register in order to create new account via the email /password

export async function POST(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { message: "Unauthorized" },
  //     {
  //       status: 401,
  //     }
  //   );
  // }
  const body = await req.json();
  const { email, password, userCategory } = body;

  if (userCategory == "admin") {
    //redirect("/admin/register")
    const signupParams = {
      email: email,
      password: password,
    };

    try {
      await signupAdmin(signupParams);
      // if there is correct validation, then go to the upload application
    } catch (error) {
      console.log(error);
    }
  } else if (userCategory == "user") {
    const signupParams = {
      email: email,
      password: password,
    };

    await signup(signupParams);
  }

  await db.from("User").update({ email: email, password: password });

  redirect("/data-upload");
  return NextResponse.json(
    {
      message: "authorized",
    },
    {
      status: 200,
    },
  );
}
