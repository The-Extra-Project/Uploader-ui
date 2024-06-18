

import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ButtonShadcn"
import Image  from "next/image"
import { UserAuthForm } from "@/components/AuthForm"
import extra from "@/app/public/extra_logo.png"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { siteConfig } from "@/config/config-website"
import { signUp } from "./actions"
import {zodResolver} from "@hookform/resolvers/zod"
import { userAuthSchema } from "@/lib/auth-validation"
import { PasswordInput } from "@/components/password-input"

import { Icons } from "@/components/Icons"

import { signIn } from "next-auth/react"
import React from "react"

import { Input } from "@/components/ButtonShadcn"


export const metadata = {
    title: "Creer Nouveau compte chez Extralabs",
    description: "Create a new account on Extralabs.",
  }
  
  interface LoginForm {
    email: string;
    password: string;
  }

  export default async function RegisterPage() {
    // const {
    //   register,
    //   handleSubmit,
    //   formState: { errors },
    // } = useForm<FormData>({
    //   resolver: zodResolver(userAuthSchema),
    // })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
    const [formData, setFormData] = React.useState<LoginForm>({ email: '', password: '' });
    const [password, setCurrentPassword] = React.useState("");
  
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  

    async function onSubmit(data: FormData) {
      setIsLoading(true)
    
      const signInResult = await signIn("credentials", {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: searchParams?.get("from") || "/dashboard",
      })
    
      const signUp = await fetch("/user/register")
    
    
      setIsLoading(false)
    
      if (!signInResult?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        })
      }
    
      return toast({
        title: "Check your email",
        description: "We sent you the confirmation of account activation, check it in your inbox.",
      })
    }
    
    
    return (
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/login/"
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
            <div className={cn("grid gap-6")} >
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            <Label htmlFor="current_password">Current Password</Label>
            <PasswordInput
              id="current_password"
              value={password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />

            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading} formAction={signUp}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Signez vous
          </button>
        </div>
      </form> */}
      <UserAuthForm/>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or signez avec
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github", {
            redirect: true,
            callbackUrl: env.GITHUB_SUPABASE_CALLBACK_URL_GOOGLE ,
          })
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
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
  
