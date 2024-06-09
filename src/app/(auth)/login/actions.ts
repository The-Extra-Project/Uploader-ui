'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClientUser } from '@/lib/supabase-ssr'
export async function loginWithEmail(form:FormData) {

    const supabase = createClientUser()  
    const { error } = await supabase.auth.signInWithOAuth(
        {
            provider: "github",
            options: {
                redirectTo: "/dashboard-user",
                scopes: "admin dashboard-user data-upload" 
            }
        }
    )

    if (error) {
        redirect('/error')
      }
    
      revalidatePath('/', 'layout')
      redirect('/')
}



export async function signupWithEmail(formData: FormData) {
    const supabase = createClientUser()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: 
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    if (error) {
      redirect('/error')
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }



