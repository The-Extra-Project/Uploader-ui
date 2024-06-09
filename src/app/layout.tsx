import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/siteconfig";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/toaster";

 import {ThemeProvider} from "@/components/theme-provider"


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster>
        </Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
