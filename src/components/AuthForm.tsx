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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    var signup: AuthResponse | undefined;
    try {
      signup = await db.auth.signUp({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("error in storing account auth call in useAuthForm:" + error);
    }

    setIsLoading(false);

    if (!signup?.data?.user?.id) {
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
              type="text"
              value={formData.email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="os"
              disabled={isLoading}
              required
              onChange={handleInputChange}
            {...register("email")}
            />
            <Label htmlFor="current_password">Current Password</Label>
            <PasswordInput
              id="password"
              value={formData.password}
              autoComplete="current-password"
              {...register("password")
              }


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
