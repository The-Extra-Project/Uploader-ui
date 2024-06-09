import {getToken} from 'next-auth/jwt'
import {withAuth} from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import {createServerClient, type CookieOptions} from "@supabase/ssr"

export async function updateSession(request: NextRequest) {
  let refreshedResponse = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

const  supabase_query = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        })

         refreshedResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        refreshedResponse.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        })
        refreshedResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        refreshedResponse.cookies.set({
          name,
          value: '',
          ...options,
        })
      },

    }
  }
)
await supabase_query.auth.getUser()
return refreshedResponse
}





export default withAuth(
    async function middleware(req) {
      const token = await getToken({ req })
      const isAuth = !!token
      const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register")
  
      if (isAuthPage) {
        if (isAuth) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }
  
        return null
      }
  
      if (!isAuth) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          from += req.nextUrl.search;
        }
  
        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
      }
    },
    {
      callbacks: {
        async authorized() {
          // This is a work-around for handling redirect on auth pages.
          // We return true here so that the middleware function above
          // is always called.
          return true
        },
      },
    }
  )
  
  export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register", "/user-dashboard"],
  }
  