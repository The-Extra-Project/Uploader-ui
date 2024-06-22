"use server";

import { Client, create } from "@web3-storage/w3up-client";
import { S3Client, PutObjectCommand, S3, AccessControlPolicy } from "@aws-sdk/client-s3";
import { NextApiResponse } from "next";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "@/env.mjs";
import { db } from "@/lib/db";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { v4 as uuidv4 } from "uuid";

export async function uploadS3Files(filename: string) {
  let client = new S3Client({ region: env.S3_REGION });  
  const sql = db.from("admin");

  try {
    // Create the user table if it does not exist
    // Mock call to get the user
   // const useremail = (await db.auth.getUser()).data.user.email;
    console.log("useremail is not working", filename );
    var { url, fields } = await createPresignedPost(client, {
      Bucket: env.S3_BUCKET_NAME,
      Key: uuidv4(),
    });

    if (url.length) {
      console.log("no issues iN generating URL: "  + url)
    }
    sql.update({
      fileName: filename,
      email: (await db.auth.getSession()).data.session.user.email,
      "wallet address": "0X00000",
    });
    return { url, fields };
  } catch (e) {
    console.error("file unable to upload due to issues");
  }
  return { url, fields };
}
