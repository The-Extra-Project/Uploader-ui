"use server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface AnalystProps {
  id: string;
  amount: number;
  status: string;
  email: string;
}

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

  try {
    let notPaid = db.from("admin").select().contains("status", ["pending"]);

    if ((await notPaid).error) {
      return NextResponse.json(
        { message: "no tables available" },
        { status: 405 },
      );
    }

    return NextResponse.json((await notPaid).data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 404,
      },
    );
  }
}


export async function POST(req: NextRequest) {
  
  const data = await req.json() 
  const session = getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }
  try {

    await db.from("admin").update(
      {tokens_allotted: data.tokens}
    ).eq("email",data.email)
  }
  catch(error) {
console.error("error in calling /api/admin update" + error)
  }





}