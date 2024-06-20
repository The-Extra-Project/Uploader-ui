import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/** fetches the current parametrers of the user file and the tokens */
export async function GET(req: Request) {
  const session = getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }
  const current_value = await db
    .from("User")
    .select("tokens_allotted")
    .eq("email", (await session).user.email);
  const current_file = await db
    .from("User")
    .select("file_stored")
    .order("createdAt", { ascending: false })
    .limit(1);

  return NextResponse.json(
    {
      message: "Authorized",
      current_value: current_value,
      current_file: current_file,
    },
    {
      status: 200,
    },
  );
}
