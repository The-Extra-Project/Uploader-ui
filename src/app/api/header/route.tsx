import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET() {
   
    const session = getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        },
      );
    }
    const current_username = (await session).user
   
    return NextResponse.json(
      {
        username: current_username
      },
      {
        status: 200,
      },
    );
  }
  