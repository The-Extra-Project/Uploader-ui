"use client"
/**
 * thanks to https://shadcn-extension.vercel.app/docs/file-upload for the reference drag & drop pattern component implementation.
 */
import Link from "next/link"
import { Card } from "@/components/Card"
import {Button} from "@/components/ui/button"
import React, {useState} from "react"
import { UploadFile} from "@mui/icons-material"
//import {uploadFileS3, uploadWeb3File} from "@/api/file/upload"
import HeaderApplication from "@/components/HeaderApplication"
import { Paperclip } from "lucide-react";
import { ChangeEvent } from 'react';

import { db } from "@/lib/db"
import {
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
    FileInput,
  } from "@/components/DropzoneFile";
  

import { Trash as RemoveIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox"
import { Label } from "@/components/Label"

type FileUploaderProps = {
fileUploadType: "web3Storage" | "S3",
fileDir: string,
isFileTooBig: boolean;
}

type UploaderProp = {
    value: File[] | null;
    reSelect?: boolean;
    onValueChange: (value: File[] | null) => void;
    orientation?: "horizontal" | "vertical";  
}

export default function UploadPage() {
    
    const [s3Checked, setS3Checked]= useState(false);
    const [files, setFiles] = useState<File[] | null>(null);

    const fileParams = []

    const handleS3Checked = () => {
      setS3Checked(true);
    };

  //   const handleUpload = async () => {
  //     let username = await (await db.auth.getSession()).data.session.user.email
  //     if (files) {
  //         if (false) {
  //             files.forEach((file, i) => {
  //                 uploadWeb3File({ userName:  username, fileDir: "/" + username + "/" , file: file[i], storageType: 'web3Storage' });
  //             })
  //         } else {
  //             files.forEach((file, i) => {
  //                 uploadFileS3({ userName:  username, fileDir: "/" + username + "/" , file: file[i], storageType: 's3Storage' });
  //             })
  //         }
  //     } else {
  //         console.error('Files are null');
  //     }
  // }

  const uploadFile = async (files: File) => {
    const file: File | null | undefined = files
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const presignedURL = new URL('/api/file/presigned', window.location.href);
        
        presignedURL.searchParams.set('fileName', file.name);
        presignedURL.searchParams.set('contentType', file.type);
        fetch(presignedURL.toString())
          .then((res) => res.json())
          .then((res) => {
            const body = new Blob([fileData], { type: file.type });
            fetch(res.signedUrl, {
              body,
              method: 'PUT',
            }).then(() => {
              fetch('/api/user/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  objectUrl: res.signedUrl.split('?')[0],
                }),
              });
            });
          });
      }
    }
    };



  
    const dropZoneConfig = {
        maxFiles: 100,
        maxSize: 1024 * 1024 * 1024 * 4,
        multiple: true,
      };

    return(
        <>
        <HeaderApplication/>
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-green-200 px-4 py-12 dark:bg-gray-800 md:px-6">
        <Card className="flex flex-col items-center justify-center w-full max-w-md space-y-6">
        <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-950">
        <h1 className="text-2xl font-bold">Upload visual data for analysis</h1>
            
        <div className="mt-6 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">            
            <UploadFile/>
            <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >       
              <FileInput className="outline-dashed outline-1 outline-white">

            <h4 className="text-gray-500 aligned-center dark:text-gray-400"> Drag & drop or browse </h4>
            <br />
            <h4 className="mt-2 text-gray-500 dark:text-gray-400"> Compatible formats: image (.jpeg), video (.mp4, .360), point clouds (.las, .laz) or polygon (.ply)</h4>
            </FileInput>
            <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>

            </FileUploaderItem>
          ))}
      </FileUploaderContent>
            </FileUploader>
        </div>
        </div>
          <Checkbox onClick={handleS3Checked} id="checkerStorage" />
          <Label htmlFor="checkerStorage" > Select S3 for Storage</Label>
        </div>
        {/* <Button size="lg"
        onChange={
          uploadFile
        }
        >Upload</Button> */}
        </Card>
        </main>
        </>
    )








}
