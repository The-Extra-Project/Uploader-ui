"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface LoginForm {
  email: string;
  password: string;
}

import { supabase } from "@/lib/db";
import { randomUUID } from "crypto";

function approveEmails(emails: string): boolean {
  const approvedEmails = emails.endsWith("@extralabs.xyz");
  return approvedEmails;
}

export async function signup(formData: LoginForm) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const dataUser = {
    email: formData.email,
    password: formData.password,
  };

  const { data, error } = await supabase.auth.signUp(dataUser);
  if (error) {
    redirect("/error");
  }

  try {
    await db.from("User").insert({
      email: data.user.email,
      passwordEnc: dataUser.password,
      username: "demo" + randomUUID(),
    });
  } catch (error) {
    console.log("getting the error result");
  }

  revalidatePath("/data-upload", "layout");
  redirect("/data-upload");
}

export async function signupAdmin(formData: LoginForm) {
  // here the condition of the admin should be only one from the
  const data = {
    email: formData.email,
    password: formData.password,
  };

  if (approveEmails(data.email)) {
    const { error } = await supabase.auth.signUp(data);
    if (error) {
      redirect("/error");
    }
  } else {
    NextResponse.json({
      status: "only extralabs admin are allowed for logging the application",
    });
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}
