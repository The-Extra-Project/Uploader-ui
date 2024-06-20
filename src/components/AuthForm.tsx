"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { buttonVariants, Input } from "@/components/ButtonShadcn";
import { userAuthSchema } from "@/lib/auth-validation";
import { Label } from "@/components/Label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/Icons";
import { PasswordInput } from "@/components/password-input";
import { env } from "@/env.mjs";
import { AuthResponse } from "@supabase/supabase-js";
import { db } from "@/lib/db";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

// export async function storeUserAccount(user: string, password: string) {
// let result
//   try {
//     const params = {
//       user: user, password: password
//     }
//     result = fetch("/user/register",
//       {
//           headers: {
//             Accept: "application/json",
//             method: "GET"
//           },
//         body: JSON.stringify(
//         params
//         )
//         })
//       }
//       catch(error)
//       {
//         console.log("error in storing account api call:" + error)
//       }
// }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const [password, setCurrentPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setCurrentPassword(value);
    }
    formData[name] = value;
    register[name] = value;
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/dashboard",
    // })

    // const signUp = await fetch("/user/register")
    var signup: AuthResponse | undefined;
    try {
      signup = await db.auth.signUp({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log("error in storing account api call:" + error);
    }

    setIsLoading(false);

    if (!signup.data.user.id) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description:
        "We sent you the confirmation of account activation, check it in your inbox.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={handleInputChange}
            />
            <Label htmlFor="current_password">Current Password</Label>
            <PasswordInput
              id="current_password"
              value={password}
              onChange={handleInputChange}
              autoComplete="current-password"
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
      </form>
    </div>
  );
}
