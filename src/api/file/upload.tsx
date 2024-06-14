"use server"
import {revalidatePath} from "next/cache"
import S3 from "aws-sdk/clients/s3"
import { env} from "@/env.mjs"
import {createReadStream} from "fs"
import {create} from "@web3-storage/w3up-client"
import { Client } from "@web3-storage/w3up-client"
import { db } from "@/lib/db"

let S3config: S3.Types.ClientConfiguration = {
    apiVersion: 'latest',
    region: 'us-east-2',
    credentials: {
        accessKeyId: env.S3_ACCESSKEY_PARAM,
        secretAccessKey: env.S3_SECRETKEY_PARAM
    }
}

type storageParams = {
    userName: string
    fileDir: string,
    file:File
    storageType: string
}

let  web3StorageClient: Client
let  w3Space: any

type email = `${string}@${string}`

async () => {
    web3StorageClient = await create({

    })
    w3Space = await web3StorageClient.createSpace("uploader_space")      
    web3StorageClient.login(env.WEB3_STORAGE_EMAIL as email)
    while (true) {
        const res = await w3Space.plan.get()
        if (res.ok) break
        console.log('Waiting for payment plan to be selected...')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
}


var s3 = new S3(S3config)

export async function uploadFileS3(fileParams: storageParams): Promise<any>  {
   

    let location = ""
    try {
        s3.createBucket({Bucket: fileParams.fileDir}, (err: any, data: any) => {
            if (err) {
                console.log(err)
            } else {
                location = data.Location
                console.log("file is uploaded with {}", data.Location)
            }
        })
    } catch (error ) {
        console.log(error)
    }
    const params = {
        Bucket: fileParams.fileDir,
        Key: location,
        Body: createReadStream(fileParams.fileDir + "/" + fileParams.file.name),
        ACL: 'public-read'
    }
    return params
}


export async function uploadWeb3File(fileParams: storageParams) {
        try {
            const res = await web3StorageClient.uploadFile(fileParams.file)
            console.log("file uploaded to CID: " + res)
        }
            catch(e)
            {
                console.error("getting error" + e  as string)
            }    
            console.log("file uploaded")

    }









export async function uploadParameter(storageParams: storageParams, file: File) {



}