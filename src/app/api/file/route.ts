import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";

/**
 *
 * @param request  consisting of the file parameters (namely name and the file reference for the storage).
 *
 */

export async function POST(request: Request) {
  if (!env.S3_BUCKET_NAME) return new Response(null, { status: 500 });
  const { filename, contentType, error } = await request.json();
  if (error) {
    return NextResponse.json({ code: "404" });
  }

  const sql = db.from("admin");
  let client = new S3Client({ region: env.S3_REGION });
  try {
    // Create the user table if it does not exist
    // Mock call to get the user
    const useremail = (await db.auth.getUser()).data.user.email;

    var { url, fields } = await createPresignedPost(client, {
      Bucket: env.S3_BUCKET_NAME,
      Key: uuidv4(),
    });

    sql.update({
      fileName: filename,
      email: useremail,
      "wallet address": "0X00000",
    });
    return NextResponse.json({ url, fields });
  } catch (e) {
    return NextResponse.json({
      code: 0,
      message: e instanceof Error ? e.message : e?.toString(),
    });
  }
}
