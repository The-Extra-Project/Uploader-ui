import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/config-website";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/toaster";

 import {ThemeProvider} from "@/components/theme-provider"
 import {AuthProvider} from "@/components/auth-provider"
 import {auth} from "@/lib/auth"


const inter = Inter(
  { 
  subsets: ["latin"],
  variable: "--font-sans"
  }
);

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {    default: siteConfig.name,    
    template: `%s | ${siteConfig.name}`,  
  },
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <head/>
      <body
      className=
      {
        cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )
      }
      >
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        <Toaster>
        </Toaster>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
