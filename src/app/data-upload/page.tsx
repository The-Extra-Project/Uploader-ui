"use client"

import Link from "next/link"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Card } from "@/components/Card"
import {Button} from "@/components/ui/button"
import React, {useState} from "react"
import { UploadFile} from "@mui/icons-material"
import HeaderApplication from "@/components/HeaderApplication"
export default function UploadPage() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    
    return(
        <React.Fragment>
       
        <HeaderApplication/>
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-800 md:px-6">
        <Card className="flex flex-col items-center justify-center w-full max-w-md space-y-6">
        <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-950">
        <h1 className="text-2xl font-bold">Upload Data to Helsinki Map</h1>
            
        <div className="mt-6 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">            
            <UploadFile/>

            <h4 className="text-gray-500 aligned-center dark:text-gray-400"> Drag & drop or browse </h4>
            <br />
            <h4 className="mt-2 text-gray-500 dark:text-gray-400"> Compatible formats: image (.jpeg), video (.mp4, .360), point clouds (.las, .laz) or polygon (.ply)</h4>
        </div>
        </div>
        </div>
        <Button size="lg">Upload</Button>
        </Card>
        </main>
        </React.Fragment>
    )








}
