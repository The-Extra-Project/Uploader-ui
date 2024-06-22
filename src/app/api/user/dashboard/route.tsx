import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/** fetches the current parametrers of the user file and the tokens */
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
  const current_user_stats = await db
    .from("User")
    .select("username, walletSupply")
    .eq("email", (await session).user.email);
  
    const current_file = await db
    .from("User")
    .select("FilesStorageArray")
    .limit(1);

    const all_files = await db
    .from("User")
    .select("file_stored")

  return NextResponse.json(
    {
      username: current_user_stats.data["username"],
      current_value: current_user_stats.data["walletSupply"],
      current_file: current_file,
      all_files: all_files
    },
    {
      status: 200,
    },
  );
}