// File: app/api/presigned/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '@/env.mjs';


export async function GET(request: NextRequest) {
  const accessKeyId = env.S3_ACCESSKEY_PARAM;
  const secretAccessKey = env.S3_SECRETKEY_PARAM;
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    return new Response(null, { status: 500 });
  }
  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get('fileName');
  const contentType = searchParams.get('contentType');
  if (!fileName || !contentType) {
    return new Response(null, { status: 500 });
  }
  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: fileName,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  if (signedUrl) return NextResponse.json({ signedUrl });
  return new Response(null, { status: 500 });
}