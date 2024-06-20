"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ButtonShadcn";
import Image from "next/image";
import { UserAuthForm } from "@/components/AuthForm";
import extra from "@/app/public/extra_logo.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/config-website";
import { signup } from "../api/user/register/actions";
import { useToast } from "@/components/ui/use-toast";

import { PasswordInput } from "@/components/password-input";
import { env } from "@/env.mjs";
import { Icons } from "@/components/Icons";

import { signIn } from "next-auth/react";
import React from "react";

import { Input } from "@/components/ButtonShadcn";

const metadata = {
  title: "Creer Nouveau compte chez Extralabs",
  description: "Create a new account on Extralabs.",
};

interface LoginForm {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [userCategory, setUserCategory] = React.useState<string>("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { toast } = useToast();

  const onSetpassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = async () => {
    let credentials: LoginForm = {
      email: email,
      password: password,
    };
    setIsLoading(true);

    try {
      // signup(credentials)
      const call = fetch("/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          method: "POST",
        },

        body: JSON.stringify({
          email: email,
          password: password,
          userCategory: userCategory,
        }),
      });

      toast({
        title: "Check your email",
        description:
          "We sent you the confirmation of account activation, you will be logged in directly now.",
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "not able to signup due to auth error.",
      });
    }
    setIsLoading(false);
  };

  const setCategory = (newValue: string) => {
    setUserCategory(newValue);
  };

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/auth/login/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              src={extra}
              height={100}
              width={100}
              style={{ alignItems: "center" }}
              alt="IDF"
            ></Image>
            <h1 className="text-2xl font-semibold tracking-tight">
              Creer votre compte chez extralabs
            </h1>
            <div className="text-sm text-muted-foreground">
              Selectionne votre type de compte
              <RadioGroup defaultValue="user" onValueChange={setCategory}>
                <div className="flex items-center text-small space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="option-one"> User Account</Label>
                </div>

                <div className="flex items-center text-small space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="option-two"> Data-admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className={cn("grid gap-6")}>
            {/* <UserAuthForm/> */}
            <Input
              type="text border"
              name="email"
              value={email}
              onChange={onSetEmail}
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onSetpassword}
            />
            <Button onClick={onSubmit}>Signez Vous</Button>
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
                setIsGitHubLoading(true);
                signIn("github", {
                  redirect: true,
                  callbackUrl: env.GITHUB_SUPABASE_CALLBACK_URL_GOOGLE,
                });
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
          <div className="px-8 text-center text-sm text-muted-foreground">
            En cliquant, vous acceptez automatiquement les C.G.V mentionnant
            danes le lien{" "}
            <Link
              href={siteConfig.tos}
              className="hover:text-brand underline underline-offset-4"
            >
              ici
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
