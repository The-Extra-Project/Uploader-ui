import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ButtonShadcn"
import Image  from "next/image"
import { UserAuthForm } from "@/components/AuthForm"
import extra from "@/app/public/extra_logo.png"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/config/config-website"
export const metadata = {
    title: "Creer Nouveau compte chez Extralabs",
    description: "Create an account to get started.",
  }
  
  export default function RegisterPage() {
    return (
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="hidden h-full bg-muted lg:block" />
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              
              <Image src={extra} height={100} width={100} style={{alignItems:'center'}} alt="IDF"></Image>
              <h1 className="text-2xl font-semibold tracking-tight">
                Creer votre compte chez extralabs
              </h1>
              <p className="text-sm text-muted-foreground">
              Selectionne votre type de compte
              <RadioGroup defaultValue="user">
              <div className="flex items-center text-small space-x-2">
                <RadioGroupItem value="user" id="option-one" />
                    <Label htmlFor="option-one"> User Account</Label>
              </div>

              <div className="flex items-center text-small space-x-2">
                <RadioGroupItem value="admin" id="option-one" />
                    <Label htmlFor="option-one"> Data-admin</Label>
              </div>
              </RadioGroup>
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              En cliquant, vous acceptez automatiquement les C.G.V mentionnant danes le lien{" "}
              <Link
                href={siteConfig.tos}
                className="hover:text-brand underline underline-offset-4"
              >
                ici
              </Link>              
              .
            </p>
          </div>
        </div>
      </div>
    )
  }
  
