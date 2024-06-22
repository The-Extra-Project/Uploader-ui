

"use client";
import {  Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userAuthSchema } from "@/lib/auth-validation";
import { Label } from "@/components/Label";
import { toast } from "@/components/ui/use-toast";
import { AuthResponse } from "@supabase/supabase-js";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ButtonShadcn";
import { Icons, otherIcons } from "@/components/Icons";
import React from "react"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import "@/app/styles/global.css";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// };



export default function LoginPage() {
  
type FormData = z.infer<typeof userAuthSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(userAuthSchema),
});

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    userCategory: "",
  });

  const [category, setCategory] = React.useState<string>("");

  const router = useRouter()
  
  const handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {  value } = event.target;
    
    setFormData(() => ({
      email: value
    }));
  };

  const handleInputChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {  value } = event.target;
    
    setFormData(() => ({
      password: value
    }));
  };

  const handleInputChangeUserCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {  value } = event.target;
    
    setFormData(() => ({
      userCategory: value
    }));
  };



  async function onSubmit() {
    setIsLoading(true);
    var signIn: AuthResponse | undefined;

    if(formData.userCategory == "user")
      {
        router.push("/dashboard-user")
        return toast({
          title: "Loading user page.",
          description: "Your sign in is successful, kindly go to personal page to validate account.",
          variant: "default",
        });
        
      }
      else if(formData.userCategory =="admin") 
        {
          router.push("/admin")
          return toast({
            title: "Loading admin page.",
            description: "loading current listed requests",
            variant: "default",
          });
          setIsLoading(false);
        }

        else {
          return toast({
            title: "Error in loading.",
            description: "not able to call backend and auth, try later",
            variant: "destructive",
          });
          setIsLoading(false);

        }
    setIsLoading(false);
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <otherIcons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Re-bonjour</h1>
          <h3 className="text-sm text-muted-foreground">
            Entree votre email et category
          </h3>
        </div>
        <div className={cn("grid gap-6")}>
     
      <form  id="loginForm" onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div>
            <RadioGroup defaultValue="user" id="userCategory" onValueChange={setCategory}>
                <div className="flex items-center text-small space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user"> User Account</Label>
                </div>
                <div className="flex items-center text-small space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin"> Data-admin</Label>
                </div>
              </RadioGroup>
              </div>
            <div>
            <Label className="sr-only" htmlFor="emailInput">
              Email
            </Label>
            <Input
              id="emailInput"
              placeholder="email"
              type="email"
              value={formData.email}
              autoCapitalize="none"
              onChange={handleInputChangeEmail}
            />
            <Label htmlFor="passwordInput">Current Password</Label>
            <Input
              id="passwordInput"
              type="password"
              value={formData.password}
              onChange={handleInputChangePassword}
            />

            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Signez vous
          </button>
        </div>
    </div>
      </form>
    </div>        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            pas de compte ? Signez vous ici
          </Link>
        </p>
      </div>
    </div>
  );
}


