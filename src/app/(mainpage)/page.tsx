"use client"
import React from "react";
import Image from "next/image";
import { env } from "@/env.mjs"
import { siteConfig } from "@/config/config-website"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import extra from "@/app/public/extra_logo.png" 
import helsinki from "@/app/public/helsinki_map_project.png"
import Link from "next/link";
import NextLink from "next/link";
import { Input } from "@mui/base";
import  "@/app/styles/global.css"

async function getGithubStars(): Promise<string|null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/The-extra-project/uploader_ui",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 6000,
        },
      }
    )
    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default function Home() {

  const stars = getGithubStars()
  return (
    <main>
      <body className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32" style={{ backgroundColor: 'rgb(170, 237, 170)' }}>
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center" >
          <Link 
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
          suivez notre progres sur X
          </Link>
          </div>

          <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Bienvenue sur le projet Uploader
          </h1>
          <p className="max-w-[42rem] text-center  leading-normal text-black sm:text-xl sm:leading-8">
          Nous construisons de meilleures cartes 3D en rémunérant les
            entreprises et les citoyens qui partagent des données. Découvre-en
            plus 
              <Link className="text-green-600" href="https://www.extralabs.xyz/terms-of-use-extra-uploader">
                ici
            </Link>
          </p>

          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Login
            </Link>
          </div>
      </body>
    </main>
    )
}