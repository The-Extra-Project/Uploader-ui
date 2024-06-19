import { db } from "@/lib/db";
import { NextResponse, type NextRequest } from 'next/server';
import { env } from "@/env.mjs";
export async function GET(request: NextRequest) {
    const { objectUrl } = await request.json();


    if (env.SUPABASE_URL) return new Response(null, { status: 500 });

    const sql = db.from("User")
    try {
      // Create the user table if it does not exist
      // Mock call to get the user
      const user = (await db.auth.getUser()).data.user.email
      // Insert the user name and the reference to the image into the user table
//      await sql('INSERT INTO "user" (name, image) VALUES ($1, $2)', [user, objectUrl]);
        await sql.update({
            email: user,
            createdAt: objectUrl
        })

return NextResponse.json({ code: 1 });
    } catch (e) {
      return NextResponse.json({
        code: 0,
        message: e instanceof Error ? e.message : e?.toString(),
      });
    }
  


}