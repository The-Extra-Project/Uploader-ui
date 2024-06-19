'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface LoginForm {
  email: string;
  password: string;
}


import {supabase} from '@/lib/db'
export async function signIn(formData: FormData) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/data-upload', 'page')
  redirect('/data-upload')
}

export async function signup(formData: LoginForm) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/data-upload', 'layout')
  redirect('/data-upload')
}


export async function signupAdmin(formData: LoginForm) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/data-upload', 'layout')
  redirect('/admin')
}