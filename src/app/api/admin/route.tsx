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

export async function GET(req: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }
  const { useremail } = await req.json();

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
